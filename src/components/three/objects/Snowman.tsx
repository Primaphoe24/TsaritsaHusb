'use client';

import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export interface SnowmanProps {
  modelUrl?: string; // Path to GLB file (default: '/assets/models/snowman.glb')
  position?: [number, number, number]; // Position near Pohon 1 (default: [-10, -1.2, 23])
  rotation?: [number, number, number]; // Rotation angles [x, y, z] in radians
  rotationY?: number; // Y-axis rotation in radians (e.g. Math.PI / 4)
  rotationDeg?: number | [number, number, number]; // Rotation in DEGREES (e.g. 90 or [0, 180, 0])
  rotationYDeg?: number; // Y-axis rotation in DEGREES (e.g. 45 or 180)
  scale?: number | [number, number, number]; // Model scale (default: 1.5)
}

/**
 * React Error Boundary for 3D GLTF Model Loading.
 * Gracefully catches 404 missing files or loading errors and renders procedural 3D snowman fallback.
 */
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

/**
 * Fallback Procedural 3D Snowman Mesh.
 * Renders if custom snowman.glb is not yet placed in public assets directory.
 */
function ProceduralSnowman() {
  return (
    <group>
      {/* Lower Body Sphere */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Middle Body Sphere */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Head Sphere */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Carrot Nose */}
      <mesh position={[0, 2.2, 0.35]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.07, 0.4, 12]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>

      {/* Coal Eyes */}
      <mesh position={[-0.12, 2.3, 0.3]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh position={[0.12, 2.3, 0.3]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Coal Buttons */}
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

      {/* Top Hat */}
      <group position={[0, 2.5, 0]}>
        {/* Hat Brim */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.04, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* Hat Crown */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.55, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* Hat Ribbon */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.29, 0.29, 0.12, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.6} />
        </mesh>
      </group>

      {/* Wooden Twig Arms */}
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

/**
 * GLTF Snowman Loader Component.
 * Neutralizes any internal lights from GLTF file to ensure pure physical mesh interactions.
 */
function GLTFSnowmanModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  const processedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((node) => {
      // 1. Disable internal light sources so snowman doesn't affect environment lighting
      if ((node as THREE.Light).isLight) {
        node.visible = false;
        (node as THREE.Light).intensity = 0;
      }

      // 2. Configure mesh properties for pure physical shadow interaction
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Neutralize material light emission (emissive = 0)
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

/**
 * Snowman Component placed near Pohon 1 (Area Depan Tengah).
 * Features rotation controls, light neutralization, and ErrorBoundary fallback for custom GLB models.
 */
export function Snowman({
  modelUrl = '/assets/models/snowman.glb',
  position = [-9.5, -1.2, 22], // Positioned near Pohon 1 [-12, -1, 24]
  rotation,
  rotationY,
  rotationDeg,
  rotationYDeg,
  scale = 1.5,
}: SnowmanProps) {
  const groupRef = useRef<THREE.Group>(null);
  const numericScale = typeof scale === 'number' ? [scale, scale, scale] : scale;

  // Converts degrees (0 - 360) or radians to Three.js Euler rotation tuple
  const finalRotation: [number, number, number] = useMemo(() => {
    // 1. Single degree rotation value on Y-axis (e.g. rotationDeg={180} or rotationYDeg={90})
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

    // 2. Tuple degree rotation values [X_deg, Y_deg, Z_deg] (e.g. rotationDeg={[0, 90, 0]})
    if (Array.isArray(rotationDeg)) {
      return [
        (rotationDeg[0] * Math.PI) / 180,
        (rotationDeg[1] * Math.PI) / 180,
        (rotationDeg[2] * Math.PI) / 180,
      ];
    }

    // 3. Fallback to radians
    if (rotationY !== undefined) {
      const rx = rotation ? rotation[0] : 0;
      const rz = rotation ? rotation[2] : 0;
      return [rx, rotationY, rz];
    }

    if (rotation !== undefined) {
      return rotation;
    }

    // Default angle towards camera (approx 36 degrees)
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
