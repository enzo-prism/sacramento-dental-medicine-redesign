export const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-E1QV3QH6XD";
export const GOOGLE_ANALYTICS_ORIGIN = "https://sacramentodentalmedicine.com";

const PRODUCTION_HOSTNAMES = new Set([
  "sacramentodentalmedicine.com",
  "www.sacramentodentalmedicine.com",
]);

// Only reviewed, public routes are measurable. Exact treatment names never leave
// the site; adding a new route requires choosing a safe group here explicitly.
const PUBLIC_PAGES: Record<string, { path: string; title: string; group: string }> = {
  "/": { path: "/", title: "Home", group: "Home" },
  "/reviews": { path: "/reviews", title: "Reviews", group: "Reviews" },
  "/our-services": { path: "/our-services", title: "Care overview", group: "Care overview" },
  "/new-patients": { path: "/new-patients", title: "Visit information", group: "Visit information" },
  "/meet-dr-narodovich": { path: "/team", title: "Team", group: "Team" },
  "/schedule": { path: "/conversion", title: "Contact page", group: "Contact page" },
};
const TREATMENT_PATHS = new Set([
  "/dental-crowns", "/sedation-dentistry", "/orthodontics", "/invisalign",
  "/tooth-extractions", "/dental-implants", "/gum-disease-treatment",
  "/dental-emergencies", "/root-canal-therapy",
]);

function normalizedPathname(value: string) {
  // Also defend callers that accidentally pass location.pathname + search/hash.
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
}

export function isGoogleAnalyticsProductionHostname(hostname: string) {
  return PRODUCTION_HOSTNAMES.has(hostname.toLowerCase());
}

export function googleAnalyticsPage(pathname: string) {
  const path = normalizedPathname(pathname);
  if (!path) return null;
  if (TREATMENT_PATHS.has(path)) {
    return { path: "/care", title: "Care information", group: "Care information" };
  }
  return Object.hasOwn(PUBLIC_PAGES, path) ? PUBLIC_PAGES[path] : null;
}

export function sanitizeGoogleAnalyticsPath(pathname: string) {
  return googleAnalyticsPage(pathname)?.path ?? null;
}

// Map known inputs to fixed labels. Never forward arbitrary UTM values, campaign
// names, search terms, creative labels, click IDs, or referral paths/queries.
const SOURCE_LABELS: Record<string, string> = {
  google: "google", bing: "bing", yahoo: "yahoo", duckduckgo: "duckduckgo",
  facebook: "facebook", fb: "facebook", instagram: "instagram", ig: "instagram",
  meta: "meta", youtube: "youtube", tiktok: "tiktok", linkedin: "linkedin",
  chatgpt: "chatgpt.com", "chatgpt.com": "chatgpt.com",
  perplexity: "perplexity.ai", "perplexity.ai": "perplexity.ai",
  gemini: "gemini.google.com", copilot: "copilot.microsoft.com",
  newsletter: "newsletter", google_business_profile: "google", gbp: "google", gmb: "google",
};
const MEDIUM_LABELS: Record<string, string> = {
  cpc: "cpc", ppc: "cpc", paid_search: "cpc", paid_social: "paid_social",
  "paid-social": "paid_social", social: "social", organic_social: "social",
  organic: "organic", referral: "referral", email: "email", sms: "sms",
};
const REFERRER_HOSTS = new Map([
  ["google.com", "www.google.com"], ["www.google.com", "www.google.com"],
  ["google.ca", "www.google.ca"], ["www.google.ca", "www.google.ca"],
  ["google.co.uk", "www.google.co.uk"], ["www.google.co.uk", "www.google.co.uk"],
  ["bing.com", "www.bing.com"], ["www.bing.com", "www.bing.com"],
  ["search.yahoo.com", "search.yahoo.com"], ["duckduckgo.com", "duckduckgo.com"],
  ["www.duckduckgo.com", "duckduckgo.com"], ["facebook.com", "www.facebook.com"],
  ["www.facebook.com", "www.facebook.com"], ["m.facebook.com", "www.facebook.com"],
  ["l.facebook.com", "www.facebook.com"], ["lm.facebook.com", "www.facebook.com"],
  ["instagram.com", "www.instagram.com"], ["www.instagram.com", "www.instagram.com"],
  ["l.instagram.com", "www.instagram.com"], ["youtube.com", "www.youtube.com"],
  ["www.youtube.com", "www.youtube.com"], ["tiktok.com", "www.tiktok.com"],
  ["www.tiktok.com", "www.tiktok.com"], ["linkedin.com", "www.linkedin.com"],
  ["www.linkedin.com", "www.linkedin.com"], ["chatgpt.com", "chatgpt.com"],
  ["chat.openai.com", "chatgpt.com"], ["perplexity.ai", "www.perplexity.ai"],
  ["www.perplexity.ai", "www.perplexity.ai"], ["gemini.google.com", "gemini.google.com"],
  ["copilot.microsoft.com", "copilot.microsoft.com"],
]);

export function safeGoogleAnalyticsAcquisition(search: string, referrer: string) {
  const params = new URLSearchParams(search);
  const sourceKey = params.get("utm_source")?.trim().toLowerCase() ?? "";
  const mediumKey = params.get("utm_medium")?.trim().toLowerCase() ?? "";
  const source = Object.hasOwn(SOURCE_LABELS, sourceKey) ? SOURCE_LABELS[sourceKey] : "";
  const medium = Object.hasOwn(MEDIUM_LABELS, mediumKey) ? MEDIUM_LABELS[mediumKey] : "";
  let pageReferrer = "";
  let otherReferral = false;
  try {
    const url = new URL(referrer);
    if (["http:", "https:"].includes(url.protocol) && !url.username && !url.password &&
        !isGoogleAnalyticsProductionHostname(url.hostname)) {
      const host = REFERRER_HOSTS.get(url.hostname.toLowerCase());
      if (host) pageReferrer = `https://${host}/`;
      else otherReferral = true;
    }
  } catch { /* Empty or malformed referrer: do not manufacture a source. */ }
  return {
    page_referrer: pageReferrer,
    ...(source && medium ? { campaign_source: source, campaign_medium: medium } :
      otherReferral ? { campaign_source: "other-referral", campaign_medium: "referral" } : {}),
  };
}

export function googleAnalyticsPageParameters(pathname: string, referrer: string) {
  const page = googleAnalyticsPage(pathname);
  if (!page) return null;
  return {
    page_location: `${GOOGLE_ANALYTICS_ORIGIN}${page.path}`,
    page_path: page.path,
    page_title: `${page.title} | Sacramento Dental Medicine`,
    content_group: page.group,
    page_referrer: referrer,
  };
}

export const GOOGLE_ANALYTICS_PRIVACY_CONFIG = {
  allow_ad_personalization_signals: false,
  allow_google_signals: false,
  send_page_view: false,
  // Suppress raw UTM discovery even if a future caller supplies an unsafe URL.
  campaign_name: "",
  campaign_id: "",
  campaign_term: "",
  campaign_content: "",
};
