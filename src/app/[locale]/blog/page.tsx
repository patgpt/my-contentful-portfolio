import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { ArticleTileGrid } from '@src/components/features/article';
import { Container } from '@src/components/shared/container';

import { client, previewClient } from '@src/lib/client';

interface BlogListPageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function BlogListPage(props: BlogListPageProps) {
  const params = await props.params;

  const { locale } = params;

  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;

  const allBlogPosts = await gqlClient.pageBlogPostCollection({ locale, limit: 100 });
  const posts = allBlogPosts.pageBlogPostCollection;
  if (!posts?.items) {
    return notFound();
  }

  return (
    <Container className="prose prose-xl my-8 mt-20 max-w-7xl no-underline">
      <h2>{t('blog.title')}</h2>
      <div className="mb-8">
        <p className="text-lg">{t('blog.description')}</p>
      </div>
      <ArticleTileGrid articles={posts.items} />
    </Container>
  );
}

export default BlogListPage;
