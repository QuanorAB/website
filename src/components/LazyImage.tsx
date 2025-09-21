import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  loadingClassName?: string;
  errorClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = ({
  src,
  alt,
  className,
  placeholder,
  loadingClassName,
  errorClassName,
  onLoad,
  onError,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        ref={imgRef}
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          errorClassName,
          className
        )}
        {...props}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse",
            loadingClassName
          )}
        />
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? src : placeholder || ''}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

export default LazyImage;