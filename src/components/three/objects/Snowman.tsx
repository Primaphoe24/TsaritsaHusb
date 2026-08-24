'use client';

import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export interface SnowmanProps {
  modelUrl?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  rotationY?: number;
  rotationDeg?: number | [number, number, number];
  rotationYDeg?: number;
  scale?: number | [number, number, number];
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

class SnowmanErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
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
      `[Snowman 3D] GLB model '${this.props.modelUrl}' not found or failed to load. Rendering procedural 3D snowman fallback.`,
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

function ProceduralSnowman() {
  return (
    <group>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      <mesh position={[0, 2.2, 0.35]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.07, 0.4, 12]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>

      <mesh position={[-0.12, 2.3, 0.3]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh position={[0.12, 2.3, 0.3]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      <mesh position={[0, 1.65, 0.47]} castShadow>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.45, 0.49]} castShadow>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.25, 0.46]} castShadow>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      <group position={[0, 2.5, 0]}>
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.04, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.55, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.29, 0.29, 0.12, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.6} />
        </mesh>
      </group>

      <mesh position={[-0.7, 1.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 0.7, 6]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      <mesh position={[0.7, 1.5, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 0.7, 6]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
    </group>
  );
}

function GLTFSnowmanModel({ url }: { url: string }) {
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
        mesh.castShadow = true;
        mesh.receiveShadow = true;

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
  }, [scene]);

  return <primitive object={processedScene} />;
}

export function Snowman({
  modelUrl = '/assets/models/snowman.glb',
  position = [-9.5, -1.2, 22],
  rotation,
  rotationY,
  rotationDeg,
  rotationYDeg,
  scale = 1.5,
}: SnowmanProps) {
  const groupRef = useRef<THREE.Group>(null);
  const numericScale = typeof scale === 'number' ? [scale, scale, scale] : scale;

  const finalRotation: [number, number, number] = useMemo(() => {
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

    return [0, Math.PI / 5, 0];
  }, [rotation, rotationY, rotationDeg, rotationYDeg]);

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={finalRotation}
      scale={numericScale as [number, number, number]}
    >
      <SnowmanErrorBoundary modelUrl={modelUrl} fallback={<ProceduralSnowman />}>
        <React.Suspense fallback={<ProceduralSnowman />}>
          <GLTFSnowmanModel url={modelUrl} />
        </React.Suspense>
      </SnowmanErrorBoundary>
    </group>
  );
}
