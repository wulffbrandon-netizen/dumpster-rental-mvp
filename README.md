# OC Bin Broker MVP

Production-style MVP lead-generation app for Orange County dumpster rental brokerage.

## Stack
- Next.js App Router + TypeScript + Tailwind CSS
- Supabase (Postgres/auth/storage ready)
- Resend email notifications
- Stripe-ready env scaffolding
- Twilio-ready mock SMS service
- Vercel-friendly structure

## Features
- Modern homepage with service trust messaging and local area sections
- Multi-field quote flow + thank-you estimate state
- Lead creation into Supabase with default `New` status
- Customer + admin email notifications
- Mock SMS send hook
- Auth-protected lightweight CRM admin dashboard
  - Lead list and detail updates
  - Status workflow, pricing, costs, margin tracking
  - Partner assignment, notes, payment status
  - CSV export
- Admin partner hauler management CRUD (create/list)
- Local SEO city landing pages with unique metadata and FAQ schema
- Compliance placeholders embedded in local/city copy

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill all required keys (Supabase required; Resend/Stripe optional).
4. Run SQL migration and seed in Supabase SQL editor:
   - `supabase/migrations/001_init.sql`
   - `supabase/seed/seed.sql`
5. Start dev server:
   ```bash
   npm run dev
   ```

## Key env notes
- `SUPABASE_SERVICE_ROLE_KEY`: required for server-side lead/admin writes.
- `ADMIN_DASHBOARD_TOKEN`: shared-secret gate for `/admin/login`.
- `RESEND_API_KEY` + `EMAIL_FROM`: enables transactional email.
- `STRIPE_SECRET_KEY`: reserved for deposit/payment flow extensions.

## Next extensions
- Replace token auth with Supabase Auth + RLS policies.
- Implement real file uploads to Supabase Storage in quote form.
- Add partner-hauler outreach email from lead detail.
- Add Stripe Checkout/payment-link flow and webhook updates.
- Replace SMS mock with Twilio API implementation.
