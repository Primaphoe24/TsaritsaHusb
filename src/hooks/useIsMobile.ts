'use client';

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/constants';
import { useStore } from '@/store/useStore';

/**
 * Custom hook to detect if current viewport is mobile (< 768px).
 * Automatically updates Zustand global store.
 *
 * @param breakpoint - Width threshold in pixels (default: 768)
 * @returns boolean indicating if current screen is mobile
 */
export function useIsMobile(breakpoint: number = BREAKPOINTS.md): boolean {
  const [isMobile, setIsMobileLocal] = useState<boolean>(false);
  const setIsMobileStore = useStore((state) => state.setIsMobile);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < breakpoint;
      setIsMobileLocal(mobile);
      setIsMobileStore(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint, setIsMobileStore]);

  return isMobile;
}
