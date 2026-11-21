import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/lib/rate-limit';
import {
  escapeHtml,
  RawEnquiryPayload,
  validateEnquiryPayload,
} from '@/lib/enquiry-validation';

// ── Firebase Admin ─────────────────────────────────────────────────────────────
if (!admin.apps.length) {
  try {
    admin.initializeApp();
  } catch (e) {
    console.error('[Enquire API] Firebase Admin initialization error:', e);
  }
}
const db = getFirestore('contact');

// ── Constants ──────────────────────────────────────────────────────────────────
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const ONE_HOUR_MS = 60 * 60 * 1000;
const MAX_BODY_BYTES = 16_384; // 16 KB hard cap

// Tier 1 (in-memory) limits — drops rapid floods before touching Turnstile/Firestore/SMTP
const IP_BURST_WINDOW_MS = 5 * 60_000; // 5 minutes
const IP_BURST_MAX = 3;
const IP_HOURLY_WINDOW_MS = 60 * 60_000; // 1 hour
const IP_HOURLY_MAX = 10;
const GLOBAL_BURST_WINDOW_MS = 5 * 60_000; // 5 minutes
const GLOBAL_BURST_MAX = 30;

// Tier 2 (Firestore persistent) limits — enforces throttling across Cloud Run instances
const PERSISTENT_IP_WINDOW_MS = 15 * 60_000; // 15 minutes
const PERSISTENT_IP_MAX = 3;
const PERSISTENT_EMAIL_WINDOW_MS = 60 * 60_000; // 1 hour
const PERSISTENT_EMAIL_MAX = 3;

// ── Helpers ────────────────────────────────────────────────────────────────────

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function hashKey(prefix: string, value: string): string {
  const digest = crypto.createHash('sha256').update(value).digest('hex').slice(0, 32);
  return `${prefix}_${digest}`;
}

/**
 * Tier 2 persistent fixed-window rate limiter in Firestore (`rate_limits` collection).
 * Each document carries an `expireAt` Timestamp (1 hour TTL) so storage never bloats.
 */
async function checkPersistentRateLimit(
  bucketId: string,
  windowMs: number,
  maxRequests: number
): Promise<{ ok: boolean; retryAfterSecs: number }> {
  const now = Date.now();
  const windowBucket = Math.floor(now / windowMs);
  const docId = `${bucketId}_${windowBucket}`;
  const docRef = db.collection('rate_limits').doc(docId);

  try {
    const allowed = await db.runTransaction(async (tx) => {
      const snap = await tx.get(docRef);
      const currentCount = snap.exists ? Number(snap.data()?.count ?? 0) : 0;
      if (currentCount >= maxRequests) {
        return false;
      }
      const expireAt = admin.firestore.Timestamp.fromDate(new Date(now + ONE_HOUR_MS));
      tx.set(
        docRef,
        {
          count: currentCount + 1,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          expireAt,
        },
        { merge: true }
      );
      return true;
    });

    if (!allowed) {
      const windowEndMs = (windowBucket + 1) * windowMs;
      const retryAfterSecs = Math.max(1, Math.ceil((windowEndMs - now) / 1000));
      return { ok: false, retryAfterSecs };
    }
    return { ok: true, retryAfterSecs: 0 };
  } catch (err) {
    // If Firestore transaction fails transiently, rely on Tier 1 + Turnstile rather than crashing
    console.error('[Enquire API] Persistent rate limit check error:', err);
    return { ok: true, retryAfterSecs: 0 };
  }
}

/** Verify a Cloudflare Turnstile token server-side */
async function verifyTurnstile(
  token: string,
  remoteIp: string
): Promise<{ ok: boolean; status: number; error?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[Enquire API] TURNSTILE_SECRET_KEY is not configured in production.');
      return {
        ok: false,
        status: 503,
        error: 'Enquiry verification is temporarily unavailable. Please call us on 07 3473 5556.',
      };
    }
    console.warn('[Enquire API] TURNSTILE_SECRET_KEY not set in dev — skipping Turnstile verification.');
    return { ok: true, status: 200 };
  }

  if (!token || typeof token !== 'string') {
    return {
      ok: false,
      status: 400,
      error: 'Please complete the security verification check.',
    };
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(remoteIp !== 'unknown' ? { remoteip: remoteIp } : {}),
      }),
    });
    const data = await res.json();
    if (data.success !== true) {
      console.warn('[Enquire API] Turnstile verification failed:', data['error-codes']);
      return {
        ok: false,
        status: 403,
        error: 'Security verification failed. Please refresh the check and try again.',
      };
    }
    return { ok: true, status: 200 };
  } catch (err) {
    console.error('[Enquire API] Turnstile network error:', err);
    return {
      ok: false,
      status: 503,
      error: 'Unable to verify security check right now. Please try again shortly.',
    };
  }
}

function buildEmailHtml(
  name: string,
  email: string,
  phone: string,
  service: string,
  source: string,
  message: string
) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeService = escapeHtml(service);
  const safeSource = escapeHtml(source);
  const safeMessage = escapeHtml(message);

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #fff;">
      <h2 style="color: #0b1b3d; margin-top: 0; border-bottom: 2px solid #059669; padding-bottom: 12px; font-style: italic;">New Website Enquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #059669; text-decoration: none;">${safeEmail}</a></p>
      ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
      <p><strong>Service of Interest:</strong> ${safeService}</p>
      <p><strong>Source:</strong> ${safeSource}</p>
      <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <p style="margin-top: 0; font-weight: bold; color: #0b1b3d;">Message:</p>
        <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Sent automatically by the VForce Tax website.</p>
    </div>
  `;
}

function rateLimitResponse(retryAfterSecs: number) {
  return NextResponse.json(
    { error: 'Too many submissions. Please wait a few minutes before trying again.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(Math.max(1, retryAfterSecs)),
        'X-RateLimit-Remaining': '0',
      },
    }
  );
}

// ── POST handler ───────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  // ── 1. Tier 1 in-memory rate limiting (blocks bursts before DB/SMTP/Turnstile) ──
  const ipBurst = rateLimit(`enquire:ip5m:${ip}`, {
    windowMs: IP_BURST_WINDOW_MS,
    max: IP_BURST_MAX,
  });
  if (!ipBurst.ok) {
    console.warn(`[Enquire API] 5m IP rate limit exceeded: ${ip}`);
    return rateLimitResponse(Math.ceil((ipBurst.resetAt - Date.now()) / 1000));
  }

  const ipHourly = rateLimit(`enquire:ip1h:${ip}`, {
    windowMs: IP_HOURLY_WINDOW_MS,
    max: IP_HOURLY_MAX,
  });
  if (!ipHourly.ok) {
    console.warn(`[Enquire API] 1h IP rate limit exceeded: ${ip}`);
    return rateLimitResponse(Math.ceil((ipHourly.resetAt - Date.now()) / 1000));
  }

  const globalBurst = rateLimit('enquire:global5m', {
    windowMs: GLOBAL_BURST_WINDOW_MS,
    max: GLOBAL_BURST_MAX,
  });
  if (!globalBurst.ok) {
    console.warn('[Enquire API] Global 5m burst limit exceeded');
    return rateLimitResponse(Math.ceil((globalBurst.resetAt - Date.now()) / 1000));
  }

  // ── 2. Enforce body size limit and parse JSON safely ────────────────────────
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request payload too large.' }, { status: 413 });
  }

  let body: RawEnquiryPayload;
  try {
    const rawText = await request.text();
    if (rawText.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request payload too large.' }, { status: 413 });
    }
    body = JSON.parse(rawText) as RawEnquiryPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // ── 3. Honeypot, timing, payload validation, and spam content filtering ─────
  const validation = validateEnquiryPayload(body);
  if (validation.status === 'spam') {
    console.warn(`[Enquire API] Dropped spam (${validation.reason}) from IP: ${ip}`);
    // Return 200 without writing to Firestore or sending email so bots cannot probe filters
    return NextResponse.json({ success: true });
  }
  if (validation.status === 'invalid') {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { name, email, phone, message, service, source } = validation.data;

  // ── 4. Server-side Cloudflare Turnstile verification ────────────────────────
  const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken : '';
  const turnstileResult = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileResult.ok) {
    return NextResponse.json(
      { error: turnstileResult.error },
      { status: turnstileResult.status }
    );
  }

  // ── 5. Tier 2 persistent Firestore rate limit (cross-instance Cloud Run) ────
  if (ip !== 'unknown') {
    const persistentIp = await checkPersistentRateLimit(
      hashKey('ip', ip),
      PERSISTENT_IP_WINDOW_MS,
      PERSISTENT_IP_MAX
    );
    if (!persistentIp.ok) {
      console.warn(`[Enquire API] Persistent IP rate limit exceeded: ${ip}`);
      return rateLimitResponse(persistentIp.retryAfterSecs);
    }
  }

  const persistentEmail = await checkPersistentRateLimit(
    hashKey('email', email),
    PERSISTENT_EMAIL_WINDOW_MS,
    PERSISTENT_EMAIL_MAX
  );
  if (!persistentEmail.ok) {
    console.warn(`[Enquire API] Persistent email rate limit exceeded for: ${email}`);
    return rateLimitResponse(persistentEmail.retryAfterSecs);
  }

  // ── 6. Write verified enquiry to Firestore (1-hour TTL via `expireAt`) ──────
  try {
    const expireTime = new Date(Date.now() + ONE_HOUR_MS);
    await db.collection('enquiries').add({
      name,
      email,
      ...(phone ? { phone } : {}),
      messageContent: message,
      service,
      source,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expireAt: admin.firestore.Timestamp.fromDate(expireTime),
    });

    // ── 7. Send email notification via Gmail SMTP ─────────────────────────────
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.warn('[Enquire API] Gmail credentials not set, skipping email notification.');
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      const phoneLine = phone ? `Phone: ${phone}\n` : '';
      await transporter.sendMail({
        from: `"VForce Tax Website" <${gmailUser}>`,
        to: 'contact@vforcetax.com.au',
        replyTo: email,
        subject: `New Website Enquiry: ${service} from ${name}`,
        text: `You have received a new website enquiry.\n\nName: ${name}\nEmail: ${email}\n${phoneLine}Service of Interest: ${service}\nSource: ${source}\n\nMessage:\n${message}`,
        html: buildEmailHtml(name, email, phone, service, source, message),
      });

      console.log(`[Enquire API] Email notification sent for enquiry from ${email}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[Enquire API] Error:', errMsg);
    return NextResponse.json(
      { error: 'Failed to send enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
