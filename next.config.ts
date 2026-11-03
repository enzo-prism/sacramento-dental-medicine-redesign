import type { NextConfig } from "next";
import { siteRedirects } from "./src/lib/redirects";

// All images are self-hosted under /public, so no remote image patterns are
// needed. Re-add `images.remotePatterns` here if a remote source is introduced.
const nextConfig: NextConfig = {
  // Preserve legacy trailing-slash URLs long enough to redirect them directly
  // to their semantic destination instead of creating an extra normalization hop.
  skipTrailingSlashRedirect: true,
  async redirects() {
    // Legacy hosts, legacy paths, and trailing slashes each resolve in a
    // single 308. See src/lib/redirects.ts and its test.
    return siteRedirects();
  },
};

export default nextConfig;
