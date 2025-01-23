import { Link } from '@/i18n/routing';
import type { NavigationFieldsFragment } from '@/lib/__generated/sdk';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';

type NavigationProps = {
  navigation: NavigationFieldsFragment[];
};

const MobileMenu: FC<NavigationProps> = ({ navigation }) => {
  const t = useTranslations('navigation');

  return (
    <div className="drawer h-full" role="navigation" aria-label={t('mobileNav')}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" aria-hidden="true" />
      <label
        htmlFor="my-drawer"
        className="btn btn-ghost btn-circle swap swap-rotate lg:hidden"
        role="button"
        aria-expanded="false"
        aria-controls="mobile-navigation-menu"
        aria-label={t('openMenu')}>
        <span className="sr-only">{t('toggleMenu')}</span>
        <RiMenu3Line className="swap-off h-5 w-5" aria-hidden="true" />
        <RiCloseLine className="swap-on h-5 w-5" aria-hidden="true" />
      </label>

      <div
        className="drawer-side h-screen"
        id="mobile-navigation-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t('menuDialog')}>
        <label htmlFor="my-drawer" aria-label={t('closeMenu')} className="drawer-overlay"></label>
        <nav className="h-screen" role="navigation" aria-label={t('mobileNav')}>
          <ul
            className="menu bg-base-200 z-50 min-h-full w-80 p-4"
            role="menu"
            aria-label={t('mobileMenuTitle')}>
            {navigation.map((item, index) => (
              <li key={`mobile-${index}`} role="none">
                <Link
                  href={`/${item.href}`}
                  role="menuitem"
                  className="focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
