/**
 * Cloudflare Worker for V-Force Tax AI Proxy & Secure CRM Sync
 * 
 * Functions:
 * 1. Secure proxy to Gemini API protecting GOOGLE_AI_STUDIO_API_KEY.
 * 2. Explicit CORS preflight (OPTIONS) and request header handling.
 * 3. Edge-compatible direct write to Firebase Firestore REST API (no Node SDKs).
 * 4. Supports both public Firebase API Key writes and OAuth2 Service Account JWT signing on the Edge.
 */

const BASE_SYSTEM_PROMPT = `You are Vee, a friendly tax assistant for VForce Tax based in Townsville, Australia. 

TONE RULES:
- Casual, warm, Aussie - say "no worries", "reckon", "arvo", "heaps", "sorted" naturally.
- Be extremely personable, like having a quick yarn over a cold one.
- Keep your responses compact. No massive walls of text. Max 2-3 sentences per response.
- Use line breaks between thoughts.
- Never say boilerplate AI intro phrases like "Certainly!", "Of course!", or "How can I assist you today?" - just respond like a local.
- Emojis are great occasionally (like 👋 or 😊) but keep them tasteful.

YOUR JOB:
You answer general questions about tax, BAS, bookkeeping, and small business accounting.
CURRENT PAGE CONTEXT: The user is currently viewing the page: {PATHNAME}. Use this to guide your conversation if relevant.

CONVERSATION FLOW & BOOKING RULES:
1. First 1-2 exchanges: Casual name check. Politely ask for their name in a casual format so you know who you are yarnin' to (e.g. "G'day! I'm Vee. What's your name so I know who I'm chatting with?").
2. No email, phone, or business name is required. However, if they voluntarily share their email, phone, or business name, acknowledge it warmly and proceed.
3. Steer to Booking Early: Since tax and business situations are highly specific, you should steer them towards booking a free 15-minute consultation as early as the 2nd or 3rd exchange. 

Whenever you suggest booking a strategy session, or whenever they ask about pricing, specific advisory, setting up a business, or complex tax issues, you MUST append this exact block to trigger a booking CTA button on the client side:
<booking>{"action":"OPEN_BOOKING"}</booking>

If the user asks about specific pages/topics, you can also offer helpful navigation shortcuts using this structure:
<actions>{"buttons":[{"label":"📖 Learn About Our Services","url":"/services","type":"nav"}]}</actions>
`;

// Helper to set CORS headers
function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

// Convert a PEM format private key to an ArrayBuffer
function pemToArrayBuffer(pem) {
  const b64Lines = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');
  
  const binaryStr = atob(b64Lines);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return bytes.buffer;
}

// Sign a JWT using standard Web Crypto API (RS256) on the Edge
async function signJwt(header, payload, privateKeyPem) {
  const encoder = new TextEncoder();
  const headerStr = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadStr = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const tokenInput = `${headerStr}.${payloadStr}`;
  
  const privateKeyBuffer = pemToArrayBuffer(privateKeyPem);
  const key = await crypto.subtle.importKey(
    'pkcs8',
    privateKeyBuffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: { name: 'SHA-256' },
    },
    false,
    ['sign']
  );
  
  const signatureBuffer = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    encoder.encode(tokenInput)
  );
  
  const signatureArray = new Uint8Array(signatureBuffer);
  let signatureStr = '';
  for (let i = 0; i < signatureArray.length; i++) {
    signatureStr += String.fromCharCode(signatureArray[i]);
  }
  const signatureB64 = btoa(signatureStr).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  return `${tokenInput}.${signatureB64}`;
}

// Generate Google Access Token using Service Account on the Edge
async function getGoogleAccessToken(saEmail, saPrivateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: saEmail,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };
  
  const jwt = await signJwt(header, payload, saPrivateKey);
  
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });
  
  if (!tokenRes.ok) {
    throw new Error(`Google OAuth token exchange failed: ${await tokenRes.text()}`);
  }
  
  const data = await tokenRes.json();
  return data.access_token;
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "*";
    
    // 1. Handle CORS preflight (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin),
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { 
        status: 405,
        headers: corsHeaders(origin)
      });
    }

    try {
      const body = await request.json();
      const { messages, pathname } = body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: "Invalid request body" }), { 
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
        });
      }

      // 2. Perform Gemini LLM Chat completion
      const systemPrompt = BASE_SYSTEM_PROMPT.replace('{PATHNAME}', pathname || '/');
      const contents = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Group consecutive messages of same role (Gemini strict ordering rule)
      const cleanedContents = [];
      for (const msg of contents) {
        if (cleanedContents.length === 0 && msg.role !== 'user') continue;
        
        if (cleanedContents.length > 0) {
          const lastRole = cleanedContents[cleanedContents.length - 1].role;
          if (msg.role === lastRole) {
             cleanedContents[cleanedContents.length - 1].parts[0].text += '\n' + msg.parts[0].text;
             continue;
          }
        }
        cleanedContents.push(msg);
      }

      const payload = {
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: cleanedContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        }
      };

      const GEMINI_API_KEY = env.GOOGLE_AI_STUDIO_API_KEY || env.GEMINI_API_KEY;
      if (!GEMINI_API_KEY) {
        throw new Error("Missing Gemini API Key configuration.");
      }

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Gemini API Error:", errText);
        throw new Error(`Gemini API responded with status ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Parse custom formatting blocks
      const actionsMatch = replyText.match(/<actions>([\s\S]*?)<\/actions>/);
      let buttons = [];
      let cleanText = replyText;
      
      if (actionsMatch) {
        try {
          const parsed = JSON.parse(actionsMatch[1]);
          buttons = parsed.buttons || [];
          cleanText = replyText.replace(/<actions>[\s\S]*?<\/actions>/, "").trim();
        } catch (err) {
          console.error('Failed to parse actions block', err);
        }
      }

      const bookingMatch = replyText.match(/<booking>([\s\S]*?)<\/booking>/);
      let bookingData = null;

      if (bookingMatch) {
        try {
          bookingData = JSON.parse(bookingMatch[1]);
          cleanText = cleanText.replace(/<booking>[\s\S]*?<\/booking>/, "").trim();
        } catch (err) {
          console.error('Failed to parse booking block', err);
        }
      }

      // Check if LLM supplied lead details in response (name, email, phone)
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emailsFound = cleanText.match(emailRegex);
      
      // Auto-extract lead data from user input if not explicitly marked (fallback capture)
      let crmData = null;
      const latestUserMessage = messages[messages.length - 1]?.text || "";
      const latestEmails = latestUserMessage.match(emailRegex);

      if (latestEmails && latestEmails.length > 0) {
        // We found an email! Let's attempt to sync to database
        const parsedName = messages.find(m => m.role === 'user')?.text.substring(0, 30) || "Website Lead";
        crmData = {
          email: latestEmails[0],
          name: parsedName,
          source: 'ai_chat',
          createdAt: new Date().toISOString()
        };
      }

      // 3. Edge-Compatible Direct Write to Firestore REST API
      const FIREBASE_PROJECT_ID = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || env.FIREBASE_PROJECT_ID || "vforce-tax-modern";
      let leadSynced = false;

      if (crmData && crmData.email) {
        try {
          let headers = { 'Content-Type': 'application/json' };
          let firestoreUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/enquiries`;
          
          // Authentication Strategy Selection
          if (env.FIREBASE_SERVICE_ACCOUNT_EMAIL && env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY) {
            // Secure Production: Authenticate with Google OAuth2 Service Account
            const accessToken = await getGoogleAccessToken(
              env.FIREBASE_SERVICE_ACCOUNT_EMAIL,
              env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
            );
            headers['Authorization'] = `Bearer ${accessToken}`;
          } else if (env.NEXT_PUBLIC_FIREBASE_API_KEY || env.FIREBASE_API_KEY) {
            // Fallback: Authenticate via Web API Key Query Parameter (Public Write Security Rules)
            const apiKey = env.NEXT_PUBLIC_FIREBASE_API_KEY || env.FIREBASE_API_KEY;
            firestoreUrl += `?key=${apiKey}`;
          }

          const restPayload = {
            fields: {
              email: { stringValue: crmData.email },
              source: { stringValue: crmData.source },
              name: { stringValue: crmData.name || "Anonymous Lead" },
              createdAt: { stringValue: crmData.createdAt }
            }
          };

          const firestoreRes = await fetch(firestoreUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(restPayload)
          });

          if (firestoreRes.ok) {
            leadSynced = true;
          } else {
            console.error("Firestore REST API Error:", await firestoreRes.text());
          }
        } catch (dbErr) {
          console.error("Database direct edge sync failed:", dbErr.message || dbErr);
        }
      }

      return new Response(JSON.stringify({ 
        reply: cleanText, 
        buttons, 
        bookingData,
        hubspotId: leadSynced ? "synced_edge_firestore" : null // Return trigger for UI lead banner
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
      });

    } catch (err) {
      console.error('Worker Error:', err.message || err);
      return new Response(JSON.stringify({
        reply: "Sorry, I'm experiencing a brief network issue. Please call our Townsville office directly on 07 3473 5556.",
        buttons: []
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
      });
    }
  }
};
