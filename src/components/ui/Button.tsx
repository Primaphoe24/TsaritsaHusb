'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { magneticHover } from '@/lib/animations/gsap/hover';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  children: React.ReactNode;
}

/**
 * Modern Interactive Button Component.
 * Supports primary/glass/ghost variants and optional GSAP magnetic mouse tracking.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', magnetic = false, children, ...props }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef;

    useEffect(() => {
      if (magnetic && resolvedRef.current) {
        const cleanup = magneticHover(resolvedRef.current, { strength: 0.35 });
        return cleanup;
      }
    }, [magnetic, resolvedRef]);

    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer relative overflow-hidden group';

    const variants = {
      primary:
        'bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 text-slate-950 font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 hover:brightness-110',
      secondary:
        'bg-slate-800/80 hover:bg-slate-700/80 text-sky-200 border border-sky-500/30 backdrop-blur-md',
      outline:
        'border-2 border-sky-400/60 text-sky-100 hover:bg-sky-400/10 hover:border-sky-300 backdrop-blur-sm',
      glass:
        'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-xl hover:border-white/40',
      ghost: 'text-slate-300 hover:text-white hover:bg-white/10',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs gap-1.5',
      md: 'px-6 py-3 text-sm gap-2',
      lg: 'px-8 py-4 text-base gap-3 font-semibold',
    };

    return (
      <button
        ref={resolvedRef}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="magnetic-inner flex items-center gap-2 relative z-10">{children}</span>
        {/* Subtle shine effect on hover */}
        <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
      </button>
    );
  }
);

Button.displayName = 'Button';
