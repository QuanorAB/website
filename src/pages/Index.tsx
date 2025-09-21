import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SkipLink from "@/components/SkipLink";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";

const Index = () => {
  usePerformanceMonitoring();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Quanor - AI-Powered Financial Intelligence | Swedish Stock Analysis",
    "description": "Quanor AB leverages AI and LLM technology for advanced Swedish stock analysis, aktieanalys, and financial intelligence. Real-time market insights, PR analysis, and investment tools.",
    "url": "https://quanor.com",
    "mainEntity": {
      "@type": "Organization",
      "name": "Quanor AB",
      "alternateName": ["Quanor", "Quanor Finance", "Quanor AI"],
      "description": "AI-powered financial intelligence company specializing in Swedish stock analysis (aktieanalys) and market insights",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Klarabergsviadukten 63",
        "addressLocality": "Stockholm",
        "postalCode": "111 64",
        "addressCountry": "SE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+46-XX-XXX-XXXX",
        "contactType": "customer service",
        "email": "hello@quanor.com",
        "availableLanguage": ["Swedish", "English"]
      }
    },
  "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://quanor.com"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Quanor - AI-Powered Financial Intelligence | Swedish Stock Analysis & Investment Tools"
        description="Quanor AB leverages AI and LLM technology for advanced Swedish stock analysis, aktieanalys, and financial intelligence. Based in Stockholm, we provide real-time market insights, PR analysis, and investment tools for professionals."
        keywords="Quanor, Quanor AB, Quanor Finance, Quanor AI, Quanor Stockholm, Quanor Analysis, Quanor finans, Quanor aktier, Quanor aktieanalys, aktieanalys AI, aktieanalys LLM, svensk aktieanalys, AI finansanalys, Stockholm fintech, svenska aktier, marknadsanalys, investeringsverktyg, finansiell intelligens, real-time aktieanalys, PR analys, rapportanalys, makroanalys Sverige"
        canonical="https://quanor.com/"
        structuredData={structuredData}
      />
      <SkipLink />
      <div className="min-h-screen">
        <Navigation />
        <main id="main-content" role="main">
          <Hero />
          <Products />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
