/**
 * Public origin for canonical URLs, Open Graph images, sitemap, and robots.
 *
 * An explicit NEXT_PUBLIC_SITE_URL wins. Vercel's production alias is used
 * when present; otherwise production defaults to the public custom domain.
 * Do not attach or change DNS from this repository.
 */
export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  if (vercelProd) return `https://${vercelProd}`;

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://sacramentodentalmedicine.com";
}

export const siteUrl = resolveSiteUrl();

export const isPreviewDeploy = process.env.VERCEL_ENV === "preview";
