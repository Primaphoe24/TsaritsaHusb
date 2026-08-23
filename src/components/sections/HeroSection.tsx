'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { textSplitReveal } from '@/lib/animations/gsap/textSplit';
import { loopingIdle } from '@/lib/animations/gsap/loop';
import { fadeInUp } from '@/lib/animations/gsap/fadeIn';
import { useStore } from '@/store/useStore';

/**
 * Hero Section featuring split-text reveal and GSAP controls.
 * Uses selective pointer-events to allow 3D canvas orbiting and zooming.
 */
export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const activePreset = useStore((state) => state.activePreset);
  const setBlizzardMode = useStore((state) => state.setBlizzardMode);
  const isBlizzard = useStore((state) => state.isBlizzardMode);
  const isMobile = useStore((state) => state.isMobile);

  useEffect(() => {
    // 1. Text split reveal animation for main title
    if (titleRef.current) {
      textSplitReveal(titleRef.current, { duration: 0.8, stagger: 0.04, delay: 0.2 });
    }

    // 2. Subtitle fade in
    if (subtitleRef.current) {
      fadeInUp(subtitleRef.current, { delay: 0.6, distance: 30 });
    }

    // 3. Floating idle animation on hero badge
    if (badgeRef.current) {
      loopingIdle(badgeRef.current, { distanceY: 8, duration: 3 });
    }
  }, []);

  return (
    <section className="relative flex flex-1 flex-col items-center justify-center px-6 py-6 text-center z-10 overflow-hidden pointer-events-none select-none">
      <div className="mx-auto max-w-4xl">
        {/* Floating Hero Badge */}
        <div ref={badgeRef} className="inline-block mb-4 sm:mb-6 pointer-events-auto">
          <Badge
            variant="cyan"
            className="px-4 py-1.5 text-xs sm:text-sm backdrop-blur-md shadow-lg shadow-sky-500/10"
          >
            ✨ Interactive WebGL 3D & GSAP Engine
          </Badge>
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15] drop-shadow-2xl"
        >
          Realm of Perpetual Frost & Aurora
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-normal"
        >
          Experience complex real-time WebGL particle physics, parametric organic 3D pine forests,
          and high-performance GSAP timeline animations in unified synchronization.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <Button variant="primary" size="lg" magnetic onClick={() => setBlizzardMode(!isBlizzard)}>
            {isBlizzard ? '⚡ Stop Blizzard' : '❄ Trigger Blizzard'}
          </Button>
        </motion.div>

        {/* Live Metrics Bar */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto p-3 sm:p-4 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md pointer-events-auto">
          <div className="p-2 sm:p-3">
            <span className="block text-xs uppercase tracking-wider text-slate-400">Particles</span>
            <span className="text-lg sm:text-xl font-bold text-sky-400 font-mono">
              {isMobile ? '400+' : '800+'}
            </span>
          </div>
          <div className="p-2 sm:p-3 border-l border-white/10">
            <span className="block text-xs uppercase tracking-wider text-slate-400">Framerate</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">60 FPS</span>
          </div>
          <div className="p-2 sm:p-3 border-l border-white/10">
            <span className="block text-xs uppercase tracking-wider text-slate-400">
              Current Mode
            </span>
            <span className="text-lg sm:text-xl font-bold text-teal-300 uppercase font-mono">
              {activePreset}
            </span>
          </div>
          <div className="p-2 sm:p-3 border-l border-white/10">
            <span className="block text-xs uppercase tracking-wider text-slate-400">PostFX</span>
            <span className="text-lg sm:text-xl font-bold text-indigo-400 font-mono">Active</span>
          </div>
        </div>
      </div>
    </section>
  );
}
