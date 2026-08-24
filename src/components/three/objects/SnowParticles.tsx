'use client';

import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { useStore } from '@/store/useStore';

export interface SnowParticlesProps {
  count?: number;
  size?: number;
  speed?: number;
  wind?: number;
  areaX?: number;
  areaZ?: number;
  minY?: number;
  maxY?: number;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function create3DSnowflakeGeometry(): THREE.BufferGeometry {
  const geometries: THREE.BufferGeometry[] = [];

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;

    const armGeo = new THREE.BoxGeometry(0.035, 0.42, 0.02);
    armGeo.translate(0, 0.21, 0);

    const spike1Left = new THREE.BoxGeometry(0.018, 0.16, 0.015);
    spike1Left.rotateZ(Math.PI / 4);
    spike1Left.translate(-0.055, 0.24, 0);

    const spike1Right = new THREE.BoxGeometry(0.018, 0.16, 0.015);
    spike1Right.rotateZ(-Math.PI / 4);
    spike1Right.translate(0.055, 0.24, 0);

    const spike2Left = new THREE.BoxGeometry(0.015, 0.12, 0.012);
    spike2Left.rotateZ(Math.PI / 4);
    spike2Left.translate(-0.04, 0.13, 0);

    const spike2Right = new THREE.BoxGeometry(0.015, 0.12, 0.012);
    spike2Right.rotateZ(-Math.PI / 4);
    spike2Right.translate(0.04, 0.13, 0);

    const singleArm = BufferGeometryUtils.mergeGeometries([
      armGeo,
      spike1Left,
      spike1Right,
      spike2Left,
      spike2Right,
    ]);

    armGeo.dispose();
    spike1Left.dispose();
    spike1Right.dispose();
    spike2Left.dispose();
    spike2Right.dispose();

    if (singleArm) {
      singleArm.rotateZ(angle);
      geometries.push(singleArm);
    }
  }

  const centerCore = new THREE.CylinderGeometry(0.055, 0.055, 0.025, 6);
  centerCore.rotateX(Math.PI / 2);
  geometries.push(centerCore);

  const merged = BufferGeometryUtils.mergeGeometries(geometries);

  geometries.forEach((g) => g.dispose());

  if (merged) {
    merged.computeVertexNormals();
    return merged;
  }

  return new THREE.BoxGeometry(0.2, 0.2, 0.2);
}

export function SnowParticles({
  count,
  size = 3.0,
  speed = 1.0,
  wind = 0.6,
  areaX = 90,
  areaZ = 90,
  minY = 1.2,
  maxY = 40.0,
}: SnowParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const isMobile = useStore((state) => state.isMobile);
  const globalSnowDensity = useStore((state) => state.snowDensity);
  const globalWindSpeed = useStore((state) => state.windSpeed);

  const particleCount = useMemo(() => {
    if (count) return count;
    const base = isMobile ? 300 : 750;
    return Math.floor(base * globalSnowDensity);
  }, [count, isMobile, globalSnowDensity]);

  const snowflakeGeometry = useMemo(() => create3DSnowflakeGeometry(), []);

  const particlesRef = useRef<{
    pos: Float32Array;
    vel: Float32Array;
    rot: Float32Array;
    rotVel: Float32Array;
    scales: Float32Array;
    swayPhase: Float32Array;
  } | null>(null);

  useLayoutEffect(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const rot = new Float32Array(particleCount * 3);
    const rotVel = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const swayPhase = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r1 = pseudoRandom(i * 6 + 1);
      const r2 = pseudoRandom(i * 6 + 2);
      const r3 = pseudoRandom(i * 6 + 3);
      const r4 = pseudoRandom(i * 6 + 4);
      const r5 = pseudoRandom(i * 6 + 5);
      const r6 = pseudoRandom(i * 6 + 6);

      pos[i * 3] = (r1 - 0.5) * areaX;
      pos[i * 3 + 1] = minY + r2 * (maxY - minY);
      pos[i * 3 + 2] = (r3 - 0.5) * areaZ;

      vel[i * 3] = (r4 - 0.5) * 0.2;
      vel[i * 3 + 1] = -(1.2 + r1 * 1.8) * speed;
      vel[i * 3 + 2] = (r2 - 0.5) * 0.2;

      rot[i * 3] = r3 * Math.PI * 2;
      rot[i * 3 + 1] = r4 * Math.PI * 2;
      rot[i * 3 + 2] = r5 * Math.PI * 2;

      rotVel[i * 3] = (r1 - 0.5) * 1.8;
      rotVel[i * 3 + 1] = (r2 - 0.5) * 2.2;
      rotVel[i * 3 + 2] = (r6 - 0.5) * 1.5;

      scales[i] = (0.035 + r5 * 0.045) * size;
      swayPhase[i] = r4 * Math.PI * 2;
    }

    particlesRef.current = { pos, vel, rot, rotVel, scales, swayPhase };
  }, [particleCount, speed, size, areaX, areaZ, minY, maxY]);

  const halfAreaX = areaX / 2;
  const halfAreaZ = areaZ / 2;
  const fadeDist = 2.5;

  useFrame((state, delta) => {
    if (!meshRef.current || !particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const windGust = Math.sin(time * 0.6) * 0.4 + 0.5;
    const effectiveWind = (globalWindSpeed + windGust * 0.5) * wind;
    const windDrift = effectiveWind * 1.2;

    const { pos, vel, rot, rotVel, scales, swayPhase } = particlesRef.current;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      pos[idx + 1] += vel[idx + 1] * delta;

      const phase = swayPhase[i] + time;
      const swayX = Math.sin(phase * 1.4) * 0.06;
      const swayZ = Math.cos(phase * 1.1) * 0.06;

      pos[idx] += (windDrift + swayX) * delta;
      pos[idx + 2] += (swayZ + vel[idx + 2]) * delta;

      rot[idx] += rotVel[idx] * delta;
      rot[idx + 1] += rotVel[idx + 1] * delta;
      rot[idx + 2] += rotVel[idx + 2] * delta;

      const currentY = pos[idx + 1];
      let currentScale = scales[i];

      if (currentY < minY + fadeDist) {
        const landingFactor = Math.max(0, (currentY - minY) / fadeDist);
        currentScale = scales[i] * landingFactor;
      }

      if (currentY <= minY) {
        pos[idx + 1] = maxY;
        pos[idx] = (pseudoRandom(i + time) - 0.5) * areaX;
        pos[idx + 2] = (pseudoRandom(i * 2 + time) - 0.5) * areaZ;
      }

      if (pos[idx] > halfAreaX) pos[idx] = -halfAreaX;
      else if (pos[idx] < -halfAreaX) pos[idx] = halfAreaX;

      if (pos[idx + 2] > halfAreaZ) pos[idx + 2] = -halfAreaZ;
      else if (pos[idx + 2] < -halfAreaZ) pos[idx + 2] = halfAreaZ;

      dummy.position.set(pos[idx], pos[idx + 1], pos[idx + 2]);
      dummy.rotation.set(rot[idx], rot[idx + 1], rot[idx + 2]);
      dummy.scale.setScalar(currentScale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[snowflakeGeometry, undefined, particleCount]}>
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.2}
        metalness={0.4}
        emissive="#e0f2fe"
        emissiveIntensity={0.15}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}
