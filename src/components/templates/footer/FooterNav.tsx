/**
 * FooterNav Component
 *
 * @param {string} title - The title of the navigation section.
 * @param {ReactNode} children - The children elements (usually links).
 * @returns {JSX.Element} The rendered navigation section.
 */

interface FooterNavProps {
  title: string;
  children: React.ReactNode;
}

export const FooterNav = ({ title, children }: FooterNavProps) => {
  return (
    <nav>
      <h6 className="footer-title">{title}</h6>
      {children}
    </nav>
  );
};
