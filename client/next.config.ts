import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // next.config.js

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all domains
      },
    ],
  },
};

export default nextConfig;
