"use client";

/**
 * Navigation Component
 * 
 * Fixed top navigation with responsive mobile menu and language switcher.
 * Includes scroll-aware styling that adds backdrop blur when scrolled.
 * 
 * @param {Object} props
 * @param {string} props.lang - Language code ('sv' or 'en')
 */

import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation({ lang }: { lang: string }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const otherLang = lang === 'sv' ? 'en' : 'sv';

    const content = {
        sv: {
            features: "Funktioner",
            pricing: "Priser",
            about: "Om oss",
            contact: "Kontakt",
            blog: "Blogg",
            login: "Logga in",
            signUp: "Kom igång"
        },
        en: {
            features: "Features",
            pricing: "Pricing",
            about: "About",
            contact: "Contact",
            blog: "Blog",
            login: "Sign In",
            signUp: "Get Started"
        }
    };

    const t = lang === "sv" ? content.sv : content.en;

    const navLinks = [
        { href: `/${lang}/features`, label: t.features },
        { href: `/${lang}/pricing`, label: t.pricing },
        { href: `/${lang}/about`, label: t.about },
        { href: `/${lang}/contact`, label: t.contact },
        { href: `/${lang}/blog`, label: t.blog },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "py-2"
                    : "py-4"
                    }`}
            >
                <div className="container mx-auto px-6">
                    <div className={`
                        flex items-center justify-between
                        ${isScrolled
                            ? "bg-background/70 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-3 shadow-lg shadow-black/5"
                            : "bg-transparent"
                        }
                        transition-all duration-500
                    `}>
                        {/* Logo - Left */}
                        <Link href={`/${lang}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <Image
                                src="/logo.png"
                                alt="Quanor"
                                width={36}
                                height={36}
                                className="h-8 w-8"
                            />
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Quanor
                            </span>
                        </Link>

                        {/* Center Navigation - Desktop */}
                        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right side - Language & CTAs */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Language Switch */}
                            <Link href={`/${otherLang}`}>
                                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                                    <Globe className="h-4 w-4" />
                                    <span className="text-xs font-medium">{otherLang.toUpperCase()}</span>
                                </Button>
                            </Link>

                            <div className="w-px h-5 bg-border/50" />

                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                                <a href="https://app.quanor.com/login">{t.login}</a>
                            </Button>

                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20" asChild>
                                <a href="https://app.quanor.com/register">{t.signUp}</a>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-2">
                            <Link href={`/${otherLang}`}>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <Globe className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="h-9 w-9"
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
                    <div
                        className="absolute top-20 left-4 right-4 bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block w-full px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-colors rounded-xl font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-border/50 p-4 space-y-2">
                            <Button variant="outline" className="w-full justify-center" asChild>
                                <a href="https://app.quanor.com/login">{t.login}</a>
                            </Button>
                            <Button className="w-full justify-center bg-primary hover:bg-primary/90" asChild>
                                <a href="https://app.quanor.com/register">{t.signUp}</a>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
