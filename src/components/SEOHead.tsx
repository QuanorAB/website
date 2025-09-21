import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SEOHead = ({
  title = "Quanor - AI-Powered Financial Intelligence | Swedish Stock Analysis & Investment Tools",
  description = "Quanor AB leverages AI and LLM technology for advanced Swedish stock analysis, aktieanalys, and financial intelligence. Based in Stockholm, we provide real-time market insights, PR analysis, and investment tools for professionals.",
  keywords = "Quanor, Quanor AB, Quanor Finance, Quanor AI, Quanor Stockholm, Quanor Analysis, Quanor finans, Quanor aktier, Quanor aktieanalys, aktieanalys AI, aktieanalys LLM, svensk aktieanalys, AI finansanalys, Stockholm fintech, svenska aktier, marknadsanalys, investeringsverktyg, finansiell intelligens, real-time aktieanalys, PR analys, rapportanalys, makroanalys Sverige",
  canonical,
  ogImage = "https://quanor.com/og-image.jpg",
  noindex = false,
  structuredData
}: SEOHeadProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Quanor AI-powered financial intelligence platform" />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;