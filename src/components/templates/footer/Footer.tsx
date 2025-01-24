/**
 * The Footer component renders a complete footer section with navigation and social links.
 * It uses subcomponents to separate concerns and improve maintainability.
 */

import { FooterLink } from '@/components/templates/footer/FooterLink';
import { FooterNav } from '@/components/templates/footer/FooterNav';
import { FooterSocial } from '@/components/templates/footer/FooterSocial';
import { client, previewClient } from '@/lib/client';
import type { PageParams } from '@/types/types';
import { draftMode } from 'next/headers';
import { FaXTwitter, FaGithub, FaLinkedin } from 'react-icons/fa6';

export const Footer = async ({ params }: PageParams) => {
  const locale = (await params).locale;
  const { isEnabled: preview } = await draftMode();
  const gqlClient = preview ? previewClient : client;
  const settings = await gqlClient.getFooterSettings({
    preview,
    locale: locale,
  });
  const footerSettings = settings?.settingsCollection?.items[0];
  const siteNavigation = footerSettings?.footerSiteNavigationCollection?.items || [];
  const servicesNavigation = footerSettings?.footerServicesNavigationCollection?.items || [];
  return (
    <footer
      className="footer sm:footer-horizontal bg-base-300 text-base-content p-10"
      aria-label="Footer">
      <FooterNav title="Services">
        {servicesNavigation.map(item => (
          <FooterLink key={item.href} href={`services/${item.href}`}>
            {item.title}
          </FooterLink>
        ))}
      </FooterNav>
      <FooterNav title="Site">
        {siteNavigation.map(item => (
          <FooterLink key={item.href} href={item.href}>
            {item.title}
          </FooterLink>
        ))}
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
