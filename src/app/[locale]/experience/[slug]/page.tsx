import { setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { FaGlobe } from 'react-icons/fa';

import { CtfRichText } from '@/components/features/contentful';
import { routing } from '@/i18n/routing';
import { client, previewClient } from '@/lib/client';
import { formatDate } from '@/utils/date';
import { notFound } from 'next/navigation';
import ParallaxImage from '@/components/features/ParallaxImage';

export async function generateStaticParams() {
  const { locales } = routing;
  const experiences = await client.pageExperienceCollection({ limit: 10 });

  return locales.flatMap(locale => {
    const localeExperiences = experiences.pageExperienceCollection?.items ?? [];
    return localeExperiences.map(experience => ({
      params: {
        locale,
        slug: experience.slug,
      },
    }));
  });
}

type IBadgeRowProps = {
  skillsUsed: string[];
};

function BadgeRow({ skillsUsed }: IBadgeRowProps) {
  return (
    <>
      {skillsUsed && skillsUsed.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {skillsUsed.map(skill => (
            <span
              key={skill}
              className="badge badge-primary p-4 shadow-2xl transition-shadow hover:shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

interface IExperienceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

async function ExperienceDetailPage({ params }: IExperienceDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const experience = await gqlClient.getExperiencePageBySlug({ locale, preview, slug });
  const data = experience.pageExperienceCollection?.items[0];
  if (!data) {
    return notFound();
  }

  return (
    <article className="min-h-screen">
      <ParallaxImage src={data?.bannerImage?.url || ''} alt={data.bannerImage.description || ''} />

      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href={`/${locale}/experience`} className="btn btn-ghost mb-8 no-underline">
            ← Back to all experiences
          </Link>
          <header className="mb-8">
            {data.companyLogo?.url && (
              <Image
                src={data.companyLogo.url}
                alt={data.companyName || ''}
                width={200}
                height={200}
                className="mb-4 rounded-sm object-contain shadow-lg"
              />
            )}
            <h1 className="mb-2">{data.companyName}</h1>
            <h2 className="text-base-content/70 mt-0 text-xl font-semibold">
              {data.positionTitle}
            </h2>
            <p className="text-base-content/60 text-base">
              {formatDate(data.startDate)} - {formatDate(data.endDate)}
            </p>
          </header>

          <section className="mb-8">
            <CtfRichText proseSize="prose-2xl" json={data.jobDescription?.json} />
          </section>

          <footer className="mt-8 space-y-6">
            {/* TODO: Make this filterable */}
            <BadgeRow skillsUsed={data?.skillsUsed} />

            {data.website && (
              <Link
                href={data.website}
                className="btn btn-ghost hover:bg-base-200 gap-2 no-underline"
                target="_blank"
                rel="noopener noreferrer">
                <FaGlobe />
                <span>Visit Website</span>
              </Link>
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}

export default ExperienceDetailPage;
