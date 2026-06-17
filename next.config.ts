import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sacramentodentalmedicine.com",
        pathname: "/img/upload/**",
      },
      {
        protocol: "https",
        hostname: "optimasites.cloudfrontend.net",
        pathname: "/img/upload/**",
      },
    ],
  },
};

export default nextConfig;
