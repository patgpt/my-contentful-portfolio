import { routing } from '@src/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  //  const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';

  const handleI18nRouting = createMiddleware({
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
  });
  const response = handleI18nRouting(request);

  // response.headers.set('x-your-custom-locale', defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en)/:path*'],
};
