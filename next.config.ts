import type { NextConfig } from "next";

const mediaOrigin = process.env.SEAMERCO_MEDIA_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async rewrites() {
    if (!mediaOrigin) return [];

    return [
      {
        source: "/media/:path*",
        destination: `${mediaOrigin}/:path*`,
      },
    ];
  },
};

export default nextConfig;