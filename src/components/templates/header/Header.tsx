import { draftMode } from 'next/headers';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import ThemeSwitcher from '@/components/features/theme-switcher/ThemeSwitcher';
import { client, previewClient } from '@/lib/client';
import { Link } from '@/i18n/routing';

import LanguageSelect from '@/components/features/language-selector/LanguageSelect';
import NavigationLink from '@/components/templates/header/NavigationLink';

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
  const navigation = settings?.headerNavigationCollection?.items;
  const title = settings?.siteTitle;

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Header content */}
        <div className="navbar border-base-200 bg-base-100 fixed top-0 right-0 left-0 z-50 border-b">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost btn-circle swap swap-rotate lg:hidden">
              <input type="checkbox" className="hidden" />
              <RiMenu3Line className="swap-off h-5 w-5" />
              <RiCloseLine className="swap-on h-5 w-5" />
            </label>
            <Link className="btn btn-ghost text-xl" href="/">
              {title}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navigation.map((item, index) => (
                <li key={`desktop-${index}`}>
                  <NavigationLink locale={locale} href={`/${item?.href}`}>
                    {item?.title}
                  </NavigationLink>
                </li>
              ))} 
            </ul>
          </div>
          <div className="navbar-end flex gap-2">
            <ThemeSwitcher />
            <LanguageSelect />
          </div>
        </div>
      </div>
      {/* Drawer side */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {navigation.map((item, index) => (
            <li key={`mobile-${index}`}>
              <Link href={`/${item?.href}`}>{item?.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
