'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

interface TreeProps {
  position?: [number, number, number];
  scale?: [number, number, number] | number;
  rotationY?: number;
  seed?: number;
  modelUrl?: string;
  baseScale?: number;
  disableAnimation?: boolean;
}

function getSeedRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function HDProceduralTree({ seed = 42 }: { seed: number }) {
  const structure = useMemo(() => {
    const tiers = 7;
    const tierData = [];

    const trunkHeight = 5.5 + getSeedRandom(seed) * 1.2;
    const baseRadius = 0.35 + getSeedRandom(seed + 1) * 0.1;

    for (let t = 0; t < tiers; t++) {
      const progress = t / (tiers - 1);
      const heightY = 1.0 + progress * (trunkHeight - 1.2);
      const tierRadius = (1.0 - progress * 0.75) * (2.2 + getSeedRandom(seed + t * 3) * 0.6);
      const branchCount = Math.floor(6 - progress * 3);

      const branches = [];
      for (let b = 0; b < branchCount; b++) {
        const angle =
          (b / branchCount) * Math.PI * 2 + (getSeedRandom(seed + t * 10 + b) - 0.5) * 0.4;
        const droop = 0.2 + (1 - progress) * 0.25 + getSeedRandom(seed + b * 7) * 0.1;
        const length = tierRadius * (0.85 + getSeedRandom(seed + t + b) * 0.3);

        const branchlets = [];
        const subCount = 3;
        for (let s = 0; s < subCount; s++) {
          const subProgress = (s + 1) / (subCount + 1);
          branchlets.push({
            dist: length * subProgress,
            side: s % 2 === 0 ? 1 : -1,
            spreadAngle: 0.4 + getSeedRandom(seed + s * 13) * 0.2,
            scale: (1 - subProgress * 0.4) * 0.6,
          });
        }

        branches.push({ angle, droop, length, branchlets });
      }

      tierData.push({ heightY, tierRadius, branches });
    }

    return { trunkHeight, baseRadius, tierData };
  }, [seed]);

  const trunkGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(
      0.12,
      structure.baseRadius,
      structure.trunkHeight,
      10,
      12
    );
    geo.translate(0, structure.trunkHeight / 2, 0);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const normY = y / structure.trunkHeight;
      const bendX = Math.sin(normY * Math.PI * 1.5) * 0.15 * getSeedRandom(seed + 99);
      const bendZ = Math.cos(normY * Math.PI * 1.2) * 0.12 * getSeedRandom(seed + 100);
      pos.setX(i, pos.getX(i) + bendX);
      pos.setZ(i, pos.getZ(i) + bendZ);
    }
    geo.computeVertexNormals();
    return geo;
  }, [seed, structure]);

  return (
    <group>
      <mesh geometry={trunkGeometry} castShadow receiveShadow>
        <meshStandardMaterial color="#2a1810" roughness={0.95} metalness={0.05} />
      </mesh>

      {structure.tierData.map((tier, tIdx) => (
        <group key={tIdx} position={[0, tier.heightY, 0]}>
          {tier.branches.map((branch, bIdx) => (
            <group key={bIdx} rotation={[0, branch.angle, -branch.droop]}>
              <mesh
                position={[branch.length * 0.5, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                castShadow
              >
                <cylinderGeometry args={[0.03, 0.08, branch.length, 6]} />
                <meshStandardMaterial color="#362217" roughness={0.9} />
              </mesh>

              <mesh
                position={[branch.length * 0.55, 0, 0]}
                scale={[branch.length * 0.5, 0.35, 0.55]}
                castShadow
                receiveShadow
              >
                <coneGeometry args={[0.9, 1.8, 6]} />
                <meshStandardMaterial
                  color={tIdx % 2 === 0 ? '#143625' : '#1e4d35'}
                  roughness={0.65}
                  flatShading
                />
              </mesh>

              <mesh
                position={[branch.length * 0.55, 0.18, 0]}
                scale={[branch.length * 0.48, 0.22, 0.48]}
                castShadow
              >
                <dodecahedronGeometry args={[0.8]} />
                <meshStandardMaterial
                  color="#ffffff"
                  roughness={0.35}
                  metalness={0.08}
                  emissive="#e0f2fe"
                  emissiveIntensity={0.08}
                />
              </mesh>

              {branch.branchlets.map((bl, subIdx) => (
                <group
                  key={subIdx}
                  position={[bl.dist, 0, 0]}
                  rotation={[bl.spreadAngle * bl.side, 0, 0]}
                >
                  <mesh
                    position={[0.3, 0, 0]}
                    scale={[0.6 * bl.scale, 0.25 * bl.scale, 0.45 * bl.scale]}
                    castShadow
                    receiveShadow
                  >
                    <coneGeometry args={[0.8, 1.4, 5]} />
                    <meshStandardMaterial color="#1a422d" roughness={0.7} flatShading />
                  </mesh>

                  <mesh
                    position={[0.3, 0.12, 0]}
                    scale={[0.55 * bl.scale, 0.15 * bl.scale, 0.4 * bl.scale]}
                    castShadow
                  >
                    <dodecahedronGeometry args={[0.7]} />
                    <meshStandardMaterial
                      color="#ffffff"
                      roughness={0.4}
                      emissive="#bae6fd"
                      emissiveIntensity={0.05}
                    />
                  </mesh>
                </group>
              ))}
            </group>
          ))}
        </group>
      ))}

      <mesh position={[0, structure.trunkHeight + 0.2, 0]} castShadow>
        <coneGeometry args={[0.35, 0.9, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.3}
          emissive="#e0f2fe"
          emissiveIntensity={0.12}
        />
      </mesh>
    </group>
  );
}

function GLTFTreeModel({
  url,
  scale,
  baseScaleMultiplier = 1.0,
}: {
  url: string;
  scale: [number, number, number];
  baseScaleMultiplier?: number;
}) {
  const { scene } = useGLTF(url, true);

  const { normalizedScene, normalizedScale } = useMemo(() => {
    const cloned = scene.clone(true);

    const bbox = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizeFactor = maxDim > 0 ? (5.0 / maxDim) * baseScaleMultiplier : baseScaleMultiplier;

    cloned.position.y = -bbox.min.y;

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const finalScale: [number, number, number] = [
      scale[0] * normalizeFactor,
      scale[1] * normalizeFactor,
      scale[2] * normalizeFactor,
    ];

    return { normalizedScene: cloned, normalizedScale: finalScale };
  }, [scene, baseScaleMultiplier, scale]);

  return <primitive object={normalizedScene} scale={normalizedScale} />;
}

export function Tree({
  position = [0, 0, 0],
  scale = 1,
  rotationY = 0,
  seed = 42,
  modelUrl,
  baseScale = 1.0,
  disableAnimation = false,
}: TreeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const globalWindSpeed = useStore((state) => state.windSpeed);
  const numericScale = typeof scale === 'number' ? [scale, scale, scale] : scale;
  const swayOffset = useMemo(() => getSeedRandom(seed) * Math.PI * 2, [seed]);

  useFrame((state) => {
    if (disableAnimation || !groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const speedFactor = 0.7 + globalWindSpeed * 0.25;
    const swayAmount = 0.008 + globalWindSpeed * 0.012;
    const swayZ = Math.sin(time * speedFactor + swayOffset) * swayAmount;
    const swayX = Math.cos(time * 0.8 * speedFactor + swayOffset) * (swayAmount * 0.3);

    groupRef.current.rotation.z = swayZ;
    groupRef.current.rotation.x = swayX;
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      {modelUrl ? (
        <GLTFTreeModel
          url={modelUrl}
          scale={numericScale as [number, number, number]}
          baseScaleMultiplier={baseScale}
        />
      ) : (
        <group scale={numericScale as [number, number, number]}>
          <HDProceduralTree seed={seed} />
        </group>
      )}
    </group>
  );
}

export interface TreePlacement {
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
  disableAnimation?: boolean;
}

interface ForestProps {
  modelUrl?: string;
  treeScale?: number;
  count?: number;
  radiusRange?: [number, number];
  customTrees?: TreePlacement[];
}

export function Forest({
  modelUrl,
  treeScale = 1.0,
  count = 12,
  radiusRange = [3, 11],
  customTrees,
}: ForestProps) {
  const trees = useMemo(() => {
    if (customTrees && customTrees.length > 0) {
      return customTrees.map((t, i) => ({
        id: `custom-tree-${i}`,
        position: t.position,
        scale: t.scale ?? 1.0,
        rot: t.rotationY ?? getSeedRandom(i * 19) * Math.PI * 2,
        seed: i * 83 + 17,
        disableAnimation: t.disableAnimation ?? false,
      }));
    }

    const arr = [];
    const [minR, maxR] = radiusRange;

    for (let i = 0; i < count; i++) {
      const r1 = getSeedRandom(i * 5 + 10);
      const r2 = getSeedRandom(i * 5 + 11);
      const r3 = getSeedRandom(i * 5 + 12);
      const r4 = getSeedRandom(i * 5 + 13);

      const angle = (i / count) * Math.PI * 2 + (r1 - 0.5) * 0.4;
      const radius = minR + r2 * (maxR - minR);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 2;
      const scale = 0.55 + r3 * 0.5;
      const rot = r4 * Math.PI * 2;

      arr.push({
        id: `tree-${i}`,
        position: [x, -0.8, z] as [number, number, number],
        scale,
        rot,
        seed: i * 83 + 17,
        disableAnimation: false,
      });
    }
    return arr;
  }, [count, radiusRange, customTrees]);

  return (
    <group>
      {trees.map((t) => (
        <Tree
          key={t.id}
          position={t.position}
          scale={t.scale}
          rotationY={t.rot}
          seed={t.seed}
          modelUrl={modelUrl}
          baseScale={treeScale}
          disableAnimation={t.disableAnimation}
        />
      ))}
    </group>
  );
}
