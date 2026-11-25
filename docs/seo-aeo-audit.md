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


## November 6, 2026 implementation

Added a dedicated `/meet-dr-sheppard` ProfilePage with the existing specialist biography and authentic portrait, linked from Home and root-canal care and included in the sitemap. Removed its old homepage-fragment redirect. Both clinician pages use the shared `DoctorProfile` server component, profile/person schema and direct DCA verification link. Dr. Narodovich's verified Ohio State/Temple education and identity are consistent with Waikiki, with a sameAs relationship between the person entities. General education does not establish an unverified permit or sedation modality.

Emergency care now presents call-first instructions, real Antelope office hours, availability limits, a medical-emergency direction and estimate expectations. Sedation planning questions distinguish local numbing from sedation and direct patients to confirm the office's available options and clinician qualifications. ADA references and contextual provider links support both pages. No 24-hour availability or unverified medication, sedation method, permit, price, or review outcome was added.

The new clinician route inherits the existing privacy-reduced `/team` analytics group, with a regression assertion. QA covers metadata/schema/FAQ parity and all internal links, plus mobile/desktop clinician and emergency routes. Existing measurement/privacy tests and mocked submissions are preserved. No live patient request was submitted.

Native Google Search Console access was verified as Owner on November 6, superseding the older access note above. October 7–November 3: 119 clicks and 9,685 impressions. URL Inspection reports `/dental-emergencies` indexed with the intended canonical. These are pre-release observations, not evidence of an SEO uplift. See analytics-search.md for account changes.

Remaining externally dependent work: confirm the exact sedation offering and responsible clinicians/qualifications, obtain current approved original media, reconcile the Google Business Profile through an authorized account, and connect completed Jarvis appointments to operational reporting. Validate answer-engine retrieval with dated prompts and cited URLs; no schema or special AI file guarantees citation.

Official DCA records were verified directly November 6: Dr. Narodovich holds current-active dentist license 57101, Moderate Sedation Permit 44 (Roseville practice location), and Adult Oral Conscious Sedation Certificate 1628 (Antelope practice location), all expiring September 30, 2028. Both the visible profile and Person.hasCredential link the official records using `doctors[].licenseRecords`. This supersedes the prior license/permit-evidence gap. A credential alone does not establish the exact treatment option offered at an office or who administers/monitors a particular visit; those questions remain for the team. No private address-of-record details were copied.

## November 20, 2026 audit and implementation

Baseline: production crawl of `https://sacramentodentalmedicine.com` at main `f036a7c`
passed every technical check in `scripts/check-seo.py` (18 indexable pages, unique
metadata, canonicals, social images, linked schema, FAQ parity, robots, 404, Googlebot
parity). The remaining gap was coverage, not hygiene.

| Priority | Verified finding | Implementation |
| --- | --- | --- |
| High | Six URLs that were real pages on the practice's previous site (`/preventive-care`, `/dental-care-children`, `/cosmetic`, `/teeth-whitening`, `/veneers`, `/bruxism`) 308 to the generic `/our-services` hub. A redirect to a broad hub is usually treated as a soft 404, so those URLs' search history was being discarded, and the site had no page answering searches for cleanings, kids' dentistry, whitening, veneers, or night guards, all of which the practice lists in `services`. | Restored each URL as a full service page on the shared template (steps, FAQs, sources, related care, Service + FAQPage + breadcrumb schema). Removed their redirects; trailing-slash variants now 308 to the page. A regression test keeps them from silently reverting to hub redirects. |
| High | "Full & partial dentures" is a listed service with no page. | Added `/dentures`, with implant and bridge alternatives linked. |
| Medium | Crowns & bridges is one listed service, but "bridge" appears nowhere on the crowns page (the old `/services/crowns-bridges` URL redirects there). | Added a bridges answer, linked to implants and partial dentures. |
| Medium | Homepage service groups linked only to 10 treatment pages. | Each group now links every relevant page (16 linked from Home). |
| Medium | The practice entity had no coordinates and no link to the services it offers. | Added `geo` (the Google Business Profile pin, from `socialProof.moreReviewsUrl`) and a `hasOfferCatalog` referencing every service page's `#service` entity. |
| Medium | Answer engines are frequently asked for hours and location; neither was a visible FAQ. | Added both to the home FAQ; the hours answer is generated from `hours`, so it cannot drift from the schema. |

**Sources for practice-specific facts.** Fluoride and sealants, a first child visit around
age one, an early orthodontic check around age seven, in-office or take-home whitening,
bonding, and custom mouthguards come from the practice's own previous pages as archived
by the Wayback Machine (May–July 2026), plus `services` in `src/data/site.ts`. Clinical
explanations stay general, link ADA MouthHealthy topics (each URL checked to return 200),
and defer recommendations to the exam. No prices, insurance networks, financing brands,
technologies, or outcomes were added. The office-amenity details on the old children's
page (TVs, prizes) were left out because they may have changed.

**Analytics.** The seven new routes join the privacy-reduced `/care` treatment group in
`src/lib/google-analytics.ts`, matching every other treatment page.

**Validation.** ESLint, 101 unit tests, production build, and the rendered crawl
(`npm run seo:check -- http://localhost:3100 audit/seo/local-crawl.json`): PASS on
25 indexable pages and 26 internal destinations. Restored pages and the homepage service
section were checked in a browser at 375 px with no horizontal overflow.

**After deploy.** Re-run the crawl against production, then in Search Console submit the
sitemap and inspect the seven restored URLs. Expect them to be recrawled over days to
weeks; compare their impressions and queries against the same window before release.
Search Console query data was not read for this audit, so it does not show which
restored page will gain the most.

## November 24, 2026 — Antelope organic search and booking paths

Final Google Web Search data for November 1–22 recorded 82 clicks and 10,914 impressions. October 1–22 recorded 83 clicks and 7,432 impressions. Search Console property totals use daily rows. Individual query and page counts use their respective reports.

- Gum care had an actionable local query. “Sacramento gum disease treatment” generated 179 impressions, zero clicks and an average position of 7.36. The existing page now names deep cleaning in its heading and title, explains the exam and estimate, links to preventive care, and directs visitors to the existing scheduler for a gum evaluation.
- The comfort page recorded 644 impressions and zero clicks. The new search listing and opening emphasize nervous patients in Antelope, a gentler pace and computer-guided local numbing. The new-patient guide links directly to the page. Both booking buttons open the existing scheduler. Specific sedation modalities, administering clinicians, referral arrangements and fees still require current office confirmation.
- The emergency page recorded four clicks from 3,293 impressions. One exact 24-hour query accounted for 1,018 impressions. The November 18 search title and call-first route remain the comparison baseline. The hours panel identifies the regular schedule and asks holiday visitors to call before traveling. Publish special dates and after-hours routing across the website, Business Profile and greeting when the office confirms them.
- The homepage heading now includes Antelope. The Nov 24 managed Google Business Profile website field pointed to the legacy HTTP www address. The preferred HTTPS root was submitted and Google initially displayed the edit as pending review.
- The pre-release crawl found 25 available sitemap pages and Google inspection showed 21 indexed. Google acknowledged individual priority crawl requests for cosmetic dentistry, whitening, night guards and dentures. Check selected canonical, last crawl, and first impressions for each on December 1–8. An accepted request does not establish indexing.

Use December 2 for the early emergency-page review. Compare November 19–December 16 with October 21–November 17 in the existing practice dashboard. For the November 24 gum, comfort and home edits, compare November 25–December 22 with October 28–November 24, flagging Thanksgiving and the earlier releases. Use non-branded service queries in Search Console. Report answered urgent calls, accepted Jarvis bookings and attended visits using office records; attribute an organic outcome only when the source is verified.

[Search Console](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Asacramentodentalmedicine.com) · [Practice dashboard](https://rda-dashboard-ten.vercel.app/website/sacramento-dental-medicine)
