/**
 * Application Design & Animation Constants
 */

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
  extraSlow: 2.0,
} as const;

export const ANIMATION_EASINGS = {
  default: 'power3.out',
  smooth: 'expo.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  looping: 'sine.easeInOut',
} as const;

export const SNOW_CONFIG = {
  desktopParticleCount: 1800,
  mobileParticleCount: 600,
  particleMinSize: 0.05,
  particleMaxSize: 0.2,
  fallSpeedMin: 0.8,
  fallSpeedMax: 2.5,
  windSpeedDefault: 0.4,
  bounds: {
    x: 40,
    y: 30,
    z: 40,
  },
} as const;

export const THEME_COLORS = {
  snowWhite: '#f8fafc',
  iceBlue: '#cbd5e1',
  frostBlue: '#38bdf8',
  deepNavy: '#0f172a',
  twilightPurple: '#1e1b4b',
  auroraGreen: '#34d399',
} as const;
