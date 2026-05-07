import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || '';

// Try these models in order — gemini-2.0-flash is the current recommended free-tier model
const GEMINI_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
];

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

// Call Gemini REST API with a specific model name
async function callGemini(
  modelName: string,
  apiMessages: { role: string; parts: { text: string }[] }[]
): Promise<{ ok: boolean; text?: string; status?: number; error?: string }> {
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: apiMessages,
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 512,
    },
  };

  const geminiRes = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!geminiRes.ok) {
    const errBody = await geminiRes.text();
    console.error(`[Gemini] Model ${modelName} failed — status ${geminiRes.status}:`, errBody);
    return { ok: false, status: geminiRes.status, error: errBody };
  }

  const data = await geminiRes.json();
  const text: string | undefined = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    console.error(`[Gemini] Model ${modelName} returned no text. Full response:`, JSON.stringify(data));
    return { ok: false, error: 'No text in response' };
  }

  return { ok: true, text };
}

export async function POST(request: NextRequest) {
  // Guard: ensure API key is present
  if (!GEMINI_API_KEY) {
    console.error('[Chat API] GEMINI_API_KEY is not set in environment variables');
    return NextResponse.json(
      { reply: "Sorry, I'm experiencing a technical issue. Please call us on 07 3473 5556." },
      { status: 500 }
    );
  }

  console.log('[Chat API] GEMINI_API_KEY present, length:', GEMINI_API_KEY.length);

  try {
    const body = await request.json();
    const { messages } = body as { messages: { role: string; text: string }[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Map to Gemini format and strip all leading non-user messages.
    // The Gemini API requires the conversation to start with a 'user' turn.
    let apiMessages = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    // Remove any leading model messages (e.g. the initial greeting)
    while (apiMessages.length > 0 && apiMessages[0].role !== 'user') {
      apiMessages = apiMessages.slice(1);
    }

    if (apiMessages.length === 0) {
      return NextResponse.json({ error: 'No user message found' }, { status: 400 });
    }

    // Ensure alternating roles (Gemini requires strict user/model alternation)
    const cleanedMessages: { role: string; parts: { text: string }[] }[] = [];
    for (const msg of apiMessages) {
      if (cleanedMessages.length === 0) {
        cleanedMessages.push(msg);
      } else {
        const lastRole = cleanedMessages[cleanedMessages.length - 1].role;
        if (msg.role === lastRole) {
          // Merge consecutive same-role messages
          cleanedMessages[cleanedMessages.length - 1].parts.push(...msg.parts);
        } else {
          cleanedMessages.push(msg);
        }
      }
    }

    // Try models in order until one works
    let replyText: string | undefined;
    for (const modelName of GEMINI_MODELS) {
      console.log(`[Chat API] Trying model: ${modelName}`);
      const result = await callGemini(modelName, cleanedMessages);
      if (result.ok && result.text) {
        replyText = result.text;
        console.log(`[Chat API] Success with model: ${modelName}`);
        break;
      }
      // If it's a 404 (model not found) or 400, try next model
      // If it's a 403 (auth error), no point trying others
      if (result.status === 403 || result.status === 401) {
        console.error('[Chat API] Auth error — check GEMINI_API_KEY validity');
        break;
      }
    }

    if (!replyText) {
      return NextResponse.json({
        reply: "Sorry, I'm experiencing a technical issue right now. Please call our Townsville office on 07 3473 5556.",
      });
    }

    // Check for lead capture trigger and push to HubSpot
    if (replyText.includes('[LEAD_CAPTURED]')) {
      const contactInfo = extractContactInfo(messages);
      console.log('[Lead Captured]', contactInfo);
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
