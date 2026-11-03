import type { MetadataRoute } from "next";
import { servicePages } from "@/data/service-pages";
import { siteUrl } from "@/lib/site-url";

// Bump a date only when that page's own content or search listing changes.
const serviceLastModified: Record<string, string> = {
  "dental-implants": "2026-10-27",
  "wisdom-teeth": "2026-10-27",
  "dental-emergencies": "2026-11-03",
  "invisalign": "2026-11-03",
  "dental-crowns": "2026-11-03",
  "sedation-dentistry": "2026-11-03",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/new-patients`, lastModified: new Date("2026-09-06"), changeFrequency: "monthly", priority: 0.8 },
    {
      url: siteUrl,
      lastModified: new Date("2026-09-06"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/reviews`,
      lastModified: new Date("2026-08-24"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/schedule`,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/meet-dr-narodovich`,
      lastModified: new Date("2026-09-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map(({ slug }) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: new Date(serviceLastModified[slug] ?? "2026-09-06"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreRoutes, ...serviceRoutes];
}
