'use client';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from '@/i18n/routing';
import { MenuProps } from './types';

export const MobileMenu = ({ menuItems = [] }: Omit<MenuProps, 'locale'>) => {
  return (
    <>
      <label htmlFor="my-drawer" className="btn btn-ghost btn-circle swap swap-rotate lg:hidden">
        <RiMenu3Line className="swap-off h-5 w-5" />
        <RiCloseLine className="swap-on h-5 w-5" />
      </label>
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {menuItems?.map((item, index) => (
            <li key={`mobile-${index}`}>
              <Link href={`/${item?.href}`}>{item?.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
