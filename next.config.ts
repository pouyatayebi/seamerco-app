import type { NextConfig } from "next";

const mediaOrigin = process.env.SEAMERCO_MEDIA_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "130.185.120.227",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "seamerco-group.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "www.seamerco-group.com",
        pathname: "/media/**",
      },
    ],
  },

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