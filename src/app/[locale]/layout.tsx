import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { draftMode } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { ContentfulPreviewProvider } from '@src/components/features/contentful';
import { Footer } from '@src/components/templates/footer';
import { Header } from '@src/components/templates/header';

import { cn } from '@src/utils/cn';

import { getLocale, getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { routing } from '@src/i18n/routing';
import { console } from 'inspector';
import { fonts } from '@src/app/fonts';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}
export async function generateMetadata() {
  const metatadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  };

  return metatadata;
}

export const viewport: Viewport = {
  themeColor: 'rebeccapurple',
};

const allowedOriginList = ['https://app.contentful.com', 'https://app.eu.contentful.com'];

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}
export default async function PageLayout({ children, params }: LayoutProps) {
  const { isEnabled: preview } = await draftMode();

  const messages = await getMessages();
  const locale = (await params).locale;
  console.log(locale, 'PageLayout');
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className="min-h-screen bg-base-100 text-base-content">
        <ThemeProvider attribute="class">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ContentfulPreviewProvider
              locale={locale || (await getLocale())}
              enableInspectorMode={preview}
              enableLiveUpdates={preview}
              targetOrigin={allowedOriginList}>
              <main
                className={cn(
                  fonts.fontDisplay.variable,
                  fonts.fontSans.variable,
                  fonts.fontSerif.variable,
                  'min-h-screens pt-10 font-sans',
                )}>
                <Header params={params} />
                {children}
                <Footer />
              </main>
            </ContentfulPreviewProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
