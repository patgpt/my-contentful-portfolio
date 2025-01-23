import { draftMode } from 'next/headers';

import { ExperienceTimeline } from '@/components/features/experience/ExperienceTimeline';
import { client, previewClient } from '@/lib/client';

interface ExperiencePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function ExperiencePage(props: ExperiencePageProps) {
  const params = await props.params;

  const { locale } = params;
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const pageExperienceCollection = await gqlClient.pageExperienceCollection({
    locale,
    preview,
    limit: 10,
  });
  const pages = pageExperienceCollection.pageExperienceCollection?.items;

  return (
    <main className="bg-base-100 relative min-h-screen w-full overflow-hidden">
      <div className="relative container mx-auto px-4">
        <ExperienceTimeline experiences={pages} />
      </div>
    </main>
  );
}

export default ExperiencePage;
