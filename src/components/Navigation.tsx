import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitch from './LanguageSwitch';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-primary">
              Quanor
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.products')}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.contact')}
              </button>
            </div>

            {/* Desktop Controls & CTA */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitch />
              <Button 
                variant="default" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary ml-2"
                asChild
              >
                <a href="https://app.quanor.com/register">
                  {t('nav.signUp')}
                </a>
              </Button>
            </div>

            {/* Mobile Controls & Menu Button */}
            <div className="md:hidden flex items-center gap-1">
              <ThemeToggle />
              <LanguageSwitch />
              <Button
                variant="ghost"
                size="sm" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="fixed top-[73px] left-0 right-0 bg-background border-b border-border/50 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.products')}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.contact')}
              </button>
              
              <div className="pt-4 border-t border-border/50">
                <Button 
                  variant="default" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary"
                  asChild
                >
                  <a href="https://app.quanor.com/register">
                    {t('nav.signUp')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;