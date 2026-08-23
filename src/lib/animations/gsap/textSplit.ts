import { gsap, registerGSAPPlugins } from './config';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from '@/constants';

registerGSAPPlugins();

export interface TextSplitRevealOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  scrollTriggerTarget?: string | HTMLElement | null;
}

/**
 * Splits text into individual inline spans and animates letters or words sequentially.
 *
 * @param element - Target HTMLElement containing text
 * @param options - Text reveal animation settings
 */
export function textSplitReveal(element: HTMLElement | null, options: TextSplitRevealOptions = {}) {
  if (!element) return;

  const isReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  const {
    duration = ANIMATION_DURATIONS.medium,
    stagger = 0.03,
    delay = 0.1,
    ease = ANIMATION_EASINGS.default,
    scrollTriggerTarget,
  } = options;

  // Manual fallback splitting if splitType or plugin isn't active
  const originalText = element.textContent || '';
  element.innerHTML = '';

  const words = originalText.split(' ');
  const spans: HTMLSpanElement[] = [];

  words.forEach((word, wIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';

    word.split('').forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.style.display = 'inline-block';
      charSpan.style.opacity = '0';
      charSpan.style.transform = 'translateY(1.2em) rotateX(-90deg)';
      wordSpan.appendChild(charSpan);
      spans.push(charSpan);
    });

    element.appendChild(wordSpan);

    if (wIdx < words.length - 1) {
      const space = document.createTextNode(' ');
      element.appendChild(space);
    }
  });

  const tweenVars: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration,
    stagger,
    delay,
    ease,
  };

  if (scrollTriggerTarget) {
    tweenVars.scrollTrigger = {
      trigger: scrollTriggerTarget,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    };
  }

  return gsap.to(spans, tweenVars);
}
