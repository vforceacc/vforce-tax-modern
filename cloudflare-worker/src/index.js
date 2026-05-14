/**
 * Cloudflare Worker for V-Force Tax AI Proxy
 * 
 * This worker acts as a secure proxy between the frontend chat widget and the Google Gemini API.
 * It protects the GOOGLE_AI_STUDIO_API_KEY by keeping it server-side.
 */

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

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*", // Configure this to your specific domain in production
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const { messages, pathname } = await request.json();

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: "Invalid request body" }), { 
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }

      // Prepare history for Gemini REST API
      const systemPrompt = BASE_SYSTEM_PROMPT.replace('{PATHNAME}', pathname || '/');
      const contents = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Group consecutive messages of the same role (Gemini requires alternating roles)
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

      const API_KEY = env.GOOGLE_AI_STUDIO_API_KEY || env.GEMINI_API_KEY;
      
      if (!API_KEY) {
        throw new Error("Missing API Key");
      }

      const geminiUrl = \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=\${API_KEY}\`;
      
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Gemini API Error:", errorData);
        throw new Error(\`Gemini API responded with \${response.status}\`);
      }

      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Parse <actions>
      const actionsMatch = replyText.match(/<actions>([\\s\\S]*?)<\\/actions>/);
      let buttons = [];
      let cleanText = replyText;
      
      if (actionsMatch) {
        try {
          const parsed = JSON.parse(actionsMatch[1]);
          buttons = parsed.buttons || [];
          cleanText = replyText.replace(/<actions>[\\s\\S]*?<\\/actions>/, "").trim();
        } catch (err) {
          console.error('Failed to parse actions block', err);
        }
      }

      // Parse <crm>
      const crmMatch = replyText.match(/<crm>([\\s\\S]*?)<\\/crm>/);
      let crmData = null;

      if (crmMatch) {
        try {
          const parsedCrm = JSON.parse(crmMatch[1]);
          // Remove nulls
          crmData = Object.fromEntries(
            Object.entries(parsedCrm).filter(([_, v]) => v !== null && v !== "null")
          );
        } catch (err) {
          console.error('Failed to parse crm block', err);
        }
        cleanText = cleanText.replace(/<crm>[\\s\\S]*?<\\/crm>/, "").trim();
      }

      // Return the response back to the client. The client will handle writing crmData to Firestore.
      return new Response(JSON.stringify({ 
        reply: cleanText, 
        buttons, 
        crmData 
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });

    } catch (err) {
      console.error('Worker Error:', err.message || err);
      return new Response(JSON.stringify({
        reply: "Sorry, I'm experiencing a technical issue right now. Please call our Townsville office on 07 3473 5556.",
        buttons: []
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });
    }
  }
};
