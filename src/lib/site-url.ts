/**
 * Public origin for canonical URLs, Open Graph images, sitemap, and robots.
 *
 * Until sacramentodentalmedicine.com is attached to this Vercel project, the
 * production host is the .vercel.app alias. Set NEXT_PUBLIC_SITE_URL at
 * cutover. Do not attach the custom domain from this repo.
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
