import PricingPageClient from "@/components/PricingPageClient";
import { languages } from "@/i18n/settings";
import { Metadata } from "next";

export async function generateStaticParams() {
    return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: lang === 'sv' ? 'Priser | Quanor' : 'Pricing | Quanor',
        description: lang === 'sv'
            ? 'Välj rätt prisplan för dina investeringsbehov. Börja gratis, uppgradera när du växer. Transparent prissättning utan dolda avgifter.'
            : 'Choose the right pricing plan for your investment needs. Start free, upgrade as you grow. Transparent pricing with no hidden fees.',
    };
}

const content = {
    sv: {
        hero: {
            title: "Enkel, transparent prissättning",
            subtitle: "Gratis att komma igång, enkelt att uppgradera. Inga dolda avgifter."
        },
        monthly: "/månad",
        annually: "faktureras årligen",
        tiers: [
            {
                name: "Starter",
                price: "0 kr",
                desc: "Perfekt för att komma igång",
                features: ["5 bevakningar", "Begränsad AI-analys", "Mail inför börsöppning", "E-postsupport"],
                cta: "Kom igång gratis",
                popular: false,
            },
            {
                name: "Essential",
                price: "39 kr",
                promo: "första 2 månaderna",
                regularPrice: "därefter 99 kr/månad",
                desc: "För aktiva investerare",
                features: ["Obegränsade bevakningar", "PR- och rapportanalys i realtid", "Kurstrigger-analys", "Analys inför rapport", "Flashanalys", "Daglig marknadsöversikt"],
                cta: "Börja nu",
                popular: true,
            },
            {
                name: "Enterprise",
                price: "Kontakta oss",
                desc: "För institutioner och team",
                features: ["Allt i Essential", "API-tillgång"],
                cta: "Kontakta sälj",
                popular: false,
            },
        ],
        comparison: {
            title: "Jämför planer",
            features: [
                { name: "Bevakningar", starter: "5", essential: "Obegränsade", enterprise: "Obegränsade" },
                { name: "Rapportanalys", starter: true, essential: true, enterprise: true },
                { name: "Pressmeddelandeanalys", starter: true, essential: true, enterprise: true },
                { name: "Flashanalyser", starter: false, essential: true, enterprise: true },
                { name: "Analys inför rapport", starter: false, essential: true, enterprise: true },
                { name: "Dynamisk kurstrigger-analys", starter: false, essential: true, enterprise: true },
                { name: "Daglig marknadsöversikt", starter: false, essential: true, enterprise: true },
                { name: "API-tillgång", starter: false, essential: false, enterprise: true },
                { name: "Dedikerad support", starter: false, essential: false, enterprise: true },
            ]
        },
        faq: {
            title: "Vanliga frågor",
            items: [
                {
                    q: "Kan jag byta plan när som helst?",
                    a: "Ja, du kan uppgradera eller nedgradera din plan när som helst. Vid uppgradering får du direkt tillgång till nya funktioner. Vid nedgradering träder ändringen i kraft vid nästa faktureringsperiod."
                },
                {
                    q: "Finns det någon bindningstid?",
                    a: "Nej, vi har inga bindningstider. Du kan avsluta din prenumeration när som helst, och du behåller tillgång till tjänsten tills faktureringsperioden löper ut."
                },
                {
                    q: "Vilka betalningsmetoder accepterar ni?",
                    a: "Vi accepterar alla större kreditkort (Visa, Mastercard, American Express). Enterprise-kunder kan även betala via faktura."
                },
                {
                    q: "Hur installerar jag Quanor-appen på min mobil?",
                    a: "Quanor är en PWA (Progressive Web App) som du enkelt installerar utan App Store. På iPhone: Öppna app.quanor.com i Safari → Tryck på dela-ikonen → Välj 'Lägg till på hemskärmen'. På Android: Öppna i Chrome → Tryck på menyn (tre prickar) → Välj 'Installera app' eller 'Lägg till på startskärmen'."
                },
                {
                    q: "Fungerar push-notiser på mobilen?",
                    a: "Ja! När du installerat vår PWA och godkänt notifieringar får du push-notiser precis som en vanlig app. Du får omedelbara alerts vid pressmeddelanden, kursrörelser och andra händelser för dina bevakade bolag."
                }
            ]
        },
        enterprise: {
            title: "Behöver du en skräddarsydd lösning?",
            subtitle: "Vårt Enterprise-team hjälper dig att hitta rätt lösning för ditt företag.",
            cta: "Boka ett möte"
        }
    },
    en: {
        hero: {
            title: "Simple, transparent pricing",
            subtitle: "Free to get started, easy to upgrade. No hidden fees."
        },
        monthly: "/month",
        annually: "billed annually",
        tiers: [
            {
                name: "Starter",
                price: "0 kr",
                desc: "Perfect to get started",
                features: ["5 watchlist items", "Limited AI analysis", "Pre-market email", "Email support"],
                cta: "Get started free",
                popular: false,
            },
            {
                name: "Essential",
                price: "39 kr",
                promo: "first 2 months",
                regularPrice: "then 99 kr/month",
                desc: "For active investors",
                features: ["Unlimited watchlist", "Real-time PR and report analysis", "Price trigger analysis", "Pre-earnings analysis", "Flash analysis", "Daily market recap"],
                cta: "Start now",
                popular: true,
            },
            {
                name: "Enterprise",
                price: "Contact us",
                desc: "For institutions and teams",
                features: ["Everything in Essential", "API access"],
                cta: "Contact Sales",
                popular: false,
            },
        ],
        comparison: {
            title: "Compare Plans",
            features: [
                { name: "Watchlist items", starter: "5", essential: "Unlimited", enterprise: "Unlimited" },
                { name: "Report analysis", starter: true, essential: true, enterprise: true },
                { name: "Press release analysis", starter: true, essential: true, enterprise: true },
                { name: "Flash analysis", starter: false, essential: true, enterprise: true },
                { name: "Pre-earnings analysis", starter: false, essential: true, enterprise: true },
                { name: "Dynamic price trigger analysis", starter: false, essential: true, enterprise: true },
                { name: "Daily market recap", starter: false, essential: true, enterprise: true },
                { name: "API access", starter: false, essential: false, enterprise: true },
                { name: "Dedicated support", starter: false, essential: false, enterprise: true },
            ]
        },
        faq: {
            title: "Frequently Asked Questions",
            items: [
                {
                    q: "Can I change plans at any time?",
                    a: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. When downgrading, the change takes effect at the next billing period."
                },
                {
                    q: "Is there a commitment period?",
                    a: "No, we have no commitment periods. You can cancel your subscription at any time, and you retain access to the service until the billing period expires."
                },
                {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit cards (Visa, Mastercard, American Express). Enterprise customers can also pay via invoice."
                },
                {
                    q: "How do I install the Quanor app on my phone?",
                    a: "Quanor is a PWA (Progressive Web App) that you can easily install without the App Store. On iPhone: Open app.quanor.com in Safari → Tap the share icon → Select 'Add to Home Screen'. On Android: Open in Chrome → Tap the menu (three dots) → Select 'Install app' or 'Add to Home Screen'."
                },
                {
                    q: "Do push notifications work on mobile?",
                    a: "Yes! Once you've installed the PWA app and allowed notifications, you'll receive push notifications just like a native app. You get immediate alerts for press releases, price movements, and other events for your watched companies."
                }
            ]
        },
        enterprise: {
            title: "Need a custom solution?",
            subtitle: "Our Enterprise team will help you find the right solution for your business.",
            cta: "Book a meeting"
        }
    }
};

export default async function Pricing({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = lang === "sv" ? content.sv : content.en;

    return <PricingPageClient lang={lang} content={t} />;
}
