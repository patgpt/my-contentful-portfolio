'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import ThemeSwitcher from '@src/components/features/theme-switcher/ThemeSwitcher';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="navbar fixed left-0 right-0 top-0 z-50 border-b border-base-200 bg-base-100">
      <div className="container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link href="/about">{t('nav.about')}</Link>
              </li>
              <li>
                <Link href="/projects">{t('nav.projects')}</Link>
              </li>
              <li>
                <Link href="/blog">{t('nav.blog')}</Link>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" href="/" title={t('common.homepage')}>
            Patrick Kelly
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/about">{t('nav.about')}</Link>
            </li>
            <li>
              <Link href="/projects">{t('nav.projects')}</Link>
            </li>
            <li>
              <Link href="/blog">{t('nav.blog')}</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <ThemeSwitcher />
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};
