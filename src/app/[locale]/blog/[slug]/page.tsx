import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { ArticleContent, ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { Container } from '@src/components/shared/container';

import { client, previewClient } from '@src/lib/client';
import { getTranslations } from 'next-intl/server';
import type { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';
import { routing } from '@src/i18n/routing';

interface BlogPageParams {
  locale: (typeof routing.locales)[number];
  slug: string;
}

interface BlogPageProps {
  params: BlogPageParams;
}

export async function generateStaticParams(): Promise<BlogPageParams[]> {
  const gqlClient = client;
  const params: BlogPageParams[] = [];

  for (const locale of routing.locales) {
    const { pageBlogPostCollection } = await gqlClient.pageBlogPostCollection({
      locale,
      limit: 100,
    });

    if (!pageBlogPostCollection?.items) {
      continue;
    }

    const localeParams = pageBlogPostCollection.items
      .filter(
        (blogPost): blogPost is PageBlogPostFieldsFragment & { slug: string } =>
          blogPost !== null && typeof blogPost?.slug === 'string',
      )
      .map(blogPost => ({
        locale,
        slug: `blog/${blogPost.slug}`,
      }));

    params.push(...localeParams);
  }

  return params;
}

export default async function Page({ params }: BlogPageProps) {
  const t = await getTranslations('article');
  const { locale, slug } = params;

  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const { pageBlogPostCollection } = await gqlClient.pageBlogPost({ locale, slug, preview });
  const { pageLandingCollection } = await gqlClient.pageLanding({ locale, preview });
  const landingPage = pageLandingCollection?.items[0];
  const blogPost = pageBlogPostCollection?.items[0];
  const relatedPosts = blogPost?.relatedBlogPostsCollection?.items;
  const isFeatured = Boolean(
    blogPost?.slug && landingPage?.featuredBlogPost?.slug === blogPost.slug,
  );

  if (!blogPost) {
    notFound();
  }

  return (
    <>
      <Container>
        <ArticleHero article={blogPost} isFeatured={isFeatured} isReversedLayout={true} />
      </Container>
      <Container className="mt-8 max-w-4xl">
        <ArticleContent article={blogPost} />
      </Container>
      {relatedPosts && (
        <Container className="mt-8 max-w-5xl">
          <h2 className="mb-4 md:mb-6">{t('relatedArticles')}</h2>
          <ArticleTileGrid className="md:grid-cols-2" articles={relatedPosts} />
        </Container>
      )}
    </>
  );
}
