'use client';

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { staggerReveal } from '@/lib/animations/gsap/stagger';
import { useStore } from '@/store/useStore';

/**
 * About Section with GSAP Stagger Reveal Cards and Interactive 3D Parameters Tweak Controls.
 */
export function AboutSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  const snowDensity = useStore((state) => state.snowDensity);
  const setSnowDensity = useStore((state) => state.setSnowDensity);
  const windSpeed = useStore((state) => state.windSpeed);
  const setWindSpeed = useStore((state) => state.setWindSpeed);
  const setActivePreset = useStore((state) => state.setActivePreset);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.stagger-card');
      staggerReveal(cards, {
        staggerAmount: 0.15,
        distance: 50,
        scrollTriggerTarget: gridRef.current,
      });
    }
  }, []);

  return (
    <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <Badge variant="cyan" className="mb-4">
          Real-time Engine Parameters
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Seamless 2D & 3D Synchronization
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
          Manipulate WebGL particle physics and wind forces in real-time using reactive Zustand
          state stores.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Card 1 */}
        <Card className="stagger-card" glow>
          <div className="h-12 w-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-2xl text-sky-300 mb-6">
            ❄
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Particle Physics</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Utilizes single-draw-call buffer geometries with custom sinusoidal flutter offsets for
            maximum performance.
          </p>

          {/* Interactive Slider */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between text-xs font-medium text-slate-300">
              <span>Snow Density</span>
              <span className="text-sky-400 font-mono">{Math.round(snowDensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={snowDensity}
              onChange={(e) => setSnowDensity(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>
        </Card>

        {/* Card 2 */}
        <Card className="stagger-card" glow>
          <div className="h-12 w-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-2xl text-teal-300 mb-6">
            💨
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Wind & Gust Vectors</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Dynamic wind speed modifiers coupled with periodic gust math functions that influence
            both particles and pine foliage sway.
          </p>

          {/* Interactive Slider */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between text-xs font-medium text-slate-300">
              <span>Wind Speed</span>
              <span className="text-teal-400 font-mono">{windSpeed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="2.5"
              step="0.1"
              value={windSpeed}
              onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>
        </Card>

        {/* Card 3 */}
        <Card className="stagger-card" glow>
          <div className="h-12 w-12 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-2xl text-indigo-300 mb-6">
            🌲
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Organic 3D Forest</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Procedurally generated pine trees with randomized seed heights, layered cones, and
            custom snow cap shaders.
          </p>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActivePreset('gentle')}
              className="w-full justify-between"
            >
              <span>Gentle Snowfall</span>
              <span className="text-xs text-sky-400 font-mono">Preset 1</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActivePreset('blizzard')}
              className="w-full justify-between"
            >
              <span>Furious Blizzard</span>
              <span className="text-xs text-amber-400 font-mono">Preset 2</span>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
