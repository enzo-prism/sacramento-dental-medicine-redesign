// Permanent redirects for legacy URLs. `next.config.ts` serves this list.
// Keep this module free of imports so the config loader and node tests can
// both read it directly.

export const CANONICAL_ORIGIN = "https://sacramentodentalmedicine.com";

/** Old hosts that still receive search clicks and must land in one hop. */
export const LEGACY_HOSTS = ["www.sacramentodentalmedicine.com"] as const;

export type SiteRedirect = {
  source: string;
  destination: string;
  permanent: true;
  has?: { type: "host"; value: string }[];
};

const servicesDestination = "/our-services";

/** Indexable routes whose old trailing-slash URL redirects to the clean path. */
export const trailingSlashRoutes = [
  "reviews",
  "schedule",
  "meet-dr-narodovich",
  "meet-dr-sheppard",
  "wisdom-teeth-removal-sacramento",
  "new-patients",
  "root-canal-therapy",
  "wisdom-teeth",
  "platelet-rich-fibrin",
  "our-services",
  "dental-crowns",
  "sedation-dentistry",
  "orthodontics",
  "invisalign",
  "tooth-extractions",
  "dental-implants",
  "gum-disease-treatment",
  "dental-emergencies",
] as const;

/**
 * Current pages whose canonical URL ends in a slash. The old-host catch-all
 * drops a trailing slash, so these keep theirs with an explicit rule.
 */
export const canonicalSlashPaths = ["/privacy-practices/"] as const;

/** Old site paths. Each also redirects with a trailing slash. */
export const legacyRedirects = [
  { source: "/home", destination: "/" },
  { source: "/services/crowns-bridges", destination: "/dental-crowns" },
  { source: "/about-us", destination: "/#doctors" },
  { source: "/appointments", destination: "/schedule" },
  { source: "/bruxism", destination: servicesDestination },
  { source: "/contact-us", destination: "/schedule" },
  { source: "/cosmetic", destination: servicesDestination },
  { source: "/deep-cleanings", destination: "/gum-disease-treatment" },
  { source: "/dental-blog", destination: servicesDestination },
  { source: "/dental-blog/archive-202508", destination: servicesDestination },
  { source: "/dental-blog/archive-202606", destination: servicesDestination },
  { source: "/dental-blog/archive-202607", destination: servicesDestination },
  {
    source: "/dental-blog/category/sedation-dentistry",
    destination: "/sedation-dentistry",
  },
  {
    source: "/dental-blog/2746152-is-sedation-dentistry-right-for-you",
    destination: "/sedation-dentistry",
  },
  {
    source: "/dental-blog/2758139-choosing-sedation-dentistry-for-treatment",
    destination: "/sedation-dentistry",
  },
  {
    source: "/dental-blog/2758140-sedation-dentistry-in-sacramento-separating-the-myths-from-the-facts",
    destination: "/sedation-dentistry",
  },
  {
    source:
      "/dental-blog/2758141-no-fear-no-anxiety-dentistry-in-antelope-ca-comfortable-care-for-the-whole-family",
    destination: "/sedation-dentistry",
  },
  { source: "/dental-care-children", destination: servicesDestination },
  { source: "/oral-surgery", destination: "/tooth-extractions" },
  { source: "/our-dental-team", destination: "/#doctors" },
  { source: "/our-office", destination: "/schedule" },
  { source: "/patient-reviews", destination: "/reviews" },
  { source: "/privacy-policy", destination: "/privacy-practices/" },
  { source: "/wisdom-teeth-removal", destination: "/wisdom-teeth" },
  { source: "/prf", destination: "/platelet-rich-fibrin" },
  { source: "/grafting", destination: "/platelet-rich-fibrin" },
  { source: "/preventive-care", destination: servicesDestination },
  { source: "/restorations", destination: "/dental-crowns" },
  { source: "/sedation-dentistry-guide", destination: "/sedation-dentistry" },
  { source: "/technology", destination: "/#technology" },
  { source: "/teeth-whitening", destination: servicesDestination },
  { source: "/veneers", destination: servicesDestination },
] as const;

/** Redirects on the canonical host. Every destination is a final URL. */
function pathRedirects(): { source: string; destination: string }[] {
  return [
    ...trailingSlashRoutes.map((slug) => ({
      source: `/${slug}/`,
      destination: `/${slug}`,
    })),
    ...legacyRedirects.flatMap(({ source, destination }) => [
      { source, destination },
      { source: `${source}/`, destination },
    ]),
  ];
}

/**
 * The full ordered redirect list. Old-host URLs that match a known path go
 * straight to the final canonical URL, so `www` + legacy path or trailing
 * slash is one 308 instead of a host hop followed by a path hop. Anything else
 * on an old host keeps its path (without a trailing slash, as Next's `:path*`
 * captures it) on the canonical host.
 */
export function siteRedirects(): SiteRedirect[] {
  const paths = pathRedirects();
  const legacyHostRules = LEGACY_HOSTS.flatMap((host) => {
    const has = [{ type: "host" as const, value: host }];
    return [
      ...paths.map(({ source, destination }) => ({
        source,
        destination: `${CANONICAL_ORIGIN}${destination}`,
        permanent: true as const,
        has,
      })),
      ...canonicalSlashPaths.map((path) => ({
        source: path,
        destination: `${CANONICAL_ORIGIN}${path}`,
        permanent: true as const,
        has,
      })),
      {
        source: "/:path*",
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true as const,
        has,
      },
    ];
  });

  return [
    ...legacyHostRules,
    ...paths.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true as const,
    })),
  ];
}
