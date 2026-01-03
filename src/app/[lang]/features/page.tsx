import FeaturesPageClient from "@/components/FeaturesPageClient";
import { languages } from "@/i18n/settings";
import { Metadata } from "next";

export async function generateStaticParams() {
    return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: lang === 'sv' ? 'Funktioner | Quanor' : 'Features | Quanor',
        description: lang === 'sv'
            ? 'Upptäck Quanors AI-drivna finansiella analyser. Realtidsdata, automatisk rapportanalys, pressmeddelandebevakning och mer.'
            : 'Discover Quanor\'s AI-driven financial analysis. Real-time data, automated report analysis, press release monitoring and more.',
    };
}

const content = {
    sv: {
        hero: {
            title: "AI-driven analys för smartare investeringar",
            subtitle: "Allt du behöver för att analysera svenska aktier och fatta bättre investeringsbeslut."
        },
        features: [
            {
                iconName: "Brain",
                title: "Tvåstegsanalys i realtid",
                subtitle: "För pressmeddelanden och kvartalsrapporter",
                description: "Vår AI levererar först en snabb analys inom sekunder när ett pressmeddelande eller en kvartalsrapport släpps, och fortsätter sedan att analysera för att ge dig djupare analys allt eftersom mer data blir tillgänglig.",
                capabilities: [
                    "Omedelbar första analys inom sekunder",
                    "Fördjupad uppföljningsanalys inom minuter",
                    "Automatisk uppdatering av analysen",
                    "Notifiering vid viktiga förändringar"
                ],
                useCase: {
                    title: "Användningsfall",
                    description: "När en kvartalsrapport släpps får du inom 30 sekunder en första analys. Under de följande timmarna fördjupas analysen automatiskt med branschjämförelser och trendanalys."
                }
            },
            {
                iconName: "TrendingUp",
                title: "Dynamisk kurstrigger-analys",
                subtitle: "Förstå varför kursen rör sig",
                description: "När en aktiekurs rör sig signifikant identifierar vår AI omedelbart orsaken och informerar dig. Släpp att undra - få svar direkt.",
                capabilities: [
                    "Automatisk detektion av signifikanta kursrörelser",
                    "Omedelbar orsaksanalys",
                    "Korrelation med nyheter och händelser",
                    "Push-notis med förklaring"
                ],
                useCase: {
                    title: "Användningsfall",
                    description: "En aktie i din bevakningslista faller 8%. Inom sekunder får du en notis som förklarar att fallet beror på en ny konkurrents lansering som nämnts i ett pressmeddelande."
                }
            },
            {
                iconName: "FileText",
                title: "Analys inför kvartalsrapport",
                subtitle: "Förbered dig inför rapportsäsongen",
                description: "Inför varje kvartalsrapport genererar vi detaljerade analyser som hjälper dig förbereda och identifiera vad du ska fokusera på.",
                capabilities: [
                    "Trendanalys av ledningens kommentarer över tid",
                    "Anpassade bevakningspunkter och triggers",
                    "Nyckeltal att bevaka",
                    "Marknadens förväntningar vs historik"
                ],
                useCase: {
                    title: "Användningsfall",
                    description: "En investerare läser Quanors analys inför kvartalsrapport och ser att ledningen konsekvent nedtonat kostnadsinflation i tidigare kommentarer - men siffrorna visade annat. Viktig insikt inför kommande rapport."
                }
            },
            {
                iconName: "Bell",
                title: "Push-notifikationer",
                subtitle: "Missa aldrig en viktig händelse",
                description: "Få omedelbara push-notiser direkt till din mobil när något viktigt händer med dina bevakade bolag. Anpassningsbara efter dina preferenser.",
                capabilities: [
                    "Realtidsnotiser vid pressmeddelanden",
                    "Alerts vid signifikanta kursrörelser",
                    "Insider-transaktioner och bolagshändelser",
                    "Anpassningsbar frekvens och typer"
                ],
                useCase: {
                    title: "Användningsfall",
                    description: "Du får en push-notis på mobilen sekunder efter att ett bolag i din bevakningslista släpper ett pressmeddelande - med AI-sammanfattning direkt i notisen."
                }
            },
            {
                iconName: "Mail",
                title: "Daglig marknadsöversikt",
                subtitle: "Kvällsmail efter börsens stängning",
                description: "Få ett kvällsmail efter att börsen stängt med dagens viktigaste makronyheter från Sverige och globalt, hur de kan påverka bolagen i din bevakningslista, plus index-, råvaru-, valuta- och kryptoförändringar samt dagens viktigaste pressmeddelanden.",
                capabilities: [
                    "Svenska och globala makronyheter",
                    "Koppling till dina bevakade bolag",
                    "Index, råvaror, FX och krypto-översikt",
                    "Dagens viktigaste pressmeddelanden"
                ],
                useCase: {
                    title: "Användningsfall",
                    description: "Efter börsens stängning får du ett mail som sammanfattar att oljepriset stigit 5% under dagen, att detta kan påverka dina bevakade shipping-bolag positivt, plus en lista över de viktigaste pressmeddelandena på marknaden."
                }
            },
            {
                iconName: "Smartphone",
                title: "PWA-app för alla enheter",
                subtitle: "Installera utan App Store",
                description: "Quanor finns som en Progressive Web App (PWA) som du kan installera direkt på din iPhone eller Android - ingen nedladdning från butik behövs.",
                capabilities: [
                    "Fungerar offline med cachade analyser",
                    "Push-notifikationer som en native app",
                    "Automatiska uppdateringar",
                    "Snabb och responsiv upplevelse"
                ],
                useCase: {
                    title: "Användningsfall",
                    description: "En pendlare installerar Quanor-appen på sin iPhone genom att klicka 'Lägg till på hemskärmen' i Safari. Nu har hon fullständig app-upplevelse utan att behöva App Store."
                }
            }
        ],
        additionalFeatures: {
            title: "Och mycket mer...",
            items: [
                { iconName: "Network", title: "Relationsuniversum", desc: "Se hur bolag hänger ihop: konkurrenter, kunder och leverantörer." },
                { iconName: "Target", title: "Bolagstriggers", desc: "Proprietära signaler för VD-byten, insiderhandel, M&A och mer." },
                { iconName: "TrendingUp", title: "Sentimentanalys", desc: "Proprietär modell för att mäta marknadskänsla i realtid." },
                { iconName: "Globe", title: "Svenska och engelska", desc: "Appen och alla analyser finns tillgängliga på både svenska och engelska." }
            ]
        },
        cta: {
            title: "Redo att prova?",
            subtitle: "Börja gratis och se själv hur Quanor kan förbättra dina investeringsbeslut.",
            button: "Kom igång gratis"
        }
    },
    en: {
        hero: {
            title: "AI-driven analysis for smarter investments",
            subtitle: "Everything you need to analyze Swedish stocks and make better investment decisions."
        },
        features: [
            {
                iconName: "Brain",
                title: "Two-phase real-time analysis",
                subtitle: "For press releases and quarterly reports",
                description: "Our AI first delivers a quick analysis within seconds when a press release or quarterly report is published, then continues to analyze to give you deeper analysis as more data becomes available.",
                capabilities: [
                    "Immediate first analysis within seconds",
                    "In-depth follow-up analysis within minutes",
                    "Automatic analysis updates",
                    "Notification on significant changes"
                ],
                useCase: {
                    title: "Use Case",
                    description: "When a quarterly report is released, you get an initial analysis within 30 seconds. Over the following hours, the analysis is automatically deepened with industry comparisons and trend analysis."
                }
            },
            {
                iconName: "TrendingUp",
                title: "Dynamic price trigger analysis",
                subtitle: "Understand why the price moves",
                description: "When a stock price moves significantly, our AI immediately identifies the cause and informs you. Stop wondering - get answers instantly.",
                capabilities: [
                    "Automatic detection of significant price movements",
                    "Immediate cause analysis",
                    "Correlation with news and events",
                    "Push notification with explanation"
                ],
                useCase: {
                    title: "Use Case",
                    description: "A stock in your watchlist drops 8%. Within seconds, you receive a notification explaining that the drop is due to a new competitor launch mentioned in a press release."
                }
            },
            {
                iconName: "FileText",
                title: "Pre-earnings reports",
                subtitle: "Prepare for earnings season",
                description: "Before each quarterly report, we generate detailed pre-earnings reports that help you prepare and identify what to focus on.",
                capabilities: [
                    "Management commentary trend analysis over time",
                    "Custom watch points and triggers",
                    "Key metrics to watch",
                    "Market expectations vs history"
                ],
                useCase: {
                    title: "Use Case",
                    description: "An investor reads Quanor's pre-earnings report and sees that management has consistently downplayed cost inflation in previous comments - but the numbers showed otherwise. Critical insight before the upcoming report."
                }
            },
            {
                iconName: "Bell",
                title: "Push notifications",
                subtitle: "Never miss an important event",
                description: "Get immediate push notifications directly to your phone when something important happens with your watched companies. Customizable to your preferences.",
                capabilities: [
                    "Real-time notifications for press releases",
                    "Alerts for significant price movements",
                    "Insider transactions and corporate events",
                    "Customizable frequency and types"
                ],
                useCase: {
                    title: "Use Case",
                    description: "You receive a push notification on your phone seconds after a company in your watchlist releases a press release - with an AI summary directly in the notification."
                }
            },
            {
                iconName: "Mail",
                title: "Daily market recap",
                subtitle: "Evening email after market close",
                description: "Get an evening email after the exchange closes with the day's most important macro news from Sweden and globally, how they could impact companies in your watchlist, plus index, commodity, FX, and crypto changes, and the day's key press releases.",
                capabilities: [
                    "Swedish and global macro news",
                    "Impact analysis for your watchlist",
                    "Index, commodities, FX and crypto overview",
                    "Day's most important press releases"
                ],
                useCase: {
                    title: "Use Case",
                    description: "After the market closes, you receive an email summarizing that oil prices rose 5% during the day, that this could positively impact your watched shipping companies, plus a list of the most important press releases on the market."
                }
            },
            {
                iconName: "Smartphone",
                title: "PWA app for all devices",
                subtitle: "Install without App Store",
                description: "Quanor is available as a Progressive Web App (PWA) that you can install directly on your iPhone or Android - no app store download required.",
                capabilities: [
                    "Works offline with cached analyses",
                    "Push notifications like a native app",
                    "Automatic updates",
                    "Fast and responsive experience"
                ],
                useCase: {
                    title: "Use Case",
                    description: "A commuter installs the Quanor app on her iPhone by clicking 'Add to Home Screen' in Safari. Now she has a full app experience without needing the App Store."
                }
            }
        ],
        additionalFeatures: {
            title: "And much more...",
            items: [
                { iconName: "Network", title: "Relationship universe", desc: "See how companies are connected: peers, customers, and suppliers." },
                { iconName: "Target", title: "Company triggers", desc: "Proprietary signals for CEO changes, insider trading, M&A and more." },
                { iconName: "TrendingUp", title: "Sentiment analysis", desc: "Proprietary model for measuring market sentiment in real-time." },
                { iconName: "Globe", title: "Swedish and English", desc: "The app and all analyses are available in both Swedish and English." }
            ]
        },
        cta: {
            title: "Ready to try?",
            subtitle: "Start free and see for yourself how Quanor can improve your investment decisions.",
            button: "Get started free"
        }
    }
};

export default async function Features({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = lang === "sv" ? content.sv : content.en;

    return <FeaturesPageClient content={t} />;
}
