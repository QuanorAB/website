import { Button } from '@/components/ui/button';

const SkipLink = () => {
  return (
    <Button 
      asChild
      variant="secondary"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
    >
      <a href="#main-content">
        Skip to main content
      </a>
    </Button>
  );
};

export default SkipLink;