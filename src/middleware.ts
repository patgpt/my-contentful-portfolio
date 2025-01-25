import { routing } from '@/i18n/routing';
import { configDotenv } from 'dotenv';
import type { Locale } from 'next-intl';
import { NextRequest, NextResponse } from 'next/server';

configDotenv();

// Allow CORS requests from the specified origins
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
// Define CORS headers
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle CORS for API routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin') || '';
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // Handle preflighted requests
    if (request.method === 'OPTIONS') {
      const preflightHeaders: Record<string, string> = {
        ...corsOptions,
      };

      if (isAllowedOrigin) {
        preflightHeaders['Access-Control-Allow-Origin'] = origin;
      }

      return NextResponse.json({}, { headers: preflightHeaders });
    }
    // Handle simple requests
    const response = NextResponse.next();

    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    // Set other CORS headers
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  // If the pathname already includes a locale, proceed normally
  const isLocalePath = routing.locales.some(locale => pathname.startsWith(`/${locale}`));
  if (isLocalePath) {
    return NextResponse.next();
  }

  // Detect user's preferred language from the "Accept-Language" header
  const acceptLanguage = request.headers.get('accept-language');
  const preferredLocale = acceptLanguage?.split(',')[0] || routing.defaultLocale;

  // Validate the preferred locale or fall back to the default
  const localeToUse = routing.locales.includes(preferredLocale as Locale)
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
