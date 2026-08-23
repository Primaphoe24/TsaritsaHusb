'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
  hoverEffect?: boolean;
}

/**
 * Frost Glassmorphism Card Component.
 */
export function Card({
  className,
  children,
  glow = false,
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300',
        glow && 'shadow-2xl shadow-sky-500/10 border-sky-500/30',
        hoverEffect &&
          'hover:-translate-y-1.5 hover:border-sky-400/40 hover:shadow-xl hover:shadow-sky-500/20 hover:bg-slate-900/80',
        className
      )}
      {...props}
    >
      {/* Soft radial glow background element */}
      {glow && (
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-sky-500/20 via-teal-500/10 to-indigo-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
