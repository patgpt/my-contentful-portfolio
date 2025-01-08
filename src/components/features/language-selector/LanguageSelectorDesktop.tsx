'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurrentLocale } from 'next-i18n-router/client';
import { useTranslation } from 'react-i18next';
import { HiLanguage } from 'react-icons/hi2';

import i18nConfig, { locales } from '@src/i18n/config';

interface LanguageSelectorDesktopProps {
  localeName: (locale: string) => string;
  onChange: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  displayName: (locale: string) => { of: (name: string) => string };
}

export const LanguageSelectorDesktop = ({
  localeName,
  onChange,
  displayName,
}: LanguageSelectorDesktopProps) => {
  const { t } = useTranslation();
  const currentLocale = useCurrentLocale(i18nConfig);
  const pathname = usePathname();
  const pathnameHasLocale = locales.includes(pathname.slice(1, 6));
  const pathnameWithoutLocale = pathname.slice(6);
  const localesToShow = locales.filter(locale => locale !== currentLocale);

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost inline-flex items-center gap-1 px-3"
        aria-label={t('common.languageSelector')}
      >
        <span className="text-sm font-medium">{currentLocale?.toUpperCase()}</span>
        <HiLanguage className="h-5 w-5" />
      </button>
      <ul className="menu dropdown-content menu-sm z-50 mt-3 w-40 rounded-box bg-base-100 p-2 shadow-lg">
        {localesToShow?.map(availableLocale => (
          <li key={availableLocale}>
            <Link
              className="flex items-center justify-between"
              href={
                pathnameHasLocale
                  ? `/${availableLocale}${pathnameWithoutLocale}`
                  : `/${availableLocale}${pathname}`
              }
              locale={availableLocale}
              onClick={onChange}
            >
              <span>{displayName(availableLocale).of(localeName(availableLocale))}</span>
              <span className="text-xs opacity-50">{availableLocale.toUpperCase()}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
