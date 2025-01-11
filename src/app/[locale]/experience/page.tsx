import { draftMode } from 'next/headers';

import { ExperienceTimeline } from '@src/components/features/experience/ExperienceTimeline';
import { client, previewClient } from '@src/lib/client';

interface ExperiencePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function ExperiencePage(props: ExperiencePageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const allExperiences = await gqlClient.getAllExperiences({ locale, preview });
  const experienceList = allExperiences.pageExperienceCollection?.items || [];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-base-100">
      <div className="container relative mx-auto px-4">
        <ExperienceTimeline experiences={experienceList} />
      </div>
    </main>
  );
}

export default ExperiencePage;
