import { draftMode } from 'next/headers';
import ThemeSwitcher from '@src/components/features/theme-switcher/ThemeSwitcher';
import { client, previewClient } from '@src/lib/client';
import { Link } from '@src/i18n/routing';

import LanguageSelect from '@src/components/features/language-selector/LanguageSelect';
import NavigationLink from '@src/components/templates/header/NavigationLink';
import { getLocale } from 'next-intl/server';

export const Header = async () => {
  const locale = await getLocale();
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const navigation = await gqlClient.GetNavigationMenu({
    preview,
    locale: locale,
    position: 'Header',
  });

  const menuItems =
    navigation?.navigationMenuCollection?.items[0]?.navigationMenuCollection?.items || [];

  return (
    <div className="navbar fixed left-0 right-0 top-0 z-50 border-b border-base-200 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            Menu
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048">
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
            </svg>
          </div>
          <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
            {menuItems.map((item, index) => (
              <li key={`mobile-${index}`}>
                <Link href={`/${item?.href}`}>{item?.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href="/">
          Patrick Kelly
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, index) => (
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
  );
};
