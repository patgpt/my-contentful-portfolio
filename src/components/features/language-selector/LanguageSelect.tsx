'use client';

import clsx from 'clsx';
import { useTransition } from 'react';
import { FaGlobe, FaCheck } from 'react-icons/fa6';
import { useRouter, usePathname } from '@src/i18n/routing';
import { useParams } from 'next/navigation';

const LANGUAGE_NAMES = {
  'en-US': 'English',
  'fr-CA': 'Français',
} as const;

export default function LocaleSwitcherSelect() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const activeLocale = params.locale as string;

  function onSelectLocale(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="dropdown dropdown-end" key={activeLocale}>
      <label tabIndex={0} className={clsx('btn btn-circle btn-ghost', isPending && 'opacity-50')}>
        <FaGlobe className="h-5 w-5" />
      </label>

      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-30 mt-3 w-52 rounded-box bg-base-200 p-2 shadow-lg">
        {Object.entries(LANGUAGE_NAMES).map(([locale, name]) => (
          <li key={locale}>
            <button
              onClick={() => onSelectLocale(locale)}
              className={clsx(
                'flex items-center justify-between',
                locale === activeLocale && 'active bg-primary text-primary-content',
              )}>
              {name}
              {locale === activeLocale && <FaCheck className="h-4 w-4" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
