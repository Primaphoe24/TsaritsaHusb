'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Maximize2, LayoutGrid, Images } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { AlbumSnowfallBurst } from './AlbumSnowfallBurst';
import { SnowflakeXIcon } from './SnowflakeXIcon';

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
 * Realistic Snow Accumulation Cap for Top Header Container.
 * Features 2 snow mounds rising upwards on the LEFT side,
 * and soft snow accumulation sagging on the RIGHT side.
 */
function MainBentoHeaderSnowCap() {
  return (
    <div className="absolute -top-3.5 inset-x-0 pointer-events-none z-30 overflow-visible h-7 sm:h-8">
      <svg
        viewBox="0 0 400 32"
        preserveAspectRatio="none"
        className="w-full h-full filter drop-shadow-[0_2.5px_3.5px_rgba(15,23,42,0.45)]"
      >
        <defs>
          <linearGradient id="header-snow-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#f0f9ff" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Soft underside shadow tint */}
        <path
          d="M0,14 C15,5 30,5 45,12 C55,4 75,3 95,11 C130,16 180,18 240,16 C290,16 330,22 375,27 C390,26 398,18 400,12 L400,10 L0,10 Z"
          fill="#38bdf8"
          opacity="0.35"
        />

        {/* Main Snow Drift (2 Mounds on Left + Sag on Right) */}
        <path
          d="M0,12 C12,6 24,5 38,10 C50,3 72,2 92,9 C120,14 170,16 230,14 C285,14 325,20 370,24 C388,23 397,16 400,11 L400,8 L0,8 Z"
          fill="url(#header-snow-grad)"
        />

        {/* Top Crisp White Powder Highlight */}
        <path
          d="M0,12 C12,7 24,6 38,11 C50,4 72,3 92,10 C120,15 170,17 230,15 C285,15 325,21 370,25 C388,24 397,17 400,12 L400,8 L0,8 Z"
          fill="#ffffff"
          opacity="0.95"
        />
      </svg>
    </div>
  );
}

/**
 * Realistic Snow Accumulation Cap for Zoomed-In Photo Frame.
 * Features organic snow mound sagging downwards on the LEFT side.
 */
function ZoomLightboxSnowCapLeft() {
  return (
    <div className="absolute -top-1 inset-x-0 pointer-events-none z-30 overflow-visible h-5 sm:h-6">
      <svg
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="w-full h-full filter drop-shadow-[0_2px_3px_rgba(15,23,42,0.4)]"
      >
        <defs>
          <linearGradient id="snow-grad-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="65%" stopColor="#f0f9ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Soft underside shadow tint */}
        <path
          d="M0,0 Q5,12 15,20 Q55,22 100,12 Q160,8 240,4 Q285,6 300,0 Z"
          fill="#38bdf8"
          opacity="0.35"
        />

        {/* Main Snow Mound (Sags downwards on LEFT side) */}
        <path
          d="M0,0 Q5,10 15,17 Q55,19 100,10 Q160,7 240,3 Q285,5 300,0 Z"
          fill="url(#snow-grad-left)"
        />

        {/* Top Crisp White Powder Highlight */}
        <path
          d="M0,0 Q5,6 15,12 Q55,13 100,7 Q160,5 240,2 Q285,3 300,0 Z"
          fill="#ffffff"
          opacity="0.95"
        />
      </svg>
    </div>
  );
}

/**
 * Bento Grid Photo Album Modal Component.
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
      subtitle: 'Anastasya Snezhnaya',
      url: '/assets/images/album/memory1.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-2',
      title: 'Wajah Cantik Bagai Salju',
      subtitle: 'Senyuman hangat',
      url: '/assets/images/album/memory2.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-3',
      title: 'Lagi Ngambekan',
      subtitle: 'Takut Aku Tidak Kembali',
      url: '/assets/images/album/memory3.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-4',
      title: 'Senyuman Pagi',
      subtitle: 'Seyuman Anastasya 2',
      url: '/assets/images/album/memory4.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-5',
      title: 'Kesedihan',
      subtitle: 'Menunggu Prima Kembali Pulang',
      url: '/assets/images/album/memory5.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-6',
      title: 'Bahagia',
      subtitle: 'Momen Bahagia Kembalinya Diriku',
      url: '/assets/images/album/memory6.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-7',
      title: 'Pose Dingin',
      subtitle: 'Aura Kecantikan Istriku',
      url: '/assets/images/album/memory7.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-8',
      title: 'Senyuman Sore',
      subtitle: 'Senyuman Anastasya',
      url: '/assets/images/album/memory8.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-9',
      title: 'Isi Hati',
      subtitle: 'Lagi Menyatakan Perasaan',
      url: '/assets/images/album/memory9.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-10',
      title: 'Berbincang',
      subtitle: 'Hujan Salju',
      url: '/assets/images/album/memory10.jpg',
      date: 'Anastasya',
    },
    {
      id: 'slot-11',
      title: 'Kenyamanan Dalam Kebersamaan',
      subtitle: 'Pose Dingin Istriku',
      url: '/assets/images/album/memory11.jpg',
      date: 'Anastasya',
    },
  ];

  const renderSlotCard = (slot: BentoSlot, extraClasses: string = '') => {
    const hasImage = Boolean(slot.url);

    return (
      <div
        key={slot.id}
        onClick={() => hasImage && setSelectedPhoto(slot)}
        className={`group relative overflow-hidden rounded-lg border border-sky-300/50 bg-sky-400/15 p-3 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between select-none hover:border-sky-200 hover:bg-sky-400/25 ${
          hasImage ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'
        } ${extraClasses}`}
      >
        {/* Note: Individual bento slots do NOT have snow overlay, as requested */}
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
              <div className="h-6 w-6 rounded-none bg-sky-950/70 border border-sky-200/50 flex items-center justify-center text-sky-100 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-4">
              <h4 className="text-xs font-bold text-white tracking-tight">{slot.title}</h4>
              {slot.subtitle && (
                <p className="text-[10px] text-sky-100/90 font-medium line-clamp-1">
                  {slot.subtitle}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full min-h-[90px] p-2 my-auto">
            <div className="h-8 w-8 rounded-xl border border-sky-200/40 bg-sky-300/20 flex items-center justify-center text-sky-100 mb-1.5 group-hover:border-sky-100 group-hover:bg-sky-300/35 transition-all">
              <Plus className="w-4 h-4 text-sky-100" />
            </div>
            <p className="text-[11px] font-bold text-sky-100 leading-tight">{slot.title}</p>
            <p className="text-[9px] text-sky-200/90 font-medium mt-0.5">{slot.subtitle}</p>
          </div>
        )}
      </div>
    );
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-950/35 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      {/* Staggered finite snowflake burst effect triggered on album open */}
      <AlbumSnowfallBurst />

      <div className="fixed inset-0" onClick={() => setIsAlbumOpen(false)} />

      {/* Container Wrapper for Header & Bento Grid */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-3.5 my-auto max-h-[92vh]">
        {/* 1. SEPARATE TOP HEADER CONTAINER DIV */}
        <div className="relative w-full rounded-xl border border-sky-100/10 bg-blue-100/0 p-4 sm:p-5 backdrop-blur-2xl text-white overflow-hidden shadow-none shrink-0">
          {/* Realistic Snow Cap with 2 mounds on left + sag on right */}
          <MainBentoHeaderSnowCap />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-none border border-sky-300/50 bg-sky-400/25 flex items-center justify-center text-sky-200 backdrop-blur-md">
                <LayoutGrid className="w-5 h-5 text-sky-200" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                  Album Anastasya Fedorovna Snezhnaya
                </h3>
                <p className="text-xs text-sky-200/90 font-medium">
                  Oleh Prima Fedorovich Snezhnaya
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAlbumOpen(false)}
              className="group h-8 w-8 rounded-lg flex items-center justify-center bg-sky-400/20 hover:bg-sky-400/40 text-sky-100 hover:text-white transition-all border border-sky-300/40 backdrop-blur-md z-40"
            >
              <SnowflakeXIcon className="w-4 h-4 text-sky-100 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* 2. SEPARATE BOTTOM BENTO GRID FULL CONTAINER DIV */}
        <div className="relative w-full rounded-xl border border-sky-100/10 bg-blue-100/0 p-4 sm:p-6 backdrop-blur-2xl text-white overflow-hidden shadow-none flex-1 overflow-y-auto">
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
        </div>
      </div>

      {/* Lightbox Modal Preview with Left-side Snow Accumulation Drift */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setSelectedPhoto(null)} />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-sky-100/10 bg-blue-100/25 p-4 sm:p-5 backdrop-blur-2xl text-white flex flex-col items-center my-auto shadow-none overflow-hidden">
            {/* Realistic Snow Cap sagging downwards on the LEFT side */}
            <ZoomLightboxSnowCapLeft />

            {/* Header row with Close Button */}
            <div className="w-full flex items-center justify-end mb-2 pt-1">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="group h-8 w-8 rounded-lg flex items-center justify-center bg-sky-400/20 hover:bg-sky-400/40 text-sky-100 hover:text-white transition-all border border-sky-300/40 backdrop-blur-md z-40"
              >
                <SnowflakeXIcon className="w-4 h-4 text-sky-100 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Photo Container */}
            <div className="relative w-full max-h-[58vh] aspect-[4/3] rounded-lg overflow-hidden bg-slate-950/80 border border-sky-100/10 mb-3 flex items-center justify-center p-2 shadow-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[52vh] max-w-full w-auto h-auto object-contain rounded-md"
              />
            </div>

            {/* Text Captions */}
            <div className="text-center w-full pb-1">
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
        title="Album Kenangan Bersama Istriku"
        className="relative flex items-center justify-center h-9 w-9 rounded-lg text-sky-200 hover:text-white shadow-none"
      >
        <Images className="w-4 h-4 text-sky-200 group-hover:scale-110 transition-transform" />
      </button>

      {/* Render Modal via React Portal directly to document.body */}
      {isAlbumOpen && isClient && createPortal(modalContent, document.body)}
    </>
  );
}
