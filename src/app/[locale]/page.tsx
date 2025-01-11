import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { Hero } from '@src/components/features/hero/Hero';
import { Container } from '@src/components/shared/container';
import TranslationsProvider from '@src/components/shared/i18n/TranslationProvider';
import initTranslations from '@src/i18n';
import { locales } from '@src/i18n/config';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';

interface LandingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: LandingPageProps): Promise<Metadata> {
  const params = await props.params;
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const landingPageData = await gqlClient.pageLanding({ locale: params.locale, preview });
  const page = landingPageData.pageLandingCollection?.items[0];
  const languages = locales.length > 1 ? {} : undefined;

  if (languages) {
    for (const locale of locales) {
      languages[locale] = `/${locale}`;
    }
  }

  let metadata: Metadata = {
    alternates: {
      canonical: '/',
      languages,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };

  if (page?.seoFields) {
    metadata = {
      title: page.seoFields.pageTitle,
      description: page.seoFields.pageDescription,
      robots: {
        follow: !page.seoFields.nofollow,
        index: !page.seoFields.noindex,
      },
    };
  }

  return metadata;
}

export default async function Page(props: LandingPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { isEnabled: preview } = await draftMode();
  const { t, resources } = await initTranslations({ locale });
  const gqlClient = preview ? previewClient : client;

  const landingPageData = await gqlClient.pageLanding({ locale, preview });
  const page = landingPageData.pageLandingCollection?.items[0];

  if (!page) {
    notFound();
  }

  const blogPostsData = await gqlClient.pageBlogPostCollection({
    limit: 6,
    locale,
    order: PageBlogPostOrder.PublishedDateDesc,
    where: {
      slug_not: page?.featuredBlogPost?.slug,
    },
    preview,
  });
  const posts = blogPostsData.pageBlogPostCollection?.items;

  if (!page?.featuredBlogPost || !posts) {
    return;
  }

  return (
    <TranslationsProvider locale={locale} resources={resources}>
      <Hero locale={locale} />

      <Container className="my-8 md:mb-10 lg:mb-16">
        <h2 className="mb-4 md:mb-6">{t('landingPage.latestArticles')}</h2>
        <Link className="my-8" href={`/${page.featuredBlogPost.slug}`}>
          <ArticleHero article={page.featuredBlogPost} />
        </Link>
        <ArticleTileGrid className="my-md:grid-cols-2 lg:grid-cols-3" articles={posts} />
      </Container>
    </TranslationsProvider>
  );
}
