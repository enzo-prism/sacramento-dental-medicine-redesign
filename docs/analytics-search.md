# Analytics and search operations

Last verified: September 1, 2026

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

The implementation disables GA's automatic initial page view and sends a
privacy-reduced manual page view on each public route change. It:

- removes query strings and URL fragments;
- reports `/schedule` as `/conversion`;
- keeps the public `/reviews` aggregate;
- groups all other public routes under `/`;
- excludes `/privacy-practices`;
- clears the page referrer; and
- disables Google Signals and ad-personalization signals.

Do not add form values, names, email addresses, phone numbers, treatment or
appointment reasons, notes, UTM values, click IDs, user IDs, or custom lead
events to GA4. Formspree remains the lead source of truth.

The stream's Enhanced Measurement settings were verified on September 1, 2026.
**Page views** is the only active measurement, and **Page changes based on
browser history events** is off. Scrolls, outbound clicks, site search, form
interactions, video engagement, and file downloads are off. The application
owns route-change page views; this avoids double-counting and prevents automatic
events from bypassing the redaction boundary. Use Realtime or DebugView to
confirm exactly one `/`, `/reviews`, or `/conversion` page view per navigation
and no event on `/privacy-practices`.

The Analytics Data API identity does not currently have access to the new
property, so automated dashboard readback requires Viewer access to be granted
on that property. Site-side collection does not depend on that API permission.

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
