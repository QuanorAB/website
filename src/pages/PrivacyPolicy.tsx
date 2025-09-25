import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${t('legal.privacy.title')} - Quanor AB`,
    "description": "Quanor AB privacy policy detailing how we collect, use, and protect your personal information in our AI-powered financial insights services.",
    "url": "https://www.quanor.com/privacy"
  };

  return (
    <>
      <SEOHead
        title={`${t('legal.privacy.title')} - Quanor AB | data protection & financial insights`}
        description="Quanor AB privacy policy detailing how we collect, use, and protect your personal information in our AI-powered financial insights services for Swedish equity analysis."
        keywords="Quanor privacy policy, data protection, GDPR compliance, financial data security, Swedish fintech privacy"
        canonical="https://www.quanor.com/privacy"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Button variant="ghost" asChild className="mb-4">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('nav.backToHome')}
                </Link>
              </Button>
              <header>
                <h1 className="text-4xl font-bold mb-4">{t('legal.privacy.title')}</h1>
                <p className="text-muted-foreground">{t('legal.privacy.lastUpdated')}</p>
              </header>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('legal.privacy.sections.informationCollect.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t('legal.privacy.sections.informationCollect.personal.title')}</h4>
                    <p className="text-muted-foreground">{t('legal.privacy.sections.informationCollect.personal.description')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('legal.privacy.sections.informationCollect.usage.title')}</h4>
                    <p className="text-muted-foreground">{t('legal.privacy.sections.informationCollect.usage.description')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('legal.privacy.sections.informationCollect.financial.title')}</h4>
                    <p className="text-muted-foreground">{t('legal.privacy.sections.informationCollect.financial.description')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('legal.privacy.sections.howWeUse.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(t('legal.privacy.sections.howWeUse.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <p key={`how-we-use-${index}`} className="text-muted-foreground">• {item}</p>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('legal.privacy.sections.informationSharing.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{t('legal.privacy.sections.informationSharing.description')}</p>
                  <div className="space-y-2">
                    {(t('legal.privacy.sections.informationSharing.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <p key={`info-sharing-${index}`} className="text-muted-foreground">• <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('legal.privacy.sections.dataSecurity.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('legal.privacy.sections.dataSecurity.description')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('legal.privacy.sections.dataRetention.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('legal.privacy.sections.dataRetention.description')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('legal.privacy.sections.yourRights.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">{t('legal.privacy.sections.yourRights.description')}</p>
                  {(t('legal.privacy.sections.yourRights.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <p key={`your-rights-${index}`} className="text-muted-foreground">• {item}</p>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('legal.privacy.sections.contact.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('legal.privacy.sections.contact.description')}</p>
                  <div className="mt-4 space-y-1">
                    <p className="text-muted-foreground">{t('legal.privacy.sections.contact.email')}</p>
                    <p className="text-muted-foreground">{t('legal.privacy.sections.contact.address')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
