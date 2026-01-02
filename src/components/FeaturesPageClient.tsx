"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, Brain, Clock, FileText, Globe, LineChart, LucideIcon, Network, Newspaper, Shield, Smartphone, Target, TrendingUp, Zap } from "lucide-react";

// Icons must be defined in client component, not passed as props
const iconMap: Record<string, LucideIcon> = {
    Brain,
    LineChart,
    Newspaper,
    Zap,
    Shield,
    Globe,
    Clock,
    TrendingUp,
    Bell,
    FileText,
    Smartphone,
    Network,
    Target
};

interface Feature {
    iconName: string;
    title: string;
    subtitle: string;
    description: string;
    capabilities: string[];
    useCase: { title: string; description: string };
}

interface AdditionalFeature {
    iconName: string;
    title: string;
    desc: string;
}

interface FeaturesPageClientProps {
    content: {
        hero: { title: string; subtitle: string };
        features: Feature[];
        additionalFeatures: {
            title: string;
            items: AdditionalFeature[];
        };
        cta: { title: string; subtitle: string; button: string };
    };
}

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

export default function FeaturesPageClient({ content: t }: FeaturesPageClientProps) {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="py-20 text-center overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        {t.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-3xl mx-auto"
                    >
                        {t.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Main Features */}
            <section className="pb-20">
                <div className="container mx-auto px-6">
                    <div className="space-y-32">
                        {t.features.map((feature, i) => {
                            const Icon = iconMap[feature.iconName] || Brain;
                            return (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`grid lg:grid-cols-2 gap-12 items-center`}
                                >
                                    <motion.div
                                        variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                                        transition={{ duration: 0.6 }}
                                        className={i % 2 === 1 ? 'lg:order-2' : ''}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <motion.div
                                                whileHover={{ rotate: 360, scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                                            >
                                                <Icon className="h-6 w-6 text-primary" />
                                            </motion.div>
                                            <span className="text-sm text-primary font-medium uppercase tracking-wider">{feature.subtitle}</span>
                                        </div>
                                        <h2 className="text-3xl font-bold mb-4 break-words">{feature.title}</h2>
                                        <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>

                                        <motion.ul
                                            variants={staggerContainer}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            className="space-y-3 mb-8"
                                        >
                                            {feature.capabilities.map((cap, j) => (
                                                <motion.li
                                                    key={j}
                                                    variants={fadeInUp}
                                                    className="flex items-center gap-3"
                                                >
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        whileInView={{ scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: j * 0.1, type: "spring" }}
                                                        className="w-1.5 h-1.5 rounded-full bg-primary"
                                                    />
                                                    <span>{cap}</span>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </motion.div>

                                    <motion.div
                                        variants={i % 2 === 0 ? fadeInRight : fadeInLeft}
                                        transition={{ duration: 0.6 }}
                                        whileHover={{ scale: 1.02 }}
                                        className={`p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm ${i % 2 === 1 ? 'lg:order-1' : ''}`}
                                    >
                                        <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                            <motion.span
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                                            >
                                                💡
                                            </motion.span>
                                            {feature.useCase.title}
                                        </h4>
                                        <p className="text-muted-foreground italic leading-relaxed">"{feature.useCase.description}"</p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Additional Features */}
            <section className="py-20 bg-white/5">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-3xl font-bold mb-12 text-center"
                    >
                        {t.additionalFeatures.title}
                    </motion.h2>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {t.additionalFeatures.items.map((item, i) => {
                            const Icon = iconMap[item.iconName] || Shield;
                            return (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="p-6 rounded-2xl border border-white/10 bg-background text-center hover:border-primary/50 transition-colors"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                                    </motion.div>
                                    <h3 className="font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-20"
            >
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold mb-4"
                    >
                        {t.cta.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
                    >
                        {t.cta.subtitle}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button size="lg" asChild>
                            <a href="https://app.quanor.com/register/essential">{t.cta.button}</a>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
