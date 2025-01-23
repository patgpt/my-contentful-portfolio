export type MenuItem = {
  href?: string;
  title?: string;
};

export type MenuProps = {
  menuItems?: MenuItem[];
  locale: string;
};
