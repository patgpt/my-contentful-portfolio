'use client';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { HiLanguage } from 'react-icons/hi2';
import { Link } from '@src/i18n/routing';
import { routing } from '@src/i18n/routing';

interface Props {
  localeName: (locale: string) => string;
  onChange: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  displayName: (locale: string) => Intl.DisplayNames;
}

export const LanguageSelectorMobile = ({ localeName, onChange, displayName }: Props) => {
  const t = useTranslations();
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="dropdown">
      <button tabIndex={0} className="btn btn-ghost btn-sm" aria-label={t('common.languageDrawer')}>
        <HiLanguage className="h-5 w-5" />
      </button>
      <ul className="menu dropdown-content menu-sm z-50 mt-3 w-40 rounded-box bg-base-100 p-2 shadow-lg">
        {routing.locales
          .filter(locale => locale !== currentLocale)
          .map(locale => (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                className="flex items-center justify-between"
                onClick={onChange}>
                <span>{displayName(locale).of(localeName(locale))}</span>
                <span className="text-xs opacity-50">{locale.toUpperCase()}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
