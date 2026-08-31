'use client';

import { useRef, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const MiniBall3D = dynamic(() => import('./MiniBall3D'), { ssr: false });

function RadialRings() {
  const radii = [130, 250, 370, 490, 610, 730];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {radii.map((r) => (
        <div
          key={r}
          className="absolute left-1/2 bottom-0 rounded-full border border-white/[0.08]"
          style={{ width: `${r * 2}px`, height: `${r * 2}px`, transform: 'translate(-50%, 40%)' }}
        />
      ))}
    </div>
  );
}

export default function SportFeaturesShowcase() {
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);
  const shapeRef = useRef(null);
  const ballRef = useRef(null);
  const kickerRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.set(shapeRef.current, { width: 160, height: 160, borderRadius: 9999 });
        gsap.set(ballRef.current, { opacity: 0, scale: 0.6, rotate: -20 });
        gsap.set(kickerRef.current, { y: -30, opacity: 0 });
        gsap.set(headingRef.current, { y: 40, opacity: 0 });
        gsap.set(subtextRef.current, { y: 30, opacity: 0 });
        gsap.set(ctaRef.current, { y: 20, opacity: 0, scale: 0.9 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=2800',
            scrub: 1,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        });

        tl.to(shapeRef.current, { width: '100%', height: '82vh', borderRadius: 40, duration: 1.2, ease: 'power2.inOut' }, 0)
          .to(ballRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.4)' }, 1.0)
          .to(kickerRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 1.3)
          .to(headingRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.5)
          .to(subtextRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.8)
          .to(ctaRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 2.05);

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
      });

      mm.add('(max-width: 767px)', () => {
        gsap.set(shapeRef.current, { width: '100%', height: 'auto', borderRadius: 32 });
        gsap.set([ballRef.current, kickerRef.current, headingRef.current, subtextRef.current, ctaRef.current], {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
        });

        gsap.from(wrapperRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: { trigger: wrapperRef.current, start: 'top 80%' },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative bg-[#F3F4F6]">
      <div
        ref={pinRef}
        className="relative w-full min-h-screen md:h-screen flex items-center justify-center px-6 md:px-8 py-24 md:py-0"
      >
        <div
          ref={shapeRef}
          className="relative bg-[#1E2265] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center mx-auto"
        >
          <RadialRings />
          <div className="absolute -top-24 -left-24 w-[26rem] h-[26rem] bg-[#EF7D20] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.14] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-[26rem] h-[26rem] bg-[#228B45] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.16] pointer-events-none" />

          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            {/* 3D ball accent, floats above the kicker label */}
            <div ref={ballRef} className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-2">
              <MiniBall3D />
            </div>

            <span
              ref={kickerRef}
              className="inline-block text-[11px] font-bold text-[#EF7D20] tracking-[0.35em] uppercase mb-6"
            >
              Built For Every Athlete
            </span>

            <h2
              ref={headingRef}
              className="font-[family-name:var(--font-display)] font-extrabold text-white tracking-tight leading-[0.98] mb-7 text-[2.75rem] md:text-6xl lg:text-7xl"
            >
              Accessible, Fair
              <br />
              <span className="text-[#EF7D20]">&amp;</span> Competitive
              <br />
              Sport
            </h2>

            <p
              ref={subtextRef}
              className="font-medium text-base md:text-lg text-blue-100/60 leading-relaxed mb-10 max-w-md mx-auto"
            >
              From ability-based classification to certified coaching pathways,
              every part of the federation is built so athletes can compete on
              their own terms.
            </p>

            {/* Bigger, meaningful CTA — two-line, states the actual value, not just a label */}
            <div ref={ctaRef} className="inline-block">
              <Link
                href="/register"
                className="group flex items-center gap-5 bg-white rounded-full pl-8 pr-3 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(239,125,32,0.35)]"
              >
                <div className="text-left">
                  <p className="text-[#1E2265] font-extrabold text-base md:text-lg leading-tight">
                    Register as an Athlete
                  </p>
                  <p className="text-[#1E2265]/50 text-xs md:text-sm font-medium">
                    Join 500+ athletes competing nationally
                  </p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#EF7D20] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-105">
                  <FiArrowRight className="text-white" size={22} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}