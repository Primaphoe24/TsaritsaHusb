import { Variants } from 'motion/react';

/**
 * Container variant for staggered children animations
 */
export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

/**
 * Fade in up variant
 */
export const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Fade in scale variant
 */
export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

/**
 * Horizontal slide in variant
 */
export const slideInVariant = (direction: 'left' | 'right' = 'left'): Variants => ({
  hidden: { opacity: 0, x: direction === 'left' ? -60 : 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

/**
 * Interactive button hover/tap variant
 */
export const buttonInteractionVariant: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 15 } },
  tap: { scale: 0.95 },
};

/**
 * Card hover floating effect variant
 */
export const cardHoverVariant: Variants = {
  initial: { y: 0, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' },
  hover: {
    y: -8,
    boxShadow: '0 20px 40px rgba(56, 189, 248, 0.15)',
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};
