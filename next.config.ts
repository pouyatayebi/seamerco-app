import type { NextConfig } from "next";

const mediaOrigin = process.env.SEAMERCO_MEDIA_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!mediaOrigin) return [];

    return [
      {
        source: "/media/:path*",
        destination: `${mediaOrigin}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;