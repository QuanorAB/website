"use client";

interface JsonLdProps {
    lang: string;
}

export function JsonLd({ lang }: JsonLdProps) {
    const baseUrl = "https://www.quanor.com";

    // Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Quanor AB",
        "url": baseUrl,
        "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
            "width": 512,
            "height": 512
        },
        "description": lang === "sv"
            ? "Omedelbar aktieanalys för nordiska marknader. Realtidsanalys av kvartalsrapporter, pressmeddelanden och analyser inför rapport."
            : "Instant stock analysis for Nordic markets. Real-time analysis of quarterly reports, press releases and pre-earnings.",
        "foundingDate": "2024",
        "founders": [
            {
                "@type": "Person",
                "name": "Johannes Koch"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Klarabergsviadukten 63",
            "addressLocality": "Stockholm",
            "postalCode": "111 64",
            "addressCountry": "SE"
        },
        "sameAs": [
            "https://www.linkedin.com/company/quanor"
        ]
    };

    // WebSite Schema with SearchAction
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Quanor",
        "description": lang === "sv"
            ? "Omedelbar finansiell analys för nordiska aktier"
            : "Instant financial analysis for Nordic stocks",
        "publisher": {
            "@id": `${baseUrl}/#organization`
        },
        "inLanguage": lang === "sv" ? "sv-SE" : "en",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://app.quanor.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    // SoftwareApplication Schema
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Quanor",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "SEK",
            "lowPrice": "0",
            "highPrice": "99",
            "offerCount": "2"
        },
        "description": lang === "sv"
            ? "Omedelbar aktieanalys med realtidsbevakning av pressmeddelanden, kvartalsrapporter och analyser inför rapport."
            : "Instant stock analysis with real-time monitoring of press releases, quarterly reports and pre-earnings.",
        "featureList": lang === "sv"
            ? ["Kvartalsrapportanalys", "Pressmeddelandeanalys", "Analys inför rapport", "Kurstrigger-analys", "Daglig marknadsöversikt"]
            : ["Quarterly report analysis", "Press release analysis", "Pre-earnings analysis", "Price trigger analysis", "Daily market recap"]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
        </>
    );
}
