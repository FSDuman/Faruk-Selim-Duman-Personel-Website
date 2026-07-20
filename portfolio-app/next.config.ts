import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three.js ships ESM; transpile so R3F/drei resolve cleanly in the App Router.
  transpilePackages: ["three"],
  images: {
    // Local assets only for now; add remote patterns here if you host media elsewhere.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
