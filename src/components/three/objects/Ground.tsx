'use client';

import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface GroundProps {
  size?: number;
  modelUrl?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Custom 3D Terrain GLTF Model Loader with Draco decompression support.
 * Uses Google's fast official Draco decoder CDN (or true flag) for instant decoding.
 */
function GLTFGroundModel({
  url,
  scale = 1.0,
  position = [0, -1.2, 0],
  rotation = [0, 0, 0],
}: {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(url, true);

  const normalizedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.receiveShadow = true;
        child.castShadow = false; // Terrain does not need to cast shadows (perf)
      }
    });

    return cloned;
  }, [scene]);

  return (
    <primitive object={normalizedScene} scale={scale} position={position} rotation={rotation} />
  );
}

/**
 * Procedural Snow Mountain Terrain Generator.
 * Creates dramatic snowy mountain ridges, valley basins, and rolling snowdrifts.
 */
function ProceduralGround({
  size = 80,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  size: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, 96, 96);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Radial distance from center so center is flatter for trees & UI
      const distFromCenter = Math.sqrt(x * x + z * z);
      const ridgeFactor = Math.min(1.0, distFromCenter / 20.0);

      // Multi-octave mountain ridge elevation calculation
      const elevation =
        (Math.sin(x * 0.12) * Math.cos(z * 0.12) * 2.2 +
          Math.sin(x * 0.28 + 1.2) * 0.9 +
          Math.cos(z * 0.24 + 0.8) * 1.1) *
        ridgeFactor;

      pos.setY(i, elevation - 1.2);
    }

    geo.computeVertexNormals();
    return geo;
  }, [size]);

  return (
    <mesh geometry={geometry} position={position} rotation={rotation} receiveShadow>
      <meshStandardMaterial
        color="#f8fafc"
        roughness={0.7}
        metalness={0.05}
        emissive="#e0f2fe"
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

/**
 * Snowy Ground Terrain Component.
 * Supports importing Draco-compressed GLTF terrain models or procedural snow-mountain ridges.
 */
export function Ground({
  size = 80,
  modelUrl,
  scale = 1.0,
  position = [0, -1.2, 0],
  rotation = [0, 0, 0],
}: GroundProps) {
  return modelUrl ? (
    <GLTFGroundModel url={modelUrl} scale={scale} position={position} rotation={rotation} />
  ) : (
    <ProceduralGround size={size} position={position} rotation={rotation} />
  );
}
