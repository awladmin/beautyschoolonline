# Beauty School Online

## Overview

Public marketing website for Beauty School Online — an online beauty skills course platform designed to align with the DofE Skills section. Built with Next.js 15 (App Router), Tailwind CSS v4, and shadcn/ui.

## Routes

| Route | Page |
|---|---|
| `/` | Home (hero + features + course tiers + CTA) |
| `/courses` | Course packages with pricing and eligibility |
| `/how-it-works` | Step-by-step process + weekly structure |
| `/about` | Mission, approach, DofE alignment, safety |
| `/faq` | Accordion FAQ |
| `/contact` | Contact form (mailto) + email display |
| `/login` | Placeholder — portal coming soon |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/safeguarding` | Safeguarding policy |

## Branding Assets

- Logo: `public/logo.png` (source: `branding/bso-logo.png`)
- Favicons: `public/favicon.ico`, `public/favicon.svg`, `public/favicon-96x96.png`
- Apple touch icon: `public/apple-touch-icon.png`
- Web manifest: `public/site.webmanifest`
- Manifest icons: `public/web-app-manifest-192x192.png`, `public/web-app-manifest-512x512.png`
- Hero image: `public/heros/hero1.png`
- Favicon also placed at `src/app/favicon.ico` (Next.js convention)

## Metadata

Defined in `src/app/layout.tsx` using Next.js `Metadata` export. Includes:
- Title template, description, favicon/icon references
- `metadataBase` for OG URL resolution
- Open Graph and Twitter card metadata

Individual pages export their own `metadata` for title/description overrides.

## Site Config

`src/config/site.ts` — single source of truth for:
- `name` — site display name
- `description` — default SEO description
- `url` — production URL (used for metadataBase, OG)
- `supportEmail` — contact email used across site
- `legalEntityName` — legal name for footer/legal pages

To change the email or site name, edit this file.

## Key Directories

```
src/
  app/           — pages and layouts (App Router)
  components/    — shared components (header, footer)
  components/ui/ — shadcn/ui components
  config/        — site configuration
  lib/           — utilities (cn helper)
public/          — static assets (logo, favicons, hero images)
branding/        — source branding files (not served)
```

## Design System

- Theme: Blush rose pink palette defined as CSS variables in `src/app/globals.css`
- Primary colour: `#c47d6a` (warm rose)
- Font: Inter (Google Fonts)
- Components: shadcn/ui (button, card, accordion, input, textarea, sheet, badge, separator, label)
- Typography plugin: `@tailwindcss/typography` for legal page prose

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

## Future: Learner Portal (Phase 2)

Notes for the portal phase:
- Roles: learner, assessor, admin
- Auth: TBD (likely Next Auth or Clerk)
- Features: course enrolment, video delivery, evidence upload, assessor feedback, progress tracking, completion reports
- The `/login` page is a placeholder ready to be wired up
- Consider gating routes under `/portal/` or `/dashboard/`
