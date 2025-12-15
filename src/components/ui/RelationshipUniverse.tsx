"use client";

/**
 * Relationship Universe Visualization Component
 * 
 * Clean network diagram with Volvo at center showing:
 * - Suppliers (left) flowing INTO Volvo
 * - Customers (right) receiving flow FROM Volvo  
 * - Peers (bottom) as related companies (no flow)
 * - Triggers (top) both positive and negative
 */

import { motion } from "framer-motion";
import { ArrowRight, Building2, TrendingDown, TrendingUp } from "lucide-react";

interface CompanyNode {
    name: string;
    ticker?: string;
}

// Swedish listed companies only
const peers: CompanyNode[] = [
    { name: "Traton", ticker: "TRAT" },
    { name: "Epiroc", ticker: "EPI-A" },
    { name: "Atlas Copco", ticker: "ATCO-A" },
];

const customers: CompanyNode[] = [
    { name: "Boliden", ticker: "BOL" },
    { name: "LKAB", ticker: "" },
    { name: "NCC", ticker: "NCC-B" },
];

const suppliers: CompanyNode[] = [
    { name: "SKF", ticker: "SKF-B" },
    { name: "Autoliv", ticker: "ALV" },
    { name: "SSAB", ticker: "SSAB-A" },
];

// Both positive and negative triggers
const triggers = [
    { name: "Ny VD", nameEn: "New CEO", positive: true },
    { name: "Stororder", nameEn: "Major Order", positive: true },
    { name: "Vinstvarning", nameEn: "Profit Warning", positive: false },
    { name: "Insider", nameEn: "Insider", positive: null }, // neutral
];

// Company node with subtle hover effect
function CompanyCard({
    name,
    ticker,
    color,
    bgColor,
    borderColor,
    delay = 0,
    isPrimary = false
}: {
    name: string;
    ticker?: string;
    color: string;
    bgColor: string;
    borderColor: string;
    delay?: number;
    isPrimary?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4, type: "spring" }}
            className="relative"
        >
            {isPrimary && (
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`absolute inset-0 ${bgColor} blur-xl rounded-full`}
                />
            )}
            <div className={`
                relative px-3 py-2 rounded-lg border transition-all duration-300
                ${bgColor} ${borderColor}
                ${isPrimary ? "px-6 py-4 rounded-xl border-2" : "hover:scale-105"}
            `}>
                <div className="flex items-center gap-2">
                    {isPrimary && <Building2 className={`w-6 h-6 ${color}`} />}
                    <span className={`font-semibold ${isPrimary ? "text-xl" : "text-sm"} ${color}`}>
                        {name}
                    </span>
                </div>
                {ticker && !isPrimary && (
                    <span className="text-xs text-muted-foreground">{ticker}</span>
                )}
            </div>
        </motion.div>
    );
}

// Horizontal animated flow with arrow
function HorizontalFlow({
    direction = "right",
    color = "bg-primary",
    delay = 0
}: {
    direction?: "left" | "right";
    color?: string;
    delay?: number;
}) {
    return (
        <div className="flex items-center gap-1">
            {direction === "left" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay }}
                >
                    <ArrowRight className={`w-4 h-4 ${color.replace("bg-", "text-")} rotate-180`} />
                </motion.div>
            )}
            <div className="relative w-12 h-0.5">
                <div className={`absolute inset-0 ${color} opacity-30`} />
                <motion.div
                    animate={{
                        left: direction === "right" ? ["0%", "100%"] : ["100%", "0%"],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay, ease: "linear" }}
                    className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${color}`}
                    style={{ boxShadow: `0 0 8px currentColor` }}
                />
            </div>
            {direction === "right" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay }}
                >
                    <ArrowRight className={`w-4 h-4 ${color.replace("bg-", "text-")}`} />
                </motion.div>
            )}
        </div>
    );
}

export function RelationshipUniverse({ lang = "en" }: { lang?: string }) {
    const labels = {
        sv: { peers: "Peers", customers: "Kunder", suppliers: "Leverantörer", triggers: "Triggers" },
        en: { peers: "Peers", customers: "Customers", suppliers: "Suppliers", triggers: "Triggers" }
    };
    const t = lang === "sv" ? labels.sv : labels.en;

    return (
        <div className="w-full py-4 select-none">
            {/* Triggers row at top */}
            <div className="flex flex-col items-center gap-2 mb-6">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                    {t.triggers}
                </motion.span>
                <div className="flex flex-wrap justify-center gap-2">
                    {triggers.map((trigger, i) => (
                        <motion.div
                            key={trigger.name}
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            className={`
                                flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border
                                ${trigger.positive === true ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : ""}
                                ${trigger.positive === false ? "bg-rose-500/10 border-rose-500/30 text-rose-400" : ""}
                                ${trigger.positive === null ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : ""}
                            `}
                        >
                            {trigger.positive === true && <TrendingUp className="w-3 h-3" />}
                            {trigger.positive === false && <TrendingDown className="w-3 h-3" />}
                            <span>{lang === "sv" ? trigger.name : trigger.nameEn}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Vertical connection from triggers */}
            <div className="flex justify-center mb-4">
                <div className="relative w-0.5 h-8">
                    <div className="absolute inset-0 bg-muted-foreground/30" />
                    <motion.div
                        animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-muted-foreground"
                    />
                </div>
            </div>

            {/* Main horizontal flow: Suppliers → Volvo → Customers */}
            <div className="flex items-center justify-center gap-4 mb-6">
                {/* Suppliers column */}
                <div className="flex flex-col items-center gap-2">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-xs font-semibold uppercase tracking-wider text-amber-400"
                    >
                        {t.suppliers}
                    </motion.span>
                    <div className="flex flex-col gap-1.5">
                        {suppliers.map((company, i) => (
                            <CompanyCard
                                key={company.name}
                                name={company.name}
                                ticker={company.ticker}
                                color="text-amber-300"
                                bgColor="bg-amber-500/10"
                                borderColor="border-amber-500/30"
                                delay={0.4 + i * 0.1}
                            />
                        ))}
                    </div>
                </div>

                {/* Flow: Suppliers → Volvo */}
                <div className="flex flex-col gap-2 py-8">
                    <HorizontalFlow direction="right" color="bg-amber-400" delay={0.5} />
                    <HorizontalFlow direction="right" color="bg-amber-400" delay={0.7} />
                    <HorizontalFlow direction="right" color="bg-amber-400" delay={0.9} />
                </div>

                {/* Central Volvo */}
                <CompanyCard
                    name="Volvo"
                    color="text-primary"
                    bgColor="bg-primary/10"
                    borderColor="border-primary/50"
                    delay={0.3}
                    isPrimary
                />

                {/* Flow: Volvo → Customers */}
                <div className="flex flex-col gap-2 py-8">
                    <HorizontalFlow direction="right" color="bg-cyan-400" delay={0.6} />
                    <HorizontalFlow direction="right" color="bg-cyan-400" delay={0.8} />
                    <HorizontalFlow direction="right" color="bg-cyan-400" delay={1.0} />
                </div>

                {/* Customers column */}
                <div className="flex flex-col items-center gap-2">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 }}
                        className="text-xs font-semibold uppercase tracking-wider text-cyan-400"
                    >
                        {t.customers}
                    </motion.span>
                    <div className="flex flex-col gap-1.5">
                        {customers.map((company, i) => (
                            <CompanyCard
                                key={company.name}
                                name={company.name}
                                ticker={company.ticker}
                                color="text-cyan-300"
                                bgColor="bg-cyan-500/10"
                                borderColor="border-cyan-500/30"
                                delay={0.45 + i * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Peers at bottom - no directional flow, just related */}
            <div className="flex flex-col items-center gap-2 pt-4 border-t border-border/30">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-xs font-semibold uppercase tracking-wider text-violet-400"
                >
                    {t.peers}
                </motion.span>
                <div className="flex gap-3">
                    {peers.map((company, i) => (
                        <CompanyCard
                            key={company.name}
                            name={company.name}
                            ticker={company.ticker}
                            color="text-violet-300"
                            bgColor="bg-violet-500/10"
                            borderColor="border-violet-500/30"
                            delay={0.6 + i * 0.1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
