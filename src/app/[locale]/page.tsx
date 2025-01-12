// Next.js imports
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

// Component imports
import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { Hero } from '@src/components/features/hero/Hero';
import { Container } from '@src/components/shared/container';

// API and data imports
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';

// i18n imports
import { Link, routing } from '@src/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';

interface PageParams {
  params: {
    locale: string;
  };
}

async function generatePageMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const gqlClient = client;
  const landingPageData = await gqlClient.pageLanding({ locale, preview: false });
  const page = landingPageData.pageLandingCollection?.items[0];

  const defaultMetadata: Metadata = {
    alternates: {
      canonical: '/',
      languages: routing.locales as never,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };

  if (!page?.seoFields) return defaultMetadata;

  return {
    ...defaultMetadata,
    title: page.seoFields.pageTitle,
    description: page.seoFields.pageDescription,
    robots: {
      follow: !page.seoFields.nofollow,
      index: !page.seoFields.noindex,
    },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata();
}

export default async function Page({ params }: PageParams) {
  console.log(params.locale, 'PAGE');
  const locale = await getLocale();
  const t = await getTranslations();
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;

  // Fetch landing page data
  const landingPageData = await gqlClient.pageLanding({ locale, preview });
  const page = landingPageData.pageLandingCollection?.items[0];
  if (!page) notFound();

  // Fetch blog posts
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
  if (!page?.featuredBlogPost || !posts) return null;

  return (
    <>
      <Hero locale={locale} />
      <Container className="my-8 md:mb-10 lg:mb-16">
        <h2 className="mb-4 md:mb-6">{t('landingPage.featuredArticle')}</h2>
        <Link className="my-8" href={`/${page.featuredBlogPost.slug}`}>
          <ArticleHero article={page.featuredBlogPost} />
        </Link>
        <ArticleTileGrid className="my-md:grid-cols-2 lg:grid-cols-3" articles={posts} />
      </Container>
    </>
  );
}
