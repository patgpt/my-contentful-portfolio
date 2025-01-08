'use client';

import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SocialButtonRow: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-4">
      <Link href="https://github.com" aria-label={t('buttons.github')} className="btn btn-primary">
        <FaGithub className="mr-2" />
        {t('buttons.github')}
      </Link>
      <Link
        href="https://linkedin.com"
        aria-label={t('buttons.linkedin')}
        className="btn btn-primary"
      >
        <FaLinkedin className="mr-2" />
        {t('buttons.linkedin')}
      </Link>
      <Link
        href="https://twitter.com"
        aria-label={t('buttons.twitter')}
        className="btn btn-primary"
      >
        <FaTwitter className="mr-2" />
        {t('buttons.twitter')}
      </Link>
    </div>
  );
};

export default SocialButtonRow;
