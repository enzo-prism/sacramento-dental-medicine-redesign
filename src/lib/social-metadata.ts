import { seo } from "@/data/site";

// Child metadata objects replace (rather than merge) parent Open Graph / X fields.
// Declare the shared brand card explicitly when a route has no custom image file.
export const openGraphImages = [{
  url: "/opengraph-image", width: 1200, height: 630,
  alt: seo.ogImageAlt, type: "image/png",
}];
export const twitterImages = [{
  url: "/twitter-image", width: 1200, height: 630,
  alt: seo.ogImageAlt, type: "image/png",
}];
