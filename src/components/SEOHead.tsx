import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
}

const normalizeCanonical = (url?: string) => {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    if (u.hostname === 'quanor.com') u.hostname = 'www.quanor.com';
    // Ensure trailing slash on homepage
    if (u.hostname === 'www.quanor.com' && (u.pathname === '' || u.pathname === '/')) {
      u.pathname = '/';
    }
    return u.toString();
  } catch {
    return url;
  }
};

const SEOHead = ({
  title = "Quanor - AI-powered financial insights | Swedish equity analysis & investment tools",
  description = "Quanor AB leverages AI and LLM technology for Swedish equity analysis and financial insights. Based in Stockholm, we provide real-time market insights, PR analysis, and investment tools for professionals.",
  keywords = "Quanor, Quanor AB, Quanor Finance, Quanor AI, Quanor Stockholm, Quanor Analysis, Quanor finans, Quanor aktier, Quanor aktieanalys, aktieanalys AI, aktieanalys LLM, svensk aktieanalys, AI finansanalys, Stockholm fintech, svenska aktier, marknadsanalys, investeringsverktyg, finansiell intelligens, real-time aktieanalys, PR analys, rapportanalys, makroanalys Sverige",
  canonical,
  ogImage = "https://www.quanor.com/og-image.png",
  noindex = false,
  structuredData
}: SEOHeadProps) => {
  const canonicalUrl = normalizeCanonical(canonical);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Quanor" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Quanor AI-powered financial insights platform" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
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
