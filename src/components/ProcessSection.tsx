"use client";

/**
 * Process Section Component
 * 
 * Explains how the AI transforms information into actionable analysis.
 * Features a text section with bullet points and the AiVisualization component.
 * Uses inline translations for Swedish/English bilingual content.
 * 
 * @param {Object} props
 * @param {string} props.lang - Language code ('sv' or 'en')
 */

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { AiVisualization } from "./ui/AiVisualization";

export default function ProcessSection({ lang }: { lang: string }) {
    const features = lang === 'sv' ? [
        "Automatisk analys av pressmeddelanden och rapporter",
        "Realtidssentiment och marknadsimpakt",
        "Handlingsbara analyser direkt till din inbox"
    ] : [
        "Automatic analysis of press releases and reports",
        "Real-time sentiment and market impact",
        "Actionable analysis delivered to your inbox"
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold tracking-tight"
                        >
                            {lang === 'sv' ? "Från information till analys" : "From Information to Analysis"}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-muted-foreground"
                        >
                            {lang === 'sv'
                                ? "Vi bearbetar automatiskt stora mängder information i realtid för att ge dig snabba och relevanta analyser."
                                : "We automatically process large amounts of information in real-time to give you fast and relevant analysis."}
                        </motion.p>
                        <motion.ul
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-3"
                        >
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-primary" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </motion.ul>
                        <motion.a
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            href={`/${lang}/features`}
                            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                        >
                            {lang === 'sv' ? "Se alla funktioner" : "See all features"}
                            <ArrowRight className="h-4 w-4" />
                        </motion.a>
                    </div>

                    {/* Right side - AI Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <AiVisualization lang={lang} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
