import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  /* config options here */
};

export default nextConfig;
