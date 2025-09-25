import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Products from "@/components/Products";
import SEOHead from "@/components/SEOHead";
import SkipLink from "@/components/SkipLink";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";

const Index = () => {
  usePerformanceMonitoring();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Quanor - AI-powered financial insights | Swedish equity analysis",
    "description": "Quanor AB leverages AI and LLM technology for Swedish equity analysis and financial insights. Real-time market insights, PR analysis, and investment tools.",
    "url": "https://www.quanor.com/",
    "mainEntity": {
      "@type": "Organization",
      "name": "Quanor AB",
      "alternateName": ["Quanor", "Quanor Finance", "Quanor AI"],
      "description": "AI-powered financial insights company specializing in Swedish equity analysis and market insights",
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
          "item": "https://www.quanor.com/"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Quanor - AI-powered financial insights | Swedish equity analysis & investment tools"
        description="Quanor AB leverages AI and LLM technology for Swedish equity analysis and financial insights. Based in Stockholm, we provide real-time market insights, PR analysis, and investment tools for professionals."
        keywords="Quanor, Quanor AB, Quanor Finance, Quanor AI, Quanor Stockholm, Quanor Analysis, Quanor finans, Quanor aktier, Quanor aktieanalys, aktieanalys AI, aktieanalys LLM, svensk aktieanalys, AI finansanalys, Stockholm fintech, svenska aktier, marknadsanalys, investeringsverktyg, finansiell intelligens, real-time aktieanalys, PR analys, rapportanalys, makroanalys Sverige"
        canonical="https://www.quanor.com/"
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
