import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three.js ships ESM; transpile so R3F/drei resolve cleanly in the App Router.
  transpilePackages: ["three"],
  output: 'export', // Sitenin statik HTML çıktı vermesini sağlar (GitHub Pages için zorunlu)
  images: {
    // Local assets only for now; add remote patterns here if you host media elsewhere.
    formats: ["image/avif", "image/webp"],
    unoptimized: true, // Görsellerin derleme sırasında hata vermesini önler (GitHub Pages için zorunlu)
  },
};

export default nextConfig;