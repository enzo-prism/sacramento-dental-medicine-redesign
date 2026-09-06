# Analytics and search operations

GA4 last verified: September 6, 2026; other account sections: September 1, 2026

This document separates code readiness from account-side enablement. A package,
resource ID, DNS token, or successful build is not proof that traffic is being
collected.

## Vercel Web Analytics

`@vercel/analytics` is installed and `SiteAnalytics` is mounted only when
`VERCEL_WEB_ANALYTICS_ENABLED=true`. The `beforeSend` boundary:

- removes query strings and URL fragments;
- reports `/schedule` as `/conversion`;
- keeps the public `/reviews` aggregate;
- excludes `/privacy-practices`; and
- never sends form values, contact details, treatment reasons, UTM values, or
  click IDs as custom events.

The Vercel project currently has an analytics resource ID, but its Web Analytics
feature is disabled. Vercel CLI classifies enabling it on this Pro team as a
paid action that requires an interactive owner confirmation. Do not set the env
flag until that feature is enabled. After approval:

```bash
vercel project web-analytics enable sacramento-dental-medicine-redesign --scope enzo-design-prisms-projects
vercel env add VERCEL_WEB_ANALYTICS_ENABLED production --scope enzo-design-prisms-projects
```

Redeploy after setting the variable. Verify `/_vercel/insights/script.js` is
200, one sanitized page-view request is accepted, and the project API reports
`features.webAnalytics: true`. Verify real dashboard/API data later; an empty
new resource immediately after release is expected.

Speed Insights is a separate Vercel product. It is not enabled because Vercel
currently prices it at $10 per project per month on Pro. Do not enable it
without a separate spend approval.

## Google Analytics 4

The authorized GA4 property is `552407134`; its production web stream is
`15554690024` with measurement ID `G-E1QV3QH6XD`. The root layout initializes it
only on `sacramentodentalmedicine.com` and `www.sacramentodentalmedicine.com`, so
local, preview, and generated Vercel URLs cannot contaminate production data.

The application owns page views: automatic initial views and Enhanced
Measurement browser-history views are disabled. Scroll, outbound, search, form,
video and download measurement remain off. Google Signals remains off.

Every event inherits sanitized tag-wide location, title, referrer and content
group before the tag loads. Page-specific fields must stay out of the initial
`config` call: config scope overrides later global `set` calls. Explicit page
views deduplicate React effect replays. Excluded/unknown routes disable the
loaded tag as well as skipping manual views.

| Public route | Reported path | Content group |
| --- | --- | --- |
| Home | `/` | Home |
| Reviews | `/reviews` | Reviews |
| Services directory | `/our-services` | Care overview |
| New patients | `/new-patients` | Visit information |
| Doctor biography | `/team` | Team |
| Scheduling | `/conversion` | Contact page |
| Reviewed treatment pages | `/care` | Care information |

`/conversion` is a legacy aggregate path, **not a completed lead or key event**.
Privacy, unknown routes and nonproduction hosts are excluded. No form values,
contact details, treatment reasons, click IDs or user IDs are sent. Formspree
remains the lead source of truth; do not equate page visits with appointments.

Acquisition now preserves only recognized referral origins (no paths or query
strings), and fixed allowlisted `utm_source` + `utm_medium` pairs. Both must be
recognized. Unknown external referrers become `other-referral / referral`.
Raw campaign names, campaign IDs, terms and content stay suppressed. See
`src/lib/google-analytics.ts` for the exact allowlists. Examples:

- `utm_source=google&utm_medium=cpc` identifies paid Google visits.
- `utm_source=facebook&utm_medium=paid_social` identifies paid social visits.
- Recognized Google or AI referral origins can identify incoming organic/referral traffic.

Click-ID-only paid visits cannot reliably be distinguished from organic visits;
use approved source/medium tags when managing acquisition links. Historical
Direct traffic cannot be reconstructed, and browser/referrer restrictions still
limit attribution. This is privacy-reduced traffic measurement, not an
individual patient attribution system.

On September 6, the stream's email redaction was confirmed active and URL query
redaction was enabled for 30 additional keys: `name`, `first_name`, `last_name`,
`email`, `phone`, `telephone`, `address`, `dob`, `patient_id`, `visittype`, `date`,
`datelabel`, `time`, `reason`, `symptoms`, `medical_history`, `notes`, `message`,
`insurance`, `insurance_id`, `policy_number`, `utm_campaign`, `utm_term`,
`utm_content`, `gclid`, `fbclid`, `ttclid`, `ad_id`, `token`, `access_token`.
This is defense in depth, not a replacement for application sanitization.

For QA, open `/?analytics=off` in the test tab before browsing. The session-only
opt-out prevents loading Google Analytics and persists across navigation in that
tab. Open `/?analytics=on` to restore measurement. Reload after changing the
flag on the same path. Preview/local hosts never load the production tag.
The existing internal-traffic filter remains in Testing; do not activate it
without validating its rule. Retention and advertising settings were not expanded.

Use GA4 Traffic acquisition with **Session source / medium**, and Pages and
screens with **Content group** or **Page title**, to inspect new traffic. Allow
normal report processing time after release. September 6 marks a reporting
break: older views used a single title and mostly the homepage path.

The signed-in Chrome account can view/edit this property. CLI OAuth/delegated
API access was unavailable during this audit; that is separate from working
browser access and production tag collection. Do not infer API permissions from
a successful website request.

Validation includes lifecycle/privacy unit tests and real Google tag requests
in an isolated fixture with collection blocked, including a parameterless probe
to verify inherited context after SPA navigation. No synthetic leads are sent.

References: [Google tag configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config),
[manual page views](https://developers.google.com/analytics/devguides/collection/ga4/views),
[Google healthcare data guidance](https://support.google.com/analytics/answer/13297105).

## Google Search Console

The domain property `sc-domain:sacramentodentalmedicine.com` exists, and the
public DNS zone contains Google verification TXT records. The connected
`enzo@design-prism.com` identity is nevertheless `siteUnverifiedUser`; sitemap
and URL Inspection API calls return 403. Preserve the existing TXT records.

An owner must verify this Google identity (or grant it Owner/Full access) before
submitting `https://sacramentodentalmedicine.com/sitemap.xml`. After access is
confirmed, submit the sitemap, inspect the canonical homepage, `/reviews/`, and
`/schedule/`, and record the live results. The public code already provides a
production canonical, indexable `robots.txt`, and sitemap while preview deploys
remain noindex.
