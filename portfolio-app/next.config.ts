import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // Sitenin statik HTML çıktı vermesini sağlar (GitHub Pages için zorunlu)
  images: {
    // Local assets only for now; add remote patterns here if you host media elsewhere.
    formats: ["image/avif", "image/webp"],
    unoptimized: true, // Görsellerin derleme sırasında hata vermesini önler (GitHub Pages için zorunlu)
  },
};

export default nextConfig;