<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
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

Do not invent insurance lists, CareCredit, a front-desk email, or a Google star rating. Those are unconfirmed. Do not claim same-day emergency visits are guaranteed.

## Commands

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

Optional: `LEAD_WEBHOOK_URL` in `.env.local` / Vercel / Cloud Agent secrets. Until it is set, scheduler submissions are only logged server-side.

## Cursor Cloud specific instructions

- Install is `npm ci`. Dev server is already started in the `dev` terminal on port 3000.
- After UI or content changes, run `npm run lint` and `npm run build`. Open http://localhost:3000 and click through Home, the scheduler (`#visit`), Emergency, Doctors, and New Patients.
- Do **not** treat a successful form submit as practice delivery unless `LEAD_WEBHOOK_URL` is configured and the user asked for a controlled test.
- Do not attach or cut over `sacramentodentalmedicine.com`. Preview URL only until the practice signs off.
- Positioning: grow new-patient volume via search, phone, and simple lead capture. Keep booking friction low.
- If `LEAD_WEBHOOK_URL` is missing, the site still runs. Add it only as a Cloud Agents **runtime secret**, never in git.
