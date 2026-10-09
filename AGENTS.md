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
- Online booking: Jarvis iframe plus office phone/email on `/schedule`
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

## Scheduler

`/schedule` embeds Jarvis
(`https://schedule.jarvisanalytics.com/frame?eoid=9251&elid=9000000000334`)
as the only online booking. Directly beside/below it, show the office phone
(`contact.phoneHref`) and the verified front-desk email (`contact.emailHref`).
Do not add a second request form. Phone and email clicks fire allowlisted
custom events (`Schedule Phone Click`, `Schedule Email Click`) with no PII.

## Seasonal layer (October)

Small, optional delight on top of the design system, never a re-theme. The
current layer is Halloween (`halloween-2026`, October 1–31 on the practice's
America/Los_Angeles calendar), configured in `src/lib/seasonal.ts`.

- **Gating:** an inline `<head>` script (`SeasonScript`,
  `src/components/Seasonal.tsx`) sets `<html data-sdm-season="halloween">`
  before first paint while the season is in range, so it switches on and off
  without a redeploy and never flashes or shifts layout. Every seasonal piece
  carries `.sdm-season-only` (hidden by default), and all seasonal CSS (end of
  `globals.css`) is keyed off that attribute. Set `activeSeason` to `null` to
  ship no script at all. After October 31 the layer is inert on its own;
  set `activeSeason` to `null` or point it at next year's theme.
- **404 trap:** Next serves unmatched URLs as a client-rendered error shell,
  so the server head script never runs there. `SeasonRuntime`
  (`src/components/SeasonalClient.tsx`, mounted in the root layout) re-runs the
  same script once when the attribute is missing, then swaps the favicon.
- **Preview / opt-out:** `?season=halloween` previews it for the rest of the
  tab session (even out of season), `?season=off` keeps it off in that
  browser, `?season=auto` resets.
- **Inventory:** Home hero gets a "Happy Halloween from Antelope" chip, a
  candlelight underline that draws itself under "dread.", a harvest moon
  rising behind the photo, three bats that lift off the moon once per session
  (`HarvestBats`), and a ghost-tooth peeking out from behind the photo
  (desktop). The Home scheduling night band gets a crescent moon and stars
  that twinkle when scrolled into view. The footer gets a patch of
  tooth-grin jack-o'-lanterns with a greeting (`FooterPumpkins`). The favicon
  becomes a tooth-grin pumpkin (`public/seasonal/halloween-2026/icon.svg`),
  and the 404 page shows a ghost-tooth in front of a harvest moon. Nothing
  else changes.
- **Never decorate** CTAs, the phone number, ratings or reviews, the
  scheduler or `/schedule`, the Emergency band, `/dental-emergencies`,
  `/privacy-practices`, or the mobile CTA bar. Those pages render
  `<Footer seasonal={false} />`; `src/lib/seasonal.test.ts` guards this. Keep
  the tone friendly for anxious patients: no skulls, gore, drills, jump
  scares, decay imagery, cobwebs, or candy-shaming copy.
- **Rules:** decorative art is `aria-hidden`, never shifts layout (absolutely
  positioned, or in flow only when revealed before first paint), and animates
  only `transform`/`opacity`. One-off motion stays under 5 seconds (WCAG
  2.2.2) and is skipped for reduced motion and Save-Data
  (`seasonalMotionAllowed`). The `--sdm-harvest-*` tokens are for seasonal
  art only; ember stays the emergency color. Art is original hand-drawn SVG,
  never AI or stock.
- **Next year:** add a new `SeasonalTheme` id and dates plus a versioned
  `public/seasonal/<id>/` folder.

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
- `/schedule` should show the Jarvis iframe and the office phone/email, with no Formspree request form.
- Preserve `sacramentodentalmedicine.com` as the canonical production domain and verify it after every release.
- Positioning: grow new-patient volume via search, phone, and simple lead capture. Keep booking friction low.
- Design: tokens in `src/app/globals.css` only. Periwinkle is atmosphere; navy is action. Ember is emergencies. Keep a single night band (Visit). Primary Book pills: header, hero, Visit, footer, mobile bar.
- Hero / waiting / still-life images are atmospheric stand-ins, not the Elverta office. Do not write alt text or copy that claims they are the practice's rooms.
- `officePhotos` in `src/data/site.ts` are real Elverta Road interiors and the storefront (`/images/office-*.webp`). Keep those alts honest (office rooms, not patients).
