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
        title: `${t('legal.terms.title')} - Quanor AB`,
        description: lang === 'sv'
            ? 'Quanor AB användarvillkor för vår AI-drivna plattform för aktieanalys.'
            : 'Quanor AB terms of service for AI-driven financial analysis platform.',
    };
}

export default async function Terms({ params }: { params: Promise<{ lang: string }> }) {
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
                        <h1 className="text-4xl font-bold mb-4">{t('legal.terms.title')}</h1>
                        <p className="text-muted-foreground">{t('legal.terms.lastUpdated')}</p>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.terms.sections.acceptance.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('legal.terms.sections.acceptance.description')}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.terms.sections.description.title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">{t('legal.terms.sections.description.description')}</p>
                                <div className="space-y-2">
                                    {(t('legal.terms.sections.description.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                        <p key={`description-${index}`} className="text-muted-foreground">• {item}</p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.terms.sections.userObligations.title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.terms.sections.userObligations.account.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.terms.sections.userObligations.account.description')}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.terms.sections.userObligations.acceptable.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.terms.sections.userObligations.acceptable.description')}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.terms.sections.userObligations.data.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.terms.sections.userObligations.data.description')}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.terms.sections.disclaimer.title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                                    <p className="text-yellow-600 dark:text-yellow-400 font-medium">{t('legal.terms.sections.disclaimer.critical')}</p>
                                </div>
                                <div className="space-y-2">
                                    {(t('legal.terms.sections.disclaimer.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                        <p key={`disclaimer-${index}`} className="text-muted-foreground">• <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.terms.sections.subscription.title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.terms.sections.subscription.billing.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.terms.sections.subscription.billing.description')}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.terms.sections.subscription.cancellation.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.terms.sections.subscription.cancellation.description')}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.terms.sections.subscription.refunds.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.terms.sections.subscription.refunds.description')}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.terms.sections.intellectual.title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.terms.sections.intellectual.ownership.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.terms.sections.intellectual.ownership.description')}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.terms.sections.intellectual.prohibited.title')}</h4>
                                    <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                                        <p className="text-red-600 dark:text-red-400 font-medium">{t('legal.terms.sections.intellectual.prohibited.warning')}</p>
                                    </div>
                                    <div className="space-y-2 mt-2">
                                        {(t('legal.terms.sections.intellectual.prohibited.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                            <p key={`prohibited-${index}`} className="text-muted-foreground">• {item}</p>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.terms.sections.intellectual.consent.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.terms.sections.intellectual.consent.description')}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.terms.sections.liability.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('legal.terms.sections.liability.description')}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.terms.sections.governing.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('legal.terms.sections.governing.description')}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.terms.sections.contact.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('legal.terms.sections.contact.description')}</p>
                                <div className="mt-4 space-y-1">
                                    <p className="text-muted-foreground">{t('legal.terms.sections.contact.email')}</p>
                                    <p className="text-muted-foreground">{t('legal.terms.sections.contact.address')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
