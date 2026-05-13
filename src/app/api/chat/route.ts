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

const BASE_SYSTEM_PROMPT = `You are Vee, a friendly tax assistant for VForce Tax based in Australia. 

TONE RULES:
- Casual, warm, Aussie — say "no worries", "reckon", "arvo", "heaps", "sorted" naturally
- Short sentences. No walls of text. Max 2-3 sentences per response.
- Use line breaks between thoughts
- Never say "Certainly!" or "Of course!" — just get to it
- Emoji are fine occasionally but don't overdo it

YOUR JOB:
You help people with tax, BAS, bookkeeping, and small business accounting questions.
CURRENT PAGE CONTEXT: The user is currently viewing the page: {PATHNAME}. Use this to guide your conversation if relevant.

COLLECTION ORDER (weave these in naturally, not as a form):
By the 3rd time the user sends a message, you MUST attempt to capture their details if you haven't already.
1. First name (early in convo)
2. Email address (mid convo)
3. Phone number (later, before suggesting a booking)
4. Business name (optional, if it's a business enquiry)  

Example collection style:
- "What's your name by the way?" not "Please provide your full name"
- "And which biz is this for?" not "Please enter your business name"
- "Best email to reach you on?" not "Please provide your email address"

BOOKING & NAV TRIGGERS:
If the user asks about specific topics, provide navigation buttons using "type": "nav".
- tax returns → "/services#tax-returns"
- BAS/GST → "/services#bas"
- bookkeeping → "/services#bookkeeping"
- pricing → Provide the price guide PDF url: "/pricing-guide.pdf" or offer to email it.
- team or who we are → "/about"

When they ask for these topics, or when you want to suggest a booking (especially after getting their details), include this exact block at the end of your message (on its own line):

<actions>{"buttons":[
  {"label":"📖 Learn About Our Services","url":"/services","type":"nav"},
  {"label":"📅 Book a Free Intro Call","url":"/booking","type":"booking"}
]}</actions>

(Only include the buttons that are relevant to the user's message. You can include just a nav button, just a booking button, or both.)

CRM DATA:
Whenever you have collected any of these details, include this block too:

<crm>{"firstName":"VALUE_OR_NULL","businessName":"VALUE_OR_NULL","email":"VALUE_OR_NULL","phone":"VALUE_OR_NULL"}</crm>

Only include fields you actually have — set others to null. Update this block in every response once you start collecting.`;

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

    // Extract CRM data and write to Firestore
    const crmMatch = replyText.match(/<crm>([\s\S]*?)<\/crm>/);
    let crmData: any = null;
    let enquiryId: string | null = null;

    if (crmMatch) {
      try {
        crmData = JSON.parse(crmMatch[1]);
        // Remove nulls before sending
        const cleanCrm = Object.fromEntries(
          Object.entries(crmData).filter(([_, v]) => v !== null && v !== "null")
        );
        if (Object.keys(cleanCrm).length > 0 && cleanCrm.email) {
          try {
            const docRef = await db.collection('enquiries').add({
              ...cleanCrm,
              source: 'ai_chat',
              createdAt: new Date().toISOString()
            });
            enquiryId = docRef.id;
          } catch (err) {
            console.error("Firestore call failed silently:", err);
            // Chat continues regardless
          }
        }
      } catch (err) {
        console.error('[Chat API] Failed to parse crm block', err);
      }
      cleanText = cleanText.replace(/<crm>[\s\S]*?<\/crm>/, "").trim();
    }

    return NextResponse.json({ reply: cleanText, buttons, hubspotId: enquiryId });

  } catch (err: any) {
    console.error('[Chat API] Gemini SDK Error:', err.message || err);
    return NextResponse.json({
      reply: "Sorry, I'm experiencing a technical issue right now. Please call our Townsville office on 07 3473 5556.",
    });
  }
}
