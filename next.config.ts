import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/en-US',
      permanent: true, // 308 permanent redirect
    },
  ],
  env: {
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
  },
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'images.eu.ctfassets.net',
      },
    ],
  },
};

export default withNextIntl(config);
