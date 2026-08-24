'use client';

import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface CastleProps {
  modelUrl?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  rotationY?: number;
  rotationDeg?: number | [number, number, number];
  rotationYDeg?: number;
  scale?: number | [number, number, number];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
  modelUrl?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorUrl?: string;
}

class CastleErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorUrl: props.modelUrl };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  static getDerivedStateFromProps(props: ErrorBoundaryProps, state: ErrorBoundaryState) {
    if (props.modelUrl !== state.errorUrl) {
      return { hasError: false, errorUrl: props.modelUrl };
    }
    return null;
  }

  componentDidCatch(error: Error) {
    console.warn(
      `[Castle 3D] GLB model '${this.props.modelUrl}' not found or failed to load. Rendering procedural 3D grand castle fallback.`,
      error
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function ProceduralCastle() {
  return (
    <group>
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 5, 7]} />
        <meshStandardMaterial color="#475569" roughness={0.75} metalness={0.1} />
      </mesh>

      <mesh position={[0, 5.1, 0]} receiveShadow>
        <boxGeometry args={[7.2, 0.25, 7.2]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.4} />
      </mesh>

      <mesh position={[0, 6.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.2, 3.5, 16]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>

      <mesh position={[0, 9.5, 0]} castShadow receiveShadow>
        <coneGeometry args={[2.3, 3.0, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      <mesh position={[0, 9.8, 0]} castShadow>
        <coneGeometry args={[2.1, 2.5, 16]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
      </mesh>

      <mesh position={[0, 11.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0.45, 11.8, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.02]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.4} />
      </mesh>

      {[
        [-3.6, -3.6],
        [3.6, -3.6],
        [-3.6, 3.6],
        [3.6, 3.6],
      ].map(([x, z], idx) => (
        <group key={idx} position={[x, 0, z]}>
          <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.2, 1.35, 6.4, 14]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>

          <mesh position={[0, 6.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.4, 1.2, 0.4, 14]} />
            <meshStandardMaterial color="#475569" roughness={0.7} />
          </mesh>

          <mesh position={[0, 8.0, 0]} castShadow receiveShadow>
            <coneGeometry args={[1.45, 2.8, 14]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>

          <mesh position={[0, 8.25, 0]} castShadow>
            <coneGeometry args={[1.3, 2.3, 14]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {[-3, -1, 1, 3].map((posOffset, i) => (
        <React.Fragment key={i}>
          <mesh position={[posOffset, 5.4, 3.55]} castShadow>
            <boxGeometry args={[0.6, 0.5, 0.25]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
          <mesh position={[posOffset, 5.4, -3.55]} castShadow>
            <boxGeometry args={[0.6, 0.5, 0.25]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
          <mesh position={[-3.55, 5.4, posOffset]} castShadow>
            <boxGeometry args={[0.25, 0.5, 0.6]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
          <mesh position={[3.55, 5.4, posOffset]} castShadow>
            <boxGeometry args={[0.25, 0.5, 0.6]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
        </React.Fragment>
      ))}

      <mesh position={[0, 1.4, 3.56]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 2.8, 0.1]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>

      <mesh position={[0, 1.6, 3.6]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 3.2, 0.15]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      <pointLight position={[0, 1.5, 3.2]} intensity={1.8} distance={6} color="#fbbf24" />
    </group>
  );
}

function GLTFCastleModel({
  url,
  castShadow = true,
  receiveShadow = true,
}: {
  url: string;
  castShadow?: boolean;
  receiveShadow?: boolean;
}) {
  const { scene } = useGLTF(url);

  const processedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((node) => {
      if ((node as THREE.Light).isLight) {
        node.visible = false;
        (node as THREE.Light).intensity = 0;
      }

      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        mesh.castShadow = castShadow;
        mesh.receiveShadow = receiveShadow;

        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            if ('emissive' in mat) {
              (mat as THREE.MeshStandardMaterial).emissive = new THREE.Color(0, 0, 0);
              (mat as THREE.MeshStandardMaterial).emissiveIntensity = 0;
            }
          });
        }
      }
    });

    return cloned;
  }, [scene, castShadow, receiveShadow]);

  return <primitive object={processedScene} />;
}

export function Castle({
  modelUrl = '/assets/models/castle.glb',
  position = [-12, -0.2, 18],
  rotation,
  rotationY,
  rotationDeg,
  rotationYDeg,
  scale = 1.0,
  autoRotate = false,
  autoRotateSpeed = 0.2,
  castShadow = true,
  receiveShadow = true,
}: CastleProps) {
  const groupRef = useRef<THREE.Group>(null);

  const numericScale = useMemo(() => {
    return typeof scale === 'number' ? [scale, scale, scale] : scale;
  }, [scale]);

  const initialRotation: [number, number, number] = useMemo(() => {
    if (typeof rotationDeg === 'number') {
      const rx = rotation ? rotation[0] : 0;
      const rz = rotation ? rotation[2] : 0;
      return [rx, (rotationDeg * Math.PI) / 180, rz];
    }
    if (rotationYDeg !== undefined) {
      const rx = rotation ? rotation[0] : 0;
      const rz = rotation ? rotation[2] : 0;
      return [rx, (rotationYDeg * Math.PI) / 180, rz];
    }
    if (Array.isArray(rotationDeg)) {
      return [
        (rotationDeg[0] * Math.PI) / 180,
        (rotationDeg[1] * Math.PI) / 180,
        (rotationDeg[2] * Math.PI) / 180,
      ];
    }

    if (rotationY !== undefined) {
      const rx = rotation ? rotation[0] : 0;
      const rz = rotation ? rotation[2] : 0;
      return [rx, rotationY, rz];
    }
    if (rotation !== undefined) {
      return rotation;
    }

    return [0, Math.PI / 4, 0];
  }, [rotation, rotationY, rotationDeg, rotationYDeg]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += autoRotateSpeed * delta;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={initialRotation}
      scale={numericScale as [number, number, number]}
    >
      <CastleErrorBoundary modelUrl={modelUrl} fallback={<ProceduralCastle />}>
        <React.Suspense fallback={<ProceduralCastle />}>
          <GLTFCastleModel url={modelUrl} castShadow={castShadow} receiveShadow={receiveShadow} />
        </React.Suspense>
      </CastleErrorBoundary>
    </group>
  );
}
