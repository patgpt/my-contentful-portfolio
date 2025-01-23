import React from 'react';
import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const FooterLink = ({ href, children, className = '' }: FooterLinkProps) => {
  return (
    <Link
      href={href}
      className={`link link-hover ${className}`}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      target={href.startsWith('http') ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};
