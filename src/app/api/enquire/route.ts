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
      name,
      email,
      message: message || '',
      service: service || 'General Enquiry',
      source: source || 'Website',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[Enquire API] Error:', err.message || err);
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 });
  }
}
