<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sacramento Dental Medicine

Marketing site redesign for Sacramento Dental Medicine (Antelope, CA) — Dr. Michael Narodovich and Dr. Lucas L. Sheppard. Next.js 16 App Router, React 19, Tailwind v4, npm.

This is a **new site** (not live on `sacramentodentalmedicine.com` yet). Production preview: https://sacramento-dental-medicine-redesign.vercel.app/

Sibling practice site: `enzo-prism/waikiki-dental`. Do not mix copy, phone numbers, hours, doctors, or brand tokens between the two.

## Source of truth

- Content, hours, services, doctors, reviews, schema: `src/data/site.ts`
- Design tokens: `src/app/globals.css`
- Appointment Server Action: `src/app/actions.ts`
- Scheduler UI: `src/components/Scheduler.tsx`
- Contact validation helpers: `src/lib/appointment.ts`
- Home title, description, and social copy: `seo` in `src/data/site.ts`
- Reviews metadata: `src/app/reviews/page.tsx` (derived from `socialProof`)
- Social-card layout: `src/lib/social-image.tsx`
- Favicon and app-icon generator: `scripts/generate-seo-assets.py`
- Canonical / OG origin: `src/lib/site-url.ts` (Vercel production host until cutover)

Do not invent insurance lists, CareCredit, or a front-desk email. The Google
rating and review counts are a dated snapshot in `socialProof`; re-check the
live Business Profile before changing them. Do not claim same-day emergency
visits are guaranteed.

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

## Scheduler

Name is required. A phone number **or** an email is enough — at least one, not
both. Keep email **optional** in the Formspree dashboard or phone-only requests
will 400. Endpoint: `formspreeEndpoint` in `src/data/site.ts`
(`https://formspree.io/f/xvkpdvyz`), overridable with `FORMSPREE_ENDPOINT`.

Optional `LEAD_WEBHOOK_URL` in `.env.local` / Vercel / Cloud Agent secrets is a
second hop after Formspree succeeds. Do not claim the front desk received a lead
unless Formspree accepted the POST.

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
- After UI or content changes, run `npm run lint`, `npm test`, and `npm run build`. Open http://localhost:3000 and click through Home, the scheduler (`#visit`), Emergency, Doctors, and New Patients (FAQ lives there).
- Scheduler contact step: name plus phone **or** email. Confirm submit stays disabled with neither, and enables with either one alone.
- Do **not** treat a successful form submit as practice delivery unless Formspree (or `LEAD_WEBHOOK_URL`) accepted the request and the user asked for a controlled test.
- Do not attach or cut over `sacramentodentalmedicine.com`. Preview URL only until the practice signs off. At cutover, set `NEXT_PUBLIC_SITE_URL=https://sacramentodentalmedicine.com` — do not change DNS from this repo.
- Positioning: grow new-patient volume via search, phone, and simple lead capture. Keep booking friction low.
- Design: tokens in `src/app/globals.css` only. Periwinkle is atmosphere; navy is action. Ember is emergencies. Keep a single night band (Visit). Primary Book pills: header, hero, Visit, footer, mobile bar.
- Hero / waiting / still-life images are atmospheric stand-ins, not the Elverta office. Do not write alt text or copy that claims they are the practice's rooms.
- If `LEAD_WEBHOOK_URL` is missing, the site still runs. Add it only as a Cloud Agents **runtime secret**, never in git.
