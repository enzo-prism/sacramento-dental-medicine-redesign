# Metadata, favicon, and social sharing

This guide documents the search and link-preview system currently deployed for
Sacramento Dental Medicine.

## Source map

| Concern | Source of truth |
| --- | --- |
| Home title, description, and social copy | `seo` in `src/data/site.ts` |
| Reviews title and description | `src/app/reviews/page.tsx`, derived from `socialProof` |
| Schedule title and description | `src/app/schedule/page.tsx` |
| Canonical and social origin | `src/lib/site-url.ts` |
| Shared social-card layout | `src/lib/social-image.tsx` |
| Home Open Graph and X routes | `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx` |
| Reviews Open Graph and X routes | `src/app/reviews/opengraph-image.tsx`, `src/app/reviews/twitter-image.tsx` |
| Schedule Open Graph and X routes | `src/app/schedule/opengraph-image.tsx`, `src/app/schedule/twitter-image.tsx` |
| Favicon and app-icon generation | `scripts/generate-seo-assets.py` |
| Canonical practice mark | `public/images/logo-mark.png` |

Next.js metadata file conventions add image URLs, content type, dimensions, and
alt text to the rendered `<head>`. Home, Reviews, and Schedule intentionally use
different social cards so each shared link describes its destination.

## Current production output

| Route | Title | Description focus | Social-card focus |
| --- | --- | --- | --- |
| `/` | `Antelope, CA Dentist \| Sacramento Dental Medicine` | Gentle family, cosmetic, restorative, and emergency care; new-patient and same-day context | Patient-friendly positioning, core care categories, location, and phone |
| `/reviews` | `Sacramento Dental Medicine Reviews \| 4.8 on Google` | The verified review corpus and the themes a visitor can explore | 4.8 rating, 632 reviews, five-star share, and analysis date |
| `/schedule` | `Schedule a Dentist Appointment \| Sacramento Dental Medicine` | A fast appointment request using a phone number or email | The three-step request flow, new-patient welcome, and practice phone |

The Reviews values are a snapshot checked August 24, 2026. Before changing the
rating, total, distribution, written-review count, or analysis date, verify the
live Google Business Profile and update `socialProof` plus its tests together.

## Favicon and app icons

The generator always starts from `public/images/logo-mark.png`; it must not read
from a previously generated output because repeated resampling degrades the
mark.

```bash
python3 scripts/generate-seo-assets.py
```

Expected outputs:

- `src/app/favicon.ico`: 16px, 32px, and 48px frames.
- `src/app/icon.png`: 512×512.
- `src/app/apple-icon.png`: 180×180.
- `public/apple-touch-icon.png`: compatibility copy of the 180px icon.

Commit the generated binaries with the generator change. Do not hand-edit only
one output or substitute a different logo treatment.

## Social-card rules

- Keep every card at 1200×630 with `image/png` content type.
- Preserve the existing periwinkle, navy, canvas, and ink palette.
- Use the real practice mark and contact data from `src/data/site.ts`.
- Keep Home evergreen. Do not put a review count on the Home card unless the
  product decision is to maintain it as dated content.
- Derive Reviews numbers from `socialProof`; do not duplicate the values in the
  route or renderer.
- Keep Schedule centered on the request journey. It must say that the request is
  not a confirmed appointment and that phone or email is enough.
- Preserve descriptive alt text for both Open Graph and X images.
- The atmospheric site photography is not the Elverta office. Do not represent
  it as an office photo in social copy or alt text.

## Local verification

Run the full gate after metadata, favicon, or social-card changes:

```bash
npm run lint
npm test
npm run build
```

The build output should include these static routes:

```text
/opengraph-image
/twitter-image
/reviews/opengraph-image
/reviews/twitter-image
/schedule/opengraph-image
/schedule/twitter-image
/icon.png
/apple-icon.png
```

Open Home, Reviews, and Schedule and inspect the rendered `<head>`. Confirm that
each route has the intended title, unique description, canonical URL, social
title, social description, image URL, image alt text, width, and height. Fetch
all six social-image routes and verify they are valid 1200×630 PNG files.

## Production verification

Pushing `main` starts the Vercel production deployment. A successful push or
local build is not proof that the production alias has updated.

After Vercel reports the deployment Ready, verify:

1. `/`, `/reviews`, and `/schedule` all return 200 from
   `https://sacramentodentalmedicine.com`.
2. Live titles, descriptions, canonicals, and social tags match the intended
   route-specific values.
3. `/favicon.ico`, `/icon.png`, and `/apple-icon.png` return 200 with the
   expected formats and dimensions.
4. All six Open Graph and X image routes return 200 as 1200×630 PNG files.
5. The custom domain serves the new Ready deployment, not merely an immutable
   deployment URL.

## Custom-domain production

The canonical and public host is `https://sacramentodentalmedicine.com`.
`src/lib/site-url.ts` uses it for every non-development build unless an explicit
`NEXT_PUBLIC_SITE_URL` is supplied. If an environment override is needed, set:

```text
NEXT_PUBLIC_SITE_URL=https://sacramentodentalmedicine.com
```

After any domain or environment change, redeploy and re-run the production
checks above, including canonical, sitemap, Open Graph, and X URLs on all three
routes.
