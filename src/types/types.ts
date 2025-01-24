import type { Locale } from '@/i18n/routing';

// Type representing the parameters for a page
export type PageParams = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};
