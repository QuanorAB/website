import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { fallbackLng, languages } from './i18n/settings';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = languages.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = fallbackLng;

        // e.g. incoming request is /products
        // The new URL is now /sv/products
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, assets, api), static files, and SEO files
        // Note: Using \\\\ for escaped dot in the regex pattern
        '/((?!api|_next/static|_next/image|assets|favicon\\.ico|sw\\.js|site\\.webmanifest|images|logo\\.png|team|sitemap\\.xml|robots\\.txt).*)',
    ],
};
