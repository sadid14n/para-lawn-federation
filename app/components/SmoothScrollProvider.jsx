'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,        // scroll "settle" time — higher = smoother/slower, lower = snappier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease-out curve
      smoothWheel: true,    // smooths mouse wheel / trackpad
      touchMultiplier: 1.5, // feel on touch devices — not disabling touch smoothing entirely
    });

    // Critical: keep GSAP's ScrollTrigger perfectly in sync with Lenis's
    // virtual scroll position every frame. Without this, your pinned
    // sections (SportFeaturesShowcase, StackedFeatures) will visibly
    // desync from the actual scroll position.
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return children;
}