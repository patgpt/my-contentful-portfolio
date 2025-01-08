import { draftMode } from 'next/headers';

import { client, previewClient } from '@src/lib/client';

interface ExperiencePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

async function ExperiencePage({ params: { locale, slug } }: ExperiencePageProps) {
  const { isEnabled: preview } = draftMode();
  const gqlClient = preview ? previewClient : client;
  const allExperiences = await gqlClient.getAllExperiences({ locale, preview });

  const experienceList = allExperiences.pageExperienceCollection?.items;
  console.log(experienceList);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Experience Page</h1>
    </div>
  );
}

export default ExperiencePage;
