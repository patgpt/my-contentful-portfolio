import { draftMode } from 'next/headers';

import { ExperienceTimeline } from '@src/components/features/experience/ExperienceTimeline';
import { client, previewClient } from '@src/lib/client';

interface ExperiencePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

async function ExperiencePage({ params: { locale } }: ExperiencePageProps) {
  const { isEnabled: preview } = draftMode();
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
