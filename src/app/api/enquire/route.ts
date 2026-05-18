import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin for writing to Firestore securely on the server
if (!admin.apps.length) {
  try {
    admin.initializeApp();
  } catch (e) {
    console.error("Firebase Admin initialization error:", e);
  }
}
const db = admin.firestore();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, service, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    await db.collection('enquiries').add({
      // Lead details for record-keeping in Firestore
      name,
      email,
      messageContent: message || '',
      service: service || 'General Enquiry',
      source: source || 'Website',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),

      // Firebase "Trigger Email" Extension compatible structure
      to: 'contact@vforcetax.com.au',
      message: {
        subject: `New Website Enquiry: ${service || 'General'} from ${name}`,
        text: `You have received a new website enquiry.\n\nName: ${name}\nEmail: ${email}\nService of Interest: ${service || 'General Enquiry'}\nSource: ${source || 'Website'}\n\nMessage:\n${message || 'No message provided.'}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #fff;">
            <h2 style="color: #0b1b3d; margin-top: 0; border-bottom: 2px solid #059669; padding-bottom: 12px; font-style: italic;">New Website Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a></p>
            <p><strong>Service of Interest:</strong> ${service || 'General Enquiry'}</p>
            <p><strong>Source:</strong> ${source || 'Website'}</p>
            
            <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
              <p style="margin-top: 0; font-weight: bold; color: #0b1b3d;">Message:</p>
              <p style="margin: 0; white-space: pre-wrap;">${message || 'No message provided.'}</p>
            </div>
          </div>
        `
      }
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[Enquire API] Error:', err.message || err);
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 });
  }
}
