import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * FooterSocial Component
 *
 * @param {string} href - The URL for the social link.
 * @param {ReactNode} icon - The icon to display for the social link.
 * @param {string} label - The accessible label for the social link.
 * @returns {JSX.Element} The rendered social link element.
 */
interface FooterSocialProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export const FooterSocial = ({ href, icon, label }: FooterSocialProps) => {
  return (
    <Link
      href={href}
      className="transition-opacity hover:opacity-80"
      rel="noopener noreferrer"
      target="_blank"
      aria-label={label}
    >
      {icon}
    </Link>
  );
};
