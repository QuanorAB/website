"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Simon Blomqvist",
        role: { sv: "Analytiker, Knutsson Holding", en: "Analyst, Knutsson Holding" },
        sv: "Quanor ger mig en snabb och tydlig överblick inför och under rapportsäsongen. Det hjälper mig att effektivisera analysen och fokusera på det som verkligen driver casen framåt.",
        en: "Quanor gives me a quick and clear overview before and during earnings season. It helps me streamline my analysis and focus on what really drives the cases forward."
    },
    {
        name: "David Helldén",
        role: { sv: "Investerare", en: "Investor" },
        sv: "Quanor är ovärderligt för att kunna hantera och analysera all information de dagar där nyhetsflödet är intensivt. Utomordentligt verktyg speciellt i rapportperioder.",
        en: "Quanor is invaluable for managing and analyzing all information on days when the news flow is intense. Outstanding tool especially during earnings periods."
    },
    {
        name: "Erik Lundberg",
        role: { sv: "Analytiker, Kalqyl", en: "Analyst, Kalqyl" },
        sv: "Quanor är som en extra analytiker i teamet. Jag får nyckelinsikter direkt utan att drunkna i data.",
        en: "Quanor is like having an extra analyst on the team. I get key insights immediately without drowning in data."
    },
    {
        name: "Markus Gedda",
        role: { sv: "Delägare, Nordicap Corporate Finance", en: "Partner, Nordicap Corporate Finance" },
        sv: "Med Quanor kan vi bevaka fler bolag parallellt, vilket är extremt värdefullt i Nordicaps arbete där ständig marknadsöverblick är avgörande.",
        en: "With Quanor we can monitor more companies in parallel, which is extremely valuable in Nordicap's work where constant market overview is crucial."
    },
    {
        name: "Simon Häger",
        role: { sv: "Privatinvesterare", en: "Private Investor" },
        sv: "Quanor är perfekt i min bevakning av konkurrenter och peers inom industrin. Direkta notifikationer och en helhetlig översyn gör att jag kan vara först på bollen. Snabb marknadsinfo är en undervärderad konkurrensfördel.",
        en: "Quanor is perfect for monitoring competitors and peers in the industry. Direct notifications and a comprehensive overview allow me to be first to act. Fast market info is an underrated competitive advantage."
    }
];

export default function Testimonials({ lang }: { lang: string }) {
    // Triple the testimonials for seamless infinite scroll
    const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <section className="py-24 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        {lang === 'sv' ? "Vad våra kunder säger" : "What our customers say"}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {lang === 'sv'
                            ? "Analytiker och investerare som använder Quanor varje dag"
                            : "Analysts and investors who use Quanor every day"}
                    </p>
                </motion.div>
            </div>

            <div className="relative">
                <style jsx>{`
                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-33.333%);
                        }
                    }
                    .scroll-container {
                        animation: scroll 50s linear infinite;
                    }
                    .scroll-container:hover {
                        animation-play-state: paused;
                    }
                `}</style>

                <div className="scroll-container inline-flex gap-6">
                    {allTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[400px] p-6 bg-card/50 border border-border/50 rounded-xl backdrop-blur-sm"
                        >
                            <Quote className="w-8 h-8 text-primary/30 mb-4" />
                            <p className="text-foreground/90 mb-6 leading-relaxed">
                                {lang === 'sv' ? testimonial.sv : testimonial.en}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {lang === 'sv' ? testimonial.role.sv : testimonial.role.en}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
