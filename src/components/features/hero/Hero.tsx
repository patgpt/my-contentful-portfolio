import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import SocialButtonRow from '@src/components/SocialButtonRow';
import initTranslations from '@src/i18n';
import type { GetHeroQuery } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';

// Move interfaces to separate types file
interface HeroData
  extends NonNullable<NonNullable<GetHeroQuery['componentHeroCollection']>['items'][0]> {}

interface LandingPageHeroProps {
  locale: string;
}

// Separate data fetching logic
async function getHeroData(locale: string, preview: boolean) {
  const gqlClient = preview ? previewClient : client;
  const data = await gqlClient.GetHero({ locale, preview });

  if (!data.componentHeroCollection?.items[0]) {
    return notFound();
  }

  return data.componentHeroCollection.items[0];
}

// Separate UI component
function HeroContent({ hero }: { hero: HeroData }) {
  const { url } = hero.heroImage || {};

  return (
    <div className="hero min-h-screen text-balance bg-gradient-to-tr from-primary/20 to-secondary/20 pt-16">
      <div className="hero-content flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="avatar mb-6">
            <div className="w-64 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              {url && (
                <Image
                  width={300}
                  height={300}
                  src={url}
                  alt=""
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                  quality={90}
                  aria-hidden="false"
                />
              )}
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold">{hero.heading}</h1>
          <p className="mb-6 max-w-prose">{hero.subHeading}</p>
          <SocialButtonRow />
        </div>
      </div>
    </div>
  );
}

export default async function Hero({ locale }: LandingPageHeroProps) {
  const { isEnabled: preview } = draftMode();
  const { t } = await initTranslations({ locale });

  return <HeroContent hero={await getHeroData(locale, preview)} />;
}

export { Hero };
