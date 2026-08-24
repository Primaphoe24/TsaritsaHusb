'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { X, Image as ImageIcon, Plus, Maximize2, LayoutGrid, Images } from 'lucide-react';
import { useStore } from '@/store/useStore';

export interface BentoSlot {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
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
 * Bento Grid Photo Album Modal Component.
 * Features highly transparent light-blue frosted glassmorphism styling.
 */
export function PhotoAlbumModal() {
  const isAlbumOpen = useStore((state) => state.isAlbumOpen);
  const setIsAlbumOpen = useStore((state) => state.setIsAlbumOpen);
  const [selectedPhoto, setSelectedPhoto] = useState<BentoSlot | null>(null);
  const isClient = useIsClient();

  const bentoSlots: BentoSlot[] = [
    {
      id: 'slot-1',
      title: 'Istriku Tercinta',
      subtitle: 'Anastasia Snezhnaya',
      url: '/assets/images/album/memory1.jpg',
      date: 'Agustus 2026',
    },
    {
      id: 'slot-2',
      title: 'Wajah Cantik Bagai Salju',
      subtitle: 'Senyuman hangat',
      url: '/assets/images/album/memory2.jpg',
      date: 'Agustus 2026',
    },
    {
      id: 'slot-3',
      title: 'Lagi Ngambekan',
      subtitle: 'Momen gemes',
      url: '/assets/images/album/memory3.jpg',
      date: 'Agustus 2026',
    },
    {
      id: 'slot-4',
      title: 'Slot Foto 4',
      subtitle: 'Kosong - Masukkan Foto',
      url: '',
      date: '2026',
    },
    {
      id: 'slot-5',
      title: 'Bento Box Album Design',
      subtitle: 'Kenangan Spesial Bersama Istriku Tercinta',
      url: '',
      date: 'Aethelgard 2026',
    },
    {
      id: 'slot-6',
      title: 'Slot Foto 6',
      subtitle: 'Kosong - Masukkan Foto',
      url: '',
    },
    {
      id: 'slot-7',
      title: 'Slot Foto 7',
      subtitle: 'Kosong - Masukkan Foto',
      url: '',
    },
    {
      id: 'slot-8',
      title: 'Slot 8',
      subtitle: 'Kosong',
      url: '',
    },
    {
      id: 'slot-9',
      title: 'Slot 9',
      subtitle: 'Kosong',
      url: '',
    },
    {
      id: 'slot-10',
      title: 'Slot 10',
      subtitle: 'Kosong',
      url: '',
    },
    {
      id: 'slot-11',
      title: 'Slot Foto 11',
      subtitle: 'Kosong - Masukkan Foto',
      url: '',
    },
  ];

  const renderSlotCard = (slot: BentoSlot, extraClasses: string = '') => {
    const hasImage = Boolean(slot.url);

    return (
      <div
        key={slot.id}
        onClick={() => hasImage && setSelectedPhoto(slot)}
        className={`group relative overflow-hidden rounded-lg border border-sky-300/50 bg-sky-400/15 p-3 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between select-none hover:border-sky-200 hover:bg-sky-400/25 shadow-sm shadow-sky-500/10 ${
          hasImage ? 'cursor-pointer hover:scale-[1.02] hover:shadow-sky-400/30' : 'cursor-default'
        } ${extraClasses}`}
      >
        {/* Luminous Light-Blue Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-300/20 via-sky-400/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slot.url}
              alt={slot.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-sky-950/20 to-transparent opacity-80 transition-opacity group-hover:opacity-70" />

            <div className="relative z-10 flex items-center justify-between">
              {/* {slot.date && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-l border border-sky-200/50 bg-sky-950/70 text-sky-200 backdrop-blur-md font-mono">
                  {slot.date}
                </span>
              )} */}
              <div className="h-6 w-6 rounded-none bg-sky-950/70 border border-sky-200/50 flex items-center justify-center text-sky-100 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-4">
              <h4 className="text-xs font-bold text-white tracking-tight drop-shadow-sm">
                {slot.title}
              </h4>
              {slot.subtitle && (
                <p className="text-[10px] text-sky-100/90 font-medium line-clamp-1">
                  {slot.subtitle}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full min-h-[90px] p-2 my-auto">
            <div className="h-8 w-8 rounded-xl border border-sky-200/40 bg-sky-300/20 flex items-center justify-center text-sky-100 mb-1.5 group-hover:border-sky-100 group-hover:bg-sky-300/35 transition-all shadow-sm">
              <Plus className="w-4 h-4 text-sky-100" />
            </div>
            <p className="text-[11px] font-bold text-sky-100 leading-tight drop-shadow-sm">
              {slot.title}
            </p>
            <p className="text-[9px] text-sky-200/90 font-medium mt-0.5">{slot.subtitle}</p>
          </div>
        )}
      </div>
    );
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-950/35 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsAlbumOpen(false)} />

      {/* Main Bento Box Highly Transparent Light Blue Glass Container Modal */}
      <div className="relative z-10 w-full max-w-4xl rounded-xl border border-sky-100/10 bg-sky-50/10 p-4 sm:p-6 shadow-[0_25px_80px_-15px_rgba(56,189,248,0.3)] backdrop-blur-2xl text-white overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-sky-300/30 pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-none border border-sky-300/50 bg-sky-400/25 flex items-center justify-center text-sky-200 shadow-md shadow-sky-400/20 backdrop-blur-md">
              <LayoutGrid className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight drop-shadow-sm">
                Album Anastasya Fedorovna Snezhnaya
              </h3>
              <p className="text-xs text-sky-200/90 font-medium">Oleh Prima Fedorovich Snezhnaya</p>
            </div>
          </div>
          <button
            onClick={() => setIsAlbumOpen(false)}
            className="h-8 w-8 rounded-lg flex items-center justify-center bg-sky-400/20 hover:bg-sky-400/40 text-sky-100 hover:text-white transition-all border border-sky-300/40 backdrop-blur-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* --- BENTO GRID CONTAINERS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 overflow-y-auto pr-1 pb-1 scrollbar-thin scrollbar-thumb-sky-700/50">
          {/* COLUMN 1 (Left): Slot 1 (Tall) + Slot 7 (Bottom Left) */}
          <div className="col-span-1 flex flex-col gap-3">
            {renderSlotCard(bentoSlots[0], 'h-[230px] sm:h-[250px]')}
            {renderSlotCard(bentoSlots[6], 'h-[120px] sm:h-[135px]')}
          </div>

          {/* COLUMN 2 & 3 (Middle Center) */}
          <div className="col-span-1 sm:col-span-2 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 h-[110px] sm:h-[120px]">
              {renderSlotCard(bentoSlots[1], 'h-full')}
              {renderSlotCard(bentoSlots[2], 'h-full')}
            </div>

            {renderSlotCard(bentoSlots[4], 'h-[110px] sm:h-[120px]')}

            <div className="grid grid-cols-3 gap-3 h-[120px] sm:h-[135px]">
              {renderSlotCard(bentoSlots[7], 'h-full')}
              {renderSlotCard(bentoSlots[8], 'h-full')}
              {renderSlotCard(bentoSlots[9], 'h-full')}
            </div>
          </div>

          {/* COLUMN 4 (Right) */}
          <div className="col-span-1 flex flex-col gap-3">
            {renderSlotCard(bentoSlots[3], 'h-[150px] sm:h-[165px]')}
            {renderSlotCard(bentoSlots[5], 'h-[105px] sm:h-[105px]')}
            {renderSlotCard(bentoSlots[10], 'h-[120px] sm:h-[120px]')}
          </div>
        </div>

        {/* Modal Footer Info */}
        {/* <div className="mt-4 pt-3 border-t border-sky-300/30 flex flex-wrap items-center justify-between gap-2 text-[11px] text-sky-200/90 shrink-0">
          <p className="flex items-center gap-1.5 font-medium">
            <ImageIcon className="w-3.5 h-3.5 text-sky-300" />
            <span>Folder Foto: <code className="text-sky-100 font-mono">public/assets/images/album/</code></span>
          </p>
          <span className="text-sky-200/70 font-mono text-[10px]">Total 11 Container Slots</span>
        </div> */}
      </div>

      {/* Lightbox Modal Preview */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setSelectedPhoto(null)} />
          <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-sky-300/50 bg-sky-950/85 p-4 backdrop-blur-2xl text-white shadow-2xl flex flex-col items-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-3 top-3 h-8 w-8 rounded-full bg-sky-400/20 hover:bg-sky-400/40 text-white flex items-center justify-center border border-sky-300/40 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950/90 border border-sky-300/30 mb-3 flex items-center justify-center mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-center w-full pb-2">
              <h3 className="text-base font-bold text-white">{selectedPhoto.title}</h3>
              {selectedPhoto.subtitle && (
                <p className="text-xs text-sky-200/90 mt-0.5">{selectedPhoto.subtitle}</p>
              )}
              {selectedPhoto.date && (
                <p className="text-[10px] text-sky-300 font-mono mt-1">{selectedPhoto.date}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Square Photo Album Icon Button on Top Bar */}
      <button
        onClick={() => setIsAlbumOpen(true)}
        title="Album Bento Kenangan Bersama Istriku"
        className="relative flex items-center justify-center h-9 w-9 rounded-lg border border-sky-300/40 bg-sky-400/20 text-sky-200 hover:text-white hover:border-sky-200 hover:bg-sky-400/35 transition-all shadow-sm group backdrop-blur-md"
      >
        <Images className="w-4 h-4 text-sky-200 group-hover:scale-110 transition-transform" />
      </button>

      {/* Render Modal via React Portal directly to document.body */}
      {isAlbumOpen && isClient && createPortal(modalContent, document.body)}
    </>
  );
}
