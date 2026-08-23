'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Library, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { useStore } from '@/store/useStore';

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
}

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Memory Photo Album Container Modal using Lucide icons.
 * Medium-sized bright frosted glassmorphism container properly centered in the viewport via React Portal.
 */
export function PhotoAlbumModal() {
  const isAlbumOpen = useStore((state) => state.isAlbumOpen);
  const setIsAlbumOpen = useStore((state) => state.setIsAlbumOpen);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isClient = useIsClient();

  // Photos loaded directly from local folder /assets/images/album/
  const photos: PhotoItem[] = [
    {
      id: '1',
      url: '/assets/images/album/memory1.jpg',
      caption: 'Istriku Tercinta',
      date: 'Agustus 2026',
    },
    {
      id: '2',
      url: '/assets/images/album/memory2.jpg',
      caption: 'Wajah cantik istriku bagai salju',
      date: 'Agustus 2026',
    },
    {
      id: '3',
      url: '/assets/images/album/memory3.jpg',
      caption: 'Lagi ngambekan',
      date: 'Agustus 2026',
    },
  ];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/15 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Click Backdrop Overlay to Close */}
      <div className="absolute inset-0" onClick={() => setIsAlbumOpen(false)} />

      {/* Bright Semi-Transparent Frosted Glass Album Container */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/25 bg-slate-800/40 p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-3xl text-white overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 rounded-lg overflow-hidden border border-sky-400/40 bg-slate-800/80 shadow-md shadow-sky-500/20 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/album/profile.jpg"
                alt="Foto Istriku Anastasya"
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('/assets/images/album/memory1.jpg')) {
                    target.src = '/assets/images/album/memory1.jpg';
                  }
                }}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight leading-none">
                Istriku Anastasya Feodorovna Snezhnaya
              </h3>
              <p className="text-[11px] text-slate-200 mt-0.5 font-medium">
                Oleh Prima Feodorovich Snezhnaya
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAlbumOpen(false)}
            className="h-7 w-7 rounded-full flex items-center justify-center bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 hover:text-white transition-all border border-white/20"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Photo Display Frame */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950/80 border border-white/20 flex items-center justify-center mb-3 shadow-inner">
          {currentPhoto ? (
            <>
              {/* Image Display */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="h-full w-full object-cover transition-transform duration-500"
                onError={(e) => {
                  // Fallback placeholder image when local asset is missing
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%230f172a"/><path d="M200 100 C180 70 140 85 140 115 C140 145 200 185 200 185 C200 185 260 145 260 115 C260 85 220 70 200 100 Z" fill="%2338bdf8" opacity="0.8"/><text x="50%" y="82%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="13" font-family="sans-serif">Momen Indah Bersama Istriku</text></svg>';
                }}
              />

              {/* Navigation Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Caption Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-3 pt-8">
                <p className="text-xs font-semibold text-white">{currentPhoto.caption}</p>
                {currentPhoto.date && (
                  <p className="text-[10px] text-sky-300 font-medium mt-0.5 font-mono">
                    {currentPhoto.date}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center p-6 flex flex-col items-center">
              <ImageIcon className="w-8 h-8 text-slate-500 mb-2" />
              <p className="text-xs font-medium text-slate-300">
                Foto Dalam Folder public/assets/images/album/
              </p>
            </div>
          )}
        </div>

        {/* Thumbnail Navigation Indicators */}
        <div className="flex items-center justify-center gap-2 py-1">
          {photos.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-10 w-14 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? 'border-sky-400 scale-105 shadow-md shadow-sky-500/20'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Square Photo Album Icon Button on Top Bar */}
      <button
        onClick={() => setIsAlbumOpen(true)}
        title="Album Kenangan Bersama Istriku"
        className="relative flex items-center justify-center h-9 w-9 rounded-lg border border-white/20 bg-slate-900/60 text-sky-400 hover:text-sky-300 hover:border-sky-400/50 hover:bg-slate-800/70 transition-all shadow-sm group backdrop-blur-md"
      >
        <Library className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
      </button>

      {/* Render Modal via React Portal directly to document.body */}
      {isAlbumOpen && isClient && createPortal(modalContent, document.body)}
    </>
  );
}
