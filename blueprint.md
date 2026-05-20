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
*   **SEO/AEO Content:** Townsville-focused SEO blocks, FAQ section with structured data, and local business content targeting North Queensland tax agent searches.

## Architecture & Cloudflare Migration Strategy

### Frontend Hosting
*   Migrating from Firebase Hosting to **Cloudflare Pages** (Free Tier).
*   All Next.js App Router components and assets will be statically exported or deployed via Cloudflare adapters.

### Serverless AI Proxy (Cloudflare Worker)
*   Instead of calling Google AI Studio directly from the browser (or a Next.js server route on Firebase), we use a **Cloudflare Worker** (`cloudflare-worker/src/index.js`).
*   **Purpose:** Protect the `GOOGLE_AI_STUDIO_API_KEY` while allowing fast edge-based LLM inference.
*   **CORS:** The worker handles CORS to accept requests from the Cloudflare Pages frontend.

### Environment Variable Mapping

**Cloudflare Pages (Public Variables)**
These variables configure the Firebase client SDK for database access on the frontend.
*   `NEXT_PUBLIC_FIREBASE_API_KEY`
*   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
*   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
*   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
*   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
*   `NEXT_PUBLIC_FIREBASE_APP_ID`

**Cloudflare Worker (Secret Variables)**
These variables must be kept secure and should be added to the Cloudflare dashboard or via wrangler.
*   `GOOGLE_AI_STUDIO_API_KEY` (or `GEMINI_API_KEY`) -> *Must be set via `npx wrangler secret put GOOGLE_AI_STUDIO_API_KEY`*

### Components
*   `Navbar.tsx` & `Footer.tsx` — Global layout components (Light Theme).
*   `AiChatWidget.tsx` — Client-side AI chat interface sending requests to the Cloudflare Worker proxy.
*   `BookingsWidget.tsx` — Microsoft Bookings iframe wrapper.

## Current Plan: V-Force Corporate UI Migration & Cloudflare Prep

*   [x] 1. Resolve mobile navigation scroll bug (`h-[100dvh]`).
*   [x] 2. Implement Professional Corporate color palette (Navy, White, Charcoal, Emerald) in `tailwind.config.ts` and `globals.css`.
*   [x] 3. Refactor Global Components (`Navbar`, `Footer`) to Light Theme and replace logo with standard non-inverted version.
*   [x] 4. Refactor Core Pages (`page.tsx`, `about`, `contact`, `booking`) to Light Theme.
*   [x] 5. Refactor Dynamic Routes (`services`, `[category]/[service]`, `news`, `news/[slug]`) to Light Theme.
*   [x] 6. Refactor Legal Pages (`terms`, `privacy`) to Light Theme.
*   [x] 7. **Cloudflare Architecture:** Scaffold `cloudflare-worker` directory with `src/index.js` and `wrangler.toml` for the AI proxy.
*   [ ] 8. Update frontend AI chat widget (`src/components/AiChatWidget.tsx`) to point to the Cloudflare worker URL once deployed.
*   [ ] 9. Final QA testing across mobile and desktop.
*   [x] 10. Align contact page (`src/app/contact/page.tsx`) contact details with the footer (clickable phone link +61 7 3473 5556 and clickable email link contact@vforcetax.com.au).
*   [x] 11. Add new news article: $20,000 instant asset write-off (no dashes, Australian English).
