import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import Navigation from "@/components/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/theme-provider";
import { languages } from "@/i18n/settings";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = "https://www.quanor.com";

export async function generateStaticParams() {
  return [{ lang: 'sv' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const currentUrl = `${baseUrl}/${lang}`;

  const title = lang === 'sv'
    ? "Quanor - Omedelbar aktieanalys för svenska marknader"
    : "Quanor - Instant stock analysis for Swedish markets";

  const description = lang === 'sv'
    ? "Få professionell finansiell analys med AI. Realtidsbevakning av pressmeddelanden, kvartalsrapporter och analyser inför rapport för svenska aktier."
    : "Get professional financial analysis with AI. Real-time monitoring of press releases, quarterly reports and pre-earnings for Swedish stocks.";

  // Generate alternates for all languages
  const alternateLanguages: Record<string, string> = {};
  languages.forEach((l) => {
    alternateLanguages[l] = `${baseUrl}/${l}`;
  });
  // x-default points to Swedish as primary
  alternateLanguages['x-default'] = `${baseUrl}/sv`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: lang === 'sv'
      ? ['aktieanalys', 'AI', 'kvartalsrapporter', 'pressmeddelanden', 'inför rapport', 'svenska aktier', 'finansiell analys', 'nordiska aktier', 'flashanalys']
      : ['stock analysis', 'AI', 'quarterly reports', 'press releases', 'pre-earnings', 'Nordic stocks', 'financial analysis', 'Swedish stocks', 'flash analysis'],
    authors: [{ name: 'Quanor AB' }],
    creator: 'Quanor AB',
    publisher: 'Quanor AB',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: currentUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      locale: lang === 'sv' ? 'sv_SE' : 'en_US',
      alternateLocale: lang === 'sv' ? 'en_US' : 'sv_SE',
      url: currentUrl,
      siteName: 'Quanor',
      title,
      description,
      images: [
        {
          url: `${baseUrl}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Quanor - Omedelbar aktieanalys',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/og-image.png`],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <JsonLd lang={lang} />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <ScrollToTop />
          <Navigation lang={lang} />
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
          <Footer lang={lang} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

