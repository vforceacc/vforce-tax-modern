import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

// Initialize Firebase Admin for writing to Firestore securely on the server
if (!admin.apps.length) {
  try {
    admin.initializeApp();
  } catch (e) {
    console.error("Firebase Admin initialization error:", e);
  }
}
const db = getFirestore('contact');

// Build the HTML email body
function buildEmailHtml(name: string, email: string, service: string, source: string, message: string) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #fff;">
      <h2 style="color: #0b1b3d; margin-top: 0; border-bottom: 2px solid #059669; padding-bottom: 12px; font-style: italic;">🔔 New Website Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a></p>
      <p><strong>Service of Interest:</strong> ${service}</p>
      <p><strong>Source:</strong> ${source}</p>
      <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <p style="margin-top: 0; font-weight: bold; color: #0b1b3d;">Message:</p>
        <p style="margin: 0; white-space: pre-wrap;">${message || 'No message provided.'}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Sent automatically by the VForce Tax website.</p>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, service, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const resolvedService = service || 'General Enquiry';
    const resolvedSource = source || 'Website';
    const resolvedMessage = message || 'No message provided.';

    // ── 1. Write to Firestore (clean record, no Trigger Email fields) ──────────
    const expireTime = new Date(Date.now() + 60 * 60 * 1000);
    await db.collection('enquiries').add({
      name,
      email,
      messageContent: resolvedMessage,
      service: resolvedService,
      source: resolvedSource,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expireAt: admin.firestore.Timestamp.fromDate(expireTime),
    });

    // ── 2. Send email notification via Gmail SMTP ─────────────────────────────
    const gmailUser = process.env.GMAIL_USER;       // vforceacc@gmail.com
    const gmailPass = process.env.GMAIL_APP_PASSWORD; // 16-char App Password

    if (!gmailUser || !gmailPass) {
      console.warn('[Enquire API] Gmail credentials not set — skipping email notification.');
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      await transporter.sendMail({
        from: `"VForce Tax Website" <${gmailUser}>`,
        to: 'contact@vforcetax.com.au',
        replyTo: email,   // Reply goes directly back to the enquirer
        subject: `New Website Enquiry: ${resolvedService} from ${name}`,
        text: `You have received a new website enquiry.\n\nName: ${name}\nEmail: ${email}\nService of Interest: ${resolvedService}\nSource: ${resolvedSource}\n\nMessage:\n${resolvedMessage}`,
        html: buildEmailHtml(name, email, resolvedService, resolvedSource, resolvedMessage),
      });

      console.log(`[Enquire API] Email notification sent for enquiry from ${email}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[Enquire API] Error:', err.message || err);
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 });
  }
}
