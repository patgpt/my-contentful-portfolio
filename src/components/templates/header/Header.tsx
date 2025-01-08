'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center justify-between">
          <Link className="text-3xl" as="h2" href="/" title={t('common.homepage')}>
            {/* <BlogLogo /> */}
            Patrick Kelly
          </Link>
          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
