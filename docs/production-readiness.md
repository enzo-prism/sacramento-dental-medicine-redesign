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

Test the production build at 320, 375, 390, 768, 1024, and 1440 CSS pixels.
Home and Reviews must have no horizontal overflow. At minimum, verify:

1. Home renders the hero, Google-review proof, primary call and booking actions,
   and the atmospheric-image disclosure correctly.
2. Reviews renders the rating distribution, themes, excerpt filters, Google
   archive link, and booking call to action.
3. Mobile navigation opens, identifies the current page, closes with Escape,
   restores focus to its toggle, and does not leave the page scroll-locked.
4. Every Book online action reaches `/#visit` with the scheduler visible below
   the fixed header.
5. The scheduler advances from visit type to day/time to contact details and
   moves programmatic focus to the new step heading.
6. The request button stays disabled with no contact method or name only,
   enables with name plus phone, enables with name plus email, and disables for
   a partial phone or malformed email.
7. Server validation rejects a forced request with neither phone nor email
   before any Formspree request is made.
8. Keyboard focus is visible; form controls have labels, autocomplete hints,
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
3. Read back Home and Reviews in a fresh browser session and check for console
   errors, failed requests, layout overflow, and stale metadata.
4. Re-run the booking journey without submitting a real lead.
5. Confirm the deployed commit matches `origin/main`.

The current release target is the Vercel production alias. The custom domain is
not part of this release until the practice approves DNS cutover and lead
delivery has been verified separately.
