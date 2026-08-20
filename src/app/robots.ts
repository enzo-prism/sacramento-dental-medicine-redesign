import type { MetadataRoute } from "next";
import { isPreviewDeploy, siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPreviewDeploy ? { disallow: "/" } : { allow: "/" }),
    },
    sitemap: isPreviewDeploy ? undefined : `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
