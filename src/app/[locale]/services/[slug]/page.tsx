import { routing } from '@/i18n/routing';
import { client, previewClient } from '@/lib/client';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const locales = routing.locales;
  const params = await Promise.all(
    locales.map(async locale => {
      const pageCollection = await client.pageServiceCollection({ locale: locale });
      const pages = pageCollection.pageServiceCollection?.items || [];

      return pages.map(page => ({
        locale,
        slug: `services/${page.slug}`,
      }));
    }),
  );
  return params;
}
async function Servicepage({ params }) {
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const locale = (await params).locale;
  const slug = (await params).slug;
  const pageCollection = await gqlClient.pageServiceCollection({ locale: locale, preview });

  console.log(pageCollection);
  if (!pageCollection.pageServiceCollection?.items) notFound();
  const page = pageCollection.pageServiceCollection?.items.find(page => page.slug === slug);
  console.log(page);
  return <div>hi</div>;
}

export default Servicepage;
