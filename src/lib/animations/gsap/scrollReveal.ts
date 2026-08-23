import { gsap, registerGSAPPlugins } from './config';

registerGSAPPlugins();

export interface ScrollProgressOptions {
  trigger: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  onUpdate?: (progress: number) => void;
}

export interface PinnedSectionOptions {
  trigger: string | HTMLElement;
  pinTarget?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  onUpdate?: (self: import('gsap/ScrollTrigger').ScrollTrigger) => void;
}

/**
 * Creates a ScrollTrigger scrubbing animation bound to vertical scroll progress.
 *
 * @param target - Element to animate as scroll occurs
 * @param fromVars - Starting GSAP property values
 * @param toVars - Ending GSAP property values
 * @param options - ScrollTrigger configuration options
 */
export function scrollProgressReveal(
  target: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  options: ScrollProgressOptions
) {
  const isReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReduced) {
    return gsap.set(target, toVars);
  }

  const { trigger, start = 'top bottom', end = 'bottom top', scrub = 0.5, onUpdate } = options;

  return gsap.fromTo(target, fromVars, {
    ...toVars,
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      onUpdate: onUpdate ? (self) => onUpdate(self.progress) : undefined,
    },
  });
}

/**
 * Pins a section in place while child elements animate based on scroll progress.
 *
 * @param options - Pinned section configuration
 * @returns GSAP Timeline instance
 *
 * @example
 * ```ts
 * const tl = pinnedSection({ trigger: '#hero-pin', end: '+=1000' });
 * tl.to('#panel1', { x: '-100%' });
 * ```
 */
export function pinnedSection(options: PinnedSectionOptions) {
  const { trigger, pinTarget, start = 'top top', end = '+=120%', scrub = 1, onUpdate } = options;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger,
      pin: pinTarget || trigger,
      start,
      end,
      scrub,
      anticipatePin: 1,
      onUpdate,
    },
  });

  return timeline;
}
