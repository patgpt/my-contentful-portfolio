import type { Messages as IntlMessages } from './i18n/locales/en-US/common.json';

declare global {
  type Messages = IntlMessages;
}

// This is important for type inference
export {};
