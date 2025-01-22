import { draftMode } from 'next/headers';
import type { PageExperience } from '@/lib/__generated/sdk';

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
  const allExperiences = await gqlClient.getAllExperiences({ locale, preview });
  const experienceList = (allExperiences.pageExperienceCollection?.items.filter(
    (item): item is PageExperience => item !== null,
  ) || []) as PageExperience[];

  return (
    <main className="bg-base-100 relative min-h-screen w-full overflow-hidden">
      <div className="relative container mx-auto px-4">
        <ExperienceTimeline experiences={experienceList} />
      </div>
    </main>
  );
}

export default ExperiencePage;
