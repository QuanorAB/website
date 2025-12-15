import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/i18n/server";
import { languages } from "@/i18n/settings";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const { t } = await useTranslation(lang, "translation");
    return {
        title: `${t('legal.privacy.title')} - Quanor AB`,
        description: lang === 'sv'
            ? 'Quanor AB integritetspolicy som beskriver hur vi samlar in, använder och skyddar din personliga information.'
            : 'Quanor AB privacy policy detailing how we collect, use, and protect your personal information.',
    };
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const { t } = await useTranslation(lang, "translation");

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
                            <Link href={`/${lang}`}>
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
    );
}
