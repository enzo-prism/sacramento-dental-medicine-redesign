<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sacramento Dental Medicine

Marketing site redesign for Sacramento Dental Medicine (Antelope, CA) — Dr. Michael Narodovich and Dr. Lucas L. Sheppard. Next.js 16 App Router, React 19, Tailwind v4, npm.

This site is live at https://sacramentodentalmedicine.com/ in Vercel project `sacramento-dental-medicine-redesign`.

Sibling practice site: `enzo-prism/waikiki-dental`. Do not mix copy, phone numbers, hours, doctors, or brand tokens between the two.

## Source of truth

- Content, hours, services, doctors, reviews, schema: `src/data/site.ts`
- Design tokens: `src/app/globals.css`
- Booking CTAs: `contact.bookingHref` (Jarvis) via `src/components/BookingLink.tsx`
- Home title, description, and social copy: `seo` in `src/data/site.ts`
- Reviews metadata: `src/app/reviews/page.tsx` (derived from `socialProof`)
- Social-card layout: `src/lib/social-image.tsx`
- Favicon and app-icon generator: `scripts/generate-seo-assets.py`
- Canonical / OG origin: `src/lib/site-url.ts` (public production domain by default)

Do not invent insurance lists, CareCredit, or extra mailboxes. The verified
front-desk email is `office@sacramentodentalmedicine.com` (`contact.email`).
The Google rating and review counts are a dated snapshot in `socialProof`;
re-check the live Business Profile before changing them. Do not claim same-day
emergency visits are guaranteed.

## Metadata and social sharing

- Home and Reviews have separate title, description, Open Graph, and X copy.
- Home social images live at `src/app/opengraph-image.tsx` and
  `src/app/twitter-image.tsx`; Reviews overrides them inside
  `src/app/reviews/`.
- Keep social images at 1200×630 and preserve explicit alt text, width, height,
  and `image/png` metadata.
- Social cards must use the existing mark, palette, contact data, and verified
  review snapshot. Do not add unverified ratings or generic stock-office claims.
- Regenerate `favicon.ico`, `icon.png`, and `apple-icon.png` with
  `python3 scripts/generate-seo-assets.py`. The script must read the canonical
  `public/images/logo-mark.png`, never a previously generated icon.
- A successful build is not production verification. After `main` deploys,
  read back the live Home and Reviews `<head>` tags and confirm every icon,
  Open Graph, and X image endpoint returns 200 with the expected content type.

## Booking

Every booking CTA opens Dr. Narodovich's Jarvis scheduler in a new tab
(`contact.bookingHref`). Jarvis sends `X-Frame-Options: SAMEORIGIN`, so do not
iframe it. `/schedule` stays live for old links and SEO; it points to Jarvis
plus the office phone. Do not restore the removed Formspree appointment form.

## Commands

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm test
npm run build
python3 scripts/generate-seo-assets.py  # only after changing the practice mark or icon treatment
```

## Cursor Cloud specific instructions

- Install is `npm ci`. Dev server is already started in the `dev` terminal on port 3000.
- After UI or content changes, run `npm run lint`, `npm test`, and `npm run build`. Open http://localhost:3000 and click through Home, `/schedule`, Emergency, Doctors, and New Patients (FAQ lives there).
- Booking CTAs (Book online, Schedule, Request an appointment, Become a patient) open Jarvis in a new tab. Confirm they use `BookingLink` / `contact.bookingHref`.
- Preserve `sacramentodentalmedicine.com` as the canonical production domain and verify it after every release.
- Positioning: grow new-patient volume via search, phone, and simple online booking. Keep booking friction low.
- Design: tokens in `src/app/globals.css` only. Periwinkle is atmosphere; navy is action. Ember is emergencies. Keep a single night band (Visit). Primary Book pills: header, hero, Visit, footer, mobile bar.
- Hero / waiting / still-life images are atmospheric stand-ins, not the Elverta office. Do not write alt text or copy that claims they are the practice's rooms.
- `officePhotos` in `src/data/site.ts` are real Elverta Road interiors and the storefront (`/images/office-*.webp`). Keep those alts honest (office rooms, not patients).
- Do not add Formspree or `LEAD_WEBHOOK_URL` back unless an explicit rollback is requested.
