'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SocialButtonRow: React.FC = () => {
  // @ts-expect-error - Suppressing type error for namespace updating to v4 of next-intl in the future
  const t = useTranslations('buttons');

  return (
    <div className="flex space-x-4">
      {/*  @ts-expect-error - Suppressing type error for namespace updating to v4 of next-intl in the future */}
      <Link href="https://github.com" aria-label={t('github')} className="btn btn-primary">
        <FaGithub className="mr-2" />
        {/*  @ts-expect-error - Suppressing type error for namespace updating to v4 of next-intl in the future */}

        {t('github')}
      </Link>
      {/*  @ts-expect-error - Suppressing type error for namespace updating to v4 of next-intl in the future */}

      <Link href="https://linkedin.com" aria-label={t('linkedin')} className="btn btn-primary">
        <FaLinkedin className="mr-2" />
        {/*  @ts-expect-error - Suppressing type error for namespace updating to v4 of next-intl in the future */}

        {t('linkedin')}
      </Link>
      {/*  @ts-expect-error - Suppressing type error for namespace updating to v4 of next-intl in the future */}

      <Link href="https://twitter.com" aria-label={t('twitter')} className="btn btn-primary">
        <FaTwitter className="mr-2" />
        {/*  @ts-expect-error - Suppressing type error for namespace updating to v4 of next-intl in the future */}

        {t('twitter')}
      </Link>
    </div>
  );
};

export default SocialButtonRow;
