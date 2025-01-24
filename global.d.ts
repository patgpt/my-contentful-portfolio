import en from './messages/en.json';

type Messages = typeof en;

// Extend the `IntlMessages` interface with the message keys from the JSON files  
declare global {
  // Use type safe message keys with `next-intl`
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

// Next-intl configuration for locale detection
import { routing } from '@/i18n/routing';

declare module 'next-intl' {
  interface AppConfig {
    // ...
    Locale: (typeof routing.locales)[number];
  }
}
