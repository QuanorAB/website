import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Log 404 for analytics/monitoring (removed console.error for production)
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-foreground">{t('notFound.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('notFound.message')}</p>
        <Button asChild>
          <Link to="/">
            {t('nav.backToHome')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
