/**
 * @fileoverview Handles internationalization configuration for Next.js application
 * using next-intl library. Manages locale detection and message loading.
 */

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import type { Locale } from 'next-intl';

/**
 * Represents the structure of locale-specific messages and current locale
 * @interface LocaleMessages
 */
interface LocaleMessages {
  /** Dictionary of translation messages */
  messages: Record<string, string>;
  /** Current active locale */
  locale: Locale;
}

/**
 * Represents the structure of imported locale module
 * @interface LocaleModule
 */
interface LocaleModule {
  /** Default export containing translation messages */
  default: Record<string, string>;
}

/**
 * Configures internationalization settings for the application
 * @param {Object} params - Configuration parameters
 * @param {Promise<string>} params.requestLocale - The requested locale from the client
 * @returns {Promise<LocaleMessages>} Resolved locale configuration with messages
 * @throws {Error} When locale files cannot be loaded (handled internally)
 */
export default getRequestConfig(async ({ requestLocale }): Promise<LocaleMessages> => {
  const locale = (await requestLocale) || routing.defaultLocale;
  const isValidLocale = routing.locales.includes(locale as Locale);
  const targetLocale = isValidLocale ? locale : routing.defaultLocale;

  try {
    const messages = (await import(`./locales/${targetLocale}/common.json`)) as LocaleModule;

    return {
      locale: targetLocale as Locale,
      messages: messages.default,
    };
  } catch {
    return {
      locale: routing.defaultLocale as Locale,
      messages: {},
    };
  }
});
