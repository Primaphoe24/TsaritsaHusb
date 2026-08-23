import { gsap, registerGSAPPlugins } from './config';

registerGSAPPlugins();

export interface MagneticHoverOptions {
  strength?: number;
  duration?: number;
  ease?: string;
  magneticText?: boolean;
}

/**
 * Attaches a magnetic hover effect to an element, making it smoothly follow the mouse cursor within its boundaries.
 * Automatically cleans up event listeners when returned function is executed.
 *
 * @param element - Target HTMLElement
 * @param options - Configuration for magnetic attraction strength
 * @returns Cleanup function to remove event listeners
 *
 * @example
 * ```ts
 * const cleanup = magneticHover(buttonRef.current, { strength: 0.35 });
 * ```
 */
export function magneticHover(element: HTMLElement | null, options: MagneticHoverOptions = {}) {
  if (!element) return () => {};

  const isReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return () => {};

  const { strength = 0.3, duration = 0.5, ease = 'power2.out', magneticText = true } = options;
  const childText = magneticText ? element.querySelector<HTMLElement>('.magnetic-inner') : null;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const relativeX = e.clientX - rect.left - rect.width / 2;
    const relativeY = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: relativeX * strength,
      y: relativeY * strength,
      duration,
      ease,
      overwrite: 'auto',
    });

    if (childText) {
      gsap.to(childText, {
        x: relativeX * (strength * 0.5),
        y: relativeY * (strength * 0.5),
        duration,
        ease,
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: duration * 1.5,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    });

    if (childText) {
      gsap.to(childText, {
        x: 0,
        y: 0,
        duration: duration * 1.5,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    }
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}
