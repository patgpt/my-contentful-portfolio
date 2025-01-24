import { CtfRichText } from '@/components/features/contentful';
import PageTitle from '@/components/features/PageTitle';
import { routing } from '@/i18n/routing';
import { client, previewClient } from '@/lib/client';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const params = await Promise.all(
    routing.locales.map(async locale => {
      try {
        const pages = await client.pageServiceCollection({ locale: locale });
        return (
          pages.pageServiceCollection?.items.map(page => ({
            locale,
            slug: page.slug,
          })) || []
        );
      } catch (error) {
        console.error(`Error generating params for locale ${locale}:`, error);
        return [];
      }
    }),
  );

  return params.flat();
}

interface IServicePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function Servicepage({ params }: IServicePageProps) {
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const { locale, slug } = await params;
  const pageCollection = await gqlClient.pageServiceCollection({ locale: locale, preview });

  if (!pageCollection.pageServiceCollection?.items) notFound();
  const page = pageCollection.pageServiceCollection?.items.find(page => page.slug === slug);
  console.log(page);
  return (
    <div className="container mx-auto p-12">
      <PageTitle titleText={page?.pageTitle} />
      <CtfRichText proseSize="prose-xl" json={page?.pageContent.json} />
    </div>
  );
}

export default Servicepage;
