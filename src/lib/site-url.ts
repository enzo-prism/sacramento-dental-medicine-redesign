/**
 * Public origin for canonical URLs, Open Graph images, sitemap, and robots.
 *
 * An explicit NEXT_PUBLIC_SITE_URL wins. Every production build otherwise
 * uses the public custom domain so canonical URLs stay stable across Vercel
 * deployment aliases. Preview deployments are separately marked noindex.
 */
export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://sacramentodentalmedicine.com";
}

export const siteUrl = resolveSiteUrl();

export const isPreviewDeploy = process.env.VERCEL_ENV === "preview";
