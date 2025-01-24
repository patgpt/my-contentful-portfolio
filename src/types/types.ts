// types/pageParams.ts
import type { Locale } from 'next-intl';

export type PageParams = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};
