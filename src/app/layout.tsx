import { ReactNode } from 'react';

import './globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
