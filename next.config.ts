import type { NextConfig } from "next";

// All images are self-hosted under /public, so no remote image patterns are
// needed. Re-add `images.remotePatterns` here if a remote source is introduced.
const servicesDestination = "/#services";

const legacyRedirects = [
  { source: "/about-us", destination: "/#doctors" },
  { source: "/appointments", destination: "/schedule" },
  { source: "/bruxism", destination: servicesDestination },
  { source: "/contact-us", destination: "/schedule" },
  { source: "/cosmetic", destination: servicesDestination },
  { source: "/deep-cleanings", destination: servicesDestination },
  { source: "/dental-blog", destination: servicesDestination },
  { source: "/dental-blog/archive-202508", destination: servicesDestination },
  { source: "/dental-blog/archive-202606", destination: servicesDestination },
  { source: "/dental-blog/archive-202607", destination: servicesDestination },
  {
    source: "/dental-blog/category/sedation-dentistry",
    destination: servicesDestination,
  },
  {
    source: "/dental-blog/2746152-is-sedation-dentistry-right-for-you",
    destination: servicesDestination,
  },
  {
    source: "/dental-blog/2758139-choosing-sedation-dentistry-for-treatment",
    destination: servicesDestination,
  },
  {
    source: "/dental-blog/2758140-sedation-dentistry-in-sacramento-separating-the-myths-from-the-facts",
    destination: servicesDestination,
  },
  {
    source:
      "/dental-blog/2758141-no-fear-no-anxiety-dentistry-in-antelope-ca-comfortable-care-for-the-whole-family",
    destination: servicesDestination,
  },
  { source: "/dental-care-children", destination: servicesDestination },
  { source: "/dental-crowns", destination: servicesDestination },
  { source: "/dental-emergencies", destination: "/schedule" },
  { source: "/dental-implants", destination: servicesDestination },
  { source: "/gum-disease-treatment", destination: servicesDestination },
  { source: "/invisalign", destination: servicesDestination },
  { source: "/meet-dr-narodovich", destination: "/#doctors" },
  { source: "/meet-dr-sheppard", destination: "/#doctors" },
  { source: "/oral-surgery", destination: servicesDestination },
  { source: "/orthodontics", destination: servicesDestination },
  { source: "/our-dental-team", destination: "/#doctors" },
  { source: "/our-office", destination: "/schedule" },
  { source: "/our-services", destination: servicesDestination },
  { source: "/patient-reviews", destination: "/reviews" },
  { source: "/platelet-rich-fibrin", destination: servicesDestination },
  { source: "/privacy-policy", destination: "/privacy-practices/" },
  { source: "/preventive-care", destination: servicesDestination },
  { source: "/restorations", destination: servicesDestination },
  { source: "/root-canal-therapy", destination: servicesDestination },
  { source: "/sedation-dentistry-guide", destination: servicesDestination },
  { source: "/sedation-dentistry", destination: servicesDestination },
  { source: "/technology", destination: "/#technology" },
  { source: "/teeth-whitening", destination: servicesDestination },
  { source: "/tooth-extractions", destination: servicesDestination },
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
      ...legacyRedirects.flatMap(({ source, destination }) => [
        { source, destination, permanent: true },
        { source: `${source}/`, destination, permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
