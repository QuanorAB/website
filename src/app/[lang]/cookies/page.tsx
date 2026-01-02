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
        title: `${t('legal.cookies.title')} - Quanor AB`,
        description: lang === 'sv'
            ? 'Quanor AB cookiepolicy som förklarar hur vi använder cookies på vår AI-drivna plattform för finansanalys.'
            : 'Quanor AB cookie policy explaining how we use cookies in our AI-powered financial analysis platform.',
    };
}

export default async function CookiePolicy({ params }: { params: Promise<{ lang: string }> }) {
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
                        <h1 className="text-4xl font-bold mb-4">{t('legal.cookies.title')}</h1>
                        <p className="text-muted-foreground">{t('legal.cookies.lastUpdated')}</p>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.cookies.sections.what.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('legal.cookies.sections.what.description')}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.cookies.sections.howWeUse.title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.cookies.sections.howWeUse.essential.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.cookies.sections.howWeUse.essential.description')}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.cookies.sections.howWeUse.performance.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.cookies.sections.howWeUse.performance.description')}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.cookies.sections.howWeUse.functional.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.cookies.sections.howWeUse.functional.description')}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.cookies.sections.howWeUse.analytics.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.cookies.sections.howWeUse.analytics.description')}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.cookies.sections.types.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="border rounded-lg p-4">
                                        <h4 className="font-semibold mb-2">{t('legal.cookies.sections.types.session.title')}</h4>
                                        <p className="text-muted-foreground text-sm">{t('legal.cookies.sections.types.session.description')}</p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h4 className="font-semibold mb-2">{t('legal.cookies.sections.types.persistent.title')}</h4>
                                        <p className="text-muted-foreground text-sm">{t('legal.cookies.sections.types.persistent.description')}</p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h4 className="font-semibold mb-2">{t('legal.cookies.sections.types.firstParty.title')}</h4>
                                        <p className="text-muted-foreground text-sm">{t('legal.cookies.sections.types.firstParty.description')}</p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h4 className="font-semibold mb-2">{t('legal.cookies.sections.types.thirdParty.title')}</h4>
                                        <p className="text-muted-foreground text-sm">{t('legal.cookies.sections.types.thirdParty.description')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.cookies.sections.consent.title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.cookies.sections.consent.choices.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.cookies.sections.consent.choices.description')}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.cookies.sections.consent.browser.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.cookies.sections.consent.browser.description')}</p>
                                    <ul className="mt-2 space-y-1 text-muted-foreground">
                                        {(t('legal.cookies.sections.consent.browser.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                            <li key={`browser-${index}`}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">{t('legal.cookies.sections.consent.impact.title')}</h4>
                                    <p className="text-muted-foreground">{t('legal.cookies.sections.consent.impact.description')}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.cookies.sections.thirdParty.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('legal.cookies.sections.thirdParty.description')}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.cookies.sections.updates.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('legal.cookies.sections.updates.description')}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('legal.cookies.sections.contact.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('legal.cookies.sections.contact.description')}</p>
                                <div className="mt-4 space-y-1">
                                    <p className="text-muted-foreground">{t('legal.cookies.sections.contact.email')}</p>
                                    <p className="text-muted-foreground">{t('legal.cookies.sections.contact.address')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
