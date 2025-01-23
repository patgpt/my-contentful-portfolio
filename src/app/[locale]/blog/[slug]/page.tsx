import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { ArticleContent, ArticleHero, ArticleTileGrid } from '@/components/features/article';
import { Container } from '@/components/shared/container';

import { client, previewClient } from '@/lib/client';
import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import type { PageBlogPostFieldsFragment, PageLandingFieldsFragment } from '@/lib/__generated/sdk';

export async function generateStaticParams() {
  const gqlClient = client;

  const params = await Promise.all(
    routing.locales.map(async locale => {
      try {
        const { pageBlogPostCollection } = await gqlClient.pageBlogPostCollection({
          locale,
          limit: 100,
        });

        return (
          pageBlogPostCollection?.items
            ?.filter((blogPost): blogPost is PageBlogPostFieldsFragment & { slug: string } =>
              Boolean(blogPost?.slug),
            )
            .map(blogPost => ({
              locale,
              slug: `blog/${blogPost.slug}`,
            })) || []
        );
      } catch (error) {
        console.error(`Failed to fetch blog posts for locale: ${locale}`, error);
        return [];
      }
    }),
  );

  return params.flat();
}

function checkIfFeatured(blogPostSlug: string, featuredSlug?: string): boolean {
  return blogPostSlug === featuredSlug;
}

const HeroSection = ({
  blogPost,
  isFeatured,
}: {
  blogPost: PageBlogPostFieldsFragment;
  isFeatured: boolean;
}) => (
  <Container>
    <ArticleHero article={blogPost} isFeatured={isFeatured} isReversedLayout />
  </Container>
);

const MainContent = ({ blogPost }: { blogPost: PageBlogPostFieldsFragment }) => (
  <Container className="mt-8 max-w-4xl">
    <ArticleContent article={blogPost} />
  </Container>
);

const RelatedPosts = async ({ relatedPosts }: { relatedPosts: PageBlogPostFieldsFragment[] }) => {
  const t = await getTranslations('article');

  return (
    relatedPosts?.length > 0 && (
      <Container className="mt-8 max-w-5xl">
        <h2 className="mb-4 md:mb-6">{t('relatedArticles')}</h2>
        <ArticleTileGrid className="md:grid-cols-2" articles={relatedPosts} />
      </Container>
    )
  );
};
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;

  try {
    const { pageBlogPostCollection } = await gqlClient.pageBlogPost({ locale, slug, preview });
    const { pageLandingCollection } = await gqlClient.pageLanding({ locale, preview });

    const landingPage = pageLandingCollection?.items?.[0] as PageLandingFieldsFragment | undefined;
    const blogPost = pageBlogPostCollection?.items?.[0] as PageBlogPostFieldsFragment | undefined;
    const relatedPosts = blogPost?.relatedBlogPostsCollection
      ?.items as PageBlogPostFieldsFragment[];

    if (!blogPost) {
      notFound();
    }

    const isFeatured = checkIfFeatured(
      blogPost.slug!,
      landingPage?.featuredBlogPost?.slug ?? undefined,
    );

    return (
      <>
        <HeroSection blogPost={blogPost} isFeatured={isFeatured} />
        <MainContent blogPost={blogPost} />
        <RelatedPosts relatedPosts={relatedPosts} />
      </>
    );
  } catch (error) {
    // Replace console.error with a centralized logging service
    console.error('Failed to fetch blog post data', error);

    notFound();
  }
}
