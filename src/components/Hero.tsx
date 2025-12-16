"use client";

/**
 * Hero Section Component
 * 
 * Primary landing section with centered headline, CTAs, and device mockups.
 * Features staggered animations, browser-chrome styled screenshots, and
 * floating mobile device.
 * 
 * @param {Object} props
 * @param {string} props.lang - Language code ('sv' | 'en') for i18n
 */

import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero({ lang }: { lang: string }) {
    const content = {
        sv: {
            title: ["Omedelbar", "Aktieanalys"],
            subtitle: "Få institutionell analys av pressmeddelanden, kvartalsrapporter och pre-earnings för nordiska aktier – sekunder efter publicering.",
            getStarted: "Kom igång gratis",
            learnMore: "Läs mer",
            stats: {
                monitoring: "24/7",
                marketMonitoring: "bevakning",
                realtime: "Snabb",
                aiAnalysis: "AI-analys"
            }
        },
        en: {
            title: ["Instant", "Stock Analysis"],
            subtitle: "Get institutional-grade analysis of press releases, quarterly reports, and pre-earnings for Nordic stocks – seconds after release.",
            getStarted: "Get started free",
            learnMore: "Learn more",
            stats: {
                monitoring: "24/7",
                marketMonitoring: "monitoring",
                realtime: "Fast",
                aiAnalysis: "AI analysis"
            }
        }
    };

    const t = lang === "sv" ? content.sv : content.en;

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
            <HeroBackground />

            <div className="container mx-auto px-6 flex flex-col items-center z-10">
                {/* Centered Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-6 text-center max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
                        {t.title.map((line, i) => (
                            <span key={i} className={`block ${i === 0 ? 'text-primary' : 'text-foreground'}`}>
                                {line}
                            </span>
                        ))}
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                        {t.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button size="lg" className="group text-lg h-14 px-8 rounded-full shadow-lg shadow-primary/20" asChild>
                            <a href="https://app.quanor.com/register">
                                {t.getStarted}
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg h-14 px-8 rounded-full bg-background/50 backdrop-blur-sm border-muted-foreground/20 hover:bg-background/80">
                            {t.learnMore}
                        </Button>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-6 pt-8 border-t border-border/50">
                        <div className="flex items-center gap-3">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">{t.stats.monitoring} {t.stats.marketMonitoring}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex h-3 w-3 relative">
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">{t.stats.realtime} {t.stats.aiAnalysis}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Device Mockups Below */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative w-full max-w-6xl mt-16"
                >
                    {/* Desktop + Mobile Composition */}
                    <div className="relative">
                        {/* Glow effect behind devices */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent rounded-3xl blur-3xl" />

                        {/* Desktop Window */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="relative rounded-xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 bg-background"
                        >
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="px-4 py-1 rounded-md bg-zinc-800/50 text-xs text-muted-foreground">
                                        app.quanor.com
                                    </div>
                                </div>
                            </div>
                            <Image
                                src={lang === 'sv' ? "/images/app_home_dark_sv.png" : "/images/app_home_dark_en.png"}
                                alt="Quanor Platform Desktop"
                                width={1400}
                                height={900}
                                className="w-full h-auto"
                                priority
                            />
                        </motion.div>

                        {/* Mobile Phone - Positioned overlapping bottom right */}
                        <motion.div
                            initial={{ opacity: 0, x: 30, y: 30 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="absolute -bottom-8 right-4 md:right-12 w-[25%] md:w-[18%] max-w-[180px]"
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="rounded-[2rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-[3px] border-zinc-800 bg-zinc-950"
                            >
                                <Image
                                    src={lang === 'sv' ? "/images/app_home_dark_mobile_sv.jpeg" : "/images/app_home_dark_mobile_en.jpeg"}
                                    alt="Quanor Platform Mobile"
                                    width={300}
                                    height={600}
                                    className="w-full h-auto"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
