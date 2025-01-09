import { dir } from 'i18next';
import type { Metadata, Viewport } from 'next';
import { draftMode } from 'next/headers';
import { ThemeProvider } from 'next-themes';

import { ContentfulPreviewProvider } from '@src/components/features/contentful';
import TranslationsProvider from '@src/components/shared/i18n/TranslationProvider';
import { Footer } from '@src/components/templates/footer';
import { Header } from '@src/components/templates/header';
import { urbanist } from '@src/app/fonts';
import initTranslations from '@src/i18n';
import { locales } from '@src/i18n/config';
import { cn } from '@src/utils/cn';

export async function generateMetadata() {
  const metatadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  };

  return metatadata;
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export async function generateStaticParams(): Promise<LayoutProps['params'][]> {
  return locales.map(locale => ({ locale }));
}

const allowedOriginList = ['https://app.contentful.com', 'https://app.eu.contentful.com'];

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function PageLayout({ children, params }: LayoutProps) {
  const { isEnabled: preview } = draftMode();
  const { locale } = params;
  const { resources } = await initTranslations({ locale });

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className="min-h-screen bg-base-100 text-base-content">
        <ThemeProvider attribute="class">
          <TranslationsProvider locale={locale} resources={resources}>
            <ContentfulPreviewProvider
              locale={locale}
              enableInspectorMode={preview}
              enableLiveUpdates={preview}
              targetOrigin={allowedOriginList}
            >
              <main className={cn(urbanist.variable, 'min-h-screens pt-10 font-sans')}>
                <Header locale={locale} />
                {children}
                <Footer />
              </main>
              <div id="portal" className={cn(urbanist.variable, 'font-sans')} />
            </ContentfulPreviewProvider>
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
