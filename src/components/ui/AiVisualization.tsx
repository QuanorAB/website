"use client";

/**
 * AI Visualization Component
 * 
 * Animated visualization showing Quanor's data processing pipeline.
 * Uses professional teal/cyan colors instead of neon green.
 * 
 * @component
 * @param {Object} props
 * @param {string} [props.lang='en'] - Language code for bilingual labels
 */

import { motion } from "framer-motion";
import {
    ArrowRight,
    BarChart3,
    Cpu,
    DollarSign,
    FileText,
    Globe,
    Newspaper,
    TrendingUp,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";

interface DataSource {
    icon: React.ComponentType<{ className?: string }>;
    label: { sv: string; en: string };
    color: string;
    bgColor: string;
}

const dataSources: DataSource[] = [
    { icon: Newspaper, label: { sv: "Pressmeddelanden", en: "Press Releases" }, color: "text-blue-400", bgColor: "bg-blue-500/10" },
    { icon: FileText, label: { sv: "Kvartalsrapporter", en: "Quarterly Reports" }, color: "text-violet-400", bgColor: "bg-violet-500/10" },
    { icon: TrendingUp, label: { sv: "Pre-earnings", en: "Pre-earnings" }, color: "text-amber-400", bgColor: "bg-amber-500/10" },
    { icon: Globe, label: { sv: "Makrodata", en: "Macro Data" }, color: "text-cyan-400", bgColor: "bg-cyan-500/10" },
    { icon: DollarSign, label: { sv: "Prisförändringar", en: "Price Changes" }, color: "text-primary", bgColor: "bg-primary/10" },
];

export function AiVisualization({ lang = "en" }: { lang?: string }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % dataSources.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const content = {
        sv: {
            processing: "Bearbetar...",
            output: "AI-analys",
            sentiment: "Sentiment",
            impact: "Marknadsimpakt",
            action: "Signal"
        },
        en: {
            processing: "Processing...",
            output: "AI Analysis",
            sentiment: "Sentiment",
            impact: "Market Impact",
            action: "Signal"
        }
    };

    const t = lang === "sv" ? content.sv : content.en;

    return (
        <div className="w-full py-4">
            {/* Compact vertical flow for sidebar placement */}
            <div className="flex flex-col gap-6">

                {/* Input Sources - Centered grid for 5 items */}
                <div className="flex flex-wrap justify-center gap-2">
                    {dataSources.map((source, i) => {
                        const Icon = source.icon;
                        const isActive = i === activeIndex;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: isActive ? 1.03 : 1,
                                }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className={`relative flex items-center gap-2 p-2.5 rounded-xl border bg-card/60 backdrop-blur-sm transition-all duration-300 ${isActive ? 'border-primary/40 ring-1 ring-primary/20' : 'border-white/5'}`}
                            >
                                <div className={`${source.bgColor} p-1.5 rounded-lg`}>
                                    <Icon className={`w-4 h-4 ${source.color}`} />
                                </div>
                                <span className="text-xs font-medium truncate">
                                    {lang === "sv" ? source.label.sv : source.label.en}
                                </span>

                                {/* Active indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -right-1 -top-1 w-2 h-2"
                                    >
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Flow indicator - animated data stream */}
                <div className="flex justify-center py-2">
                    <div className="relative flex flex-col items-center">
                        {/* Gradient line */}
                        <div className="w-0.5 h-10 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/10 rounded-full" />

                        {/* Animated traveling dot */}
                        <motion.div
                            animate={{ y: [0, 32, 0], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"
                        />

                        {/* Arrow tip */}
                        <svg className="w-3 h-3 text-primary/60 -mt-0.5" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M6 9L2 5h8L6 9z" />
                        </svg>
                    </div>
                </div>

                {/* AI Processing Core */}
                <div className="flex justify-center">
                    <div className="relative">
                        {/* Outer glow - subtle teal */}
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.08, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl scale-150"
                        />

                        {/* Main chip */}
                        <motion.div
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="relative bg-gradient-to-br from-background via-background to-primary/5 border border-primary/30 p-5 rounded-2xl shadow-xl"
                        >
                            <Cpu className="w-10 h-10 text-primary" />

                            {/* Processing indicator */}
                            <motion.div
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-background/95 px-2.5 py-1 rounded-full border border-primary/20 text-xs font-medium text-primary whitespace-nowrap"
                            >
                                <Zap className="w-3 h-3" />
                                {t.processing}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Flow indicator - animated data stream */}
                <div className="flex justify-center py-2">
                    <div className="relative flex flex-col items-center">
                        {/* Gradient line */}
                        <div className="w-0.5 h-10 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/10 rounded-full" />

                        {/* Animated traveling dot */}
                        <motion.div
                            animate={{ y: [0, 32, 0], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute top-0 w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"
                        />

                        {/* Arrow tip */}
                        <svg className="w-3 h-3 text-primary/60 -mt-0.5" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M6 9L2 5h8L6 9z" />
                        </svg>
                    </div>
                </div>

                {/* Output Panel - Professional styling */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-card/60 backdrop-blur-sm border border-primary/10 p-4 rounded-xl shadow-lg"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-semibold">{t.output}</span>
                    </div>

                    <div className="space-y-3">
                        {/* Sentiment bar */}
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">{t.sentiment}</span>
                                <span className="text-primary font-medium">Positiv</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "78%" }}
                                    transition={{ duration: 1.5, delay: 0.8 }}
                                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Impact bar */}
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">{t.impact}</span>
                                <span className="text-blue-400 font-medium">Medium</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "55%" }}
                                    transition={{ duration: 1.5, delay: 1 }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Recommendation - teal/primary instead of neon green */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="flex items-center gap-2 mt-3 p-2 bg-primary/10 rounded-lg border border-primary/15"
                        >
                            <ArrowRight className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">{t.action}: Bullish</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
