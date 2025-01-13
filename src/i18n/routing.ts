import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en-US', 'fr-CA'],
  localeDetection: true,
  localePrefix: 'always',
  // pathnames: {
  //   // If all locales use the same pathname, a single
  //   // external path can be used for all locales
  //   '/': '/',
  //   '/about': '/about',
  //   '/experience': '/experience',
  //   '/blog': '/blog',
  // },
  defaultLocale: 'en-US',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
