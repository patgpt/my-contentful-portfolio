import path from 'node:path';

import type { MetadataRoute } from 'next';

import type { SitemapPagesFieldsFragment } from '@/lib/__generated/sdk';
import { client } from '@/lib/client';
import { routing } from '@/i18n/routing';

type SitemapFieldsWithoutTypename = Omit<SitemapPagesFieldsFragment, '__typename'>;
type SitemapPageCollection = SitemapFieldsWithoutTypename[keyof SitemapFieldsWithoutTypename];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const promises =
    routing.locales?.map(locale => client.sitemapPages({ locale })).filter(page => Boolean(page)) ||
    [];
  const dataPerLocale: SitemapFieldsWithoutTypename[] = await Promise.all(promises);
  const fields = dataPerLocale
    .flatMap((localeData, index) =>
      Object.values(localeData).flatMap((pageCollection: SitemapPageCollection) =>
        pageCollection?.items.map(item => {
          const localeForUrl =
            routing.locales?.[index] === routing.defaultLocale
              ? undefined
              : routing.locales?.[index];
          const url = new URL(
            path.join(localeForUrl || '', item?.slug || ''),
            process.env.NEXT_PUBLIC_BASE_URL!,
          ).toString();

          return item && !item.seoFields?.excludeFromSitemap
            ? {
                lastModified: item.sys.publishedAt,
                url,
              }
            : undefined;
        }),
      ),
    )
    .filter(field => field !== undefined);

  return fields;
}
