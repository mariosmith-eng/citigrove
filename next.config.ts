import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // No Next.js image optimisation server on Firebase Hosting static deploy.
    // Images are pre-optimised .webp files served via GCS.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
