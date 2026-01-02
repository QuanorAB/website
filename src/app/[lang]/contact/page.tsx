import ContactPageClient from "@/components/ContactPageClient";
import { languages } from "@/i18n/settings";
import { Metadata } from "next";

export async function generateStaticParams() {
    return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return {
        title: lang === 'sv' ? 'Kontakta Oss | Quanor' : 'Contact Us | Quanor',
        description: lang === 'sv'
            ? 'Kontakta Quanor-teamet. Vi finns här för att hjälpa dig med frågor om vår AI-plattform för finansiell analys.'
            : 'Contact the Quanor team. We are here to help you with questions about our AI platform for financial analysis.',
    };
}

const content = {
    sv: {
        hero: {
            title: "Kontakta oss",
            subtitle: "Vi finns här för att hjälpa dig. Skicka ett meddelande eller nå rätt avdelning direkt."
        },
        contactMethods: {
            title: "Kontakta oss",
            items: [
                {
                    icon: "Mail",
                    title: "Allmän kontakt",
                    description: "Svar inom 24 timmar på vardagar",
                    action: "mailto:hello@quanor.com",
                    actionLabel: "hello@quanor.com"
                },
                {
                    icon: "Users",
                    title: "Sälj & Demos",
                    description: "Boka en demo eller diskutera Enterprise-lösningar",
                    action: "mailto:sales@quanor.com",
                    actionLabel: "sales@quanor.com"
                },
                {
                    icon: "Headphones",
                    title: "Kundsupport",
                    description: "Tekniska frågor och hjälp med ditt konto",
                    action: "mailto:support@quanor.com",
                    actionLabel: "support@quanor.com"
                }
            ]
        },
        departments: {
            title: "",
            items: []
        },
        form: {
            title: "Skicka ett meddelande",
            subtitle: "Fyll i formuläret så återkommer vi så snart som möjligt.",
            fields: {
                name: "Namn",
                email: "E-post",
                subject: "Ämne",
                message: "Meddelande"
            },
            subjectOptions: [
                "Allmän förfrågan",
                "Sälj & Pricing",
                "Teknisk support",
                "Enterprise-lösningar",
                "Partnerskap",
                "Press & Media",
                "Annat"
            ],
            button: "Skicka meddelande",
            success: "Tack för ditt meddelande! Vi återkommer inom kort."
        },
        office: {
            title: "Besöksadress",
            address: [
                "Quanor AB",
                "Klarabergsviadukten 63",
                "111 64 Stockholm",
                "Sverige"
            ],
            postalTitle: "Postadress",
            postalAddress: [
                "Quanor AB",
                "Box 190",
                "101 23 Stockholm"
            ],
            hoursLabel: "Kontorstider",
            hours: "Måndag - Fredag, 09:00 - 17:00"
        },
        faq: {
            title: "Vanliga frågor",
            items: [
                {
                    q: "Hur snabbt får jag svar?",
                    a: "Vi svarar på alla e-postmeddelanden inom 24 timmar på vardagar. Enterprise-kunder har tillgång till prioriterad support med kortare svarstider."
                },
                {
                    q: "Kan jag boka en personlig demo?",
                    a: "Absolut! Kontakta vårt säljteam på sales@quanor.com så bokar vi en tid som passar dig."
                },
                {
                    q: "Erbjuder ni support på svenska?",
                    a: "Ja, all vår support finns tillgänglig på både svenska och engelska."
                },
                {
                    q: "Hur avbokar jag mitt abonnemang?",
                    a: "Du kan enkelt avboka direkt i appen under Inställningar > Abonnemang, eller kontakta vår support."
                }
            ]
        }
    },
    en: {
        hero: {
            title: "Contact us",
            subtitle: "We're here to help. Send a message or reach the right department directly."
        },
        contactMethods: {
            title: "Contact us",
            items: [
                {
                    icon: "Mail",
                    title: "General inquiries",
                    description: "Response within 24 hours on weekdays",
                    action: "mailto:hello@quanor.com",
                    actionLabel: "hello@quanor.com"
                },
                {
                    icon: "Users",
                    title: "Sales & Demos",
                    description: "Book a demo or discuss Enterprise solutions",
                    action: "mailto:sales@quanor.com",
                    actionLabel: "sales@quanor.com"
                },
                {
                    icon: "Headphones",
                    title: "Customer Support",
                    description: "Technical questions and account help",
                    action: "mailto:support@quanor.com",
                    actionLabel: "support@quanor.com"
                }
            ]
        },
        departments: {
            title: "",
            items: []
        },
        form: {
            title: "Send a message",
            subtitle: "Fill out the form and we'll get back to you as soon as possible.",
            fields: {
                name: "Name",
                email: "Email",
                subject: "Subject",
                message: "Message"
            },
            subjectOptions: [
                "General inquiry",
                "Sales & Pricing",
                "Technical support",
                "Enterprise solutions",
                "Partnerships",
                "Press & Media",
                "Other"
            ],
            button: "Send message",
            success: "Thanks for your message! We'll get back to you shortly."
        },
        office: {
            title: "Visiting address",
            address: [
                "Quanor AB",
                "Klarabergsviadukten 63",
                "111 64 Stockholm",
                "Sweden"
            ],
            postalTitle: "Postal address",
            postalAddress: [
                "Quanor AB",
                "Box 190",
                "101 23 Stockholm"
            ],
            hoursLabel: "Office hours",
            hours: "Monday - Friday, 09:00 - 17:00 CET"
        },
        faq: {
            title: "Frequently Asked Questions",
            items: [
                {
                    q: "How quickly will I get a response?",
                    a: "We respond to all emails within 24 hours on weekdays. Enterprise customers have access to priority support with shorter response times."
                },
                {
                    q: "Can I book a personal demo?",
                    a: "Absolutely! Contact our sales team at sales@quanor.com and we'll schedule a time that works for you."
                },
                {
                    q: "Do you offer support in Swedish?",
                    a: "Yes, all our support is available in both Swedish and English."
                },
                {
                    q: "How do I cancel my subscription?",
                    a: "You can easily cancel directly in the app under Settings > Subscription, or contact our support team."
                }
            ]
        }
    }
};

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = lang === "sv" ? content.sv : content.en;

    return <ContactPageClient lang={lang} content={t} />;
}
