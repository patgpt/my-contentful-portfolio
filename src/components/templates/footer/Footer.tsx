/**
 * The Footer component renders a complete footer section with navigation and social links.
 * It uses subcomponents to separate concerns and improve maintainability.
 */

import { FooterLink } from '@/components/templates/footer/FooterLink';
import { FooterNav } from '@/components/templates/footer/FooterNav';
import { FooterSocial } from '@/components/templates/footer/FooterSocial';
import { FaXTwitter, FaGithub, FaLinkedin } from 'react-icons/fa6';

/**
 * Footer Component
 *
 * @returns {JSX.Element} The rendered footer element.
 */
export const Footer = () => {
  return (
    <footer
      className="footer sm:footer-horizontal bg-base-300 text-base-content p-10"
      aria-label="Footer">
      <FooterNav title="Services">
        <FooterLink href="/branding">Branding</FooterLink>
        <FooterLink href="/design">Design</FooterLink>
        <FooterLink href="/marketing">Marketing</FooterLink>
        <FooterLink href="/advertisement">Advertisement</FooterLink>
      </FooterNav>
      <FooterNav title="Company">
        <FooterLink href="/about">About us</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
        <FooterLink href="/jobs">Jobs</FooterLink>
        <FooterLink href="/press-kit">Press kit</FooterLink>
      </FooterNav>
      <FooterNav title="Social">
        <div className="grid grid-flow-col gap-4">
          <FooterSocial
            href="https://twitter.com"
            icon={<FaXTwitter className="h-6 w-6" />}
            label="Twitter Profile"
          />
          <FooterSocial
            href="https://github.com"
            icon={<FaGithub className="h-6 w-6" />}
            label="GitHub Profile"
          />
          <FooterSocial
            href="https://linkedin.com"
            icon={<FaLinkedin className="h-6 w-6" />}
            label="LinkedIn Profile"
          />
        </div>
      </FooterNav>
    </footer>
  );
};
