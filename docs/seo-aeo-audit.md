# Sacramento Dental Medicine: SEO and answer-engine audit

Audit date: September 6, 2026. Repository: `enzo-prism/sacramento-dental-medicine-redesign`.
Baseline: main `65bce3a131218909856d6c9a1fb39905ceca907b`, verified against production
Vercel deployment `dpl_G7UdMnXTEK41eGpKgcwfoRsiyA9v` on the public custom domain.
Work was performed in an isolated clone, preserving other local work.

## Findings and changes

| Priority | Verified finding | Implementation |
| --- | --- | --- |
| High | All nine service pages and the doctor page override OG/X objects without supplying images. Rendered HTML has no social-image tags. | Explicit shared 1200×630 brand-card metadata, including type and alt text, on service, doctor, and new-patient routes. Existing Home/Reviews/Schedule custom cards remain. |
| High | Schema repeats disconnected Dentist entities; service provider lacks a stable identity. | One practice identity at `/#practice`, shared WebSite, linked page/service entities, and breadcrumb relationships. Practice URL and real office exterior replace incomplete entities and the atmospheric hero image. |
| High | Dr. Narodovich is typed as a Dentist business with person-only properties. | Person linked to the practice through worksFor, described by a ProfilePage. No invented credentials, biography, or medical reviewer attribution. |
| High | Practice markup includes its own Google AggregateRating. | Remove self-serving rating markup while preserving the visibly dated Google review snapshot and source links. |
| High | Legacy root-canal URL redirects to the homepage services fragment despite an actual endodontic service and specialist in the source data. | Restore `/root-canal-therapy` with first-visit steps, patient questions, specialist context, and an ADA education source. |
| Medium | Service hub links only to three treatments; featured preventive card omits its existing link configuration. | Complete linked service directory, restored preventive links, root-canal link, and Care navigation to `/our-services`. Every indexable route is reachable from Home. |
| Medium | First-visit, coverage, and appointment-request answers are spread across the homepage and scheduler. | `/new-patients` combines verified practical details, hours, address, directions, what to bring, and confirmation expectations. Linked in the footer and patient/service sections. |
| Medium | Most service pages contain only two short answers and no path to practical visit information or doctor context. | Relevant additional questions about costs, candidacy, alternatives, timing, and urgent contact. Shared visit block links to directions, patient guide, and doctor profile. ADA references support clinical explanations. |
| Medium | Deep-cleaning, sedation article, and restoration URLs redirect to a generic homepage fragment. | Permanent redirects to the closest relevant treatment pages; remaining general service redirects resolve to the actual service directory. |
| Medium | Emergency template presents online booking as its primary action. | Primary call-first action with a separately labeled non-urgent request option; explicit office-hours and availability answers. |
| Medium | JSON-LD serialization differs by route. | Shared script-safe serializer, with a regression test for script-breakout strings. |
| Maintenance | npm audit reports a high-severity Browserslist dependency issue. | Compatible Browserslist update and transitive browser-data updates; audit reports zero vulnerabilities. |

## Content and search decisions

The actual practice location remains **4320 Elverta Rd #3, Antelope, CA 95843**.
Service-area wording does not imply additional Sacramento-area offices. No fabricated
fees, insurance networks, financing brands, availability, awards, or review counts were added.
The Google review snapshot remains explicitly dated August 24, 2026.

Answer content is rendered in HTML, uses descriptive question headings, and has
crawlable links to the relevant provider, care, location, and request pages. Treatment
recommendations still depend on an exam. Patient-facing content does not claim that a
dentist reviewed this revision. No bulk location pages or generic blog articles were generated.

FAQPage remains useful descriptive markup for visible FAQs, but **Google retired FAQ
rich results in May 2026**. Neither FAQ markup nor special AI files guarantee search or
answer-engine inclusion. No llms.txt, invented SearchAction, unsupported booking action,
or search-engine submission endpoint was added.

Existing privacy-conscious analytics and Formspree behavior are preserved. No real
appointment request was submitted during QA, and no paid Vercel analytics product was enabled.

## Validation

- Production build, ESLint, TypeScript, and 58 tests across 20 suites.
- `npm audit`: zero vulnerabilities after the compatible dependency update.
- Reusable rendered-page check: `npm run seo:check -- http://localhost:3100 audit/seo/local-crawl.json`.
- 15 indexable routes: unique titles/descriptions, one H1 and canonical each, matching
  OG URL, social-image metadata, image alt attributes, parseable linked schema, exact
  FAQ question/answer parity with HTML, and reachability from Home.
- Internal destinations and fragment targets; unknown URL returns 404; privacy notice
  remains noindex; robots permits production crawling and names the canonical sitemap.
- Googlebot and ordinary browser responses have matching titles and canonicals on sampled routes.
- Six social-image endpoints: HTTP 200, PNG, 1200×630; icon and privacy PDF endpoints respond correctly.
- Seven sampled legacy and trailing-slash redirects: permanent 308 to the intended destination.
- Browser checks at 390px, 768px, and 1440px, including visual screenshots and overflow checks.
- axe automated checks on the service directory, new-patient, root-canal, and emergency
  pages. Zero violations; gradient contrast cases remain manual-review items, not automated passes.
- Scheduler exercised through all three steps. With name and acknowledgment set,
  neither contact method keeps submission disabled; phone-only and email-only each enable it.
  Submission was not clicked.

The local crawl and asset evidence are in `audit/seo/`. Following the authorized main
push, rerun the crawl against `https://sacramentodentalmedicine.com` and verify Vercel's
production commit SHA before reporting the release as live.

## Measurement and remaining account work

This audit verifies site code and delivery, not ranking or AI citation gains. Search
Console query/click/impression data and live URL Inspection were not available through
this session's tools. The older account-access note in `docs/analytics-search.md` must
be rechecked before treating its access status as current. Preserve existing verification
records. When an authorized Search Console account is available, submit the canonical
sitemap, inspect the new pages, and compare service-page impressions, clicks, and
canonical selection after recrawling. Track performance over weeks, not immediately
after deployment. Existing GA4 intentionally groups treatment paths for privacy; do
not undo that boundary just to obtain page-level marketing reports.

Clinical biographies, credentials, procedure-specific offerings, and price ranges can
be expanded when the practice supplies authoritative details. Do not manufacture them
for an expertise or freshness signal.

## Primary references consulted

- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google guide to generative AI search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search documentation updates, FAQ retirement](https://developers.google.com/search/updates)
- [Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Review snippet policies](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- Installed Next.js 16.3.2 docs: `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`
  and `01-app/01-getting-started/14-metadata-and-og-images.md`.
- ADA MouthHealthy: [crowns](https://www.mouthhealthy.org/all-topics-a-z/crowns),
  [implants](https://www.mouthhealthy.org/all-topics-a-z/implants),
  [root canals](https://www.mouthhealthy.org/all-topics-a-z/root-canals),
  [gum disease](https://www.mouthhealthy.org/all-topics-a-z/gum-disease),
  [scaling and root planing](https://www.mouthhealthy.org/all-topics-a-z/scaling-and-root-planing),
  [braces and aligners](https://www.mouthhealthy.org/all-topics-a-z/braces).
