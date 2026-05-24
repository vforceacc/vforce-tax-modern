import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: "export" because it prevents API routes from working and breaks Firebase App Hosting builds
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
