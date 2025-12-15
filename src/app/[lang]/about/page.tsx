import AboutPageClient from "@/components/AboutPageClient";
import { languages } from "@/i18n/settings";
import { Metadata } from "next";

export async function generateStaticParams() {
    return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: lang === 'sv' ? 'Om Oss | Quanor' : 'About Us | Quanor',
        description: lang === 'sv'
            ? 'Träffa teamet bakom Quanor. Vi är ett passionerat team som demokratiserar finansiell analys med AI.'
            : 'Meet the team behind Quanor. We are a passionate team democratizing financial analysis with AI.',
    };
}

const teamMembers = {
    core: [
        {
            name: "Johannes Koch",
            role: { sv: "VD", en: "CEO" },
            image: "/team/johannes-koch.jpg",
            bio: {
                sv: "Tidigare COO och partner på Sveriges första renodlade AI-konsultbolag. Grundare och rådgivare på AI-byrån arange. Utvecklat prognosmodeller för välkända kunder.",
                en: "Former COO and partner at Sweden's first pure AI consultancy firm. Co-founder and advisor at AI bureau arange. Developed forecasting models for high-profile clients."
            }
        },
        {
            name: "Vilhelm Niklasson",
            role: { sv: "COO", en: "COO" },
            image: "/team/vilhelm-niklasson.jpg",
            bio: {
                sv: "Doktor i finansiell matematik med fokus på optimal portföljteori. Erfarenhet som finansiell utvecklare på FIS och Infront. Tidigare portföljförvaltare på Virtune där han lanserade krypto-ETP:er.",
                en: "PhD in financial mathematics with focus on optimal portfolio theory. Experience as financial developer at FIS and Infront. Former portfolio manager at Virtune, launching crypto ETPs."
            }
        },
        {
            name: "Taariq Nazar",
            role: { sv: "Head of AI", en: "Head of AI" },
            image: "/team/taariq-nazar.jpg",
            bio: {
                sv: "Doktorand i matematisk statistik. Erfarenhet från Lynx Asset Management, Handelsbanken och Söderberg & Partners. Expertis inom finansiell matematik och mjukvaruutveckling.",
                en: "PhD student in mathematical statistics. Experience at Lynx Asset Management, Handelsbanken, and Söderberg & Partners. Expertise in financial mathematics and software engineering."
            }
        },
        {
            name: "Edvin Malmgård",
            role: { sv: "CCO", en: "CCO" },
            image: "/team/edvin-malmgard.jpg",
            bio: {
                sv: "Head of IR på Raketech, samt strategi- och M&A-konsult. Privatinvesterare och tidigare investeringsansvarig på Chalex. Expertis inom nordiska aktier, fundamental analys och swing trading.",
                en: "Head of IR at Raketech, and strategy and M&A consultant. Private investor and former investment professional at Chalex. Expertise in Nordic equities, fundamental analysis, and swing trading."
            }
        }
    ],
    advisors: [
        {
            name: "Fredrik Olsson",
            role: { sv: "Rådgivare", en: "Advisor" },
            image: "/team/fredrik-olsson.jpg",
            bio: {
                sv: "Erfaren investerare och bolagsbyggare.",
                en: "Experienced investor and company builder."
            }
        },
        {
            name: "Kristoffer Lindensjö",
            role: { sv: "Rådgivare", en: "Advisor" },
            image: "/team/kristoffer-lindensjo.jpg",
            bio: {
                sv: "Expert inom produktutveckling och strategi.",
                en: "Expert in product development and strategy."
            }
        }
    ]
};

const content = {
    sv: {
        hero: {
            title: "Om Quanor",
            subtitle: "Ett passionerat team som demokratiserar finansiell analys."
        },
        story: {
            title: "Vår historia",
            paragraphs: [
                "Quanor grundades 2024 i Stockholm med en enkel men ambitiös vision: att ge alla tillgång till samma kraftfulla analysverktyg som tidigare bara var tillgängliga för stora institutioner.",
                "Vi såg hur småsparare och privata investerare var tvungna att fatta beslut baserat på begränsad information, medan hedgefonder och banker hade tillgång till avancerad AI-analys. Det ville vi ändra på.",
                "Idag använder hundratals investerare Quanor för att analysera nordiska aktier, bevaka nyheter och fatta bättre investeringsbeslut. Men vi är bara i början av vår resa."
            ]
        },
        team: {
            title: "Teamet",
            subtitle: "Träffa personerna bakom Quanor"
        },
        advisors: {
            title: "Rådgivare",
            subtitle: "Erfarna experter som vägleder oss"
        },
        values: {
            title: "Våra värderingar",
            items: [
                { title: "Innovation", desc: "Vi strävar alltid efter att ligga i framkant med ny teknologi." },
                { title: "Transparens", desc: "Vi tror på öppen kommunikation kring hur våra analyser genereras." },
                { title: "Kvalitet", desc: "Vi kompromissar aldrig på kvaliteten i våra analyser." }
            ]
        },
        cta: {
            title: "Redo att börja?",
            subtitle: "Prova Quanor gratis och se själv hur vi kan förbättra dina investeringsbeslut.",
            button: "Kom igång"
        }
    },
    en: {
        hero: {
            title: "About Quanor",
            subtitle: "A passionate team democratizing financial analysis."
        },
        story: {
            title: "Our Story",
            paragraphs: [
                "Quanor was founded in 2024 in Stockholm with a simple but ambitious vision: to give everyone access to the same powerful analysis tools that were previously only available to large institutions.",
                "We saw how retail investors and private traders had to make decisions based on limited information, while hedge funds and banks had access to advanced AI analysis. We wanted to change that.",
                "Today, hundreds of investors use Quanor to analyze Nordic stocks, monitor news, and make better investment decisions. But we're just at the beginning of our journey."
            ]
        },
        team: {
            title: "The Team",
            subtitle: "Meet the people behind Quanor"
        },
        advisors: {
            title: "Advisors",
            subtitle: "Experienced experts guiding us"
        },
        values: {
            title: "Our Values",
            items: [
                { title: "Innovation", desc: "We always strive to be at the forefront of new technology." },
                { title: "Transparency", desc: "We believe in open communication about how our analysis is generated." },
                { title: "Quality", desc: "We never compromise on the quality of our analysis." }
            ]
        },
        cta: {
            title: "Ready to get started?",
            subtitle: "Try Quanor for free and see how we can improve your investment decisions.",
            button: "Get Started"
        }
    }
};

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = lang === "sv" ? content.sv : content.en;

    return <AboutPageClient lang={lang} teamMembers={teamMembers} content={t} />;
}
