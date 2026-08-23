import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'emerald' | 'amber' | 'indigo' | 'frost';
  children: React.ReactNode;
}

/**
 * Modern Pill Badge Component.
 */
export function Badge({ className, variant = 'cyan', children, ...props }: BadgeProps) {
  const variants = {
    cyan: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    frost: 'bg-white/10 text-slate-100 border-white/20 backdrop-blur-md',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide shadow-sm',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
