# ❆ Aethelgard — 3D Winter Wonderland & Animation Suite

A professional, high-performance web application combining real-time 3D WebGL graphics with extensive 2D timeline animations (GSAP 3 + Framer Motion). Built with Next.js 16 (App Router), React Three Fiber, TypeScript, Tailwind CSS, and Zustand.

---

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### 2. Installation

```bash
# Install dependencies
npm install
```

### 3. Development Server

```bash
# Start development server at http://localhost:3000
npm run dev
```

### 4. Code Quality & Formatting

```bash
# Run ESLint validation
npm run lint

# Format code with Prettier
npm run format
```

### 5. Production Build Verification

```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 📁 Project Architecture (`src/`)

```
src/
├── app/                          → Next.js App Router (layout, page, globals.css)
├── components/
│   ├── ui/                       → Generic reusable UI elements (Button, Card, Badge)
│   ├── layout/                   → Navbar, Footer, PageWrapper
│   ├── sections/                 → Landing page sections (Hero, About, Features, Gallery)
│   └── three/                    → WebGL 3D Components
│       ├── scenes/               → SnowScene.tsx (main background canvas)
│       ├── objects/              → SnowParticles.tsx, Tree.tsx, Ground.tsx
│       └── effects/              → PostEffects.tsx (Bloom, Vignette, Noise shaders)
├── lib/
│   ├── animations/               → Animation Engine
│   │   ├── gsap/                 → GSAP plugins config, fadeInUp, stagger, scrollReveal, magneticHover, textSplit
│   │   └── motion/               → Framer Motion variants
│   └── utils.ts                  → Utility helpers (cn(), clamp(), formatters)
├── hooks/                        → Custom hooks (useIsMobile, useReducedMotion, useScrollProgress)
├── store/                        → Zustand global state store (useStore.ts)
├── types/                        → Global TypeScript type definitions
├── constants/                    → Design constants, breakpoints, animation presets
└── assets/                       → Static assets (.glb models, textures, fonts)
```

---

## 🛠️ How to Extend & Customize

### Adding a New GSAP Animation Variant

1. Create a new file in `src/lib/animations/gsap/` (e.g., `rotateIn.ts`).
2. Implement your animation function respecting `prefers-reduced-motion` and `@gsap/react` context auto-cleanup.
3. Export your function in `src/lib/animations/gsap/index.ts`.

### Replacing or Adding 3D Models (.glb/.gltf)

1. Export your 3D model as `.glb` or `.gltf` and place it under `public/assets/models/` or `src/assets/models/`.
2. In `src/components/three/objects/Tree.tsx` (or a new component):
   ```tsx
   import { useGLTF } from '@react-three/drei';

   export function CustomModel(props: any) {
     const { scene } = useGLTF('/assets/models/your_model.glb');
     return <primitive object={scene.clone()} {...props} />;
   }

   useGLTF.preload('/assets/models/your_model.glb');
   ```

### Adjusting 3D Snow Physics & Performance

- Modify parameters in `src/constants/index.ts` under `SNOW_CONFIG`.
- Tweak particle density, fall speed, and wind velocity interactively via the UI controls or by calling `useStore.getState().setSnowDensity(2.0)`.

---

## 🛡️ License

MIT License. Built for heavy performance animation applications.
