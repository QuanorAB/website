"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { RelationshipUniverse } from "./ui/RelationshipUniverse";

export default function Teaser({ lang }: { lang: string }) {
    const content = {
        sv: {
            title: "Varför välja Quanor?",
            subtitle: "Se hur bolag hänger ihop och förstå marknaden på djupet.",
            description: "Vår Relationsuniversum-funktion visar hur varje bolag är kopplat till sina konkurrenter, kunder och leverantörer. Plus automatiska triggers för viktiga händelser som VD-byten, insiderhandel och M&A-aktivitet.",
            features: [
                "Visualisera konkurrenter, kunder och leverantörer",
                "Automatiska triggers för VD-byten och insiderhandel",
                "Se M&A-aktivitet och bolagshändelser i realtid",
                "Förstå marknadsstrukturen på ett ögonblick"
            ]
        },
        en: {
            title: "Why choose Quanor?",
            subtitle: "See how companies connect and understand the market deeply.",
            description: "Our Relationship Universe feature shows how each company is connected to its competitors, customers, and suppliers. Plus automatic triggers for important events like CEO changes, insider trading, and M&A activity.",
            features: [
                "Visualize competitors, customers, and suppliers",
                "Automatic triggers for CEO changes and insider trading",
                "See M&A activity and corporate events in real-time",
                "Understand market structure at a glance"
            ]
        }
    };

    const t = lang === "sv" ? content.sv : content.en;

    return (
        <section className="py-24 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Coded Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm p-6">
                            <RelationshipUniverse lang={lang} />
                        </div>
                        {/* Decorative glow behind */}
                        <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10" />
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-bold mb-4"
                            >
                                {t.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-muted-foreground"
                            >
                                {t.subtitle}
                            </motion.p>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground leading-relaxed"
                        >
                            {t.description}
                        </motion.p>

                        <motion.ul
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-3"
                        >
                            {t.features.map((feature, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-foreground">{feature}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
