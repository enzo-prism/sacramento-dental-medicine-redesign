import type { MetadataRoute } from "next";
import { servicePages } from "@/data/service-pages";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-31"),
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
      lastModified: new Date("2026-09-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map(({ slug }) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreRoutes, ...serviceRoutes];
}
