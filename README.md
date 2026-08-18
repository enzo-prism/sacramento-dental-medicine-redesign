# Sacramento Dental Medicine

A clean, modern marketing site for Sacramento Dental Medicine in Antelope, CA —
a redesign of the practice's live site focused on trust, clarity, and getting
patients to book.

## Highlights

- **Multi-step scheduler** — a mobile-first wizard (visit type → day & time of
  day → details). Windows are morning / afternoon / evening inside office hours,
  not 30-minute slots that look like live inventory. The front desk confirms a
  specific time.
- **Native lead capture** — submissions flow through a Server Action with
  validation and a spam honeypot; a delivery seam is ready for email/CRM.
- **Source-backed social proof** — patient review excerpts published by the
  practice, without displaying an unverified rating.
- **Dedicated emergency path** — a distinct "in pain? call now" band for
  high-intent visitors.
- **New-patient info** — coverage questions, payment options, what to bring,
  first-visit expectations, and the FAQ, all in one chapter.
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
│   ├── Header.tsx, MobileCTA.tsx, SectionLabel.tsx, ScrollReveal.tsx
│   └── sections/         # page order: Hero, TrustBand, Emergency, Intro,
│                          # Services, Technology, Doctors, Reviews,
│                          # NewPatients (+ FAQ), Visit, Footer
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
- The public website profiles **Michael Narodovich, DMD** and
  **Lucas L. Sheppard, DMD**
- The practice is accepting new patients and offers emergency dental care;
  same-day emergency visits are offered when possible, not guaranteed

Primary sources: the practice's [contact page](https://sacramentodentalmedicine.com/contact-us/),
[services page](https://sacramentodentalmedicine.com/our-services/),
[appointments page](https://sacramentodentalmedicine.com/appointments/), and
[emergency guidance](https://sacramentodentalmedicine.com/dental-emergencies/).

The current public website does not confirm a front-desk email, accepted
insurance plans, CareCredit, or an exact Google rating. Do not add those claims
without written confirmation from the practice or a direct authoritative source.
Confirm the active provider roster and Saturday appointment policy directly
with the practice before the final domain cutover.

## Configuration

A few production values still need configuration or final confirmation:

| What | Where | Notes |
| --- | --- | --- |
| Booking URL | `contact.bookingHref` | Currently `#visit` (the on-site scheduler). Swap in the practice-specific Dentrix Ascend deep link when provided — the bare portal domain doesn't identify the practice. |
| Saturday availability | `officeHours` | The contact page says closed; confirm whether advance appointments are offered. |
| Reviews links | `socialProof` | "More reviews" points to the practice's Google Maps listing. Swap in the practice's canonical Google Business review link if they have one. |

### Scheduler backend

The scheduler posts to the `requestAppointment` Server Action
(`src/app/actions.ts`), which validates the request and then calls a delivery
seam. To deliver leads in production, set **`LEAD_WEBHOOK_URL`** (Vercel →
Project → Environment Variables) to a webhook that receives the JSON payload, or
swap in an email send (e.g. Resend). Until configured, submissions are only
logged server-side and are **not** reliably delivered to the practice. See
[`.env.example`](.env.example) for the variable. Do not publicly launch the form
until a controlled test submission is received successfully by the front desk.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start    # serve the production build
```

## Deployment

The GitHub repository is connected to Vercel and deploys automatically:

- **Push to `main`** → production deploy.
- Pull requests → preview deploys.

Vercel production currently runs at
[sacramento-dental-medicine-redesign.vercel.app](https://sacramento-dental-medicine-redesign.vercel.app).
The custom domain `sacramentodentalmedicine.com` is not yet attached to this
Vercel project, so a successful production deployment does not replace the
current public website. Attach and verify the custom domain, DNS, and HTTPS only
after the booking link and lead delivery are ready.

## Design

Visual system lives in `src/app/globals.css`. Do not invent a second palette.

- **Brand as atmosphere, navy as action.** Mid periwinkle (`--brand` `#6a8ece`) is for tints and dark-band accents. It fails WCAG AA on white — body type and pills use `--brand-deep` / `--brand-ink`. Ember is reserved for the emergency path.
- **One night band.** Only the Visit / scheduler chapter uses `--night`. Technology stays on the light canvas.
- **Primary Book pills** live in the header, hero, Visit scheduler, footer, and mobile CTA bar. Other sections use text links.
- **Scheduler honesty.** Patients pick a day and a morning / afternoon / evening window. Copy says the front desk will confirm a specific time.

## Assets still needed

Hero, waiting-lounge, and still-life frames are atmospheric stand-ins — they are
**not** photographs of 4320 Elverta Rd. Alt text says so. For maximum trust,
replace them with a practice shoot (operatory, waiting room, team, The Wand /
CBCT) and keep the doctor portraits, which are already the practice's own photos
under `public/images/`. The header mark is a knockout of the practice logo
(navy + periwinkle on a tint tile); the footer uses the full lockup on dark.
