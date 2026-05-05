import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/vforce-tax-modern',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
