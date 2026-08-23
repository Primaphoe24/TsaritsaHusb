'use client';

import React from 'react';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-sky-500 selection:text-slate-950 font-sans antialiased">
      {children}
    </div>
  );
}
