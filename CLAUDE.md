# Beauty School Online

## Overview

Online beauty skills course platform aligned with the DofE Skills section. Built with Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui, Supabase (Auth + Postgres), and Stripe for payments.

## Architecture

- **Layout strategy:** Route groups `(public)`, `(portal)`, `(admin)` for clean separation
- **Auth:** Supabase Auth with `@supabase/ssr` cookie-based sessions
- **Data mutations:** Server Actions (except Stripe endpoints which use Route Handlers)
- **Forms:** react-hook-form + zod + shadcn Form component
- **Route protection:** Proxy (Next.js 16 `proxy.ts`) for session refresh + redirects; layout-level role checks for admin
- **Roles:** student (default), assessor, admin
- **Prices:** Stored as integers in pence (matches Stripe convention)

## Routes

### Public (`(public)/` route group — includes Header + Footer)

| Route | Page |
|---|---|
| `/` | Home (hero + features + course tiers + CTA) |
| `/courses` | Course packages with pricing and eligibility |
| `/courses/[courseSlug]` | Course detail (marketing or enrolled view) |
| `/how-it-works` | Step-by-step process + weekly structure |
| `/about` | Mission, approach, DofE alignment, safety |
| `/faq` | Accordion FAQ |
| `/contact` | Contact form (mailto) + email display |
| `/login` | Login form (Supabase Auth) |
| `/signup` | Registration form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/safeguarding` | Safeguarding policy |

### Portal (`(portal)/` route group — auth required)

| Route | Page |
|---|---|
| `/dashboard` | Enrolled courses overview |

### Course Section (auth + enrolment required)

| Route | Page |
|---|---|
| `/courses/[courseSlug]/sections/[sectionSlug]` | Section view (videos + quiz) |

### Admin (`(admin)/` route group — admin role required)

| Route | Page |
|---|---|
| `/admin` | Dashboard (stats cards) |
| `/admin/users` | User list |
| `/admin/users/[id]` | User detail + role management |
| `/admin/courses` | Course list |
| `/admin/courses/new` | Create course |
| `/admin/courses/[id]/edit` | Edit course + sections list |
| `/admin/courses/[id]/sections/new` | Add section |
| `/admin/courses/[id]/sections/[sectionId]/edit` | Edit section + quiz builder |
| `/admin/submissions` | Quiz submissions view |

### API Routes

| Route | Purpose |
|---|---|
| `/api/checkout` | Creates Stripe Checkout session |
| `/api/webhooks/stripe` | Stripe webhook (purchase + enrolment) |
| `/auth/callback` | Supabase auth callback |

### Other

| Route | Purpose |
|---|---|
| `/checkout/success` | Post-payment success page |
| `/checkout/cancel` | Payment cancelled page |

## Database Schema (Supabase Postgres)

9 tables — migrations in `supabase/migrations/`:

- **profiles** — extends auth.users (id, email, full_name, role)
- **courses** — title, slug, description, level, price_gbp, stripe_price_id, is_published, is_available_for_purchase
- **course_sections** — course_id, title, slug, section_number, learning_video_url, demo_video_url, is_published, sort_order
- **section_quiz_questions** — section_id, question_text, question_type, options, correct_answer
- **course_enrolments** — user_id, course_id, status (active/completed/cancelled)
- **section_progress** — user_id, section_id, status (locked/available/in_progress/quiz_completed/submitted/completed)
- **quiz_attempts** — user_id, section_id, is_complete, score
- **quiz_answers** — attempt_id, question_id, answer
- **course_purchases** — user_id, course_id, stripe_checkout_session_id, amount, status

Key triggers: auto-create profile on signup, auto-create section progress on enrolment, auto-update updated_at.

## Environment Variables

See `.env.local.example`. Required:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

## Key Directories

```
src/
  app/
    (public)/      — public marketing pages (Header + Footer)
    (portal)/      — learner portal (auth required)
    (admin)/       — admin panel (admin role required)
    api/           — API route handlers
    auth/          — auth callback
    checkout/      — payment success/cancel
  actions/         — server actions (auth, courses, quiz, progress)
    admin/         — admin-only server actions
  components/
    ui/            — shadcn/ui components
    auth/          — login/signup forms, user menu
    portal/        — portal components (course card, quiz form, etc.)
    admin/         — admin components (sidebar, forms, tables)
  config/          — site configuration
  lib/
    supabase/      — Supabase client (browser, server, middleware, admin)
    schemas/       — zod validation schemas
    types/         — TypeScript types (database, app types)
    stripe.ts      — Stripe server instance
    constants.ts   — role/status constants
    utils.ts       — cn() helper
supabase/
  migrations/      — SQL migration files
  seed.sql         — test data
public/            — static assets
```

## Site Config

`src/config/site.ts` — single source of truth for site name, description, email, legal entity.

## Design System

- Theme: Blush pink + off-white palette — CSS variables in `src/app/globals.css`
- Primary colour: `#f4cfd1` (blush pink)
- Background: `#fffbf9` (warm off-white)
- Font: Inter (Google Fonts)
- Components: shadcn/ui (New York style)
- Typography plugin: `@tailwindcss/typography` for legal page prose

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
