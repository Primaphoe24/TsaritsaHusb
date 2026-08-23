'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Dynamic import for WebGL Canvas scene to avoid SSR canvas rendering issues
const SnowScene = dynamic(
  () => import('@/components/three/scenes/SnowScene').then((mod) => mod.SnowScene),
  { ssr: false }
);

/**
 * Single-Page Application featuring full-screen 3D WebGL Winter Scene with minimalist top navbar controls.
 */
export default function HomePage() {
  // Initialize responsive & reduced motion listeners
  useIsMobile();
  useReducedMotion();

  return (
    <main className="relative h-screen w-screen bg-[#090d16] text-white overflow-hidden selection:bg-sky-400 selection:text-slate-950">
      {/* 3D WebGL Background Scene */}
      <SnowScene />

      {/* Top Bar Navigation Layer */}
      <div className="relative z-10 flex flex-col justify-between overflow-hidden">
        <Navbar />
      </div>
    </main>
  );
}
