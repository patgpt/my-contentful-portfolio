import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { draftMode } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import './globals.css';
import { urbanist } from '@src/app/fonts';
import { ContentfulPreviewProvider } from '@src/components/features/contentful';
import { Footer } from '@src/components/templates/footer';
import { Header } from '@src/components/templates/header';

import { cn } from '@src/utils/cn';

import { getLocale, getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { routing } from '@src/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}
export async function generateMetadata() {
  const metatadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  };

  return metatadata;
}

export const viewport: Viewport = {
  themeColor: 'rebeccapurple',
};

const allowedOriginList = ['https://app.contentful.com', 'https://app.eu.contentful.com'];

interface LayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}
export default async function PageLayout({ children }: LayoutProps) {
  const { isEnabled: preview } = await draftMode();

  const messages = await getMessages();
  const locale = await getLocale();
  // Enable static rendering
  setRequestLocale(locale);
  console.log('LAYOUT LOCALE', locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className="min-h-screen bg-base-100 text-base-content">
        <ThemeProvider attribute="class">
          <NextIntlClientProvider messages={messages}>
            <ContentfulPreviewProvider
              locale={locale}
              enableInspectorMode={preview}
              enableLiveUpdates={preview}
              targetOrigin={allowedOriginList}>
              <main className={cn(urbanist.variable, 'min-h-screens pt-10 font-sans')}>
                <Header />
                {children}
                <Footer />
              </main>
              <div id="portal" className={cn(urbanist.variable, 'font-sans')} />
            </ContentfulPreviewProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
