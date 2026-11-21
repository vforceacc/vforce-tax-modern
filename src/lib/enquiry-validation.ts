/**
 * src/lib/enquiry-validation.ts
 *
 * Payload validation, sanitisation, and obvious bot/link spam filtering
 * for enquiry submissions.
 */

export const ENQUIRY_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  phoneMin: 8,
  phoneMax: 30,
  serviceMax: 100,
  sourceMax: 50,
  messageMin: 5,
  messageMax: 2000,
} as const;

export interface RawEnquiryPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  service?: unknown;
  source?: unknown;
  website?: unknown;
  formLoadedAt?: unknown;
  turnstileToken?: unknown;
}

export interface ValidatedEnquiry {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  source: string;
}

export type ValidationOutcome =
  | { status: 'ok'; data: ValidatedEnquiry }
  | { status: 'invalid'; error: string }
  | { status: 'spam'; reason: string };

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_CHARS_REGEX = /^[+\d\s().-]+$/;
const HEADER_INJECTION_REGEX = /[\r\n]/;

const URL_REGEX = /(?:https?:\/\/|www\.)\S+/gi;
const URL_SHORTENER_REGEX = /\b(?:bit\.ly|tinyurl\.com|t\.co|rb\.gy|cutt\.ly|goo\.gl|ow\.ly|is\.gd)\/\S+/i;
const HTML_OR_BBCODE_REGEX = /<\s*(?:a|script|iframe|img|form|object|embed|style|link|meta)\b|\[url\s*=|\[link\s*=/i;
const SPAM_KEYWORDS_REGEX =
  /\b(?:viagra|cialis|casino|gambling|betting|poker|crypto\s*invest|forex\s*trading|binary\s*options|seo\s*(?:service|agency|package|expert)|buy\s*backlinks?|guest\s*post(?:ing)?|link\s*building|domain\s*authority|porn|escort|onlyfans|whatsapp\s*me|telegram\s*@|earn\s*\$?\d{3,}\s*(?:daily|per\s*day|weekly)|guaranteed\s*first\s*page)\b/i;
const REPEATED_CHARS_REGEX = /(.)\1{9,}/;

/** Minimum elapsed time (ms) between form mount and submit for a human user */
const MIN_HUMAN_SUBMIT_MS = 1500;

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateEnquiryPayload(payload: RawEnquiryPayload): ValidationOutcome {
  // 1. Honeypot check
  const honeypot = asTrimmedString(payload.website);
  if (honeypot.length > 0) {
    return { status: 'spam', reason: 'honeypot' };
  }

  // 2. Minimum form fill-time check (reject instant scripted POSTs)
  if (typeof payload.formLoadedAt === 'number' && Number.isFinite(payload.formLoadedAt)) {
    const elapsedMs = Date.now() - payload.formLoadedAt;
    if (elapsedMs >= 0 && elapsedMs < MIN_HUMAN_SUBMIT_MS) {
      return { status: 'spam', reason: 'submitted_too_fast' };
    }
  }

  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email).toLowerCase();
  const phone = asTrimmedString(payload.phone);
  const message = asTrimmedString(payload.message);
  const service = asTrimmedString(payload.service) || 'General Enquiry';
  const source = asTrimmedString(payload.source) || 'Service Page';

  // 3. Required fields
  if (!name) {
    return { status: 'invalid', error: 'Full name is required.' };
  }
  if (!email) {
    return { status: 'invalid', error: 'Email address is required.' };
  }
  if (!message) {
    return { status: 'invalid', error: 'Please include a short message.' };
  }

  // 4. Length limits
  if (name.length < ENQUIRY_LIMITS.nameMin || name.length > ENQUIRY_LIMITS.nameMax) {
    return {
      status: 'invalid',
      error: `Name must be between ${ENQUIRY_LIMITS.nameMin} and ${ENQUIRY_LIMITS.nameMax} characters.`,
    };
  }
  if (email.length > ENQUIRY_LIMITS.emailMax) {
    return { status: 'invalid', error: 'Email address is too long.' };
  }
  if (service.length > ENQUIRY_LIMITS.serviceMax) {
    return { status: 'invalid', error: 'Service name is too long.' };
  }
  if (source.length > ENQUIRY_LIMITS.sourceMax) {
    return { status: 'invalid', error: 'Invalid enquiry source.' };
  }
  if (message.length < ENQUIRY_LIMITS.messageMin || message.length > ENQUIRY_LIMITS.messageMax) {
    return {
      status: 'invalid',
      error: `Message must be between ${ENQUIRY_LIMITS.messageMin} and ${ENQUIRY_LIMITS.messageMax} characters.`,
    };
  }

  // 5. Header injection prevention
  if (
    HEADER_INJECTION_REGEX.test(name) ||
    HEADER_INJECTION_REGEX.test(email) ||
    HEADER_INJECTION_REGEX.test(service) ||
    HEADER_INJECTION_REGEX.test(source) ||
    HEADER_INJECTION_REGEX.test(phone)
  ) {
    return { status: 'spam', reason: 'header_injection' };
  }

  // 6. Email format validation
  if (!EMAIL_REGEX.test(email)) {
    return { status: 'invalid', error: 'Please enter a valid email address.' };
  }

  // 7. Optional phone format validation
  if (phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    if (
      phone.length > ENQUIRY_LIMITS.phoneMax ||
      !PHONE_CHARS_REGEX.test(phone) ||
      digitsOnly.length < ENQUIRY_LIMITS.phoneMin ||
      digitsOnly.length > 15
    ) {
      return { status: 'invalid', error: 'Please enter a valid phone number.' };
    }
  }

  // 8. Obvious bot / link spam checks
  if (URL_REGEX.test(name)) {
    return { status: 'spam', reason: 'url_in_name' };
  }

  const urlsInMessage = message.match(URL_REGEX) || [];
  if (urlsInMessage.length > 1) {
    return { status: 'spam', reason: 'excessive_urls' };
  }
  if (URL_SHORTENER_REGEX.test(message)) {
    return { status: 'spam', reason: 'url_shortener' };
  }

  const combined = `${name} ${message}`;
  if (HTML_OR_BBCODE_REGEX.test(combined)) {
    return { status: 'spam', reason: 'html_or_bbcode' };
  }
  if (SPAM_KEYWORDS_REGEX.test(combined)) {
    return { status: 'spam', reason: 'spam_keywords' };
  }
  if (REPEATED_CHARS_REGEX.test(name) || REPEATED_CHARS_REGEX.test(message)) {
    return { status: 'spam', reason: 'repeated_gibberish' };
  }

  return {
    status: 'ok',
    data: { name, email, phone, message, service, source },
  };
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
