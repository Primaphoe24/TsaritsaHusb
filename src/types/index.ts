import { ReactNode } from 'react';

/**
 * Common Animation Options for GSAP and Framer Motion wrappers
 */
export interface BaseAnimationOptions {
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  scrollTrigger?: boolean | object;
}

/**
 * Snow Scene Parameters
 */
export interface SnowSceneParams {
  particleCount: number;
  windSpeed: number;
  fallSpeed: number;
  turbulence: number;
  snowDensity: number;
  cameraFov: number;
  enablePostProcessing: boolean;
}

/**
 * Tree Instance Properties for Procedural 3D Forest
 */
export interface TreeData {
  id: string;
  position: [number, number, number];
  scale: [number, number, number];
  rotationY: number;
  seed: number;
}

/**
 * Global Store State
 */
export interface AppState {
  // 3D Scene Controls
  snowDensity: number;
  windSpeed: number;
  isBlizzardMode: boolean;
  activePreset: 'gentle' | 'moderate' | 'blizzard';

  // UI & Environment State
  scrollProgress: number;
  activeSection: string;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  isAlbumOpen: boolean;

  // Actions
  setSnowDensity: (density: number) => void;
  setWindSpeed: (speed: number) => void;
  setBlizzardMode: (enabled: boolean) => void;
  setActivePreset: (preset: 'gentle' | 'moderate' | 'blizzard') => void;
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: string) => void;
  setIsMobile: (isMobile: boolean) => void;
  setPrefersReducedMotion: (reduced: boolean) => void;
  setIsAlbumOpen: (isOpen: boolean) => void;
}

/**
 * Generic Component Props
 */
export interface ChildrenProps {
  children: ReactNode;
  className?: string;
}
