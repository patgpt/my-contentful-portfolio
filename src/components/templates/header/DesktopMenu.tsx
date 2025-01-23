import NavigationLink from './NavigationLink';
import { MenuProps } from './types';

export const DesktopMenu = ({ menuItems = [], locale }: MenuProps) => {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {menuItems?.map((item, index) => (
          <li key={`desktop-${index}`}>
            <NavigationLink locale={locale} href={`/${item?.href}`}>
              {item?.title}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
