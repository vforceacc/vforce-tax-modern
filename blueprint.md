
# V-Force Website Blueprint

## Overview

A modern, responsive website for V-Force, a Townsville-based accounting firm. The site will showcase their services, provide information about the company, and offer a clear way for potential clients to get in touch.

## Design and Style

*   **Colors:** The primary color scheme will be navy and white, with green accents for calls to action and important highlights.
*   **Fonts:** A clean, modern sans-serif font will be used for body text, with a more stylized, italicized font for headings.
*   **Layout:** The layout will be clean and spacious, with a focus on readability and user experience. It will be fully responsive, adapting to different screen sizes.

## Features

*   **Homepage:** A welcoming introduction to V-Force, with a clear value proposition, animated profit graph, and easy access to key sections of the site.
*   **About Page:** Information about the company, its mission, core values, and team.
*   **Services Pages:** Dynamic service pages with content, features lists, and enquiry forms for individual and business services.
*   **News & Insights:** A blog-style section featuring SEO and AEO optimized articles (e.g., Budget Tax Reforms) with strategic tax tips and contact hooks.
*   **Contact Page:** A detailed contact form with office location, phone, email, and hours.
*   **Header and Footer:** Consistent navigation and branding across all pages with dropdown menus and mobile responsiveness.
*   **AI Chat Widget (HubSpot CRM Bot):** A floating AI assistant powered by Gemini, available on every page. Answers tax/accounting questions in Australian English, steers conversations toward booking consultations, and automatically captures leads (Name, Email, Phone) to forward to HubSpot CRM.
*   **SEO/AEO Content:** Townsville-focused SEO blocks, FAQ section with structured data, and local business content targeting North Queensland tax agent searches.
*   **Mouse Glow Effect:** Subtle green radial glow following the cursor for premium feel.

## Architecture

### Components
*   `Navbar.tsx` — Fixed header with desktop dropdowns and mobile drawer
*   `Footer.tsx` — Site-wide footer with navigation links
*   `MouseGlow.tsx` — Client-side cursor-following glow effect
*   `AiChatWidget.tsx` — Floating AI chat assistant with Gemini integration and HubSpot lead capture

### Pages/Routes
*   `/news` — News index page with article grid
*   `/news/[slug]` — Individual SEO/AEO optimized article pages

### API Routes
*   `POST /api/chat` — Server-side proxy to Gemini API with HubSpot CRM lead forwarding

### Environment Variables
*   `GEMINI_API_KEY` — Google Gemini API key for the chatbot
*   `HUBSPOT_ACCESS_TOKEN` — HubSpot Private App token for CRM contact creation

## Current Plan

*   [x] Implement AI Chat Widget component matching VForce brand
*   [x] Create server-side `/api/chat` API route (Gemini proxy + HubSpot CRM)
*   [x] Add chat widget globally via root layout
*   [x] Add CSS animations for chat widget entrance
*   [x] Create `.env.local` template for API keys
*   [x] Preserve all existing SEO/AEO content for Townsville tax agents
*   [x] Implement Dynamic SEO Metadata for all service routes
*   [x] Build verification — all pages compile and render correctly
*   [x] Configure production Gemini API key in `.env.local`
*   [x] Create HubSpot **Private App** (not CLI project) and add Access Token to `.env.local`

### Back to Basics: Rebuilding the Chat Widget
*   [ ] Install the official `@google/generative-ai` SDK via npm.
*   [ ] Rewrite `/api/chat/route.ts` to use `GoogleGenerativeAI` and `startChat()` method for robust conversational history handling.
*   [ ] Rewrite `<AiChatWidget />` state management to match the correct message payload format expected by the backend.
*   [ ] Verify the `apphosting.yaml` correctly exposes `GEMINI_API_KEY` without requiring complex Secret Manager setups that caused the previous 404/API errors on Firebase.
*   [ ] Commit and push the rebuilt application.
*   [ ] Request the user to monitor Firebase App Hosting for a successful deployment.

### How to get your HubSpot Access Token
You do **not** need the HubSpot CLI for this.
1. Go to **Settings > Integrations > Private Apps** in HubSpot.
2. Create an app named "VForce Website Bot".
3. Add Scopes: `crm.objects.contacts.read` & `crm.objects.contacts.write`.
4. Copy the **Access Token** into your `.env.local`.
