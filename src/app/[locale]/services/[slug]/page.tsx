import { CtfRichText } from '@/components/features/contentful';
import PageTitle from '@/components/features/PageTitle';
import { routing } from '@/i18n/routing';
import { client, previewClient } from '@/lib/client';
import type { PageParams } from '@/types/types';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { locales } = routing;
  const experiences = await client.pageBlogPostCollection({ limit: 10 });

  return locales.flatMap(locale => {
    const localeExperiences = experiences.pageBlogPostCollection?.items ?? [];
    return localeExperiences.map(experience => ({
      params: {
        locale,
        slug: experience.slug,
      },
    }));
  });
}

async function Servicepage({ params }: PageParams) {
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
