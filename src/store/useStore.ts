import { create } from 'zustand';
import { AppState } from '@/types';

/**
 * Zustand Global Store for managing 3D scene dynamics, scroll status, and responsive state.
 */
export const useStore = create<AppState>((set) => ({
  // Initial Scene Parameters
  snowDensity: 1.0,
  windSpeed: 0.4,
  isBlizzardMode: false,
  activePreset: 'moderate',

  // UI & Environment State
  scrollProgress: 0,
  activeSection: 'hero',
  isMobile: false,
  prefersReducedMotion: false,
  isAlbumOpen: false,

  // Action implementations
  setSnowDensity: (density) => set({ snowDensity: density }),

  setWindSpeed: (speed) => set({ windSpeed: speed }),

  setBlizzardMode: (enabled) =>
    set((state) => ({
      isBlizzardMode: enabled,
      snowDensity: enabled ? 4.0 : 1.0,
      windSpeed: enabled ? 2.8 : 0.4,
      activePreset: enabled ? 'blizzard' : state.activePreset,
    })),

  setActivePreset: (preset) => {
    switch (preset) {
      case 'gentle':
        set({ activePreset: 'gentle', snowDensity: 0.4, windSpeed: 0.15, isBlizzardMode: false });
        break;
      case 'moderate':
        set({ activePreset: 'moderate', snowDensity: 1.0, windSpeed: 0.4, isBlizzardMode: false });
        break;
      case 'blizzard':
        set({ activePreset: 'blizzard', snowDensity: 4.0, windSpeed: 2.8, isBlizzardMode: true });
        break;
    }
  },

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setPrefersReducedMotion: (prefersReducedMotion) => set({ prefersReducedMotion }),
  setIsAlbumOpen: (isOpen) => set({ isAlbumOpen: isOpen }),
}));
