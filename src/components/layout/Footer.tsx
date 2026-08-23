import React from 'react';

/**
 * Modern Footer Component.
 */
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 px-6 py-12 backdrop-blur-2xl text-slate-400">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 font-bold">
            ❆
          </div>
          <span className="text-sm font-medium text-slate-200">
            Aethelgard 3D Winter Experience
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium">
          <span className="text-slate-500">Built with:</span>
          <span className="hover:text-sky-400 transition-colors">Next.js 16</span>
          <span className="hover:text-sky-400 transition-colors">React Three Fiber</span>
          <span className="hover:text-sky-400 transition-colors">GSAP 3</span>
          <span className="hover:text-sky-400 transition-colors">Framer Motion</span>
          <span className="hover:text-sky-400 transition-colors">Zustand</span>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Aethelgard Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
