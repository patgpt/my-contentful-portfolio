import { PageParams } from '@/types/pageParams';
import { client } from '@/lib/client';
import { routing } from '@/i18n/routing';

export async function generateStaticParams(): Promise<PageParams[]> {
  const { locales } = routing;
  const services = await client.pageServiceCollection({ limit: 10 });

  return locales.flatMap(locale => {
    const localeServices = services.pageServiceCollection?.items ?? [];
    return localeServices.map(service => ({
      locale,
      slug: service.slug,
    }));
  });
}
