"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, HelpCircle, X } from "lucide-react";

interface PricingPageClientProps {
    content: {
        hero: { title: string; subtitle: string };
        monthly: string;
        annually: string;
        tiers: {
            name: string;
            price: string;
            promo?: string;
            regularPrice?: string;
            desc: string;
            features: string[];
            cta: string;
            popular: boolean;
        }[];
        comparison: {
            title: string;
            features: { name: string; starter: string | boolean; essential?: string | boolean; enterprise: string | boolean }[];
        };
        faq: {
            title: string;
            items: { q: string; a: string }[];
        };
        enterprise: { title: string; subtitle: string; cta: string };
    };
}

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function PricingPageClient({ content: t }: PricingPageClientProps) {
    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="py-20 text-center">
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
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        {t.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                    >
                        {t.tiers.map((tier, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                transition={{ duration: 0.5 }}
                                whileHover={{ y: -10 }}
                                className={`relative p-8 rounded-2xl border ${tier.popular
                                    ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10 scale-105"
                                    : "border-white/10 bg-white/5"
                                    }`}
                            >
                                {tier.popular && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium"
                                    >
                                        Most Popular
                                    </motion.div>
                                )}
                                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                <div className="text-4xl font-bold mb-1">
                                    {tier.price}
                                    {tier.price !== "Kontakta oss" && tier.price !== "Contact us" && (
                                        <span className="text-lg text-muted-foreground font-normal">
                                            {t.monthly}
                                        </span>
                                    )}
                                </div>
                                {tier.promo && (
                                    <p className="text-sm text-primary font-medium">{tier.promo}</p>
                                )}
                                {tier.regularPrice && (
                                    <p className="text-xs text-muted-foreground mb-2">{tier.regularPrice}</p>
                                )}
                                <p className="text-muted-foreground mb-8">{tier.desc}</p>

                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature, j) => (
                                        <motion.li
                                            key={j}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + j * 0.05 }}
                                            className="flex items-center gap-3"
                                        >
                                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <Button
                                    className="w-full"
                                    variant={tier.popular ? "default" : "outline"}
                                    asChild
                                >
                                    <a href={`https://app.quanor.com/register/${tier.name === 'Starter' ? 'free' : tier.name === 'Enterprise' ? 'enterprise' : 'essential'}`}>
                                        {tier.cta}
                                    </a>
                                </Button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 bg-white/5">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-3xl font-bold mb-12 text-center"
                    >
                        {t.comparison.title}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto overflow-x-auto"
                    >
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                                    <th className="text-center py-4 px-4 font-semibold">Starter</th>
                                    <th className="text-center py-4 px-4 font-semibold text-primary">Essential</th>
                                    <th className="text-center py-4 px-4 font-semibold">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {t.comparison.features.map((feature, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="border-b border-white/5"
                                    >
                                        <td className="py-4 px-4">{feature.name}</td>
                                        <td className="text-center py-4 px-4">
                                            {typeof feature.starter === 'boolean' ? (
                                                feature.starter ? (
                                                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-muted-foreground">{feature.starter}</span>
                                            )}
                                        </td>
                                        <td className="text-center py-4 px-4 bg-primary/5">
                                            {typeof feature.essential === 'boolean' ? (
                                                feature.essential ? (
                                                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                )
                                            ) : (
                                                <span className="font-medium">{feature.essential}</span>
                                            )}
                                        </td>
                                        <td className="text-center py-4 px-4">
                                            {typeof feature.enterprise === 'boolean' ? (
                                                feature.enterprise ? (
                                                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                )
                                            ) : (
                                                <span>{feature.enterprise}</span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-3"
                    >
                        <HelpCircle className="h-8 w-8 text-primary" />
                        {t.faq.title}
                    </motion.h2>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid gap-6"
                    >
                        {t.faq.items.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                transition={{ duration: 0.4 }}
                                whileHover={{ scale: 1.02 }}
                                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                                <p className="text-muted-foreground">{item.a}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Enterprise CTA */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-20 bg-primary/10"
            >
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold mb-4"
                    >
                        {t.enterprise.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
                    >
                        {t.enterprise.subtitle}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, type: "spring" }}
                    >
                        <Button size="lg" asChild>
                            <a href="mailto:enterprise@quanor.com">{t.enterprise.cta}</a>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
