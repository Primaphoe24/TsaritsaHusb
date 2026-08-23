'use client';

import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useStore } from '@/store/useStore';

/**
 * Post-Processing Effects pipeline for rendering high-fidelity winter atmospheric lighting.
 * Dynamically scales bloom intensity and noise based on blizzard mode and device profile.
 */
export function PostEffects() {
  const isMobile = useStore((state) => state.isMobile);
  const isBlizzard = useStore((state) => state.isBlizzardMode);

  // Disable post-processing on weak mobile devices for optimal framerate
  if (isMobile) return null;

  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      <Bloom
        intensity={isBlizzard ? 1.2 : 0.6}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.2} darkness={0.7} />
      <Noise opacity={0.02} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
