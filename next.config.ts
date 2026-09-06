import type { NextConfig } from "next";

// All images are self-hosted under /public, so no remote image patterns are
// needed. Re-add `images.remotePatterns` here if a remote source is introduced.
const servicesDestination = "/our-services";

const restoredServiceRoutes = [
  "new-patients",
  "root-canal-therapy",
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

const legacyRedirects = [
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
  { source: "/meet-dr-sheppard", destination: "/#doctors" },
  { source: "/oral-surgery", destination: "/tooth-extractions" },
  { source: "/our-dental-team", destination: "/#doctors" },
  { source: "/our-office", destination: "/schedule" },
  { source: "/patient-reviews", destination: "/reviews" },
  { source: "/platelet-rich-fibrin", destination: servicesDestination },
  { source: "/privacy-policy", destination: "/privacy-practices/" },
  { source: "/preventive-care", destination: servicesDestination },
  { source: "/restorations", destination: "/dental-crowns" },
  { source: "/sedation-dentistry-guide", destination: "/sedation-dentistry" },
  { source: "/technology", destination: "/#technology" },
  { source: "/teeth-whitening", destination: servicesDestination },
  { source: "/veneers", destination: servicesDestination },
] as const;

const nextConfig: NextConfig = {
  // Preserve legacy trailing-slash URLs long enough to redirect them directly
  // to their semantic destination instead of creating an extra normalization hop.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sacramentodentalmedicine.com" }],
        destination: "https://sacramentodentalmedicine.com/:path*",
        permanent: true,
      },
      { source: "/reviews/", destination: "/reviews", permanent: true },
      { source: "/schedule/", destination: "/schedule", permanent: true },
      {
        source: "/meet-dr-narodovich/",
        destination: "/meet-dr-narodovich",
        permanent: true,
      },
      ...restoredServiceRoutes.map((slug) => ({
        source: `/${slug}/`,
        destination: `/${slug}`,
        permanent: true,
      })),
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      {
        source: "/services/crowns-bridges",
        destination: "/dental-crowns",
        permanent: true,
      },
      {
        source: "/services/crowns-bridges/",
        destination: "/dental-crowns",
        permanent: true,
      },
      ...legacyRedirects.flatMap(({ source, destination }) => [
        { source, destination, permanent: true },
        { source: `${source}/`, destination, permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
