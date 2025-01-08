import { draftMode } from 'next/headers';

import { client, previewClient } from '@src/lib/client';

interface ExperienceDetailPageProps {
  params: {
    locale: string;
  };
}

async function ExperienceDetailPage({ params: { locale } }: ExperienceDetailPageProps) {
  const { isEnabled: preview } = draftMode();
  const gqlClient = preview ? previewClient : client;
  const allExperiences = await gqlClient.getAllExperiences({ locale, preview });
  console.log(allExperiences);
  return <div>ExperienceDetailPage</div>;
}

export default ExperienceDetailPage;
