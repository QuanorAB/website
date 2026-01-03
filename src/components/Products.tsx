"use client";

/**
 * Products Section Component
 * 
 * Displays pricing tiers (Free/Essential) and feature highlights for Quanor.
 * Uses inline translations for Swedish/English bilingual content.
 * Links to app registration pages for each tier.
 * 
 * @param {Object} props
 * @param {string} props.lang - Language code ('sv' or 'en')
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Calendar, Check, FileText, Newspaper } from "lucide-react";

export default function Products({ lang }: { lang: string }) {
  const content = {
    sv: {
      badge: "Quanor Analys",
      title: "Börja investera smartare",
      subtitle: "Välj den plan som passar din investeringsstil.",
      getStarted: "Kom igång",
      tiers: [
        {
          id: 'free',
          name: "Free",
          price: "0 kr",
          description: "För dig som vill testa kraften i AI-analys.",
          features: ["Bevaka upp till 5 bolag", "Begränsad AI-analys", "Mail inför börsöppning"],
          buttonVariant: "outline" as const
        },
        {
          id: 'essential',
          name: "Essential",
          price: "39 kr",
          period: "/månad",
          promo: "första 2 månaderna",
          regularPrice: "därefter 99 kr/månad",
          description: "För den seriösa investeraren som vill ligga steget före.",
          features: ["Obegränsade bevakningar", "PR- och rapportanalys i realtid", "Kurstrigger-analys", "Analys inför rapport", "Flashanalys", "Daglig marknadsöversikt"],
          buttonVariant: "default" as const,
          popular: true
        }
      ],
      features: [
        {
          title: "Rapportanalys",
          desc: "AI-driven analys av kvartalsrapporter sekunder efter släpp.",
          icon: FileText
        },
        {
          title: "PR-analys",
          desc: "Realtidsanalys av pressmeddelanden och nyheter.",
          icon: Newspaper
        },
        {
          title: "Kalender",
          desc: "Håll koll på kommande rapporter och händelser.",
          icon: Calendar
        },
        {
          title: "Marknadsöversikt",
          desc: "Dagliga sammanfattningar av marknadsläget.",
          icon: BarChart3
        }
      ]
    },
    en: {
      badge: "Quanor Analys",
      title: "Start Investing Smarter",
      subtitle: "Choose the plan that fits your investment style.",
      getStarted: "Get Started",
      tiers: [
        {
          id: 'free',
          name: "Free",
          price: "0 kr",
          description: "For those who want to test the power of AI analysis.",
          features: ["Follow up to 5 companies", "Limited AI analysis", "Pre-market email"],
          buttonVariant: "outline" as const
        },
        {
          id: 'essential',
          name: "Essential",
          price: "39 kr",
          period: "/month",
          promo: "first 2 months",
          regularPrice: "then 99 kr/month",
          description: "For the serious investor who wants to stay ahead.",
          features: ["Unlimited watchlist", "Real-time PR and report analysis", "Price trigger analysis", "Pre-earnings analysis", "Flash analysis", "Daily market recap"],
          buttonVariant: "default" as const,
          popular: true
        }
      ],
      features: [
        {
          title: "Report Analysis",
          desc: "AI-driven analysis of quarterly reports seconds after release.",
          icon: FileText
        },
        {
          title: "PR Analysis",
          desc: "Real-time analysis of press releases and news.",
          icon: Newspaper
        },
        {
          title: "Calendar",
          desc: "Keep track of upcoming reports and events.",
          icon: Calendar
        },
        {
          title: "Market Recap",
          desc: "Daily summaries of the market situation.",
          icon: BarChart3
        }
      ]
    }
  };

  const t = lang === "sv" ? content.sv : content.en;

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-wide text-primary uppercase"
          >
            {t.badge}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-foreground"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {t.tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${tier.popular
                ? 'border-primary shadow-lg bg-primary/5'
                : 'border-border bg-card/50'
                }`}>
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold rounded-bl-xl">
                    {lang === 'sv' ? 'MEST POPULÄR' : 'MOST POPULAR'}
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                  </div>
                  {tier.promo && (
                    <p className="text-sm text-primary font-medium">{tier.promo}</p>
                  )}
                  {tier.regularPrice && (
                    <p className="text-xs text-muted-foreground">{tier.regularPrice}</p>
                  )}
                  <CardDescription className="mt-2 text-base">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={tier.buttonVariant}
                    size="lg"
                    asChild
                  >
                    <a href={`https://app.quanor.com/register/${tier.id}`}>
                      {t.getStarted} <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/30 hover:bg-card/50 transition-colors">
                <CardContent className="p-6">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Link to full pricing page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={`/${lang}/pricing`}
            className="text-primary hover:underline font-medium"
          >
            {lang === 'sv' ? 'Se alla prisalternativ →' : 'See all pricing options →'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
