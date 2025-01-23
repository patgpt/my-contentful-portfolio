import { Link } from '@/i18n/routing';
import ThemeSwitcher from '@/components/features/theme-switcher/ThemeSwitcher';
import LanguageSelect from '@/components/features/language-selector/LanguageSelect';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';
import { client, previewClient } from '@/lib/client';
import { draftMode } from 'next/headers';
import { MenuProps } from './types';

export const Header = ({ menuItems = [], locale }: MenuProps) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar border-base-200 bg-base-100 fixed top-0 right-0 left-0 z-50 border-b">
          <div className="navbar-start">
            <MobileMenu menuItems={menuItems} />
            <Link className="btn btn-ghost text-xl" href="/">
              Patrick Kelly
            </Link>
          </div>
          <DesktopMenu menuItems={menuItems} locale={locale} />
          <div className="navbar-end flex gap-2">
            <ThemeSwitcher />
            <LanguageSelect />
          </div>
        </div>
      </div>
      <MobileMenu menuItems={menuItems} />
    </div>
  );
};

// Create a server component wrapper to handle the data fetching
export const HeaderWrapper = async ({ params }: { params: Promise<{ locale: string }> }) => {
  try {
    const locale = (await params).locale;
    const { isEnabled: preview } = await draftMode();
    const gqlClient = preview ? previewClient : client;
    const navigation = await gqlClient.GetNavigationMenu({
      preview,
      locale: locale,
      position: 'Header',
    });

    const menuItems =
      navigation?.navigationMenuCollection?.items[0]?.navigationMenuCollection?.items || [];

    return <Header menuItems={menuItems} locale={locale} />;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return <Header menuItems={[]} locale={(await params).locale} />;
  }
};
