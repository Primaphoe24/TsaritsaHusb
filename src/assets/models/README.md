# 3D Models Directory (`src/assets/models/` or `public/assets/models/`)

Place `.glb` or `.gltf` 3D model assets here.

## How to use custom 3D models in Tree.tsx:

```tsx
import { useGLTF } from '@react-three/drei';

export function CustomTreeModel(props) {
  const { scene } = useGLTF('/assets/models/pine_tree.glb');
  return <primitive object={scene.clone()} {...props} />;
}

useGLTF.preload('/assets/models/pine_tree.glb');
```
