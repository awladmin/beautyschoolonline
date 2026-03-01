# Development Setup Guide

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) account and project
- A [Stripe](https://stripe.com) account (test mode)

## 1. Clone and Install

```bash
git clone <repo-url>
cd beautyschoolonline
npm install
```

## 2. Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role key (keep secret!) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys → Secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API keys → Publishable key |
| `STRIPE_WEBHOOK_SECRET` | Generated when setting up Stripe webhook (see step 5) |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` for local dev |

## 3. Database Setup

Run the SQL migrations in your Supabase project (SQL Editor → New query):

1. `supabase/migrations/00001_initial_schema.sql` — creates all tables
2. `supabase/migrations/00002_rls_policies.sql` — row-level security policies
3. `supabase/migrations/00003_functions.sql` — triggers (auto-profile, auto-progress, auto-updated_at)

Then optionally seed test data:

4. `supabase/seed.sql` — sample courses, sections, and quiz questions

## 4. Supabase Auth Settings

In your Supabase Dashboard → Authentication → URL Configuration:

- Set **Site URL** to `http://localhost:3000`
- Add `http://localhost:3000/auth/callback` to **Redirect URLs**

## 5. Stripe Webhook (Local Testing)

Install the Stripe CLI: https://stripe.com/docs/stripe-cli

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret (`whsec_...`) into your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

## 6. Run the Dev Server

```bash
npm run dev
```

Visit http://localhost:3000

## Creating an Admin User

1. Sign up via the `/signup` page
2. In Supabase SQL Editor, run:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
3. Log out and back in — you'll see the Admin Panel option in the user menu

## Key Testing Flows

- **Signup** → check email → confirm → redirected to dashboard
- **Login** → dashboard shows enrolled courses
- **Browse** `/courses/[slug]` → see marketing view → "Buy Now" → Stripe Checkout
- **Stripe webhook** fires → purchase + enrolment created → section progress initialized
- **Section view** → watch videos → complete quiz → next section unlocked
- **Admin** `/admin` → manage courses, sections, quiz questions, view users and submissions

## Production Deployment Checklist (Vercel)

- [ ] Add all env vars in Vercel > Settings > Environment Variables (see table in step 2)
- [ ] Set `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Create a Stripe webhook endpoint in Stripe Dashboard pointing to `https://yourdomain.com/api/webhooks/stripe` and use that secret for `STRIPE_WEBHOOK_SECRET`
- [ ] Switch Stripe from test to live keys
- [ ] Update Supabase Auth redirect URLs to include production domain

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run start` | Start production server |
