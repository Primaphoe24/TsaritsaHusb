'use client';

import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { pinnedSection } from '@/lib/animations/gsap/scrollReveal';
import { gsap } from '@/lib/animations/gsap/config';

/**
 * Pinned Features Section using GSAP ScrollTrigger pinning.
 * As user scrolls, content panel shifts sideways while background pin remains locked.
 */
export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const pinTimeline = pinnedSection({
        trigger: containerRef.current!,
        pinTarget: containerRef.current!,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
      });

      pinTimeline.to(trackRef.current, {
        x: '-66.6%',
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative z-10 min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950/40 py-20 border-y border-white/10"
    >
      <div className="px-6 max-w-7xl mx-auto w-full mb-10">
        <Badge variant="emerald" className="mb-3">
          Architecture Highlights
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for Heavy Animation Workloads
        </h2>
      </div>

      {/* Horizontal Pinned Track */}
      <div className="w-full overflow-hidden px-6">
        <div ref={trackRef} className="flex gap-8 w-[300vw] sm:w-[220vw] md:w-[180vw]">
          {/* Feature 1 */}
          <Card className="w-1/3 min-w-[320px] p-8 border-sky-500/30 bg-slate-900/90" glow>
            <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block mb-2">
              01 • WebGL GPU Pipeline
            </span>
            <h3 className="text-2xl font-bold text-white mb-4">React Three Fiber 9</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Declarative 3D scene construction powered by Three.js core. Uses instanced meshes,
              custom particle geometries, and depth-tested atmosphere fog.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="cyan">@react-three/fiber</Badge>
              <Badge variant="cyan">@react-three/drei</Badge>
              <Badge variant="cyan">@react-three/postprocessing</Badge>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="w-1/3 min-w-[320px] p-8 border-emerald-500/30 bg-slate-900/90" glow>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-2">
              02 • GSAP Animation Suite
            </span>
            <h3 className="text-2xl font-bold text-white mb-4">GSAP 3 + @gsap/react</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Full suite of GSAP plugins including ScrollTrigger scrubbing, pinned section
              timelines, split text reveal, and magnetic cursor hover dynamics.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="emerald">ScrollTrigger</Badge>
              <Badge variant="emerald">Flip</Badge>
              <Badge variant="emerald">TextPlugin</Badge>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="w-1/3 min-w-[320px] p-8 border-indigo-500/30 bg-slate-900/90" glow>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-2">
              03 • Reactive State Bridge
            </span>
            <h3 className="text-2xl font-bold text-white mb-4">Zustand State Store</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Lightweight global state engine connecting scroll progress, screen size hooks, and UI
              buttons directly into WebGL render loops without React re-render overhead.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="indigo">Zustand</Badge>
              <Badge variant="indigo">useScrollProgress</Badge>
              <Badge variant="indigo">useIsMobile</Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
