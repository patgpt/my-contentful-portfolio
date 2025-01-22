import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import SocialButtonRow from '@src/components/SocialButtonRow';
import { client, previewClient } from '@src/lib/client';
import type { HeroFieldsFragment } from '@src/lib/__generated/sdk';

// Separate data fetching logic with error handling
async function getHeroData(locale: string, preview: boolean): Promise<HeroFieldsFragment> {
  try {
    const gqlClient = preview ? previewClient : client;
    const data = await gqlClient.GetHero({ locale, preview });

    if (!data.componentHeroCollection?.items[0]) {
      throw new Error('Hero data not found');
    }

    return data.componentHeroCollection.items[0];
  } catch (error) {
    console.error('Failed to fetch hero data:', error);
    console.error(`Locale: ${locale}, Preview: ${preview}`);
    notFound();
  }
}

// Separate UI component
function HeroContent({ hero }: { hero: HeroFieldsFragment }) {
  const { url } = hero.heroImage || {};

  return (
    <div className="hero min-h-screen text-balance bg-linear-to-tr from-primary/20 to-secondary/20 pt-16">
      <div className="hero-content flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="avatar mb-6">
            <div className="w-64 rounded-full ring-3 ring-primary ring-offset-2 ring-offset-base-100">
              {url && (
                <Image
                  width={300}
                  height={300}
                  src={url}
                  alt="Hero Image"
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

type HeroProps = HeroFieldsFragment & { locale: string };

export default async function Hero({ locale }: HeroProps) {
  const { isEnabled: preview } = await draftMode();

  try {
    const heroData = await getHeroData(locale, preview);
    return <HeroContent hero={heroData} />;
  } catch (error) {
    console.error('Error rendering hero component:', error);
    notFound();
  }
}

export { Hero };
