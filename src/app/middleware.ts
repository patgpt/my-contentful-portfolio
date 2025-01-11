import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@src/i18n/routing';

export default async function middleware(request: NextRequest) {
  // Create the i18n middleware handler
  const handleI18nRouting = createMiddleware({
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
    localePrefix: routing.localePrefix
  });

  // Get the response from i18n middleware
  const response = handleI18nRouting(request);

  // Generate nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Define CSP
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.ctfassets.net;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' https://*.contentful.com;
    connect-src 'self' https://*.ctfassets.net ${process.env.NODE_ENV === 'development' ? 'ws:' : ''};
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Clone the response to modify headers
  const finalResponse = NextResponse.next({
    request: {
      headers: response.headers
    }
  });

  // Set security headers
  finalResponse.headers.set('x-nonce', nonce);
  finalResponse.headers.set('X-DNS-Prefetch-Control', 'on');
  finalResponse.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  finalResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  finalResponse.headers.set('X-Content-Type-Options', 'nosniff');
  finalResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  finalResponse.headers.set('Content-Security-Policy', cspHeader);

  return finalResponse;
}

export const config = {
  matcher: ['/', `/(${routing.locales.join('|')})/:path*`]
};
