import { draftMode } from 'next/headers';

import { client, previewClient } from '@/lib/client';
import ExperienceTimeline from '@/components/features/experience/ExperienceTimeline';
import type { PageExperience } from '@/lib/__generated/sdk';

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
  const pages = pageExperienceCollection.pageExperienceCollection?.items as PageExperience[];

  return (

      <div className="relative container mx-auto px-4">
        <ExperienceTimeline experiences={pages} />
      </div>
    
  );
}

export default ExperiencePage;
