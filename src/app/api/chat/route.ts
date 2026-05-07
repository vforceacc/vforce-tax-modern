import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
      console.error('[HubSpot] Failed to create contact:', await res.json());
    }
  } catch (err) {
    console.error('[HubSpot] Error sending lead:', err);
  }
}

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    console.error('[Chat API] GEMINI_API_KEY is not set');
    return NextResponse.json(
      { reply: "Sorry, I'm experiencing a technical issue. Please call us on 07 3473 5556." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { messages } = body as { messages: { role: string; text: string }[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Initialize the Google Generative AI SDK
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.0-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });

    // Format history for startChat: must strictly be user -> model -> user -> model
    // The very last message in the array should be the new user message we want to send
    const history = [];
    const newMessages = [...messages];
    
    // The latest user message
    const lastUserMessage = newMessages.pop();

    if (!lastUserMessage || lastUserMessage.role !== 'user') {
      return NextResponse.json({ error: 'Last message must be from user' }, { status: 400 });
    }

    // Process previous history correctly
    for (const msg of newMessages) {
      history.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      });
    }

    // Clean up history to ensure alternating roles (required by Gemini API)
    // We filter out any leading model messages, and group consecutive messages of the same role
    const cleanedHistory: { role: string; parts: { text: string }[] }[] = [];
    for (const msg of history) {
      if (cleanedHistory.length === 0 && msg.role !== 'user') {
        continue; // First message must be 'user'
      }
      
      if (cleanedHistory.length > 0) {
        const lastRole = cleanedHistory[cleanedHistory.length - 1].role;
        if (msg.role === lastRole) {
           cleanedHistory[cleanedHistory.length - 1].parts[0].text += '\n' + msg.parts[0].text;
           continue;
        }
      }
      cleanedHistory.push({
        role: msg.role,
        parts: [{ text: msg.parts[0].text }]
      });
    }

    // Ensure the last message in history before we send our prompt isn't 'user'
    // (Because we are about to send a 'user' message)
    if (cleanedHistory.length > 0 && cleanedHistory[cleanedHistory.length - 1].role === 'user') {
      // If the history ends with a user message, we merge it with the final prompt
      lastUserMessage.text = cleanedHistory.pop()!.parts[0].text + '\n' + lastUserMessage.text;
    }

    // Start chat session
    const chat = model.startChat({
      history: cleanedHistory,
    });

    // Send the latest message
    const result = await chat.sendMessage(lastUserMessage.text);
    const replyText = result.response.text();

    if (!replyText) {
      throw new Error('No text returned from Gemini API');
    }

    // Check for lead capture trigger
    if (replyText.includes('[LEAD_CAPTURED]')) {
      const contactInfo = extractContactInfo(messages);
      sendToHubSpot(contactInfo).catch(err => console.error(err));
    }

    return NextResponse.json({ reply: replyText });

  } catch (err: any) {
    console.error('[Chat API] Gemini SDK Error:', err.message || err);
    return NextResponse.json({
      reply: "Sorry, I'm experiencing a technical issue right now. Please call our Townsville office on 07 3473 5556.",
    });
  }
}
