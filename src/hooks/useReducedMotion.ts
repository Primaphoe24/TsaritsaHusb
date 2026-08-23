'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

/**
 * Custom hook to detect if user has enabled prefers-reduced-motion in OS settings.
 * Synchronizes with global Zustand store.
 *
 * @returns boolean true if prefers-reduced-motion is active
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotionLocal] = useState<boolean>(false);
  const setStoreReducedMotion = useStore((state) => state.setPrefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      const reduced = mediaQuery.matches;
      setPrefersReducedMotionLocal(reduced);
      setStoreReducedMotion(reduced);
    };

    handleChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [setStoreReducedMotion]);

  return prefersReducedMotion;
}
