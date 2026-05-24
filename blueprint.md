# V-Force Website Blueprint

## Overview

A modern, responsive, professional corporate website for V-Force Tax, a Townsville-based accounting firm. The site showcases their services, provides information about the company, features SEO-optimized insights, and offers a clear way for potential clients to get in touch.

## Design and Style (Professional Corporate Theme)

*   **Colors:** 
    *   **Primary Trust (Navy & Blue):** `vforce-navy` (#0B1B3D), `vforce-navy-blue` (#1A365D).
    *   **Professional Backgrounds (White/Light Gray):** `vforce-primary` (#FFFFFF), `vforce-secondary` (#F8FAFC).
    *   **Stability (Charcoal):** `vforce-charcoal` (#334155).
    *   **Growth (Emerald):** `vforce-emerald` (#059669).
*   **Fonts:** A clean, modern sans-serif font (Inter) for body text, with a more stylized, italicized font (Outfit) for headings.
*   **Layout:** The layout is clean, light, and spacious, focusing on high trust and readability for financial information. Fully responsive and mobile-friendly.

## Features

*   **Homepage:** A welcoming introduction to V-Force, with a clear value proposition, animated elements, and easy access to key sections of the site.
*   **About Page:** Information about the company, its mission, core values, and team.
*   **Services Pages:** Dynamic service pages with content, features lists, and enquiry forms for individual and business services.
*   **News & Insights:** A blog-style section featuring SEO and AEO optimized articles (e.g., Budget Tax Reforms) with strategic tax tips and contact hooks.
*   **Contact Page:** A detailed contact form with office location, phone, email, and hours.
*   **Header and Footer:** Consistent navigation and branding across all pages with dropdown menus and mobile responsiveness (fixed 100dvh overlay for mobile).
*   **AI Chat Widget:** A floating AI assistant powered by Gemini 2.5 Flash Lite, available on every page. Answers tax/accounting questions in Australian English, steers conversations toward booking consultations, and automatically captures leads.
*   **Microsoft Bookings Integration:** Working iframe-based booking widget for scheduling consultations.
*   **SEO/AEO Content:** Townsville-focused SEO blocks, FAQ section with structured data, and local business content targeting North Queensland tax agent searches.

## Architecture (Actual Deployed State)

### Hosting: Firebase App Hosting (Active)
The entire Next.js application runs on **Firebase App Hosting** (Cloud Run backend), deployed via the Firebase CLI. This is the live production environment.

### API Routes (Next.js — runs on Firebase App Hosting server)
These are the two active server-side endpoints. They run as part of the Next.js app on Firebase, NOT on Cloudflare.

*   **`/api/chat`** (`src/app/api/chat/route.ts`): Handles AI chat widget requests.
    *   Calls Google Gemini 2.5 Flash Lite via `@google/generative-ai` SDK.
    *   Protected by `GEMINI_API_KEY` (injected from Firebase Secret Manager via `apphosting.yaml`).
*   **`/api/enquire`** (`src/app/api/enquire/route.ts`): Handles contact/enquiry form submissions.
    *   Writes enquiry to Firestore (`contact` database, `enquiries` collection) using Firebase Admin SDK.
    *   Sends email notification to `contact@vforcetax.com.au` via Gmail SMTP (nodemailer).
    *   Uses `GMAIL_USER` and `GMAIL_APP_PASSWORD` secrets from Firebase Secret Manager.

### Firebase Firestore (Active)
*   **Database:** `contact` (named database, not `(default)`)
*   **Collection:** `enquiries`
*   Enquiry documents expire after 1 hour via `expireAt` TTL field.

### Cloudflare Worker (Legacy Scaffolding — NOT deployed/active)
The `worker/` and `cloudflare-worker/` directories contain earlier scaffolding for a Cloudflare-based migration that was never completed. These directories can be ignored. All functionality is handled by Firebase App Hosting.

### Environment Variables

**Local Dev (`.env.local` — never committed to Git)**
*   `GEMINI_API_KEY` — Google AI Studio key for Gemini API
*   `GMAIL_USER` — `vforceacc@gmail.com`
*   `GMAIL_APP_PASSWORD` — 16-char Google App Password

**Production (Firebase Secret Manager, referenced in `apphosting.yaml`)**
*   `GEMINI_API_KEY` → secret: `GEMINI_API_KEY`
*   `GMAIL_USER` → secret: `GMAIL_USER`
*   `GMAIL_APP_PASSWORD` → secret: `GMAIL_APP_PASSWORD`

### Components
*   `Navbar.tsx` & `Footer.tsx` — Global layout components (Light Theme).
*   `AiChatWidget.tsx` — Client-side AI chat interface. Calls `/api/chat` (Next.js route on Firebase).
*   `BookingsWidget.tsx` — Microsoft Bookings iframe wrapper.

## Deployment

### Deploy to Firebase App Hosting
```bash
npx -y firebase-tools@latest deploy --only apphosting
```

### Set Production Secrets (run once per secret)
```bash
npx -y firebase-tools@latest apphosting:secrets:set GEMINI_API_KEY
npx -y firebase-tools@latest apphosting:secrets:set GMAIL_USER
npx -y firebase-tools@latest apphosting:secrets:set GMAIL_APP_PASSWORD
```

## Current Status

*   [x] 1–12. All UI, routing, and feature work complete.
*   [x] 13. Enquiry email notifications via Gmail SMTP (nodemailer) — implemented, secrets need setting in Firebase.
*   [ ] 14. Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` secrets in Firebase Secret Manager for production.
*   [ ] 15. Deploy to production via `npx -y firebase-tools@latest deploy --only apphosting`.
