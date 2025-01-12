import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@src/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldHandle =
    pathname === '/' ||
    new RegExp(`^/(${routing.locales.join('|')})(/.*)?$`).test(pathname);

  if (!shouldHandle) return NextResponse.next();

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(fr-CA|en-US)/:path*', '/((?!api|_next|.*\\.).*)'],
};
