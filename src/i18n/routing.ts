/**
 * @fileoverview Defines routing configuration for internationalization using next-intl.
 * Includes locale settings, detection preferences, and navigation utilities.
 */

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

/**
 * Core routing configuration for internationalization
 * @constant
 */
export const routing = defineRouting({
  /** List of supported locale identifiers */
  locales: ['en-US', 'fr-CA'],

  /** Enable automatic locale detection based on Accept-Language header */
  localeDetection: true,

  /** Forces locale prefix in all routes */
  localePrefix: 'always',

  /**
   * Cookie configuration for locale persistence
   * @property {Object} localeCookie - Configuration for the locale cookie
   */
  localeCookie: {
    /** Cookie name for storing locale preference */
    name: 'locale',
    /** Cookie expiration time in seconds (30 days) */
    maxAge: 60 * 60 * 24 * 30,
  },

  /** Default locale when no specific locale is detected or specified */
  defaultLocale: 'en-US',
});

/**
 * Navigation utilities configured with internationalization support
 * @see {@link https://next-intl-docs.vercel.app/docs/routing/navigation Next-intl Navigation}
 */
export const {
  /** Internationalized Link component */
  Link,
  /** Redirect utility with locale support */
  redirect,
  /** Hook for accessing current pathname */
  usePathname,
  /** Router instance with internationalization support */
  useRouter,
  /** Utility for getting localized pathnames */
  getPathname,
} = createNavigation(routing);
