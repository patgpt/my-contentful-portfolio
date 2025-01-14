import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { FaGlobe } from 'react-icons/fa';
import { setRequestLocale } from 'next-intl/server';

import { CtfRichText } from '@src/components/features/contentful';
import type { PageExperience } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';
import { formatDate } from '@src/utils/date';
import { routing } from '@src/i18n/routing';

interface ExperiencePageParams {
  locale: string;
  slug: string;
}

interface ExperienceDetailPageProps {
  params: Promise<ExperiencePageParams>;
}

export async function generateStaticParams(): Promise<ExperiencePageParams[]> {
  const defaultLocale = routing.defaultLocale;
  const gqlClient = client;
  const { pageExperienceCollection } = await gqlClient.getAllExperiences({ locale: defaultLocale });

  if (!pageExperienceCollection?.items) {
    return [];
  }

  const paths: ExperiencePageParams[] = [];
  for (const locale of routing.locales) {
    for (const experience of pageExperienceCollection.items) {
      if (experience?.slug) {
        paths.push({
          locale: locale,
          slug: experience.slug,
        });
      }
    }
  }

  return paths;
}

async function ExperienceDetailPage({ params: paramsPromise }: ExperienceDetailPageProps) {
  const { locale, slug } = await paramsPromise;
  setRequestLocale(locale);

  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const experience = await gqlClient.getExperienceBySlug({ locale, preview, slug });
  const data = experience.pageExperienceCollection?.items[0] as PageExperience | undefined;
  if (!data) {
    return <div className="container mx-auto">Experience not found</div>;
  }

  return (
    <article className="min-h-screen">
      <div
        className="relative h-[300px] w-full bg-cover bg-fixed bg-center bg-no-repeat md:h-[400px]"
        style={{
          backgroundImage: `url(${data.bannerImage?.url ?? '/default-banner.jpg'})`,
        }}
      />

      <main className="container mx-auto px-4 py-8 md:px-8">
        <div className="prose prose-lg mx-auto max-w-4xl">
          <header className="mb-8">
            {data.companyLogo?.url && (
              <Image
                src={data.companyLogo.url}
                alt={data.companyName || ''}
                width={200}
                height={200}
                className="mb-4 object-contain"
              />
            )}
            <h1 className="mb-2">{data.companyName}</h1>
            <h2 className="mt-0 text-xl font-semibold text-base-content/70">
              {data.positionTitle}
            </h2>
            <p className="text-base text-base-content/60">
              {formatDate(data.startDate)} - {formatDate(data.endDate)}
            </p>
          </header>

          <section className="mb-8">
            <CtfRichText json={data.jobDescription?.json} />
          </section>

          <footer className="mt-8 space-y-6">
            {data.skillsUsed && data.skillsUsed.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.skillsUsed.map(skill => (
                  <span
                    key={skill}
                    className="badge badge-primary p-4 transition-shadow hover:shadow-lg">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {data.website && (
              <Link
                href={data.website}
                className="btn btn-ghost gap-2 hover:bg-base-200"
                target="_blank"
                rel="noopener noreferrer">
                <FaGlobe />
                <span>Visit Website</span>
              </Link>
            )}
          </footer>
        </div>
      </main>
    </article>
  );
}

export default ExperienceDetailPage;
