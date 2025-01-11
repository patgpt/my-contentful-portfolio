import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from '@src/i18n/config';

export function middleware(request: NextRequest) {
  // Generate nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data: https://images.ctfassets.net https://images.eu.ctfassets.net;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' https://app.contentful.com https://app.eu.contentful.com;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Handle i18n routing
  const i18nResponse = i18nRouter(request, i18nConfig);

  // Set security headers on the i18n response
  if (i18nResponse) {
    i18nResponse.headers.set('x-nonce', nonce);
    i18nResponse.headers.set('X-DNS-Prefetch-Control', 'on');
    i18nResponse.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    i18nResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
    i18nResponse.headers.set('X-Content-Type-Options', 'nosniff');
    i18nResponse.headers.set('X-XSS-Protection', '1; mode=block');
    i18nResponse.headers.set('Referrer-Policy', 'no-referrer');
    i18nResponse.headers.set('Content-Security-Policy', cspHeader);

    return i18nResponse;
  }

  // If no i18n routing needed, create new response with security headers
  const response = NextResponse.next();
  response.headers.set('x-nonce', nonce);
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
