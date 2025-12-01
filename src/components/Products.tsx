import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, Brain, Zap, Shield, FileText, Newspaper, Calendar, Mail, BarChart3 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import ComparisonTable from './ComparisonTable';

const Products = () => {
  const { t } = useTranslation();
  
  const tiers = useMemo(() => [
    {
      id: 'free',
      name: t('products.free.name'),
      price: t('products.free.price'),
      description: t('products.free.description'),
      features: t('products.free.features', { returnObjects: true }) as string[],
      color: "text-muted-foreground",
      bgColor: "bg-muted/10",
      borderColor: "border-muted/20",
      buttonVariant: "outline" as const
    },
    {
      id: 'essential',
      name: t('products.essential.name'),
      price: t('products.essential.price'),
      promoPrice: t('products.essential.promoPrice', { defaultValue: '' }),
      promoNote: t('products.essential.promoNote', { defaultValue: '' }),
      description: t('products.essential.description'),
      features: t('products.essential.features', { returnObjects: true }) as string[],
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      buttonVariant: "default" as const,
      popular: true
    }
  ], [t]);

  const benefits = useMemo(() => [
    {
      id: 'ai-powered',
      icon: Brain,
      title: t('products.benefits.ai.title'),
      description: t('products.benefits.ai.description')
    },
    {
      id: 'real-time',
      icon: Zap,
      title: t('products.benefits.realtime.title'),
      description: t('products.benefits.realtime.description')
    },
    {
      id: 'institutional-grade',
      icon: Shield,
      title: t('products.benefits.institutional.title'),
      description: t('products.benefits.institutional.description')
    }
  ], [t]);

  const featureBoxes = useMemo(() => [
    {
      id: 'report-analysis',
      icon: FileText,
      title: t('products.features.reportAnalysis.title'),
      label: t('products.features.reportAnalysis.label'),
      description: t('products.features.reportAnalysis.description')
    },
    {
      id: 'pr-analysis',
      icon: Newspaper,
      title: t('products.features.prAnalysis.title'),
      label: t('products.features.prAnalysis.label'),
      description: t('products.features.prAnalysis.description')
    },
    {
      id: 'pre-report',
      icon: Calendar,
      title: t('products.features.preReport.title'),
      label: t('products.features.preReport.label'),
      description: t('products.features.preReport.description')
    }
  ], [t]);

  const additionalFeatures = useMemo(() => [
    {
      id: 'market-recap',
      icon: BarChart3,
      title: t('products.features.marketRecap.title'),
      label: t('products.features.marketRecap.label'),
      description: t('products.features.marketRecap.description')
    },
    {
      id: 'pre-market',
      icon: Mail,
      title: t('products.features.preMarket.title'),
      label: t('products.features.preMarket.label'),
      description: t('products.features.preMarket.description')
    }
  ], [t]);

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>, tierId: string) => {
    try {
      if (window.top !== window.self) {
        e.preventDefault();
        const url = tierId === 'free' 
          ? "https://app.quanor.com/register/free"
          : "https://app.quanor.com/register/essential";
        window.location.href = url;
      }
    } catch {
      e.preventDefault();
      const url = tierId === 'free' 
        ? "https://app.quanor.com/register/free"
        : "https://app.quanor.com/register/essential";
      window.location.href = url;
    }
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-gradient-to-b from-background via-background to-muted/5">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Header */}
        <header className="text-center space-y-3 mb-10 md:mb-16">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            {t('products.badge', { defaultValue: 'Quanor Insights' })}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            {t('products.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </header>

        {/* Promotional Banner */}
        {t('products.promo.show', { defaultValue: 'false' }) === 'true' && (
          <div className="relative rounded-3xl border border-primary/30 bg-primary text-primary-foreground px-6 py-5 md:px-10 md:py-6 overflow-hidden mb-10">
            <div className="absolute inset-y-0 right-0 w-1/3 opacity-20 pointer-events-none">
              <div className="h-full w-full bg-gradient-to-br from-primary-foreground/10 via-transparent to-accent/10" />
            </div>
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-primary-foreground/80">
                  {t('products.promo.label', { defaultValue: 'Campaign Offer' })}
                </p>
                <h3 className="text-xl md:text-2xl font-semibold">
                  {t('products.promo.title', { defaultValue: 'Essential for 39 kr/month for 2 months' })}
                </h3>
                <p className="text-sm md:text-base text-primary-foreground/90">
                  {t('products.promo.description', { defaultValue: 'Then regular price 99 kr/month.' })}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="line-through text-primary-foreground/60">
                    {t('products.essential.price')}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {t('products.promo.badge', { defaultValue: '39 kr/month first 2 months' })}
                  </span>
                </div>
                <Button
                  className="mt-1 rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-sm transition"
                  asChild
                >
                  <a 
                    href="https://app.quanor.com/register/essential"
                    onClick={(e) => handleRegisterClick(e, 'essential')}
                  >
                    {t('products.promo.cta', { defaultValue: 'Activate offer' })}
                    <ArrowRight className="ml-2 text-xs" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 md:mb-16">
          {tiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`rounded-3xl border ${
                tier.popular 
                  ? 'border-primary shadow-md border-2' 
                  : 'border-border'
              } bg-card p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative`}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                  {t('products.campaignOffer')}
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${tier.id === 'essential' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {tier.name}
                    </p>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {tier.promoPrice && (
                        <>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-medium text-muted-foreground line-through">
                              {tier.price}
                            </span>
                            <p className="text-2xl font-semibold text-foreground">{tier.promoPrice}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {tier.promoNote}
                          </span>
                        </>
                      )}
                      {!tier.promoPrice && (
                        <p className="text-2xl font-semibold text-foreground">{tier.price}</p>
                      )}
                    </div>
                    {tier.promoPrice && (
                      <p className="text-xs text-muted-foreground">
                        {t('products.essential.regularPrice', { defaultValue: 'then 99 kr/month, cancel anytime' })}
                      </p>
                    )}
                  </div>
                </div>
                <CardDescription className="text-sm text-muted-foreground mb-4">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-2 text-sm text-foreground">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={`${tier.id}-feature-${featureIndex}`}>
                      • {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={tier.buttonVariant}
                  className="w-full rounded-full mobile-optimized"
                  asChild
                >
                  <a 
                    href={tier.id === 'free' 
                      ? "https://app.quanor.com/register/free"
                      : "https://app.quanor.com/register/essential"
                    }
                    className="flex items-center justify-center"
                    aria-label={`${t('products.getStarted')} - ${tier.name} plan`}
                    onClick={(e) => handleRegisterClick(e, tier.id)}
                  >
                    {t('products.getStarted')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                
                {tier.id === 'essential' && (
                  <div className="text-center">
                    <a 
                      href="https://app.quanor.com/register?stripePriceId=price_1SAy2rRfrQoXouvpBTrgh9ZW&allowPromotionCodes=true&paymentMethod=stripe&packageType=promo&packageName=Insights+Essential+-+Promo+Code&packageDescription=Apply+your+promo+code+in+the+Stripe+Checkout+in+the+next+step" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                    >
                      {t('products.promoCode')}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Information Boxes */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {featureBoxes.map((feature) => (
            <Card key={feature.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-primary mb-3">
                {feature.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Additional Feature Boxes */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {additionalFeatures.map((feature) => (
            <Card key={feature.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-primary mb-3">
                {feature.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-8">
            {t('products.whyChoose')}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={benefit.id} className={`text-center group animate-fade-in-up`} style={{animationDelay: `${index * 0.1}s`}}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-16 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <Card className="rounded-2xl border border-border bg-card max-w-4xl mx-auto shadow-sm">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {t('products.services.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('products.services.description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* DisclaiImer */}
        <div className="text-center text-xs text-muted-foreground max-w-2xl mx-auto mb-10">
          {t('products.disclaimer', { defaultValue: "Content generated by Quanor's AI engines and is intended as decision support, not personal financial advice." })}
        </div>

        {/* Comparison Table */}
        <ComparisonTable />
      </div>
    </section>
  );
};

export default Products;
