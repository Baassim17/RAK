import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  // hide the Next.js dev-mode route indicator ("N" button); errors still surface
  devIndicators: false,
  images: {
    // Next 16 only allows quality 75 by default; 50 is used for the faint chapter background photos
    qualities: [50, 75],
  },
};

export default nextConfig;
