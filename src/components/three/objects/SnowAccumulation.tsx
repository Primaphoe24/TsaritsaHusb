'use client';

import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export interface SnowAccumulationProps {
  count?: number; // Jumlah titik tumpukan salju di tanah (default: 35)
  maxGrowthScale?: number; // Skala tumpukan maksimal (default: 1.0)
  growthSpeed?: number; // Kecepatan terkumpulnya salju di tanah (default: 0.3)
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Procedural 3D Organic Snow Mound / Snow Drift Geometry Generator.
 * Creates smooth volumetric snow drifts sitting flat on ground terrain.
 */
function createSnowMoundGeometry(): THREE.BufferGeometry {
  const base = new THREE.DodecahedronGeometry(0.8, 2);

  // Flatten bottom slightly so mound sits naturally on terrain
  const pos = base.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y < 0) {
      pos.setY(i, y * 0.35); // Flatten bottom base
    } else {
      pos.setY(i, y * 0.65); // Soft dome top
    }
  }

  const subNode1 = new THREE.DodecahedronGeometry(0.5, 2);
  subNode1.translate(0.5, 0.1, 0.3);

  const subNode2 = new THREE.DodecahedronGeometry(0.45, 2);
  subNode2.translate(-0.4, 0.05, -0.2);

  const merged = BufferGeometryUtils.mergeGeometries([base, subNode1, subNode2]);
  merged.computeVertexNormals();
  return merged;
}

/**
 * Real-Time 3D Ground Snow Accumulation Component.
 * Gradually forms realistic snow mounds & snow drifts on the terrain surface as snowflakes hit the ground.
 */
export function SnowAccumulation({
  count = 35,
  maxGrowthScale = 1.0,
  growthSpeed = 0.3,
}: SnowAccumulationProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const moundGeometry = useMemo(() => createSnowMoundGeometry(), []);

  // Mutable animation state stored in useRef to satisfy React Hooks Immutability rules
  const moundsRef = useRef<{
    pos: Float32Array;
    rotY: Float32Array;
    targetScales: Float32Array;
    currentScales: Float32Array;
  } | null>(null);

  useLayoutEffect(() => {
    const pos = new Float32Array(count * 3);
    const rotY = new Float32Array(count);
    const targetScales = new Float32Array(count);
    const currentScales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 5 + 1);
      const r2 = pseudoRandom(i * 5 + 2);
      const r3 = pseudoRandom(i * 5 + 3);
      const r4 = pseudoRandom(i * 5 + 4);

      const x = (r1 - 0.5) * 55;
      const z = (r2 - 0.5) * 55;
      const y = -1.2 + Math.sin(x * 0.15) * Math.cos(z * 0.15) * 0.4;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      rotY[i] = r4 * Math.PI * 2;
      targetScales[i] = (0.5 + r3 * 0.8) * maxGrowthScale;
      currentScales[i] = 0.01;
    }

    moundsRef.current = { pos, rotY, targetScales, currentScales };
  }, [count, maxGrowthScale]);

  // Frame loop — gradually accumulates/grows snow mounds on ground as snowflakes fall
  useFrame((_, delta) => {
    if (!meshRef.current || !moundsRef.current) return;

    const { pos, rotY, targetScales, currentScales } = moundsRef.current;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      if (currentScales[i] < targetScales[i]) {
        currentScales[i] = Math.min(targetScales[i], currentScales[i] + delta * growthSpeed * 0.15);
      }

      const s = currentScales[i];
      dummy.position.set(pos[idx], pos[idx + 1], pos[idx + 2]);
      dummy.rotation.set(0, rotY[i], 0);
      dummy.scale.set(s, s * 0.5, s);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[moundGeometry, undefined, count]} receiveShadow castShadow>
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.6}
        metalness={0.05}
        emissive="#f0f9ff"
        emissiveIntensity={0.05}
      />
    </instancedMesh>
  );
}
