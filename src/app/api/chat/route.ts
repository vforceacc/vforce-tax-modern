import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as admin from 'firebase-admin';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Initialize Firebase Admin for writing to Firestore
if (!admin.apps.length) {
  // Uses Application Default Credentials (ADC) in App Hosting
  // Fallback to credential logic if needed locally, but ADC is preferred.
  try {
    admin.initializeApp();
  } catch (e) {
    console.error("Firebase Admin initialization error:", e);
  }
}
const db = admin.firestore();

const BASE_SYSTEM_PROMPT = `You are Vee, a friendly tax assistant for VForce Tax based in Townsville, Australia. 

TONE RULES:
- Casual, warm, Aussie — say "no worries", "reckon", "arvo", "heaps", "sorted" naturally.
- Be extremely personable, like having a quick yarn over a cold one.
- Keep your responses compact. No massive walls of text. Max 2-3 sentences per response.
- Use line breaks between thoughts.
- Never say boilerplate AI intro phrases like "Certainly!", "Of course!", or "How can I assist you today?" — just respond like a real local.
- Emojis are great occasionally (like 👋 or 😊) but keep them tasteful.

YOUR JOB:
You answer general questions about tax, BAS, bookkeeping, and small business accounting.
CURRENT PAGE CONTEXT: The user is currently viewing the page: {PATHNAME}. Use this to guide your conversation if relevant.

CONVERSATION FLOW & BOOKING RULES:
1. First 1-2 exchanges: Casual name check. Politely ask for their name in a casual format so you know who you are yarnin' to (e.g. "G'day! I'm Vee. What's your name so I know who I'm chatting with?").
2. No email, phone, or business name is required. However, if they voluntarily share their email, phone, or business name, acknowledge it warmly and proceed.
3. Steer to Booking Early: Since tax and business situations are highly specific, you should steer them towards booking a free 15-minute consultation as early as the 2nd or 3rd exchange. 
4. Whenever you suggest booking a strategy session, or whenever they ask about pricing, specific advisory, setting up a business, or complex tax issues, you MUST append this exact block to trigger a booking CTA button on the client side:
<booking>{"action":"OPEN_BOOKING"}</booking>

If the user asks about specific pages/topics, you can also offer helpful navigation shortcuts using this structure:
<actions>{"buttons":[{"label":"📖 Learn About Our Services","url":"/services","type":"nav"}]}</actions>
`;

// Removed HubSpot upsert function in favor of Firebase Firestore writes.

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
    const { messages, pathname } = body as { messages: { role: string; text: string }[], pathname?: string };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const systemPrompt = BASE_SYSTEM_PROMPT.replace('{PATHNAME}', pathname || '/');

    // Initialize the Google Generative AI SDK
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      systemInstruction: systemPrompt,
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

    // Parse out any action buttons
    const actionsMatch = replyText.match(/<actions>([\s\S]*?)<\/actions>/);
    let buttons = [];
    let cleanText = replyText;
    
    if (actionsMatch) {
      try {
        const parsed = JSON.parse(actionsMatch[1]);
        buttons = parsed.buttons || [];
        cleanText = replyText.replace(/<actions>[\s\S]*?<\/actions>/, "").trim();
      } catch (err) {
        console.error('[Chat API] Failed to parse actions block', err);
      }
    }

    // Extract OPEN_BOOKING data (DO NOT store in Firestore for privacy)
    const bookingMatch = replyText.match(/<booking>([\s\S]*?)<\/booking>/);
    let bookingData: any = null;

    if (bookingMatch) {
      try {
        bookingData = JSON.parse(bookingMatch[1]);
      } catch (err) {
        console.error('[Chat API] Failed to parse booking block', err);
      }
      cleanText = cleanText.replace(/<booking>[\s\S]*?<\/booking>/, "").trim();
    }

    return NextResponse.json({ reply: cleanText, buttons, bookingData });

  } catch (err: any) {
    console.error('[Chat API] Gemini SDK Error:', err.message || err);
    return NextResponse.json({
      reply: "Sorry, I'm experiencing a technical issue right now. Please call our Townsville office on 07 3473 5556.",
    });
  }
}
