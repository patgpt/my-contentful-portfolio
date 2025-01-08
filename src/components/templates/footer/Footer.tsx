'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Container } from '@src/components/shared/container';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer footer-center bg-base-200 p-10 text-base-content">
      <div className="container mx-auto">
        <h2 className="text-lg font-bold">{t('footer.aboutUs')}</h2>
        <div className="max-w-4xl">{t('footer.description')}</div>
        <div className="mt-4">
          {t('footer.powerBy')}{' '}
          <Link
            href="https://www.contentful.com"
            rel="noopener noreferrer"
            target="_blank"
            className="link link-primary"
          >
            Contentful
          </Link>
        </div>
      </div>
    </footer>
  );
};
