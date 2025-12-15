"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * ScrollToTop Component
 * 
 * Resets scroll position to top when navigating between pages.
 * Also triggers viewport recalculation for Framer Motion's whileInView.
 */
export function ScrollToTop() {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip the aggressive scroll on first render (initial page load)
        if (isFirstRender.current) {
            isFirstRender.current = false;
            // Just ensure we're at top on first load
            window.scrollTo(0, 0);
            return;
        }

        // For subsequent navigations, do the scroll reset
        window.scrollTo(0, 0);

        // Dispatch a scroll event to trigger intersection observers
        const triggerViewportCheck = () => {
            window.dispatchEvent(new Event('scroll'));
            window.dispatchEvent(new Event('resize'));
        };

        // Multiple triggers with small delays to ensure animations kick in
        triggerViewportCheck();
        const timer1 = setTimeout(triggerViewportCheck, 50);
        const timer2 = setTimeout(triggerViewportCheck, 150);
        const timer3 = setTimeout(triggerViewportCheck, 300);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [pathname]);

    return null;
}
