import { gsap, registerGSAPPlugins } from './config';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from '@/constants';

registerGSAPPlugins();

export interface StaggerRevealOptions {
  staggerAmount?: number;
  duration?: number;
  delay?: number;
  distance?: number;
  axis?: 'y' | 'x';
  ease?: string;
  scrollTriggerTarget?: string | HTMLElement | null;
  start?: string;
}

/**
 * Animates a list or group of child elements in sequential staggered order.
 *
 * @param targets - Array of HTMLElements or CSS selector for multiple items
 * @param options - Configuration options for stagger timing and movement
 * @returns GSAP Timeline or Tween
 *
 * @example
 * ```ts
 * staggerReveal('.grid-card', { staggerAmount: 0.15, distance: 40 });
 * ```
 */
export function staggerReveal(targets: gsap.TweenTarget, options: StaggerRevealOptions = {}) {
  const {
    staggerAmount = 0.12,
    duration = ANIMATION_DURATIONS.medium,
    delay = 0,
    distance = 40,
    axis = 'y',
    ease = ANIMATION_EASINGS.default,
    scrollTriggerTarget,
    start = 'top 80%',
  } = options;

  const isReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReduced) {
    return gsap.set(targets, { opacity: 1, x: 0, y: 0 });
  }

  const initialVars = axis === 'y' ? { opacity: 0, y: distance } : { opacity: 0, x: distance };
  const animateVars: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    y: 0,
    duration,
    delay,
    ease,
    stagger: staggerAmount,
  };

  if (scrollTriggerTarget) {
    animateVars.scrollTrigger = {
      trigger: scrollTriggerTarget,
      start,
      toggleActions: 'play none none reverse',
    };
  }

  gsap.set(targets, initialVars);
  return gsap.to(targets, animateVars);
}
