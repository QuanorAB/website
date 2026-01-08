/**
 * Global 404 Not Found Page
 *
 * Custom 404 page that matches the site's design.
 * Since not-found pages don't inherit layouts in Next.js App Router,
 * we need to import styles and define the full page structure here.
 *
 * Best Practices Implemented:
 * - noindex, nofollow meta tag to prevent search engine indexing
 * - Proper HTTP 404 status (automatic via Next.js not-found)
 * - Client-side language detection from URL path
 * - Helpful navigation links to keep users on site
 * - Consistent branding with Quanor design system
 * - Accessible heading hierarchy and ARIA labels
 * - Responsive design (mobile-first with sm: breakpoints)
 *
 * File Placement:
 * This file is at src/app/not-found.tsx which is the correct location
 * for Next.js App Router global 404 handling.
 *
 * Note: This is a client component to enable URL-based language detection
 * without forcing all pages to be dynamically rendered.
 */

"use client";

import { Home, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// Import global styles - critical for styling to work
import "./globals.css";

/**
 * Bilingual content for the 404 page.
 * Swedish (sv) is the default/primary language.
 */
const content = {
    sv: {
        title: "404",
        heading: "Sidan kunde inte hittas",
        description: "Tyvärr kunde vi inte hitta sidan du letade efter. Den kan ha flyttats eller tagits bort.",
        backHome: "Tillbaka till startsidan",
        features: "Utforska funktioner",
        goBack: "Gå tillbaka",
        suggestions: "Du kanske letar efter:",
        switchLang: "English version",
        logoAria: "Quanor - Gå till startsidan",
        primaryActions: "Primära åtgärder",
        helpfulLinks: "Användbara länkar",
        links: {
            features: "Funktioner",
            pricing: "Priser",
            about: "Om oss",
            contact: "Kontakt"
        }
    },
    en: {
        title: "404",
        heading: "Page not found",
        description: "Sorry, we couldn't find the page you're looking for. It may have been moved or removed.",
        backHome: "Back to homepage",
        features: "Explore features",
        goBack: "Go back",
        suggestions: "You might be looking for:",
        switchLang: "Svensk version",
        logoAria: "Quanor - Go to homepage",
        primaryActions: "Primary actions",
        helpfulLinks: "Helpful links",
        links: {
            features: "Features",
            pricing: "Pricing",
            about: "About us",
            contact: "Contact"
        }
    }
};

/**
 * Detects the user's language preference from the URL path.
 * Runs on client-side to avoid forcing dynamic rendering.
 * Defaults to Swedish (sv) if language cannot be determined.
 */
function useLanguage(): "sv" | "en" {
    const [lang, setLang] = useState<"sv" | "en">("sv");

    useEffect(() => {
        const pathname = window.location.pathname;
        const isEnglish = pathname.startsWith("/en/") || pathname === "/en";
        setLang(isEnglish ? "en" : "sv");
    }, []);

    return lang;
}

/**
 * Sets the document title dynamically based on language.
 */
function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

/**
 * Back button component that navigates to previous page in history.
 */
function BackButton({ label }: { label: string }) {
    return (
        <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            type="button"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
            >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
            </svg>
            {label}
        </button>
    );
}

/**
 * Global 404 Not Found Page Component
 *
 * Renders a user-friendly 404 error page with:
 * - Quanor branding (logo)
 * - Clear error messaging in the detected language
 * - Primary CTAs to navigate back to useful pages
 * - Helpful links section
 * - Language switcher
 * - Browser back button
 */
export default function NotFound() {
    const lang = useLanguage();
    const t = content[lang];
    const otherLang = lang === "sv" ? "en" : "sv";

    // Set document title dynamically
    useDocumentTitle(`404 - ${t.heading} | Quanor`);

    // Add noindex meta tag and enforce dark mode
    useEffect(() => {
        // Enforce dark mode for consistent theming
        document.documentElement.classList.add('dark');

        // Check if noindex meta already exists
        let robotsMeta = document.querySelector('meta[name="robots"]');
        if (!robotsMeta) {
            robotsMeta = document.createElement('meta');
            robotsMeta.setAttribute('name', 'robots');
            document.head.appendChild(robotsMeta);
        }
        robotsMeta.setAttribute('content', 'noindex, nofollow');

        // Cleanup on unmount (optional, for strictness)
        return () => {
            // Don't remove it, just leave it
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
            <div className="max-w-2xl mx-auto text-center">
                {/* Logo with link to homepage */}
                <div className="mb-8">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
                        aria-label={t.logoAria}
                    >
                        <Image
                            src="/logo.png"
                            alt="Quanor"
                            width={48}
                            height={48}
                            className="rounded-lg"
                            priority
                        />
                        <span className="text-xl font-bold">Quanor</span>
                    </Link>
                </div>

                {/* 404 Badge - decorative, hidden from screen readers */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                    aria-hidden="true"
                >
                    <Search className="w-4 h-4" aria-hidden="true" />
                    {t.title}
                </div>

                {/* Main heading - single H1 for accessibility */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {t.heading}
                </h1>

                {/* Description */}
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                    {t.description}
                </p>

                {/* Primary CTAs - responsive: stack on mobile, row on desktop */}
                <nav
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    aria-label={t.primaryActions}
                >
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Home className="w-4 h-4" aria-hidden="true" />
                        {t.backHome}
                    </Link>
                    <Link
                        href={`/${lang}/features`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-accent transition-colors"
                    >
                        {t.features}
                    </Link>
                </nav>

                {/* Helpful Links - semantic list */}
                <nav
                    className="border-t border-border/40 pt-8"
                    aria-label={t.helpfulLinks}
                >
                    <p className="text-sm text-muted-foreground mb-4">
                        {t.suggestions}
                    </p>
                    <ul className="flex flex-wrap gap-4 justify-center list-none p-0 m-0">
                        <li>
                            <Link
                                href={`/${lang}/features`}
                                className="text-sm text-primary hover:underline"
                            >
                                {t.links.features}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${lang}/pricing`}
                                className="text-sm text-primary hover:underline"
                            >
                                {t.links.pricing}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${lang}/about`}
                                className="text-sm text-primary hover:underline"
                            >
                                {t.links.about}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${lang}/contact`}
                                className="text-sm text-primary hover:underline"
                            >
                                {t.links.contact}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Secondary actions: Back button and language switch */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <BackButton label={t.goBack} />
                    <span
                        className="hidden sm:inline text-muted-foreground/50"
                        aria-hidden="true"
                    >
                        |
                    </span>
                    <Link
                        href={`/${otherLang}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        hrefLang={otherLang}
                    >
                        {t.switchLang}
                    </Link>
                </div>
            </div>
        </div>
    );
}
