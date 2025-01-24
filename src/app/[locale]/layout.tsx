import { PageParams } from '@/types/pageParams';
import { client } from '@/lib/client';
import { routing } from '@/i18n/routing';

export async function generateStaticParams(): Promise<PageParams[]> {
  const { locales } = routing;
  const experiences = await client.pageExperienceCollection({ limit: 10 });

  return locales.flatMap(locale => {
    const localeExperiences = experiences.pageExperienceCollection?.items ?? [];
    return localeExperiences.map(experience => ({
      locale,
      slug: experience.slug,
    }));
  });
}
