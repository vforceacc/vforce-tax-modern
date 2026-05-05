import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || '';

const SYSTEM_PROMPT = `You are a friendly, professional AI assistant for 'VForce Tax', a highly regarded accounting firm in Townsville, Australia. 
Your goal is to answer basic accounting/tax questions briefly, but ALWAYS steer the conversation towards booking a consultation with one of our expert accountants.
To book them in, you MUST ask for their Name, Email Address, and Phone Number.
If the user provides contact information (like an email or phone number), acknowledge it, tell them a VForce accountant will contact them shortly, and APPEND THE EXACT STRING "[LEAD_CAPTURED]" to the very end of your response.
Keep answers concise and use Australian English (e.g., lodgement, optimisation).
Do not use markdown formatting in your responses - keep it plain text.`;

// Extract contact details from the full chat history
function extractContactInfo(messages: { role: string; text: string }[]): {
  name: string;
  email: string;
  phone: string;
} {
  const fullText = messages
    .filter(m => m.role === 'user')
    .map(m => m.text)
    .join(' ');

  const emailMatch = fullText.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  const phoneMatch = fullText.match(/(?:\+?61|0)\s*\d[\d\s-]{7,}/);
  
  // Try to find a name - look for "my name is X", "I'm X", "I am X" patterns
  const nameMatch = fullText.match(/(?:my name is|i'm|i am|name:?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);

  return {
    name: nameMatch?.[1]?.trim() || '',
    email: emailMatch?.[0]?.trim() || '',
    phone: phoneMatch?.[0]?.trim() || '',
  };
}

// Send lead to HubSpot CRM
async function sendToHubSpot(contactInfo: { name: string; email: string; phone: string }) {
  if (!HUBSPOT_ACCESS_TOKEN) {
    console.warn('[HubSpot] No access token configured – skipping CRM push.');
    console.log('[HubSpot] Lead data (local log):', contactInfo);
    return;
  }

  const nameParts = contactInfo.name.split(' ');
  const firstName = nameParts[0] || 'Website';
  const lastName = nameParts.slice(1).join(' ') || 'Lead';

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        properties: {
          email: contactInfo.email || `chatbot-lead-${Date.now()}@placeholder.vforcetax.com.au`,
          firstname: firstName,
          lastname: lastName,
          phone: contactInfo.phone,
          lifecyclestage: 'lead',
          hs_lead_status: 'NEW',
          company: 'VForce Tax Chatbot Lead',
          notes_last_contacted: `Lead captured via AI chatbot on ${new Date().toISOString()}`,
        },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('[HubSpot] Failed to create contact:', errorData);
    } else {
      console.log('[HubSpot] Contact created successfully.');
    }
  } catch (err) {
    console.error('[HubSpot] Error sending lead:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: { role: string; text: string }[] };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Build Gemini API payload - Ensuring it starts with 'user'
    let apiMessages = messages.map((m: { role: string; text: string }) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    // Gemini requires the first message to be from the 'user'
    if (apiMessages.length > 0 && apiMessages[0].role === 'model') {
      apiMessages = apiMessages.slice(1);
    }

    const payload = {
      contents: apiMessages,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
      console.error('[Gemini] API error:', geminiRes.status);
      return NextResponse.json({
        reply: "Sorry, I'm experiencing a technical issue. Please call us on 07 3473 5556.",
      });
    }

    const data = await geminiRes.json();
    let replyText: string =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I'm experiencing a technical issue. Please call us on 07 3473 5556.";

    // Check for lead capture trigger and push to HubSpot
    if (replyText.includes('[LEAD_CAPTURED]')) {
      const contactInfo = extractContactInfo(messages);
      console.log('[Lead Captured]', contactInfo);

      // Fire-and-forget HubSpot push (don't block the response)
      sendToHubSpot(contactInfo).catch(err =>
        console.error('[HubSpot] Background push error:', err)
      );
    }

    return NextResponse.json({ reply: replyText });
  } catch (err) {
    console.error('[Chat API] Unhandled error:', err);
    return NextResponse.json({
      reply: "Sorry, something went wrong. Please call our Townsville office on 07 3473 5556.",
    });
  }
}
