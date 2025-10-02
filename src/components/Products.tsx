import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, BarChart3, ArrowRight, Brain, Zap, Shield } from "lucide-react";
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

  return (
    <section id="products" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-primary">{t('products.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`glass-card hover:shadow-card transition-all duration-300 hover:-translate-y-2 group relative ${
                tier.popular ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t('products.mostPopular')}
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-4 text-center">
                <div className={`w-16 h-16 mx-auto rounded-xl ${tier.bgColor} ${tier.borderColor} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <TrendingUp className={`w-8 h-8 ${tier.color}`} />
                </div>
                <CardTitle className="text-2xl font-bold mb-2">
                  {tier.name}
                </CardTitle>
                <div className="text-3xl font-bold text-primary mb-2">{tier.price}</div>
                <CardDescription className="text-muted-foreground">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={`${tier.id}-feature-${featureIndex}`} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${tier.bgColor} ${tier.borderColor} border flex-shrink-0`} />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <Button 
                    variant={tier.buttonVariant}
                    className="w-full group mobile-optimized"
                    disabled={tier.id === 'free'}
                    asChild={tier.id !== 'free'}
                  >
                    {tier.id === 'free' ? (
                      <span className="flex items-center justify-center opacity-50 cursor-not-allowed">
                        {t('products.getStarted')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    ) : (
                      <a 
                        href="https://app.quanor.com/register?stripePriceId=price_1SAy2rRfrQoXouvpBTrgh9ZW&trialPeriod=true&paymentMethod=stripe&packageType=trial&packageName=Insights+Essential+-+Free+Trial&packageDescription=0+kr+for+first+14+days,+then+99+kr/month" 
                        className="flex items-center justify-center"
                        aria-label={`${t('products.getStarted')} - ${tier.name} plan`}
                        onClick={(e) => {
                          try {
                            if (window.top !== window.self) {
                              e.preventDefault();
                              window.location.href = "https://app.quanor.com/register?stripePriceId=price_1SAy2rRfrQoXouvpBTrgh9ZW&trialPeriod=true&paymentMethod=stripe&packageType=trial&packageName=Insights+Essential+-+Free+Trial&packageDescription=0+kr+for+first+14+days,+then+99+kr/month";
                            }
                          } catch {
                            e.preventDefault();
                            window.location.href = "https://app.quanor.com/register?stripePriceId=price_1SAy2rRfrQoXouvpBTrgh9ZW&trialPeriod=true&paymentMethod=stripe&packageType=trial&packageName=Insights+Essential+-+Free+Trial&packageDescription=0+kr+for+first+14+days,+then+99+kr/month";
                          }
                        }}
                      >
                        {t('products.getStarted')}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-8">
            {t('products.whyChoose')}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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

        <div className="mt-20 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <Card className="glass-card max-w-4xl mx-auto hover:shadow-glow transition-shadow duration-500">
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

        {/* Comparison Table */}
        <ComparisonTable />
      </div>
    </section>
  );
};

export default Products;
