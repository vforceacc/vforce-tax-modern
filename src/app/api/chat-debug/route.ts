import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const MODELS_TO_TEST = [
  'gemini-3.0-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
];

export async function GET() {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({
      status: 'error',
      message: 'GEMINI_API_KEY is not set in environment',
      keyPresent: false,
    });
  }

  const results: Record<string, { status: number | string; ok: boolean; error?: string }> = {};

  for (const model of MODELS_TO_TEST) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Say "OK" only.' }] }],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '(no text)';
        results[model] = { status: res.status, ok: true, error: `Response: ${text.substring(0, 50)}` };
      } else {
        const errBody = await res.text();
        results[model] = { status: res.status, ok: false, error: errBody.substring(0, 200) };
      }
    } catch (e: unknown) {
      results[model] = { status: 'fetch_error', ok: false, error: String(e) };
    }
  }

  const hubspotKey = process.env.HUBSPOT_API_KEY;
  const hubspotCheck = hubspotKey ? await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts?limit=1",
    { headers: { Authorization: `Bearer ${hubspotKey}` } }
  ).then(r => ({ status: r.status, ok: r.ok }))
  .catch(e => ({ status: 0, ok: false, error: e.message }))
  : { status: 0, ok: false, error: "No HUBSPOT_API_KEY secret found" };

  return NextResponse.json({
    keyPresent: true,
    keyLengthHint: `${GEMINI_API_KEY.length} chars, starts with ${GEMINI_API_KEY.substring(0, 8)}...`,
    models: results,
    hubspot: hubspotCheck
  });
}
