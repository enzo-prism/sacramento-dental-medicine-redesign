export const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-E1QV3QH6XD";

const PRODUCTION_HOSTNAMES = new Set([
  "sacramentodentalmedicine.com",
  "www.sacramentodentalmedicine.com",
]);

const PRIVATE_PATHS = new Set(["/privacy-practices"]);

function normalizedPathname(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

/**
 * GA4 is intentionally restricted to the public production domain. This keeps
 * local, preview, and generated Vercel URLs out of the production property.
 */
export function isGoogleAnalyticsProductionHostname(hostname: string) {
  return PRODUCTION_HOSTNAMES.has(hostname.toLowerCase());
}

/**
 * Returns the only path that analytics may receive. Never add query strings,
 * fragments, form values, treatment reasons, or attribution values here.
 */
export function sanitizeGoogleAnalyticsPath(pathname: string) {
  const normalized = normalizedPathname(pathname);

  if (PRIVATE_PATHS.has(normalized)) return null;
  if (normalized === "/schedule") return "/conversion";
  if (normalized === "/reviews") return "/reviews";
  return "/";
}

