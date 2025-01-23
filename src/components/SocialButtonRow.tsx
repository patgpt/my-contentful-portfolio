'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SocialButtonRow: React.FC = () => {
  const t = useTranslations('buttons');

  return (
    <div className="flex space-x-4">
      <Link href="https://github.com" aria-label={t('github')} className="btn btn-primary">
        <FaGithub className="mr-2" />

        {t('github')}
      </Link>

      <Link href="https://linkedin.com" aria-label={t('linkedin')} className="btn btn-primary">
        <FaLinkedin className="mr-2" />

        {t('linkedin')}
      </Link>

      <Link href="https://twitter.com" aria-label={t('twitter')} className="btn btn-primary">
        <FaTwitter className="mr-2" />

        {t('twitter')}
      </Link>
    </div>
  );
};

export default SocialButtonRow;
