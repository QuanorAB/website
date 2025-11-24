import quanorAppDark from "@/assets/app_home_dark.jpg";
import quanorAppLight from "@/assets/app_home_light.jpg";
import quanorMobileDark from "@/assets/app_mobile_analysis_dark.jpg";
import quanorMobileLight from "@/assets/app_mobile_analysis_light.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const titleWords = useMemo(() => 
    t('hero.title').split(' ').map((word, index) => ({
      id: `word-${index}`,
      text: word,
      isFirst: index === 0
    })), [t]);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Approximate navbar height in pixels
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Determine which images to show
  const currentDesktopImage = !mounted ? quanorAppDark : (resolvedTheme === 'light' ? quanorAppLight : quanorAppDark);
  const currentMobileImage = !mounted ? quanorMobileDark : (resolvedTheme === 'light' ? quanorMobileLight : quanorMobileDark);
  const desktopImageAlt = resolvedTheme === 'light' 
    ? "Quanor AI financial insights platform desktop view in light mode showing Swedish equity analysis tools, real-time market data, and investment insights"
    : "Quanor AI financial insights platform desktop view in dark mode showing Swedish equity analysis tools, real-time market data, and investment insights";
  const mobileImageAlt = resolvedTheme === 'light' 
    ? "Quanor AI mobile app in light mode showing Swedish equity analysis and market insights"
    : "Quanor AI mobile app in dark mode showing Swedish equity analysis and market insights";


  return (
    <section id="home" className="min-h-screen lg:max-h-screen hero-gradient relative overflow-visible lg:overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(174_60%_40%/0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(174_70%_50%/0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,hsl(174_50%_50%/0.03)_60deg,transparent_120deg)]" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="relative z-10 space-y-8 animate-fade-in-up">
            {/* Main Headline */}
            <header className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                {titleWords.map((word) => (
                  <span key={word.id} className={word.isFirst ? 'text-primary glow-text' : 'text-foreground'}>
                    {word.text}{' '}
                  </span>
                ))}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t('hero.subtitle')}
              </p>
            </header>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button 
                size="lg" 
                className="relative bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground shadow-2xl shadow-primary/25 group mobile-optimized overflow-hidden"
                onClick={() => scrollToSection("products")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center">
                  {t('hero.getStarted')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="relative border-border/30 bg-background/60 backdrop-blur-md hover:bg-background/80 hover:border-primary/30 hover:text-primary hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02] transition-all duration-300 mobile-optimized group overflow-hidden"
                onClick={() => scrollToSection("products")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{t('hero.learnMore')}</span>
              </Button>
            </div>

            {/* Enhanced Stats */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8">
              <div className="group text-center p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-background/40 to-background/20 backdrop-blur-sm border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 min-w-0 overflow-hidden">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary whitespace-normal break-words">{t('hero.stats.free')}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 leading-tight">{t('hero.stats.freeTier')}</div>
              </div>
              <div className="group text-center p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-background/40 to-background/20 backdrop-blur-sm border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 min-w-0 overflow-hidden">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary whitespace-normal break-words">{t('hero.stats.realtime')}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 leading-tight">{t('hero.stats.aiAnalysis')}</div>
              </div>
              <div className="group text-center p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-background/40 to-background/20 backdrop-blur-sm border border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 min-w-0 overflow-hidden">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary whitespace-normal break-words">{t('hero.stats.monitoring')}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 leading-tight">{t('hero.stats.marketMonitoring')}</div>
              </div>
            </div> */}
          </div>

          {/* Enhanced Dashboard Preview */}
          <div className="relative group">
            <div className="relative">
              {/* Enhanced Desktop View */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/10 border border-border/20 bg-gradient-to-br from-background/20 to-background/5 backdrop-blur-sm p-2">
                <img
                  src={currentDesktopImage}
                  alt={desktopImageAlt}
                  className="w-full h-auto rounded-2xl transition-all duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                  {...({ fetchpriority: "high" } as any)}
                />
                
                {/* Desktop glow overlay */}
                <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Enhanced Mobile View - Overlapping */}
              <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 -right-2 sm:-right-4 lg:-right-6 xl:-right-8 w-28 sm:w-32 md:w-36 lg:w-40 transform hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 border-4 border-background/50 backdrop-blur-sm">
                  <img
                    src={currentMobileImage}
                    alt={mobileImageAlt}
                    className="w-full h-auto rounded-2xl transition-opacity duration-300"
                    loading="lazy"
                  />
                  
                  {/* Enhanced Mobile Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/15 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
