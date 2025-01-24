// types/pageParams.ts
import type { Locale } from 'next-intl';

export type PageParams = {
  params: {
    locale: Locale;
    slug: string;
  };
};
