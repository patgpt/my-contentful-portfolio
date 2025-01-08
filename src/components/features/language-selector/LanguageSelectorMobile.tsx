'use client';

import { LanguageIcon, CloseIcon } from '@contentful/f36-icons';
import { useCurrentLocale } from 'next-i18n-router/client';
import { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { Portal } from '@src/components/shared/portal';
import i18nConfig, { locales } from '@src/i18n/config';

export const LanguageSelectorMobile = ({ localeName, onChange, displayName }) => {
  const currentLocale = useCurrentLocale(i18nConfig);
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') {
        setShowDrawer(false);
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  });

  return (
    <>
      <button
        className="btn btn-circle btn-ghost"
        title={t('common.languageDrawer')}
        onClick={() => setShowDrawer(currentState => !currentState)}
        aria-expanded={showDrawer}
        aria-controls="locale-drawer"
      >
        <LanguageIcon width="18px" height="18px" variant="secondary" />
      </button>

      <Portal>
        <FocusLock disabled={!showDrawer} returnFocus={true}>
          <div
            role="presentation"
            tabIndex={-1}
            className={twMerge(
              'fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-200',
              showDrawer ? 'visible opacity-100' : 'invisible opacity-0',
            )}
            onClick={() => setShowDrawer(false)}
          />
          <div
            id="locale-drawer"
            aria-modal="true"
            aria-hidden={!showDrawer}
            className={twMerge(
              'drawer drawer-end fixed right-0 top-0 h-full w-80 bg-base-100 p-4',
              showDrawer ? 'translate-x-0' : 'translate-x-full',
            )}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{t('common.regionalSettings')}</h2>
              <button className="btn btn-circle btn-ghost" onClick={() => setShowDrawer(false)}>
                <CloseIcon width="18px" height="18px" variant="secondary" />
              </button>
            </div>

            <div className="form-control mt-8">
              <label className="label font-semibold">{t('common.language')}</label>
              <select
                className="select select-bordered w-full"
                defaultValue={currentLocale}
                onChange={onChange}
              >
                {locales?.map(availableLocale => (
                  <option key={availableLocale} value={availableLocale}>
                    {displayName(availableLocale).of(localeName(availableLocale))}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </FocusLock>
      </Portal>
    </>
  );
};
