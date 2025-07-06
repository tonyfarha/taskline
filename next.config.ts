import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'bcrypt'],
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  /* config options here */
};

export default nextConfig;
