import { draftMode } from 'next/headers';
import { client, previewClient } from '@/lib/client';
import Title from './Title';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import ThemeSwitcher from '@/components/features/theme-switcher/ThemeSwitcher';
import LanguageSelect from '@/components/features/language-selector/LanguageSelect';

export const Header = async ({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) => {
  const locale = (await params).locale;
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;

  const headerSettings = await gqlClient.getHeaderSettings({
    preview,
    locale: locale,
  });

  const settings = headerSettings?.settingsCollection?.items[0];
  const navigation = settings?.headerNavigationCollection?.items || [];
  const title = settings?.siteTitle || 'Website';

  return (
    <div className="navbar border-base-200 bg-base-100 fixed top-0 right-0 left-0 z-50 border-b">
      <div className="navbar-start">
        <Title title={title} />
        <MobileMenu navigation={navigation} />
      </div>
      <div className="navbar-center hidden lg:flex">
        <DesktopMenu navigation={navigation} locale={locale} />
      </div>
      <div className="navbar-end flex gap-2">
        <ThemeSwitcher />
        <LanguageSelect />
      </div>
    </div>
  );
};
