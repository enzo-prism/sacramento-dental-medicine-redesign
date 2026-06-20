# Sacramento Dental Medicine

A clean, modern marketing site for Sacramento Dental Medicine in Antelope, CA —
a redesign of the practice's live site focused on trust, clarity, and getting
patients to book.

## Highlights

- **Multi-step scheduler** — a mobile-first wizard (visit type → date & time →
  details) that generates real time slots from the practice's office hours.
- **Native lead capture** — submissions flow through a Server Action with
  validation and a spam honeypot; a delivery seam is ready for email/CRM.
- **Verifiable social proof** — Google rating + per-review attribution that
  links to the live profile, instead of unsourced claims.
- **Dedicated emergency path** — a distinct "in pain? call now" band for
  high-intent visitors.
- **New-patient info** — insurance, financing, what to bring, and first-visit
  expectations, all in one place.
- **SEO & a11y** — `Dentist` + `FAQPage` JSON-LD (XSS-sanitized), `sitemap.ts`,
  `robots.ts`, canonical URL, reduced-motion support, and keyboard-accessible
  controls.

## Tech

- Next.js App Router (16.x) + React 19
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first design tokens in `src/app/globals.css`)
- `lucide-react` icons
- Deployed on Vercel

> **Note:** This repo uses a modified build of Next.js. Read the relevant guide
> in `node_modules/next/dist/docs/` before changing framework-level code (see
> `AGENTS.md`).

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, metadata, OG/Twitter, canonical
│   ├── page.tsx          # composes the sections + JSON-LD
│   ├── actions.ts        # 'use server' appointment-request handler
│   ├── sitemap.ts        # generated sitemap
│   ├── robots.ts         # generated robots.txt
│   └── globals.css        # design system (tokens, components, motion)
├── components/
│   ├── Scheduler.tsx     # multi-step scheduling wizard ('use client')
│   ├── Header.tsx, MobileCTA.tsx, Marquee.tsx, SectionLabel.tsx, ScrollReveal.tsx
│   └── sections/         # Hero, TrustBand, Emergency, Intro, Services,
│                          # Technology, Doctors, Reviews, NewPatients, Visit, Footer
├── data/site.ts          # single source of truth: copy, hours, services,
│                          # visit types, reviews, schema.org data
└── lib/appointment.ts    # shared form state types (kept out of the server file)
```

All site copy and configuration live in **`src/data/site.ts`** — edit content
there without touching components.

## Configuration

A few values in `src/data/site.ts` should be confirmed before launch (marked
with `TODO`):

| What | Where | Notes |
| --- | --- | --- |
| Booking URL | `contact.bookingHref` | Replace the bare Dentrix domain with the practice-specific deep link. |
| Google reviews | `socialProof.reviewsUrl` / `rating` | Point at the live Google Business Profile and confirm the rating. |
| Office inbox | `contact.email` | Confirm the front-desk email. |
| Office hours | `officeHours` | Drives the scheduler's available slots (24h minutes, `0`=Sunday). |

### Scheduler backend

The scheduler posts to the `requestAppointment` Server Action
(`src/app/actions.ts`), which validates the request and then calls a delivery
seam. To deliver leads in production, set **`LEAD_WEBHOOK_URL`** (Vercel →
Project → Environment Variables) to a webhook that receives the JSON payload, or
swap in an email send (e.g. Resend). Until configured, leads are logged
server-side so none are lost.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Deployment

The project is linked to Vercel and deploys automatically:

- **Push to `main`** → production deploy.
- Pull requests → preview deploys.

## Assets still needed

The hero/care images are abstract placeholders. For maximum trust, replace them
with real photography (team, office, patients) and add a before/after smile
gallery — the doctor portraits are already real and self-hosted under
`public/images/`.
