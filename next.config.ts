import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allows all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: '**', // allows all HTTP domains (optional)
      },
    ],
  },
};

export default nextConfig;
