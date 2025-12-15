"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMember {
    name: string;
    role: { sv: string; en: string };
    image: string | null;
    bio: { sv: string; en: string };
}

interface AboutPageClientProps {
    lang: string;
    teamMembers: {
        core: TeamMember[];
        advisors: TeamMember[];
    };
    content: {
        hero: { title: string; subtitle: string };
        story: { title: string; paragraphs: string[] };
        team: { title: string; subtitle: string };
        advisors: { title: string; subtitle: string };
        values: { title: string; items: { title: string; desc: string }[] };
        cta: { title: string; subtitle: string; button: string };
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

export default function AboutPageClient({ lang, teamMembers, content: t }: AboutPageClientProps) {
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

            {/* Story */}
            <section className="py-16 bg-white/5">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold mb-8"
                    >
                        {t.story.title}
                    </motion.h2>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-6 text-lg text-muted-foreground leading-relaxed"
                    >
                        {t.story.paragraphs.map((p, i) => (
                            <motion.p
                                key={i}
                                variants={fadeInUp}
                                transition={{ duration: 0.5 }}
                            >
                                {p}
                            </motion.p>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Core Team */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-4">{t.team.title}</h2>
                        <p className="text-muted-foreground text-lg">{t.team.subtitle}</p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {teamMembers.core.map((member, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                transition={{ duration: 0.5 }}
                                className="text-center group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-colors"
                                >
                                    <Image
                                        src={member.image!}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-primary font-medium mb-3">
                                    {lang === 'sv' ? member.role.sv : member.role.en}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {lang === 'sv' ? member.bio.sv : member.bio.en}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Advisors */}
            <section className="py-20 bg-white/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-4">{t.advisors.title}</h2>
                        <p className="text-muted-foreground text-lg">{t.advisors.subtitle}</p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="flex justify-center gap-16 max-w-3xl mx-auto"
                    >
                        {teamMembers.advisors.map((advisor, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                transition={{ duration: 0.5 }}
                                className="text-center w-48"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/10"
                                >
                                    {advisor.image ? (
                                        <Image
                                            src={advisor.image}
                                            alt={advisor.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                                            {advisor.name.charAt(0)}
                                        </div>
                                    )}
                                </motion.div>
                                <h3 className="text-lg font-bold mb-1">{advisor.name}</h3>
                                <p className="text-primary text-sm font-medium mb-2">
                                    {lang === 'sv' ? advisor.role.sv : advisor.role.en}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {lang === 'sv' ? advisor.bio.sv : advisor.bio.en}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-3xl font-bold mb-12 text-center"
                    >
                        {t.values.title}
                    </motion.h2>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {t.values.items.map((value, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                transition={{ duration: 0.5 }}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground">{value.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
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
                    <motion.a
                        href="#"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                        {t.cta.button}
                    </motion.a>
                </div>
            </motion.section>
        </div>
    );
}
