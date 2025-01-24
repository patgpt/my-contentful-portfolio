import NavigationLink from '@/components/templates/header/NavigationLink';
import type { NavigationFieldsFragment } from '@/lib/__generated/sdk';
import { useTranslations, type Locale } from 'next-intl';
import { FC } from 'react';

interface DesktopMenuProps {
  navigation: NavigationFieldsFragment[];
  locale: Locale;
}

const DesktopMenu: FC<DesktopMenuProps> = ({ navigation, locale }) => {
  const t = useTranslations('navigation');
  return (
    <nav role="navigation" aria-label={t('desktopNav')}>
      <ul className="menu menu-horizontal px-1" role="menubar" aria-label={t('mainMenu')}>
        {navigation.map((item, index) => (
          <li key={`desktop-${index}`} role="none">
            <NavigationLink
              locale={locale}
              href={`/${item.href}`}
              role="menuitem"
              className="focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none">
              {item.title}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

DesktopMenu.displayName = 'DesktopMenu';

export default DesktopMenu;
