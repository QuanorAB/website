/**
 * Next.js Middleware for Internationalization (i18n)
 *
 * This middleware handles language routing for the Quanor website:
 *
 * Redirects requests without a locale prefix to the default language (Swedish)
 * Example: /features → /sv/features
 *
 * Supported languages: Swedish (sv), English (en)
 * Default language: Swedish (sv)
 *
 * Note: The middleware matcher excludes static files, API routes, and SEO files
 * to avoid unnecessary processing.
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { fallbackLng, languages } from './i18n/settings';

/**
 * Middleware function to handle i18n routing.
 *
 * @param request - The incoming Next.js request
 * @returns NextResponse with redirect if no locale, otherwise continues normally
 */
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if the pathname already has a supported locale prefix
    const pathnameHasLocale = languages.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // Redirect to default locale if no locale in path
    if (!pathnameHasLocale) {
        const locale = fallbackLng;

        // Redirect: /products → /sv/products
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }

    // For requests with a locale, continue without modifying headers
    // This allows pages to be statically generated (SSG)
}

/**
 * Middleware matcher configuration.
 *
 * Excludes:
 * - API routes (/api/*)
 * - Next.js internal routes (/_next/*)
 * - Static assets (favicon, logo, images, etc.)
 * - SEO files (sitemap.xml, robots.txt)
 */
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.*|sw\\.js|site\\.webmanifest|images|logo\\.png|team|sitemap\\.xml|robots\\.txt).*)',
    ],
};
