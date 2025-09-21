import { useEffect } from 'react';

interface PerformanceMetrics {
  url: string;
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay?: number;
}

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      const metrics: Partial<PerformanceMetrics> = {
        url: window.location.href,
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      };

      // First Paint and First Contentful Paint
      paintEntries.forEach(entry => {
        if (entry.name === 'first-paint') {
          metrics.firstPaint = entry.startTime;
        }
        if (entry.name === 'first-contentful-paint') {
          metrics.firstContentfulPaint = entry.startTime;
        }
      });

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.largestContentfulPaint = lastEntry.startTime;
        reportMetrics(metrics);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        metrics.cumulativeLayoutShift = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          metrics.firstInputDelay = entry.processingStart - entry.startTime;
          reportMetrics(metrics);
        }
      }).observe({ entryTypes: ['first-input'] });
    };

    const reportMetrics = (metrics: Partial<PerformanceMetrics>) => {
      // Only report in production and if we have meaningful metrics
      if (process.env.NODE_ENV === 'production' && metrics.loadTime) {
        console.info('Performance metrics:', metrics);
        
        // Report to analytics service
        // Analytics service integration would go here
        // Example: analytics.track('performance_metrics', metrics);
      }
    };

    // Wait for page to load before measuring
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);
};