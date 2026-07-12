# Sacramento Dental Medicine

A clean, modern marketing site for Sacramento Dental Medicine in Antelope, CA —
a redesign of the practice's live site focused on trust, clarity, and getting
patients to book.

## Highlights

- **Multi-step scheduler** — a mobile-first wizard (visit type → date & time →
  details) that generates real time slots from the practice's office hours.
- **Native lead capture** — submissions flow through a Server Action with
  validation and a spam honeypot; a delivery seam is ready for email/CRM.
- **Source-backed social proof** — patient review excerpts published by the
  practice, without displaying an unverified rating.
- **Dedicated emergency path** — a distinct "in pain? call now" band for
  high-intent visitors.
- **New-patient info** — coverage questions, payment options, what to bring,
  and first-visit expectations, all in one place.
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
│   └── sections/         # page order: Hero, TrustBand, Emergency, Intro,
│                          # Services, Technology, Doctors, Reviews,
│                          # NewPatients, Visit (+ nested FAQ), Footer
├── data/site.ts          # single source of truth: copy, hours, services,
│                          # visit types, reviews, schema.org data
└── lib/appointment.ts    # shared form state types (kept out of the server file)
```

All site copy and configuration live in **`src/data/site.ts`** — edit content
there without touching components.

## Verified practice information

The public-facing facts were checked against the practice's current website on
July 12, 2026:

- Phone: **(916) 727-6453**
- Address: **4320 Elverta Rd #3, Antelope, CA 95843**
- Hours: Monday 9–6, Tuesday 8–5, Wednesday 10–7, Thursday 11–7,
  Friday 8–2, Saturday–Sunday closed
- Doctors: **Michael Narodovich, DMD** and **Lucas L. Sheppard, DMD**
- The practice is accepting new patients and offers emergency dental care;
  same-day emergency visits are offered when possible, not guaranteed

Primary sources: the practice's [contact page](https://sacramentodentalmedicine.com/contact-us/),
[services page](https://sacramentodentalmedicine.com/our-services/),
[appointments page](https://sacramentodentalmedicine.com/appointments/), and
[emergency guidance](https://sacramentodentalmedicine.com/dental-emergencies/).

The current public website does not confirm a front-desk email, accepted
insurance plans, CareCredit, or an exact Google rating. Do not add those claims
without written confirmation from the practice or a direct authoritative source.

## Configuration

A few production values still need configuration:

| What | Where | Notes |
| --- | --- | --- |
| Booking URL | `contact.bookingHref` | Replace the bare Dentrix domain with the practice-specific deep link. |
| Office hours | `officeHours` | Drives the scheduler's available slots (24h minutes, `0`=Sunday). |

### Scheduler backend

The scheduler posts to the `requestAppointment` Server Action
(`src/app/actions.ts`), which validates the request and then calls a delivery
seam. To deliver leads in production, set **`LEAD_WEBHOOK_URL`** (Vercel →
Project → Environment Variables) to a webhook that receives the JSON payload, or
swap in an email send (e.g. Resend). Until configured, leads are logged
server-side so none are lost. See [`.env.example`](.env.example) for the
variable.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start    # serve the production build
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
