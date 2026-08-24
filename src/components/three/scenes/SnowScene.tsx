'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';
import { SnowParticles } from '../objects/SnowParticles';
import { SnowAccumulation } from '../objects/SnowAccumulation';
import { Forest } from '../objects/Tree';
import { Ground } from '../objects/Ground';
import { Snowman } from '../objects/Snowman';
import { Castle } from '../objects/Castle';
import { useStore } from '@/store/useStore';

export interface SnowSceneProps {
  brightness?: number;
  fogNear?: number;
  fogFar?: number;
  fogColor?: string;
  snowCount?: number;
  snowSize?: number;
  snowSpeed?: number;
  groundSnowPiles?: number;
  groundSnowScale?: number;
  groundGrowthSpeed?: number;
}

function CameraController() {
  return <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />;
}

function MinimalLoader() {
  const { progress } = useProgress();
  const currentProgress = Math.min(100, Math.round(progress));
  const [faded, setFaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (currentProgress >= 100) {
      const timer1 = setTimeout(() => setFaded(true), 300);
      const timer2 = setTimeout(() => setHidden(true), 1400);
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
        <Loader2 className="w-9 h-9 text-sky-400 animate-spin" />
        <p className="text-sm font-medium tracking-widest text-slate-300 font-mono">
          {currentProgress}%
        </p>
      </div>
    </Html>
  );
}

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
  const activePreset = useStore((state) => state.activePreset);
  const isAlbumOpen = useStore((state) => state.isAlbumOpen);
  const isBlizzard = useStore((state) => state.isBlizzardMode);

  const activeSnowCount = snowCount ?? Math.round(1000 * snowDensity);

  const effectiveSnowSpeed = isBlizzard
    ? snowSpeed * 3.5
    : activePreset === 'moderate'
      ? snowSpeed * 1.6
      : snowSpeed;

  const isGentle = activePreset === 'gentle';

  const currentFogColor = isBlizzard ? '#060913' : isGentle ? '#989fa7' : fogColor;

  const dynamicFogNear = isBlizzard ? 0.5 : isGentle ? 10.0 : fogNear;
  const dynamicFogFar = isBlizzard ? 20.0 : isGentle ? 70.0 : fogFar;
  const stormBrightnessMultiplier = isBlizzard ? 0.65 : isGentle ? 1.1 : 1.0;
  const effectiveBrightness = brightness * stormBrightnessMultiplier;

  return (
    <div
      className={`fixed inset-0 pointer-events-auto z-0 overflow-hidden transition-all duration-700 ${
        isAlbumOpen ? 'blur-lg scale-105 brightness-90' : 'blur-none scale-100 brightness-100'
      }`}
      style={{ backgroundColor: currentFogColor }}
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
        <color attach="background" args={[currentFogColor]} />
        <fog attach="fog" args={[currentFogColor, dynamicFogNear, dynamicFogFar]} />

        <ambientLight
          intensity={isGentle ? 0.85 : 0.6 * effectiveBrightness}
          color={isGentle ? '#e5e7eb' : '#cbd5e1'}
        />

        <hemisphereLight
          args={[
            isGentle ? '#a8afb7' : '#38bdf8',
            isGentle ? '#64748b' : '#1e1b4b',
            isGentle ? 0.85 : 0.9 * effectiveBrightness,
          ]}
        />

        <directionalLight
          position={[25, 40, 20]}
          intensity={isGentle ? 1.0 : 1.3 * effectiveBrightness}
          color={isGentle ? '#f8fafc' : '#ffffff'}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />

        <directionalLight
          position={[-25, 25, -20]}
          intensity={isGentle ? 0.4 : 0.9 * effectiveBrightness}
          color={isGentle ? '#94a3b8' : '#0284c7'}
        />

        <pointLight
          position={[0, 15, 0]}
          intensity={isGentle ? 0.3 : 0.5 * effectiveBrightness}
          color={isGentle ? '#e2e8f0' : '#34d399'}
          distance={45}
        />

        <MinimalLoader />

        <Suspense fallback={null}>
          <SnowParticles
            count={activeSnowCount}
            size={snowSize}
            speed={effectiveSnowSpeed}
            wind={0.6}
            areaX={90}
            areaZ={90}
            minY={1.2}
            maxY={40}
          />

          <Snowman
            modelUrl="/assets/models/snowman.glb"
            position={[-15, -0.35, 27.5]}
            rotationDeg={300}
            scale={0.75}
          />

          <Snowman
            modelUrl="/assets/models/snowman2.glb"
            position={[-19, 2, 19]}
            rotationDeg={10}
            scale={0.75}
          />

          <Castle
            modelUrl="/assets/models/castle.glb"
            position={[-25, 8, 10]}
            rotationDeg={320}
            scale={0.3}
          />

          <SnowAccumulation
            count={groundSnowPiles}
            maxGrowthScale={groundSnowScale}
            growthSpeed={groundGrowthSpeed}
          />

          <Forest
            modelUrl="/assets/models/pine_tree.glb"
            treeScale={1.5}
            customTrees={[
              { position: [-12, -1.6, 25.4], scale: 2.3 },
              { position: [1, 2.5, 12], scale: 1, disableAnimation: true },
              { position: [-4, 2, 10], scale: 1.4 },
              { position: [-10, 1.75, 4], scale: 1.1 },
              { position: [-23, 0.1, 23], scale: 1.5 },
              { position: [-2, 7, 3], scale: 0.6, disableAnimation: true },
              { position: [-4, 7.9, 1], scale: 0.4, disableAnimation: true },
              { position: [-19, 0, 32], scale: 1.5 },
              { position: [-26, 0, 26], scale: 1.2 },
            ]}
          />

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
