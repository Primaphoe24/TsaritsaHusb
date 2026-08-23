import { gsap, registerGSAPPlugins } from './config';

registerGSAPPlugins();

export interface LoopingIdleOptions {
  distanceY?: number;
  rotationZ?: number;
  duration?: number;
  delay?: number;
  ease?: string;
}

/**
 * Creates a continuous smooth floating/looping idle animation for decorative UI elements.
 * Uses sinusoidal easing to maintain a gentle ambient motion.
 *
 * @param target - Target element(s)
 * @param options - Motion amplitude and timing settings
 * @returns GSAP Tween instance
 *
 * @example
 * ```ts
 * loopingIdle('.badge-icon', { distanceY: 8, duration: 3 });
 * ```
 */
export function loopingIdle(target: gsap.TweenTarget, options: LoopingIdleOptions = {}) {
  const isReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  const {
    distanceY = 12,
    rotationZ = 3,
    duration = 2.8,
    delay = 0,
    ease = 'sine.easeInOut',
  } = options;

  return gsap.to(target, {
    y: `-=${distanceY}`,
    rotation: `+=${rotationZ}`,
    duration,
    delay,
    ease,
    repeat: -1,
    yoyo: true,
  });
}
