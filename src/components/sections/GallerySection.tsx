'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  staggerContainerVariant,
  fadeInUpVariant,
  cardHoverVariant,
} from '@/lib/animations/motion/variants';

const SHOWCASE_ITEMS = [
  {
    id: '01',
    title: 'Parametric Particle Systems',
    description:
      'Dynamic math-driven snowflake dispersion with sinusoidal sway and turbulent gust offset matrices.',
    tag: 'WebGL Physics',
    color: 'from-sky-500/20 to-blue-600/10',
  },
  {
    id: '02',
    title: 'Procedural Pine Geometry',
    description:
      'Layered cone topologies with snow caps, seed-randomized heights, and organic wind sway shaders.',
    tag: 'Procedural 3D',
    color: 'from-emerald-500/20 to-teal-600/10',
  },
  {
    id: '03',
    title: 'Post-Processing Glow',
    description:
      'Real-time high-luminance Bloom filter, film vignette, and depth fog for atmospheric dusk aesthetic.',
    tag: 'PostFX Shader',
    color: 'from-indigo-500/20 to-purple-600/10',
  },
  {
    id: '04',
    title: 'GSAP Scroll & Text Split',
    description:
      'Split-character headline animations and pinned horizontal scroll tracks bound to viewport progress.',
    tag: '2D Timeline',
    color: 'from-amber-500/20 to-orange-600/10',
  },
];

/**
 * Gallery Showcase Section featuring Framer Motion motion primitives.
 */
export function GallerySection() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <Badge variant="indigo" className="mb-4">
          Framer Motion Primitives
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Declarative Motion Showcase
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
          Combining Framer Motion components with React Three Fiber for rich UI micro-interactions.
        </p>
      </div>

      <motion.div
        variants={staggerContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {SHOWCASE_ITEMS.map((item) => (
          <motion.div key={item.id} variants={fadeInUpVariant} whileHover="hover" initial="initial">
            <motion.div variants={cardHoverVariant}>
              <Card
                className={`h-full bg-gradient-to-b ${item.color} border-white/15 p-6 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-sky-400/80 font-mono">{item.id}</span>
                    <Badge variant="frost">{item.tag}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-sky-300">
                  <span>View Details</span>
                  <span>→</span>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
