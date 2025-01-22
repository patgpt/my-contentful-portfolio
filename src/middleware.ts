import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the pathname already includes a locale, proceed normally
  const isLocalePath = routing.locales.some(locale => pathname.startsWith(`/${locale}`));
  if (isLocalePath) {
    return NextResponse.next();
  }

  // Detect user's preferred language from the "Accept-Language" header
  const acceptLanguage = request.headers.get('accept-language');
  const preferredLocale = acceptLanguage?.split(',')[0] || routing.defaultLocale;

  // Validate the preferred locale or fall back to the default
  const localeToUse = routing.locales.includes(preferredLocale as (typeof routing.locales)[number])
    ? preferredLocale
    : routing.defaultLocale;

  // Redirect froam "/" to the appropriate locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${localeToUse}`, request.url));
  }

  // Default behavior for unmatched paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    // Skip all paths that should not be internationalized
    '/((?!_next|.*/opengraph-image|.*\\..*).*)',
    // match locale prefixed paths
    '/:locale(en-US|fr-CA)?/:path*',
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
