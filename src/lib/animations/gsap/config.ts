import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

/**
 * Ensures GSAP plugins are registered safely on the client side.
 */
let isRegistered = false;

export function registerGSAPPlugins() {
  if (typeof window === 'undefined' || isRegistered) return;

  gsap.registerPlugin(ScrollTrigger, Flip, TextPlugin, MotionPathPlugin);
  isRegistered = true;
}

// Auto-register on import if in client environment
if (typeof window !== 'undefined') {
  registerGSAPPlugins();
}

export { gsap, ScrollTrigger, Flip, TextPlugin, MotionPathPlugin };
