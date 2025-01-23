import { draftMode } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import SocialButtonRow from '@/components/SocialButtonRow';
import { client, previewClient } from '@/lib/client';
import type { HeroFieldsFragment } from '@/lib/__generated/sdk';

async function getHeroData(locale: string, preview: boolean): Promise<HeroFieldsFragment> {
  const gqlClient = preview ? previewClient : client;
  const data = await gqlClient.GetHero({ locale, preview });

  if (!data.componentHeroCollection?.items[0]) {
    notFound();
  }

  return data.componentHeroCollection.items[0];
}

function HeroContent({ hero }: { hero: HeroFieldsFragment }) {
  const { url } = hero.heroImage || {};
  const { heading, subHeading } = hero;
  return (
    <div className="hero from-primary/20 to-secondary/20 min-h-screen bg-linear-to-tr pt-16 text-balance">
      <div className="hero-content flex-col items-center justify-center p-4 text-center">
        <div className="avatar mb-6">
          {url && (
            <Image
              width={300}
              height={300}
              src={url}
              alt="Hero Image"
              priority
              sizes="(max-width: 768px) 100vw, 300px"
              quality={90}
            />
          )}
        </div>
        <h1 className="mb-4 text-5xl font-bold">{heading}</h1>
        <p className="mb-6 max-w-prose">{subHeading}</p>
        <SocialButtonRow />
      </div>
    </div>
  );
}

export default async function Hero({ locale }: { locale: string }) {
  const { isEnabled: preview } = await draftMode();
  const heroData = await getHeroData(locale, preview);
  return <HeroContent hero={heroData} />;
}
