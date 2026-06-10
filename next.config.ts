import type { NextConfig } from "next";

const mediaOrigin = process.env.SEAMERCO_MEDIA_ORIGIN?.replace(/\/$/, "");
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  assetPrefix: "/media/site-assets",

  async rewrites() {
    if (!isProduction || !mediaOrigin) return [];

    return [
      {
        source: "/media/:path*",
        destination: `${mediaOrigin}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;