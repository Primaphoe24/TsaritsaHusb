'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';
import { SnowParticles } from '../objects/SnowParticles';
import { SnowAccumulation } from '../objects/SnowAccumulation';
import { Forest } from '../objects/Tree';
import { Ground } from '../objects/Ground';
import { useStore } from '@/store/useStore';

export interface SnowSceneProps {
  brightness?: number; // Filter Gelap/Terang (0.4 = gelap badai malam, 1.0 = normal, 1.6 = terang)
  fogNear?: number; // Jarak awal munculnya kabut badai salju (default: 2.0)
  fogFar?: number; // Jarak kabut tebal menyelimuti latar bukit (default: 45.0)
  fogColor?: string; // Warna dasar atmosfer kabut badai (default: '#090d16')
  snowCount?: number; // Jumlah kepingan salju kristal jatuh
  snowSize?: number; // Skala kepingan salju kristal jatuh (default: 3.0)
  snowSpeed?: number; // Kecepatan jatuh salju dari langit (default: 1.0)
  groundSnowPiles?: number; // Jumlah tumpukan salju berkumpul di permukaan tanah (default: 35)
  groundSnowScale?: number; // Ukuran ketebalan maksimal tumpukan salju di tanah (default: 1.0)
  groundGrowthSpeed?: number; // Kecepatan pertumbuhan tumpukan salju di tanah (default: 0.3)
}

/**
 * Locked Camera Controller.
 */
function CameraController() {
  return <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />;
}

/**
 * Persistent Minimalist Loading Overlay with Smooth Fade Transition.
 * Placed outside Suspense so React does not unmount it instantly when assets load.
 * Performs a smooth 1000ms opacity fade from pure black screen to the 3D scene.
 */
function MinimalLoader() {
  const { progress } = useProgress();
  const currentProgress = Math.min(100, Math.round(progress));
  const [faded, setFaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (currentProgress >= 100) {
      const timer1 = setTimeout(() => setFaded(true), 300); // Start fade transition
      const timer2 = setTimeout(() => setHidden(true), 1400); // Unmount after 1000ms fade completes
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [currentProgress]);

  if (hidden) return null;

  return (
    <Html
      fullscreen
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090d16] text-white transition-opacity duration-1000 ease-out pointer-events-none select-none ${
        faded ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Minimal spinning loader icon */}
        <Loader2 className="w-9 h-9 text-sky-400 animate-spin" />

        {/* Minimal 0-100% percentage progress indicator */}
        <p className="text-sm font-medium tracking-widest text-slate-300 font-mono">
          {currentProgress}%
        </p>
      </div>
    </Html>
  );
}

/**
 * 3D Snow Scene Container Component.
 * Optimized for performance: Draco-compressed terrain & pine trees, 3D crystalline snowflakes at size 3.0, smooth fade-in loading transition.
 */
export function SnowScene({
  brightness = 1.0,
  fogNear = 2.0,
  fogFar = 45.0,
  fogColor = '#090d16',
  snowCount,
  snowSize = 3.0,
  snowSpeed = 1.0,
  groundSnowPiles = 35,
  groundSnowScale = 1.0,
  groundGrowthSpeed = 0.3,
}: SnowSceneProps) {
  const snowDensity = useStore((state) => state.snowDensity);
  const isAlbumOpen = useStore((state) => state.isAlbumOpen);

  // Compute snow particles count based on store snowDensity (1000 in moderate, 4000 in blizzard)
  const activeSnowCount = snowCount ?? Math.round(1000 * snowDensity);

  // Fog filter is kept 100% identical to Moderate mode across all presets
  const currentFogColor = fogColor;
  const dynamicFogNear = fogNear;
  const dynamicFogFar = fogFar;

  return (
    <div
      className={`fixed inset-0 pointer-events-auto z-0 overflow-hidden bg-[#090d16] transition-all duration-500 ${
        isAlbumOpen ? 'blur-lg scale-105 brightness-90' : 'blur-none scale-100 brightness-100'
      }`}
    >
      <Canvas
        camera={{ position: [-26, 6, 33.5], fov: 45, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        {/* Deep Winter Sky & Thick Atmospheric Fog */}
        <color attach="background" args={[currentFogColor]} />
        <fog attach="fog" args={[currentFogColor, dynamicFogNear, dynamicFogFar]} />

        {/* Dynamic Dark/Light Filter - Ambient Light */}
        <ambientLight intensity={0.6 * brightness} color="#cbd5e1" />

        {/* Sky-to-Ground Hemispheric Lighting */}
        <hemisphereLight args={['#38bdf8', '#1e1b4b', 0.9 * brightness]} />

        {/* Primary Sun / Moon Directional Light with Brightness Control */}
        <directionalLight
          position={[25, 40, 20]}
          intensity={1.2 * brightness}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />

        {/* Deep Sky-Blue Rim Accent Light */}
        <directionalLight position={[-25, 25, -20]} intensity={0.9 * brightness} color="#0284c7" />

        {/* Soft Aurora Accent Fill Light */}
        <pointLight
          position={[0, 15, 0]}
          intensity={0.5 * brightness}
          color="#34d399"
          distance={45}
        />

        {/* Persistent Loader outside Suspense for smooth 1000ms fade transition */}
        <MinimalLoader />

        <Suspense fallback={null}>
          {/* 3D Falling Crystalline Snowflakes */}
          <SnowParticles
            count={activeSnowCount}
            size={snowSize}
            speed={snowSpeed}
            wind={0.6}
            areaX={90}
            areaZ={90}
            minY={1.2}
            maxY={40}
          />

          {/* Real-Time 3D Ground Snow Accumulation */}
          <SnowAccumulation
            count={groundSnowPiles}
            maxGrowthScale={groundSnowScale}
            growthSpeed={groundGrowthSpeed}
          />

          {/* 3D Pine Forest (Draco Compressed Model: 78MB → 8.8MB) */}
          <Forest
            modelUrl="/assets/models/pine_tree.glb"
            treeScale={1.5}
            customTrees={[
              { position: [-12, -1, 24], scale: 2 }, // Pohon 1 (Area Depan Tengah)
              { position: [-4, 2.3, 10], scale: 1.2 }, // Pohon 2 (Area Kiri Depan)
              { position: [-10, 2.3, 4], scale: 1.1 }, // Pohon 3 (Area Kanan Belakang)
              { position: [-23, 0.1, 23], scale: 1.4 },
              { position: [-2, 7, 3], scale: 0.6 }, // Pohon 4 (Area Dekat Kamera)
              { position: [-19, 0, 32], scale: 1.5 },
              { position: [-26, 0, 26], scale: 1.2 },
            ]}
          />

          {/* 3D Snowy Ground Terrain GLTF Map (Draco Compressed: 214MB → 9.8MB) */}
          <Ground
            modelUrl="/assets/models/snow_terrain.glb"
            scale={1.0}
            position={[0, -1.2, 0]}
            rotation={[0, 0, 0]}
          />
        </Suspense>

        <CameraController />
      </Canvas>
    </div>
  );
}
