import { draftMode } from 'next/headers';
import Link from 'next/link';
import React from 'react';

import SocialButtonRow from '@src/components/SocialButtonRow';
import initTranslations from '@src/i18n';
import { client, previewClient } from '@src/lib/client';

interface LandingPageHeroProps {
  locale: string;
}
export default async function Hero({ locale }: LandingPageHeroProps) {
  const { isEnabled: preview } = draftMode();
  const { t, resources } = await initTranslations({ locale });
  const gqlClient = preview ? previewClient : client;
  const page = await gqlClient.pageLandingCollection({ locale, preview });
  const hero = page.pageLandingCollection?.items[0]?.hero;

  return (
    <div className="hero min-h-[60vh] bg-base-200">
      <div className="hero-content flex flex-col justify-center text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold">{hero?.heroImage?.title}</h1>
          <p className="py-6">
            A passionate full-stack developer specialized in building exceptional digital
            experiences. Currently focused on building accessible, human-centered products.
          </p>
          <h2 className="text-2xl">Let&apos;s Connect</h2>
        </div>
        {/* <SocialButtonRow /> */}
      </div>
    </div>
  );
}

export { Hero };
