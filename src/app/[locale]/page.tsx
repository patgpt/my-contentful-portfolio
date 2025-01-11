import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { notFound } from 'next/navigation';

import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { Hero } from '@src/components/features/hero/Hero';
import { Container } from '@src/components/shared/container';

import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';

import { Link, routing } from '@src/i18n/routing';
import type { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import request from '@src/i18n/request';

interface LandingPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata(props: LandingPageProps): Promise<Metadata> {
  const params = props.params;
  console.log(params);
  const t = getTranslations('nav');
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const landingPageData = await gqlClient.pageLanding({ locale: params.locale, preview });
  const page = landingPageData.pageLandingCollection?.items[0];

  let metadata: Metadata = {
    alternates: {
      canonical: '/',
      languages: routing.locales as unknown as  Languages<string>,
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
  const params = props.params;
  const t = await getTranslations('nav');

  const { locale } = params;
  console.log(locale, 'HEADER');
  const { isEnabled: preview } = await draftMode();

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
    <>
      <Hero locale={locale} />

      <Container className="my-8 md:mb-10 lg:mb-16">
        {/* TODO: FIX THIS UP */}
        <h2 className="mb-4 md:mb-6">{t('about')}</h2>
        <Link className="my-8" href={`/${page.featuredBlogPost.slug}`}>
          <ArticleHero article={page.featuredBlogPost} />
        </Link>
        <ArticleTileGrid className="my-md:grid-cols-2 lg:grid-cols-3" articles={posts} />
      </Container>
    </>
  );
}
