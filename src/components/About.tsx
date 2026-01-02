"use client";

/**
 * About Section Component
 * 
 * Homepage section showcasing company values and stats.
 * Features company description, statistics grid, and value proposition cards.
 * Uses inline translations for Swedish/English bilingual content.
 * 
 * @param {Object} props
 * @param {string} props.lang - Language code ('sv' or 'en')
 */

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Globe, Lightbulb, Target } from "lucide-react";

export default function About({ lang }: { lang: string }) {
    const content = {
        sv: {
            title: "Bakom Quanor",
            subtitle: "Ett passionerat team som förändrar finansvärlden.",
            description1: "Quanor grundades med visionen att demokratisera tillgången till avancerad finansiell analys. Genom att kombinera expertis inom finans med spjutspetsteknologi inom AI, levererar vi analyser som ger investerare ett övertag.",
            description2: "Vår plattform bearbetar automatiskt stora mängder information i realtid för att leverera analyser som tidigare krävde hela analysteam.",
            team: "Vårt lilla men dedikerade team består av doktorer inom matematisk statistik, AI/LLM-experter, datavetare och entreprenörer som brinner för att förvandla finansbranschen genom ny teknik.",
            stats: {
                companies: "900+",
                companiesLabel: "Bolag analyserade",
                prSpeed: "<3s",
                prSpeedLabel: "Analystid PR",
                reportSpeed: "<30s",
                reportSpeedLabel: "Analystid Rapporter",
                accuracy: "99%",
                accuracyLabel: "Datakvalitet"
            },
            values: [
                {
                    id: 'innovation',
                    title: "Innovation",
                    description: "Vi utmanar ständigt gränserna för vad som är möjligt med AI inom finans."
                },
                {
                    id: 'transparency',
                    title: "Transparens",
                    description: "Vi tror på öppna modeller och tydlig kommunikation kring hur våra analyser genereras."
                },
                {
                    id: 'excellence',
                    title: "Excellens",
                    description: "Vi nöjer oss inte med 'bra nog'. Vi strävar alltid efter högsta möjliga kvalitet."
                }
            ]
        },
        en: {
            title: "Behind Quanor",
            subtitle: "A passionate team changing the financial world.",
            description1: "Quanor was founded with the vision to democratize access to advanced financial analysis. By combining financial expertise with cutting-edge AI technology, we deliver analysis that gives investors an edge.",
            description2: "Our platform automatically processes large amounts of information in real-time to deliver analysis that previously required entire analyst teams.",
            team: "Our small but dedicated team consists of PhDs in mathematical statistics, AI/LLM experts, data scientists, and entrepreneurs passionate about transforming the financial industry with new technology.",
            stats: {
                companies: "900+",
                companiesLabel: "Companies Analyzed",
                prSpeed: "<3s",
                prSpeedLabel: "PR Analysis Time",
                reportSpeed: "<30s",
                reportSpeedLabel: "Report Analysis Time",
                accuracy: "99%",
                accuracyLabel: "Data Quality"
            },
            values: [
                {
                    id: 'innovation',
                    title: "Innovation",
                    description: "We constantly push the boundaries of what is possible with AI in finance."
                },
                {
                    id: 'transparency',
                    title: "Transparency",
                    description: "We believe in open models and clear communication about how our analysis is generated."
                },
                {
                    id: 'excellence',
                    title: "Excellence",
                    description: "We don't settle for 'good enough'. We always strive for the highest possible quality."
                }
            ]
        }
    };

    const t = lang === "sv" ? content.sv : content.en;
    const icons = { innovation: Lightbulb, transparency: Target, excellence: Globe };

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                                {t.title}
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {t.subtitle}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-muted-foreground">{t.description1}</p>
                            <p className="text-muted-foreground">{t.description2}</p>
                            <p className="text-muted-foreground">{t.team}</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <div className="text-3xl font-bold text-primary mb-1">{t.stats.companies}</div>
                                <div className="text-muted-foreground text-sm">{t.stats.companiesLabel}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-1">{t.stats.prSpeed}</div>
                                <div className="text-muted-foreground text-sm">{t.stats.prSpeedLabel}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-1">{t.stats.reportSpeed}</div>
                                <div className="text-muted-foreground text-sm">{t.stats.reportSpeedLabel}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-1">{t.stats.accuracy}</div>
                                <div className="text-muted-foreground text-sm">{t.stats.accuracyLabel}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Values Cards */}
                    <div className="space-y-6">
                        {t.values.map((value, index) => {
                            const Icon = icons[value.id as keyof typeof icons];
                            return (
                                <motion.div
                                    key={value.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="glass group hover:shadow-lg transition-all duration-300 border-white/5 bg-white/5">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold mb-2 text-foreground">{value.title}</h4>
                                                    <p className="text-muted-foreground">{value.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Link to full about page */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-2 text-center mt-8"
                    >
                        <a
                            href={`/${lang}/about`}
                            className="text-primary hover:underline font-medium"
                        >
                            {lang === 'sv' ? 'Läs mer om oss →' : 'Learn more about us →'}
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
