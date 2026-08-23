'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

/**
 * Custom hook to track window vertical scroll progress normalized from 0.0 to 1.0.
 * Updates Zustand store so 3D scene parameters can dynamically react to scroll position.
 *
 * @returns number scroll progress ratio (0 to 1)
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);
  const setStoreScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const ratio = Math.min(Math.max(currentScroll / totalHeight, 0), 1);

      setProgress(ratio);
      setStoreScrollProgress(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setStoreScrollProgress]);

  return progress;
}
