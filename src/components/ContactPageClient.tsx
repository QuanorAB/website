"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Clock, Headphones, Mail, MapPin, Send, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ContactPageClientProps {
    lang: string;
    content: {
        hero: { title: string; subtitle: string };
        contactMethods: {
            title: string;
            items: { icon: string; title: string; description: string; action: string; actionLabel: string }[];
        };
        departments: {
            title: string;
            items: { icon: string; title: string; description: string; email: string }[];
        };
        form: {
            title: string;
            subtitle: string;
            fields: { name: string; email: string; subject: string; message: string };
            subjectOptions: string[];
            button: string;
            success: string;
        };
        office: {
            title: string;
            address: string[];
            postalTitle?: string;
            postalAddress?: string[];
            hours: string;
            hoursLabel: string;
        };
        faq: {
            title: string;
            items: { q: string; a: string }[];
        };
    };
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Mail,
    MapPin,
    Users,
    Headphones
};

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

export default function ContactPageClient({ lang, content: t }: ContactPageClientProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Check if Supabase is configured
            if (!supabase) {
                // Fallback for development - show success but warn
                console.warn('Supabase not configured. Skipping form submission.');
                toast.success(t.form.success);
                setFormData({ name: "", email: "", subject: "", message: "" });
                setIsSubmitting(false);
                return;
            }

            // Call the send-contact-email Edge Function (same as legacy)
            const { error } = await supabase.functions.invoke('send-contact-email', {
                body: {
                    name: formData.name,
                    email: formData.email,
                    company: formData.subject, // Map subject to company field for compatibility
                    message: formData.message
                }
            });

            if (error) {
                throw new Error(error.message || 'Failed to send message');
            }

            toast.success(t.form.success);
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(lang === 'sv'
                ? 'Något gick fel. Försök igen eller skicka ett mail till hello@quanor.com'
                : 'Something went wrong. Please try again or email hello@quanor.com');
        } finally {
            setIsSubmitting(false);
        }
    };

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

            {/* Contact Methods - 3 cards */}
            <section className="pb-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {t.contactMethods.items.map((item, i) => {
                            const Icon = iconMap[item.icon] || Mail;
                            return (
                                <motion.a
                                    key={i}
                                    href={item.action}
                                    variants={fadeInUp}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center hover:border-primary/50 transition-colors group"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20"
                                    >
                                        <Icon className="h-6 w-6 text-primary" />
                                    </motion.div>
                                    <h3 className="font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                                    <span className="text-primary text-sm font-medium">{item.actionLabel} →</span>
                                </motion.a>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Contact Form + Office Info */}
            <section className="py-20 bg-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold mb-2">{t.form.title}</h2>
                            <p className="text-muted-foreground mb-8">{t.form.subtitle}</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">{t.form.fields.name}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:border-primary focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">{t.form.fields.email}</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:border-primary focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">{t.form.fields.subject}</label>
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:border-primary focus:outline-none transition-colors"
                                    >
                                        <option value="">---</option>
                                        {t.form.subjectOptions.map((option, i) => (
                                            <option key={i} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">{t.form.fields.message}</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 focus:border-primary focus:outline-none transition-colors resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            ...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="h-4 w-4" />
                                            {t.form.button}
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </motion.div>

                        {/* Office Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="p-8 rounded-2xl border border-white/10 bg-background">
                                {/* Visiting Address */}
                                <div className="flex items-center gap-3 mb-4">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <h3 className="text-lg font-bold">{t.office.title}</h3>
                                </div>
                                <div className="space-y-1 mb-6">
                                    {t.office.address.map((line, i) => (
                                        <p key={i} className="text-muted-foreground text-sm">{line}</p>
                                    ))}
                                </div>

                                {/* Postal Address */}
                                {t.office.postalTitle && t.office.postalAddress && (
                                    <>
                                        <div className="flex items-center gap-3 mb-4 pt-4 border-t border-white/10">
                                            <Mail className="h-5 w-5 text-primary" />
                                            <h4 className="font-bold">{t.office.postalTitle}</h4>
                                        </div>
                                        <div className="space-y-1 mb-6">
                                            {t.office.postalAddress.map((line, i) => (
                                                <p key={i} className="text-muted-foreground text-sm">{line}</p>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Office Hours */}
                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">{t.office.hoursLabel}</p>
                                        <p className="text-sm text-muted-foreground">{t.office.hours}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="h-64 rounded-2xl border border-white/10 overflow-hidden"
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.8!2d18.0584!3d59.3311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d6003a7988d%3A0x3d4d168bc9c47f8a!2sKlarabergsviadukten%2063%2C%20111%2064%20Stockholm!5e0!3m2!1sen!2sse!4v1702500000000!5m2!1sen!2sse"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Quanor Office Location"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
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
                        className="text-2xl font-bold mb-12 text-center"
                    >
                        {t.faq.title}
                    </motion.h2>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid gap-4"
                    >
                        {t.faq.items.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.01 }}
                                className="p-6 rounded-xl border border-white/10 bg-white/5"
                            >
                                <h3 className="font-bold mb-2">{item.q}</h3>
                                <p className="text-muted-foreground text-sm">{item.a}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
