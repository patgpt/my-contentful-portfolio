'use client';
import { useTranslations } from 'next-intl';
import { LanguageSelectorDesktop } from './LanguageSelectorDesktop';
import { LanguageSelectorMobile } from '@src/components/features/language-selector/LanguageSelectorMobile';
function LanguageSelector() {
  const t = useTranslations('common');

  const handleLanguageChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    document.documentElement.lang = event.currentTarget.hreflang;
  };

  return (
    <>
      <div className="hidden md:block">
        <LanguageSelectorDesktop
          localeName={locale => t('locales.english', { locale })}
          displayName={locale => new Intl.DisplayNames([locale], { type: 'language' })}
          onChange={handleLanguageChange}
        />
      </div>
      <div className="md:hidden">
        <LanguageSelectorMobile
          localeName={locale => t('locales.english', { locale })}
          displayName={locale => new Intl.DisplayNames([locale], { type: 'language' })}
          onChange={handleLanguageChange}
        />
      </div>
    </>
  );
}

export default LanguageSelector;
