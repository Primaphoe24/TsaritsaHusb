import { gsap, registerGSAPPlugins } from './config';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from '@/constants';

registerGSAPPlugins();

/**
 * Options for fade animation functions
 */
export interface FadeAnimationOptions {
  duration?: number;
  delay?: number;
  distance?: number;
  scaleFrom?: number;
  ease?: string;
  scrollTriggerTarget?: string | HTMLElement | null;
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

/**
 * Checks if user prefers reduced motion
 */

function checkReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animates target element with a fade-in and slide-up effect.
 * Only uses opacity and transform (y) for 60fps GPU acceleration.
 *
 * @param target - CSS selector or HTMLElement
 * @param options - Animation configuration options
 * @returns GSAP Tween instance
 *
 * @example
 * ```ts
 * fadeInUp('.card', { delay: 0.2, distance: 40 });
 * ```
 */
export function fadeInUp(target: gsap.TweenTarget, options: FadeAnimationOptions = {}) {
  const {
    duration = ANIMATION_DURATIONS.medium,
    delay = 0,
    distance = 50,
    ease = ANIMATION_EASINGS.default,
    scrollTriggerTarget,
    start = 'top 85%',
  } = options;

  if (checkReducedMotion()) {
    return gsap.set(target, { opacity: 1, y: 0 });
  }

  const vars: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease,
  };

  if (scrollTriggerTarget) {
    vars.scrollTrigger = {
      trigger: scrollTriggerTarget,
      start,
      toggleActions: 'play none none reverse',
    };
  }

  gsap.set(target, { opacity: 0, y: distance });
  return gsap.to(target, vars);
}

/**
 * Animates target element with a fade-in and slide-down effect.
 *
 * @param target - CSS selector or HTMLElement
 * @param options - Animation configuration options
 */
export function fadeInDown(target: gsap.TweenTarget, options: FadeAnimationOptions = {}) {
  const {
    duration = ANIMATION_DURATIONS.medium,
    delay = 0,
    distance = 50,
    ease = ANIMATION_EASINGS.default,
    scrollTriggerTarget,
    start = 'top 85%',
  } = options;

  if (checkReducedMotion()) {
    return gsap.set(target, { opacity: 1, y: 0 });
  }

  const vars: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease,
  };

  if (scrollTriggerTarget) {
    vars.scrollTrigger = {
      trigger: scrollTriggerTarget,
      start,
      toggleActions: 'play none none reverse',
    };
  }

  gsap.set(target, { opacity: 0, y: -distance });
  return gsap.to(target, vars);
}

/**
 * Animates target element with a combined scale and fade effect.
 *
 * @param target - CSS selector or HTMLElement
 * @param options - Animation configuration options
 */
export function fadeInScale(target: gsap.TweenTarget, options: FadeAnimationOptions = {}) {
  const {
    duration = ANIMATION_DURATIONS.medium,
    delay = 0,
    scaleFrom = 0.85,
    ease = ANIMATION_EASINGS.default,
    scrollTriggerTarget,
    start = 'top 85%',
  } = options;

  if (checkReducedMotion()) {
    return gsap.set(target, { opacity: 1, scale: 1 });
  }

  const vars: gsap.TweenVars = {
    opacity: 1,
    scale: 1,
    duration,
    delay,
    ease,
  };

  if (scrollTriggerTarget) {
    vars.scrollTrigger = {
      trigger: scrollTriggerTarget,
      start,
      toggleActions: 'play none none reverse',
    };
  }

  gsap.set(target, { opacity: 0, scale: scaleFrom });
  return gsap.to(target, vars);
}

/**
 * Slides in an element from the left viewport edge with opacity fade.
 *
 * @param target - CSS selector or HTMLElement
 * @param options - Animation configuration options
 */
export function slideInFromLeft(target: gsap.TweenTarget, options: FadeAnimationOptions = {}) {
  const {
    duration = ANIMATION_DURATIONS.medium,
    delay = 0,
    distance = 80,
    ease = ANIMATION_EASINGS.default,
    scrollTriggerTarget,
    start = 'top 85%',
  } = options;

  if (checkReducedMotion()) {
    return gsap.set(target, { opacity: 1, x: 0 });
  }

  const vars: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease,
  };

  if (scrollTriggerTarget) {
    vars.scrollTrigger = {
      trigger: scrollTriggerTarget,
      start,
      toggleActions: 'play none none reverse',
    };
  }

  gsap.set(target, { opacity: 0, x: -distance });
  return gsap.to(target, vars);
}

/**
 * Slides in an element from the right viewport edge with opacity fade.
 *
 * @param target - CSS selector or HTMLElement
 * @param options - Animation configuration options
 */
export function slideInFromRight(target: gsap.TweenTarget, options: FadeAnimationOptions = {}) {
  const {
    duration = ANIMATION_DURATIONS.medium,
    delay = 0,
    distance = 80,
    ease = ANIMATION_EASINGS.default,
    scrollTriggerTarget,
    start = 'top 85%',
  } = options;

  if (checkReducedMotion()) {
    return gsap.set(target, { opacity: 1, x: 0 });
  }

  const vars: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease,
  };

  if (scrollTriggerTarget) {
    vars.scrollTrigger = {
      trigger: scrollTriggerTarget,
      start,
      toggleActions: 'play none none reverse',
    };
  }

  gsap.set(target, { opacity: 0, x: distance });
  return gsap.to(target, vars);
}
