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

async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
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
            <h2 className="text-base-content/70 mt-0 text-xl font-semibold">
              {data.positionTitle}
            </h2>
            <p className="text-base-content/60 text-base">
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
                className="btn btn-ghost hover:bg-base-200 gap-2"
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
