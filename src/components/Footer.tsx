import { Separator } from "@/components/ui/separator";
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerSections = useMemo(() => [
    {
      id: 'products',
      title: t('footer.sections.products'),
      links: [
        { key: 'insights', name: t('footer.links.insights'), href: "#products" },
        { key: 'pricing', name: t('footer.links.pricing'), href: "#products" }
      ]
    },
    {
      id: 'company',
      title: t('footer.sections.company'),
      links: [
        { key: 'about', name: t('footer.links.about'), href: "#about" },
        { key: 'contact', name: t('footer.links.contact'), href: "#contact" }
      ]
    },
    {
      id: 'resources',
      title: t('footer.sections.resources'),
      links: [
        { key: 'support', name: t('footer.links.support'), href: "#contact" }
      ]
    }
  ], [t]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith("#")) {
      const element = document.getElementById(sectionId.substring(1));
      if (element) {
        const navHeight = 80; // Approximate navbar height in pixels
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <footer className="bg-surface-elevated border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-2xl font-bold text-primary">Quanor</div>
            <p className="text-muted-foreground max-w-md">
              {t('footer.description')}
            </p>
            <div className="text-sm text-muted-foreground">
              {t('footer.builtIn')}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.id} className="space-y-4">
              <h4 className="font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.key}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-border/50" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </div>
          
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.legal.privacy')}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.legal.terms')}
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.legal.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
