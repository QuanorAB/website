import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';

const ComparisonTable = () => {
  const { t, i18n } = useTranslation();

  const features = [
    {
      key: 'swedishFocus',
      feature: t('comparison.features.swedishFocus'),
      traditional: 'partial',
      aiTools: false,
      quanor: true
    },
    {
      key: 'onReport',
      feature: t('comparison.features.onReport'),
      traditional: 'basic',
      aiTools: 'basic',
      quanor: true
    },
    {
      key: 'preReport',
      feature: t('comparison.features.preReport'),
      traditional: false,
      aiTools: false,
      quanor: true
    },
    {
      key: 'metricsExtraction',
      feature: t('comparison.features.metricsExtraction'),
      traditional: false,
      aiTools: false,
      quanor: true
    },
    {
      key: 'prAnalysis',
      feature: t('comparison.features.prAnalysis'),
      traditional: 'basic',
      aiTools: false,
      quanor: true
    },
    {
      key: 'sentiment',
      feature: t('comparison.features.sentiment'),
      traditional: false,
      aiTools: 'basic',
      quanor: true
    },
    {
      key: 'frameworkAnalysis',
      feature: t('comparison.features.frameworkAnalysis'),
      traditional: false,
      aiTools: false,
      quanor: true
    }
  ];

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
            {t('comparison.title')}
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('comparison.subtitle')}
          </p>
        </div>

        {/* Desktop Table View */}
        <Card className="glass-card overflow-hidden hidden md:block">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-6 font-semibold">{t('comparison.columns.feature')}</th>
                    <th className="text-center p-6 font-semibold text-muted-foreground">
                      {t('comparison.columns.traditional')}
                    </th>
                    <th className="text-center p-6 font-semibold text-muted-foreground">
                      {t('comparison.columns.aiTools')}
                    </th>
                    <th className="text-center p-6 font-semibold text-primary bg-primary/5">
                      {t('comparison.columns.quanor')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((item, index) => (
                    <tr 
                      key={item.key} 
                      className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                        index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                      }`}
                    >
                      <td className="p-6 font-medium">{item.feature}</td>
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
                    {t('comparison.columns.feature')}
                  </th>
                  <th className="text-center px-1 py-2 font-semibold text-muted-foreground text-[11px] w-[20%] whitespace-normal break-normal leading-tight">
                    {t('comparison.columns.traditional')}
                  </th>
                  <th className="text-center px-1 py-2 font-semibold text-muted-foreground text-[11px] w-[20%] whitespace-normal break-normal leading-tight">
                    {t('comparison.columns.aiTools')}
                  </th>
                  <th className="text-center px-1 py-2 font-semibold text-primary bg-primary/5 text-[11px] w-[20%] whitespace-normal break-normal leading-tight">
                    {t('comparison.columns.quanor')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((item, index) => (
                  <tr 
                    key={item.key} 
                    className={`border-b border-border/50 ${
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                    }`}
                  >
                    <td className="p-2 font-medium text-xs leading-tight w-[40%] whitespace-normal break-normal" lang={i18n.language} style={{ hyphens: "auto", WebkitHyphens: "auto" }}>{item.feature}</td>
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
            <span>{t('comparison.legend.full')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span>{t('comparison.legend.partial')}</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-destructive" />
            <span>{t('comparison.legend.none')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;