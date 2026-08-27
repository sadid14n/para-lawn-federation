'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { gsap } from 'gsap';
import CanvasErrorBoundary from './CanvasErrorBoundary';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function Hero() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const quickTo = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.set([badgeRef.current, headingRef.current, subRef.current, ctaRef.current, hintRef.current], {
      opacity: 0,
      y: -20,
    })
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.25)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.5)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.65)
      .to(hintRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.85);

    gsap.to(hintRef.current, {
      y: '+=6',
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5,
    });
    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    quickTo.current = {
      x: gsap.quickTo(cursorRef.current, 'x', { duration: 0.35, ease: 'power3.out' }),
      y: gsap.quickTo(cursorRef.current, 'y', { duration: 0.35, ease: 'power3.out' }),
    };
    const handleMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      quickTo.current.x(e.clientX - rect.left);
      quickTo.current.y(e.clientY - rect.top);
    };
    const node = containerRef.current;
    node.addEventListener('mousemove', handleMove);
    return () => node.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: isDragging ? 1.6 : 1,
      backgroundColor: isDragging ? 'rgba(255,217,61,0.9)' : 'rgba(255,255,255,0.9)',
      borderColor: isDragging ? 'rgba(255,217,61,1)' : 'rgba(255,255,255,0.6)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[75vh] md:h-[80vh] lg:h-[88vh] overflow-hidden bg-[#bfe9ff] md:cursor-none"
    >
      <div
        ref={cursorRef}
        className="hidden md:block absolute top-0 left-0 w-6 h-6 rounded-full border pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.6)' }}
      />

      <CanvasErrorBoundary
        fallback={<div className="absolute inset-0 bg-gradient-to-b from-[#bfe9ff] to-[#3c7a3f]" />}
      >
        <Scene3D onDragChange={setIsDragging} dragging={isDragging} />
      </CanvasErrorBoundary>

      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Flipped: darken TOP for text legibility, leave the play field bright & unobscured */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0d1b3f]/80 via-[#0d1b3f]/10 to-transparent pointer-events-none" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-14 md:pt-16 pointer-events-none">
        <div className="text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
          <span ref={badgeRef} className="text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium mb-5">
            National Governing Body
          </span>

          <h1 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-[1.1] drop-shadow-md">
            Empowering Abilities.<br />On The Green.
          </h1>

          <p ref={subRef} className="hidden sm:block text-sm md:text-base text-white/70 font-normal mb-8 max-w-md leading-relaxed">
            Making para lawn bowls accessible and competitive across India.
          </p>

          <div ref={ctaRef} className="flex items-center gap-3 pointer-events-auto">
            <Link href="/register" className="flex items-center justify-center bg-white text-[#0d1b3f] px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-[#EF7D20] hover:text-white">
              Register Athlete
            </Link>
            <Link href="/about" className="group flex items-center justify-center text-white hover:text-white px-5 py-3 rounded-full font-medium text-sm border border-white/30 hover:border-white/60 transition-all duration-300">
              Discover Sport
              <FiArrowRight className="ml-1.5 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Hint now floats near the bottom, right where the ball actually lives */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <span ref={hintRef} className="text-[10px] tracking-[0.2em] uppercase text-white/80 font-medium mb-1 drop-shadow">
          Drag the ball to play
        </span>
        <FiChevronDown className="text-white/70" size={16} />
      </div>
    </div>
  );
}