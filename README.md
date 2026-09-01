# Sacramento Dental Medicine

A clean, modern marketing site for Sacramento Dental Medicine in Antelope, CA —
a redesign of the practice's live site focused on trust, clarity, and getting
patients to book.

## Highlights

- **Dedicated scheduling page** — `/schedule` keeps the appointment journey
  focused and gives the multi-step scheduler room to work on every device. The
  wizard covers visit type → day & time of day → how we can reach you, and the
  front desk confirms a specific time.
- **Native lead capture** — a Server Action validates the request (name, plus a
  phone number or an email — at least one) and POSTs JSON to Formspree. Optional
  `LEAD_WEBHOOK_URL` is a second hop.
- **Deep review evidence** — a dedicated responsive reviews page based on all
  632 Google ratings and 428 written reviews, with a verified distribution,
  overlapping theme analysis, short attributed excerpts, and a link to the
  complete live Google archive.
- **Search and sharing system** — page-specific titles and descriptions,
  high-resolution favicon/app icons, and distinct 1200×630 Open Graph and X
  cards for Home, Reviews, and Schedule.
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
│   ├── layout.tsx        # fonts, metadata, OG/Twitter, canonical, theme-color
│   ├── page.tsx          # composes the sections + JSON-LD
│   ├── favicon.ico, icon.png, apple-icon.png
│   ├── opengraph-image.tsx, twitter-image.tsx
│   ├── reviews/           # review page + route-specific social cards
│   ├── schedule/          # dedicated appointment page + route metadata
│   ├── actions.ts        # 'use server' appointment-request handler
│   ├── sitemap.ts        # generated sitemap
│   ├── robots.ts         # generated robots.txt
│   └── globals.css        # design system (tokens, components, motion)
├── components/
│   ├── Scheduler.tsx     # multi-step scheduling wizard ('use client')
│   ├── Header.tsx, MobileCTA.tsx, SectionLabel.tsx, ScrollReveal.tsx
│   └── sections/         # page order: Hero, ReviewProof, TrustBand, Emergency,
│                          # Intro, Services, Technology, Doctors, Reviews,
│                          # NewPatients (+ FAQ), ScheduleCTA, Footer
├── data/site.ts          # copy, hours, services, visit types, reviews,
│                          # schema.org data, seo title/description
└── lib/
    ├── appointment.ts    # form state types + phone/email validation helpers
    ├── formspree.ts      # safe endpoint resolution + tested lead payload builder
    ├── social-image.tsx  # shared 1200×630 Home/Reviews/Schedule card renderer
    └── site-url.ts       # canonical/social origin resolver
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
insurance plans, or CareCredit. Do not add those claims without written
confirmation from the practice or a direct authoritative source.

The practice's Google Business Profile was checked directly on August 24, 2026:

- **4.8 stars** across **632 reviews**
- Rating distribution: 589 five-star, 16 four-star, 9 three-star, 4 two-star,
  and 14 one-star reviews
- 428 reviews included written feedback; the rest were rating-only

The review counts are a dated snapshot and should be re-checked before future
copy changes. The public reviews page uses aggregate analysis and short excerpts;
the complete, continuously updated review text remains on Google.
Confirm the active provider roster and Saturday appointment policy directly
with the practice before changing those facts.

## Configuration

A few production values still need periodic confirmation:

| What | Where | Notes |
| --- | --- | --- |
| Booking URL | `contact.bookingHref` | Currently `/schedule` (the dedicated on-site scheduler). Swap in the practice-specific Dentrix Ascend deep link when provided — the bare portal domain doesn't identify the practice. |
| Saturday availability | `officeHours` | The contact page says closed; confirm whether advance appointments are offered. |
| Reviews links | `socialProof` | The internal page lives at `/reviews`; the external link opens the verified Google Maps review panel. |

### Scheduler backend

The scheduler posts to the `requestAppointment` Server Action
(`src/app/actions.ts`), which validates the request and POSTs JSON to
**Formspree** (`https://formspree.io/f/xvkpdvyz`, overridable with
`FORMSPREE_ENDPOINT`). Shared validation lives in `src/lib/appointment.ts`.
The server independently validates the selected visit type, Sacramento-local
future business date, 40-day booking horizon, and exact office-hours window;
hidden browser fields are never treated as trusted input.

Required fields:

- **Name**
- **Phone or email** — at least one usable contact method. Filling both is
  fine; leaving both empty is not. Incomplete extras still error (short phone,
  malformed email).
- **Privacy confirmation** — visitors must acknowledge that the request contains
  no sensitive health, insurance, or payment information.

Confirm in the Formspree dashboard that **email is not marked required**. Empty
phone and email are omitted from the JSON payload so phone-only requests do not
400. The server forwards the current runtime host or origin when posting to
Formspree so production-domain restriction remains compatible without letting
preview or local traffic impersonate the live site automatically.
Formspree delivery has a bounded timeout. Optional: set
**`LEAD_WEBHOOK_URL`** for a non-blocking second hop after Formspree succeeds;
that optional delivery cannot reverse the accepted Formspree response.

After form or Formspree-account changes, run a controlled synthetic delivery
test and confirm it reaches the intended front desk. A successful on-site
“Request sent” only means Formspree accepted the POST — not that a visit is booked.

## Local development

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm test         # phone/email validation + review snapshot integrity
npm run build
npm run start    # serve the production build
```

## Deployment

The GitHub repository is connected to Vercel and deploys automatically:

- **Push to `main`** → production deploy.
- Pull requests → preview deploys.

The public production domain is
[sacramentodentalmedicine.com](https://sacramentodentalmedicine.com/), served by
the Vercel project `sacramento-dental-medicine-redesign`. Canonical, sitemap,
robots, and social metadata resolve to that domain. A release is complete only
after the Git-linked deployment is Ready and the public domain serves the
intended commit.

### Metadata

Title, meta description, and social copy live in `seo` (`src/data/site.ts`) and
the Reviews and Schedule route metadata. Favicon and app-icon files are
generated from the canonical practice mark by `scripts/generate-seo-assets.py`.
Home, Reviews, and Schedule use route-specific Open Graph and X images generated
by Next.js from `src/lib/social-image.tsx`. `metadataBase` uses the live custom
domain so canonical and social-image URLs remain stable across deployments.

The icon generator produces a multi-frame 16/32/48px `favicon.ico`, a 512px
`icon.png`, and a 180px Apple touch icon. Run it only after the canonical
practice mark or icon treatment changes:

```bash
python3 scripts/generate-seo-assets.py
```

See [`docs/metadata.md`](docs/metadata.md) for the current metadata inventory,
maintenance workflow, and production verification checklist.

See [`docs/production-readiness.md`](docs/production-readiness.md) for the
browser, booking, accessibility, responsive, and release gates used before a
production handoff.

See [`docs/analytics-search.md`](docs/analytics-search.md) for the privacy-safe
GA4 route boundary, optional Vercel Analytics boundary, and Search Console
access gates.

See [`design-qa.md`](design-qa.md) for the August 25, 2026 multi-device audit,
fixed-issue history, browser evidence, and final release-gate result.

## Design

Visual system lives in `src/app/globals.css`. Do not invent a second palette.

- **Brand as atmosphere, navy as action.** Mid periwinkle (`--brand` `#6a8ece`) is for tints and dark-band accents. It fails WCAG AA on white — body type and pills use `--brand-deep` / `--brand-ink`. Ember is reserved for the emergency path.
- **One night band per page.** Home uses a compact scheduling invitation; `/schedule` uses the night treatment around the focused form. Technology stays on the light canvas.
- **Primary Book pills** live in the header, hero, scheduling invitation, footer, and mobile CTA bar. Every one routes to `/schedule`; other sections use text links.
- **Scheduler honesty.** Patients pick a day and a morning / afternoon / evening window. Copy says the front desk will reach out to confirm a specific time.

## Assets still needed

Hero, waiting-lounge, and still-life frames are atmospheric stand-ins — they are
**not** photographs of 4320 Elverta Rd. Alt text says so. For maximum trust,
replace them with a practice shoot (operatory, waiting room, team, The Wand /
CBCT) and keep the doctor portraits, which are already the practice's own photos
under `public/images/`. The header mark is a knockout of the practice logo
(navy + periwinkle on a tint tile); the footer uses the full lockup on dark.
