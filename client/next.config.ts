import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // next.config.js

  images: {
    domains: ["cdn.neowin.com", "example.com", "anotherdomain.com"],
  },
};

export default nextConfig;
