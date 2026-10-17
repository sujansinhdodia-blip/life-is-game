import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow next/image to serve images from /public (default, no config needed)
  // Add remote domains here if ever needed
  images: {
    // No remote patterns needed — all images are local
    remotePatterns: [],
    // Enable modern formats
    formats: ["image/avif", "image/webp"],
  },

  // Ensure the public/images folder is included in the build output
  // (Next.js handles this automatically for /public)

  // Strict mode for better dev warnings
  reactStrictMode: true,
};

export default nextConfig;
