import { draftMode } from 'next/headers';
import Image from 'next/image';
import React from 'react';

import SocialButtonRow from '@src/components/SocialButtonRow';
import initTranslations from '@src/i18n';
import { client, previewClient } from '@src/lib/client';

interface HeroImage {
  url: string;
  description: string;
}

interface HeroData {
  heading?: string;
  subHeading?: string;
  heroImage?: HeroImage;
}

interface LandingPageHeroProps {
  locale: string;
}

const DEFAULT_IMAGE = '/images/patrick-kelly.jpg';
const DEFAULT_ALT = 'Image of Patrick Kelly';

export default async function Hero({ locale }: LandingPageHeroProps) {
  const { isEnabled: preview } = draftMode();
  const { t } = await initTranslations({ locale });

  try {
    const gqlClient = preview ? previewClient : client;
    const heroCollection = await gqlClient.GetHero({ locale, preview });
    const hero = heroCollection.componentHeroCollection?.items[0] as HeroData;

    if (!hero) {
      throw new Error('Hero data not found');
    }

    return (
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              className="mb-6 rounded-full"
              width={300}
              height={300}
              src={hero.heroImage?.url || DEFAULT_IMAGE}
              alt={hero.heroImage?.description || DEFAULT_ALT}
              priority // Important for LCP
            />
            <h1 className="mb-4 text-5xl font-bold">{hero.heading}</h1>
            <p className="mb-6">{hero.subHeading}</p>
            <SocialButtonRow />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading hero section:', error);
    return (
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <p>{t('common.error')}</p>
          </div>
        </div>
      </div>
    );
  }
}

export { Hero };
