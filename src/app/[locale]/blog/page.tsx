import { PageParams } from '@/types/pageParams';
import { client } from '@/lib/client';
import { routing } from '@/i18n/routing';

export async function generateStaticParams(): Promise<PageParams[]> {
  const { locales } = routing;
  const blogPosts = await client.pageBlogPostCollection({ limit: 10 });

  return locales.flatMap(locale => {
    const localeBlogPosts = blogPosts.pageBlogPostCollection?.items ?? [];
    return localeBlogPosts.map(blogPost => ({
      locale,
      slug: blogPost.slug,
    }));
  });
}
