"use client";

/**
 * Footer Component
 * 
 * Site-wide footer with navigation links, social media, and copyright.
 * Uses the lang prop pattern for bilingual content (Swedish/English).
 * 
 * @param {Object} props
 * @param {string} props.lang - Language code ('sv' or 'en')
 */

import { Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer({ lang }: { lang: string }) {
    const content = {
        sv: {
            description: "Omedelbar aktieanalys för nordiska aktier. Realtidsbevakning av pressmeddelanden, rapporter och marknadshändelser.",
            sections: {
                products: "Erbjudande",
                company: "Företag",
                resources: "Resurser"
            },
            links: {
                analysis: "Funktioner",
                pricing: "Priser",
                about: "Om oss",
                contact: "Kontakt",
                support: "Support",
                blog: "Blogg"
            },
            legal: {
                privacy: "Integritetspolicy",
                terms: "Användarvillkor",
                cookies: "Cookies"
            },
            copyright: `© ${new Date().getFullYear()} Quanor AB. Alla rättigheter förbehållna.`,
            builtIn: "Byggt i Sverige 🇸🇪"
        },
        en: {
            description: "Instant financial analysis for Nordic stocks. Real-time monitoring of press releases, reports, and market events.",
            sections: {
                products: "Offering",
                company: "Company",
                resources: "Resources"
            },
            links: {
                analysis: "Features",
                pricing: "Pricing",
                about: "About",
                contact: "Contact",
                support: "Support",
                blog: "Blog"
            },
            legal: {
                privacy: "Privacy Policy",
                terms: "Terms of Service",
                cookies: "Cookies"
            },
            copyright: `© ${new Date().getFullYear()} Quanor AB. All rights reserved.`,
            builtIn: "Built in Sweden 🇸🇪"
        }
    };

    const t = lang === "sv" ? content.sv : content.en;

    return (
        <footer className="bg-background border-t border-border/40 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Logo and Description */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href={`/${lang}`} className="text-xl font-bold tracking-tighter flex items-center gap-2 mb-4">
                            <Image src="/logo.png" alt="Quanor" width={32} height={32} className="rounded-lg" />
                            Quanor
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {t.description}
                        </p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com/QuanorFinance" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com/QuanorFinance" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/quanor" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="font-semibold mb-4">{t.sections.products}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href={`/${lang}/features`} className="hover:text-foreground transition-colors">{t.links.analysis}</Link></li>
                            <li><Link href={`/${lang}/pricing`} className="hover:text-foreground transition-colors">{t.links.pricing}</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">{t.sections.company}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href={`/${lang}/about`} className="hover:text-foreground transition-colors">{t.links.about}</Link></li>
                            <li><Link href={`/${lang}/contact`} className="hover:text-foreground transition-colors">{t.links.contact}</Link></li>
                            <li><Link href={`/${lang}/blog`} className="hover:text-foreground transition-colors">{t.links.blog}</Link></li>
                        </ul>
                    </div>

                    {/* Resources / Legal */}
                    <div>
                        <h3 className="font-semibold mb-4">{t.sections.resources}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href={`/${lang}/privacy`} className="hover:text-foreground transition-colors">{t.legal.privacy}</Link></li>
                            <li><Link href={`/${lang}/terms`} className="hover:text-foreground transition-colors">{t.legal.terms}</Link></li>
                            <li><Link href={`/${lang}/cookies`} className="hover:text-foreground transition-colors">{t.legal.cookies}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>{t.copyright}</p>
                    <p>{t.builtIn}</p>
                </div>
            </div>
        </footer>
    );
}
