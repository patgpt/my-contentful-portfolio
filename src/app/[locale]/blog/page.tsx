import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { ArticleTileGrid } from '@/components/features/article';
import { Container } from '@/components/shared/container';

import { client, previewClient } from '@/lib/client';
import { getTranslations } from 'next-intl/server';

async function BlogListPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const t = await getTranslations('blog');
  const allBlogPosts = await gqlClient.pageBlogPostCollection({ locale, limit: 100 });
  const posts = allBlogPosts.pageBlogPostCollection;
  if (!posts?.items) {
    return notFound();
  }

  return (
    <Container className="prose prose-xl my-8 mt-20 max-w-7xl no-underline">
      <h2>{t('title')}</h2>
      <div className="mb-8">
        <p className="text-lg">{t('description')}</p>
      </div>
      <ArticleTileGrid articles={posts.items} />
    </Container>
  );
}

export default BlogListPage;
