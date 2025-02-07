import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { draftMode } from 'next/headers';
import { ContentfulPreviewProvider } from '@/components/features/contentful';
import { Footer } from '@/components/templates/footer';
import { Header } from '@/components/templates/header';

import { cn } from '@/utils/cn';

import { getLocale, getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { console } from 'inspector';
import { fonts } from '@/app/fonts';
import { NextIntlClientProvider } from 'next-intl';
import type { PageParams } from '@/types/types';

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

type LayoutProps = PageParams & {
  children: ReactNode;
};
export default async function PageLayout({ children, params }: LayoutProps) {
  const { isEnabled: preview } = await draftMode();

  const messages = await getMessages();
  const locale = (await params).locale;
  console.log(locale, 'PageLayout');
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html data-theme="light" lang={locale} suppressHydrationWarning>
      <head>
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className="bg-base-100 text-base-content min-h-screen">
        <ThemeProvider
          attribute="data-class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ContentfulPreviewProvider
              locale={locale || (await getLocale())}
              enableInspectorMode={preview}
              enableLiveUpdates={preview}
              targetOrigin={process.env.NEXT_PUBLIC_ALLOWED_ORIGINS}>
              <main
                className={cn(
                  fonts.fontDisplay.variable,
                  fonts.fontSans.variable,
                  fonts.fontSerif.variable,
                  'min-h-screens pt-10 font-sans',
                )}>
                <Header params={params} />
                {children}
                <Footer params={params} />
              </main>
            </ContentfulPreviewProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
