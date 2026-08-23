import { gsap, registerGSAPPlugins } from './config';

registerGSAPPlugins();

export interface PageTransitionOptions {
  overlayElement: HTMLElement | string;
  onComplete?: () => void;
}

/**
 * Executes a smooth page transition swipe animation using an overlay element.
 *
 * @param options - Transition options including overlay target and callback
 * @returns GSAP Timeline instance
 */
export function pageTransition(options: PageTransitionOptions) {
  const { overlayElement, onComplete } = options;

  const isReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReduced) {
    if (onComplete) onComplete();
    return gsap.timeline();
  }

  const tl = gsap.timeline({
    onComplete,
  });

  tl.set(overlayElement, { scaleY: 0, transformOrigin: 'bottom center' })
    .to(overlayElement, { scaleY: 1, duration: 0.5, ease: 'power4.inOut' })
    .set(overlayElement, { transformOrigin: 'top center' })
    .to(overlayElement, { scaleY: 0, duration: 0.5, ease: 'power4.inOut', delay: 0.1 });

  return tl;
}
