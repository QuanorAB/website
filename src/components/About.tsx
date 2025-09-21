import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Target, Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const About = () => {
  const { t } = useTranslation();
  
  const values = useMemo(() => [
    {
      id: 'innovation',
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      id: 'transparency',
      icon: Target,
      title: t('about.values.transparency.title'),
      description: t('about.values.transparency.description')
    },
    {
      id: 'excellence',
      icon: Globe,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    }
  ], [t]);

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                {t('about.title')}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('about.subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t('about.description1')}
              </p>
              <p className="text-muted-foreground">
                {t('about.description2')}
              </p>
              <p className="text-muted-foreground">
                {t('about.team')}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">{t('about.stats.companies')}</div>
                <div className="text-muted-foreground">{t('about.stats.companiesLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">{t('about.stats.prSpeed')}</div>
                <div className="text-muted-foreground">{t('about.stats.prSpeedLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">{t('about.stats.reportSpeed')}</div>
                <div className="text-muted-foreground">{t('about.stats.reportSpeedLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">{t('about.stats.accuracy')}</div>
                <div className="text-muted-foreground">{t('about.stats.accuracyLabel')}</div>
              </div>
            </div>

          </div>

          {/* Values Cards */}
          <div className="space-y-6">
            {values.map((value) => (
              <Card key={value.id} className="glass-card group hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;