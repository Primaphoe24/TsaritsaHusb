'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { PhotoAlbumModal } from '@/components/ui/PhotoAlbumModal';

/**
 * Flush Top Navigation Bar directly attached to top of browser window.
 * Styled with a bright, semi-transparent frosted glass aesthetic and square profile photo container.
 */
export function Navbar() {
  const activePreset = useStore((state) => state.activePreset);
  const setActivePreset = useStore((state) => state.setActivePreset);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/20 bg-slate-900/40 px-3 sm:px-6 py-2 sm:py-2.5 backdrop-blur-2xl transition-all duration-300 shadow-lg shadow-black/10">
      <nav className="w-full flex items-center justify-between gap-2 relative">
        {/* Brand Logo & Wife Profile Photo Square Container (Left Side) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-lg overflow-hidden border border-sky-400/40 bg-slate-800/80 shadow-md shadow-sky-500/20 shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/album/profile.jpg"
              alt="Foto Istriku Anastasya"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                // Fallback to memory1.jpg if profile.jpg is not yet placed
                const target = e.target as HTMLImageElement;
                if (!target.src.endsWith('/assets/images/album/memory1.jpg')) {
                  target.src = '/assets/images/album/memory1.jpg';
                }
              }}
            />
          </div>
          <div className="max-w-[120px] xs:max-w-[170px] sm:max-w-none">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white block leading-none truncate">
              Album Kenangan Anastasya Fedorovna Snezhnaya
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-wider text-sky-400 font-semibold block mt-0.5 truncate">
              Oleh Prima Feodorovich Snezhnaya
            </span>
          </div>
        </div>

        {/* Clean Snow Controls Presets (Centered on desktop, responsive inline on mobile) */}
        <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-slate-900/50 p-0.5 sm:p-1 rounded-lg border border-white/15 shadow-lg backdrop-blur-md shrink-0">
          <button
            onClick={() => setActivePreset('gentle')}
            className={`px-2 sm:px-4 py-1 text-[10px] sm:text-xs font-medium rounded-md transition-all ${
              activePreset === 'gentle'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Gentle
          </button>
          <button
            onClick={() => setActivePreset('moderate')}
            className={`px-2 sm:px-4 py-1 text-[10px] sm:text-xs font-medium rounded-md transition-all ${
              activePreset === 'moderate'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Moderate
          </button>
          <button
            onClick={() => setActivePreset('blizzard')}
            className={`px-2 sm:px-4 py-1 text-[10px] sm:text-xs font-medium rounded-md transition-all ${
              activePreset === 'blizzard'
                ? 'bg-gradient-to-r from-sky-400 to-teal-300 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Blizzard
          </button>
        </div>

        {/* Interactive Components (Right Side: Audio & Photo Album) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <AudioPlayer />
          <PhotoAlbumModal />
        </div>
      </nav>
    </header>
  );
}
