# Production readiness

Use this checklist before calling the Sacramento Dental Medicine redesign
ready. A local build, a pushed commit, and a Ready Vercel deployment are three
different states; verify each one explicitly.

## Local quality gate

```bash
npm ci
npm run lint
npm test
npm run build
npm audit --omit=dev --audit-level=high
```

The automated tests protect the dated review totals and the booking rule: name
plus a usable phone number **or** email address. A partial phone or malformed
email remains an error even when the other contact method is valid.

## Browser journey

Test the production build at 320, 375, 390, 430, 768, 1024, and 1440 CSS pixels.
Home, Reviews, and Schedule must have no horizontal overflow. At minimum, verify:

1. Home renders the hero, Google-review proof, primary call and booking actions,
   and the atmospheric-image disclosure correctly.
2. Reviews renders the rating distribution, themes, excerpt filters, Google
   archive link, and booking call to action.
3. Mobile navigation opens, identifies the current page, closes with Escape,
   restores focus to its toggle, and does not leave the page scroll-locked.
4. Every Book online action reaches `/schedule`, lands at the top of the
   dedicated page, and keeps the scheduler visible near the main heading.
5. A direct visit or refresh at `/schedule` succeeds, the Schedule navigation
   item identifies the current page, and the Home page no longer embeds the
   appointment form near its footer.
6. The scheduler advances from visit type to day/time to contact details and
   moves programmatic focus to the new step heading.
7. The request button stays disabled with no contact method or name only,
   enables with name plus phone, enables with name plus email, and disables for
   a partial phone or malformed email.
8. Server validation rejects a forced request with neither phone nor email
   before any Formspree request is made.
9. Keyboard focus is visible; form controls have labels, autocomplete hints,
   input modes, inline status text, and reduced-motion behavior.

Do not send a real appointment request during routine QA. A controlled
Formspree delivery test is a separate, explicitly approved release action.

## Search and sharing

Follow the route-by-route checks in [`metadata.md`](metadata.md). In addition,
request the initial HTML with a crawler user agent so the title, description,
canonical, robots, Open Graph, and X tags are present without relying on client
JavaScript. Confirm `/robots.txt` and `/sitemap.xml` use the production origin.

## Vercel release readback

After pushing `main`:

1. Wait for the Git-linked production deployment to report Ready.
2. Confirm the production alias resolves to that deployment.
3. Read back Home, Reviews, and Schedule in a fresh browser session and check
   for console errors, failed requests, layout overflow, and stale metadata.
4. Re-run the booking journey without submitting a real lead.
5. Confirm the deployed commit matches `origin/main`.
6. Confirm `https://sacramentodentalmedicine.com/`, `/reviews/`, and
   `/schedule/` serve that deployment with valid HTTPS and canonical metadata.

The release target is the public custom domain
`https://sacramentodentalmedicine.com/`; the Vercel alias remains a useful
diagnostic endpoint but is not the public completion criterion.

The complete August 25, 2026 responsive and interaction record is in
[`../design-qa.md`](../design-qa.md). Keep the final screenshots it references
when archiving or reproducing the release gate.

## Analytics and Search Console

Follow [`analytics-search.md`](analytics-search.md). Code readiness is not
account enablement: verify the Vercel project feature, production script and
beacon, then dashboard/API data. Do not add GA4 until the dedicated property and
healthcare privacy gates in that document are satisfied. Search Console is not
complete until the operating Google identity has verified access and the live
sitemap can be read back through the API.
