# ProTechnology Limited Platform

Next.js (App Router) + TypeScript + Tailwind + Supabase (Postgres/Auth) + Paystack.

## Verification status (read first)
The build environment had **no network access**, so `npm install`, `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` have **NOT been run**.
The only check performed was an offline TypeScript *syntax* scan (it found and fixed one bug; 0 syntax errors remain). Type errors, test failures or build errors may still exist. Run the commands below first and fix what they report.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local`; fill in Supabase, Paystack (test keys) and `NEXT_PUBLIC_APP_URL`.
3. In Supabase SQL editor run `supabase/migrations/0001_core_schema.sql`, then `supabase/seed.sql`.
4. In Supabase Auth settings: enable email confirmation; add `<APP_URL>/auth/callback` to Redirect URLs.
5. Make your first admin in the SQL editor (never from the app):
   `insert into user_roles (user_id, role) values ('<auth user uuid>', 'admin');`
6. `npm run lint && npm run typecheck && npm test && npm run build`, then `npm run dev`.

## Paystack
Register webhook URL `<APP_URL>/api/webhooks/paystack`. Use test keys only until verified end to end.
Paystack primarily settles in NGN; confirm USD/international support for your account before relying on the USD plan prices.

## What is implemented
- Design system, responsive nav (no-JS mobile menu), footer, metadata, sitemap, robots, security headers.
- Public pages: home, about, services (7 detail pages), pricing (DB-driven, falls back to flagged examples), products (labelled samples, search/filter), Nexus AI, investors, contact, privacy/terms placeholders.
- Enquiry API: Zod validation, honeypot, basic rate limit, saved to `enquiries`.
- Auth: register, login, email verification callback, forgot/reset password, sign-out, middleware + server-side `requireRole`.
- Customer dashboard: overview, subscriptions, billing (RLS-scoped).
- Admin: overview metrics from the database, enquiry management with audit log.
- Payments: Paystack provider, signed idempotent webhook, verified-only activation.
- DB: schema, RLS, seed. Tests written for validation and webhook signature.

## NOT implemented yet
Checkout initiation UI and the cancel/upgrade controls; renewal/failed-payment/cancellation webhook events (only `charge.success` is handled); marketplace purchase and signed downloads (tables for products, orders, assets not yet migrated); projects, support tickets, notifications and their dashboards; admin CRUD for plans, services, products, customers; transactional email (Resend) and templates; AI integration layer; browser and RLS integration tests; real legal text; official logo.

## Known limitations
- The enquiry rate limiter is per server instance. Use a shared store for production.
- Subscription period end is a fixed one-month placeholder in the webhook until plan intervals are wired in.
- Email verification and password reset depend on Supabase email settings (default SMTP is rate limited; configure custom SMTP for production).
