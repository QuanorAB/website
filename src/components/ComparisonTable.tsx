"use client";

/**
 * Comparison Table Component
 * 
 * Displays a feature comparison table between traditional analysis,
 * generic AI tools, and Quanor. Responsive design with separate
 * desktop and mobile layouts.
 * 
 * @param {Object} props
 * @param {string} props.lang - Language code ('sv' | 'en') for i18n
 */

import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface ComparisonTableProps {
  lang: string;
}

export default function ComparisonTable({ lang }: ComparisonTableProps) {
  const content = {
    sv: {
      title: "Hur Quanor jämför sig",
      subtitle: "Se hur vi skiljer oss från traditionella metoder och generella AI-verktyg.",
      columns: {
        feature: "Funktion",
        traditional: "Traditionell analys",
        aiTools: "Generella AI-verktyg",
        quanor: "Quanor"
      },
      features: [
        { key: 'swedishFocus', name: "Svenskt marknadsfokus", traditional: 'partial', aiTools: false, quanor: true },
        { key: 'onReport', name: "Rapportanalys i realtid", traditional: 'basic', aiTools: 'basic', quanor: true },
        { key: 'preReport', name: "Analys inför rapport", traditional: false, aiTools: false, quanor: true },
        { key: 'metricsExtraction', name: "Automatisk nyckeltalsextraktion", traditional: false, aiTools: false, quanor: true },
        { key: 'prAnalysis', name: "Pressmeddelandeanalys", traditional: 'basic', aiTools: false, quanor: true },
        { key: 'sentiment', name: "Sentimentanalys", traditional: false, aiTools: 'basic', quanor: true },
        { key: 'frameworkAnalysis', name: "Framework-baserad analys", traditional: false, aiTools: false, quanor: true }
      ],
      legend: {
        full: "Fullständigt stöd",
        partial: "Delvis stöd",
        none: "Inget stöd"
      }
    },
    en: {
      title: "How Quanor Compares",
      subtitle: "See how we differ from traditional methods and generic AI tools.",
      columns: {
        feature: "Feature",
        traditional: "Traditional Analysis",
        aiTools: "Generic AI Tools",
        quanor: "Quanor"
      },
      features: [
        { key: 'swedishFocus', name: "Swedish market focus", traditional: 'partial', aiTools: false, quanor: true },
        { key: 'onReport', name: "Real-time report analysis", traditional: 'basic', aiTools: 'basic', quanor: true },
        { key: 'preReport', name: "Pre-earnings analysis", traditional: false, aiTools: false, quanor: true },
        { key: 'metricsExtraction', name: "Automatic KPI extraction", traditional: false, aiTools: false, quanor: true },
        { key: 'prAnalysis', name: "Press release analysis", traditional: 'basic', aiTools: false, quanor: true },
        { key: 'sentiment', name: "Sentiment analysis", traditional: false, aiTools: 'basic', quanor: true },
        { key: 'frameworkAnalysis', name: "Framework-based analysis", traditional: false, aiTools: false, quanor: true }
      ],
      legend: {
        full: "Full support",
        partial: "Partial support",
        none: "No support"
      }
    }
  };

  const t = lang === "sv" ? content.sv : content.en;

  const renderIcon = (value: boolean | string) => {
    const wrapperClass = "inline-flex items-center justify-center mx-auto w-6 h-6";
    if (value === true) {
      return (
        <span className={wrapperClass}>
          <Check className="w-5 h-5 text-success" />
        </span>
      );
    } else if (value === false) {
      return (
        <span className={wrapperClass}>
          <X className="w-5 h-5 text-destructive" />
        </span>
      );
    } else if (value === 'basic' || value === 'partial' || value === 'limited') {
      return (
        <span className={wrapperClass}>
          <span className="inline-block w-3 h-3 rounded-full bg-warning" />
        </span>
      );
    }
    return null;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            {t.title}
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Desktop Table View */}
        <Card className="glass-card overflow-hidden hidden md:block">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-6 font-semibold">{t.columns.feature}</th>
                    <th className="text-center p-6 font-semibold text-muted-foreground">
                      {t.columns.traditional}
                    </th>
                    <th className="text-center p-6 font-semibold text-muted-foreground">
                      {t.columns.aiTools}
                    </th>
                    <th className="text-center p-6 font-semibold text-primary bg-primary/5">
                      {t.columns.quanor}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.features.map((item, index) => (
                    <tr
                      key={item.key}
                      className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                        }`}
                    >
                      <td className="p-6 font-medium">{item.name}</td>
                      <td className="p-6 text-center align-middle">{renderIcon(item.traditional)}</td>
                      <td className="p-6 text-center align-middle">{renderIcon(item.aiTools)}</td>
                      <td className="p-6 text-center align-middle bg-primary/5">{renderIcon(item.quanor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Compressed Table */}
        <Card className="glass-card overflow-hidden md:hidden -mx-6 rounded-none">
          <CardContent className="p-0">
            <table className="w-full text-sm table-fixed">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-semibold text-[11px] w-[40%] whitespace-normal break-normal leading-tight">
                    {t.columns.feature}
                  </th>
                  <th className="text-center px-1 py-2 font-semibold text-muted-foreground text-[11px] w-[20%] whitespace-normal break-normal leading-tight">
                    {t.columns.traditional}
                  </th>
                  <th className="text-center px-1 py-2 font-semibold text-muted-foreground text-[11px] w-[20%] whitespace-normal break-normal leading-tight">
                    {t.columns.aiTools}
                  </th>
                  <th className="text-center px-1 py-2 font-semibold text-primary bg-primary/5 text-[11px] w-[20%] whitespace-normal break-normal leading-tight">
                    {t.columns.quanor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.features.map((item, index) => (
                  <tr
                    key={item.key}
                    className={`border-b border-border/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                      }`}
                  >
                    <td className="p-2 font-medium text-xs leading-tight w-[40%] whitespace-normal break-normal" lang={lang} style={{ hyphens: "auto", WebkitHyphens: "auto" }}>{item.name}</td>
                    <td className="p-1 text-center align-middle w-[20%]">{renderIcon(item.traditional)}</td>
                    <td className="p-1 text-center align-middle w-[20%]">{renderIcon(item.aiTools)}</td>
                    <td className="p-1 text-center align-middle bg-primary/5 w-[20%]">{renderIcon(item.quanor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>{t.legend.full}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span>{t.legend.partial}</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-destructive" />
            <span>{t.legend.none}</span>
          </div>
        </div>
      </div>
    </section>
  );
}