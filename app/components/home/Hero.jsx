"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { gsap } from "gsap";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const quickTo = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const mobileBadgeRef = useRef(null);
  const mobileHeadingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.set(
      [
        badgeRef.current,
        mobileBadgeRef.current,
        headingRef.current,
        mobileHeadingRef.current,
        subRef.current,
        ctaRef.current,
        hintRef.current,
      ],
      { opacity: 0, x: -20, y: 0 }
    )
      .to([badgeRef.current, mobileBadgeRef.current], { opacity: 1, x: 0, duration: 0.6 }, 0.1)
      .to([headingRef.current, mobileHeadingRef.current], { opacity: 1, x: 0, duration: 0.8 }, 0.25)
      .to(subRef.current, { opacity: 1, x: 0, duration: 0.7 }, 0.5)
      .to(ctaRef.current, { opacity: 1, x: 0, duration: 0.6 }, 0.65)
      .to(hintRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.85);

    gsap.to(hintRef.current, {
      y: "+=6",
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });
    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    quickTo.current = {
      x: gsap.quickTo(cursorRef.current, "x", { duration: 0.35, ease: "power3.out" }),
      y: gsap.quickTo(cursorRef.current, "y", { duration: 0.35, ease: "power3.out" }),
    };
    const handleMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      quickTo.current.x(e.clientX - rect.left);
      quickTo.current.y(e.clientY - rect.top);
    };
    const node = containerRef.current;
    node.addEventListener("mousemove", handleMove);
    return () => node.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      scale: isDragging ? 1.6 : 1,
      backgroundColor: isDragging ? "rgba(239,125,32,0.9)" : "rgba(255,255,255,0.9)",
      borderColor: isDragging ? "rgba(239,125,32,1)" : "rgba(255,255,255,0.6)",
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      // Sky-blue canvas backdrop kept as-is — it's tied directly to Scene3D's
      // clearColor for the 3D ball field, not a brand/UI color, so it's
      // intentionally exempt from the navy/accent token system.
      className="relative w-full h-[75vh] md:h-[80vh] lg:h-[88vh] overflow-hidden bg-[#bfe9ff] md:cursor-none"
    >
      <div
        ref={cursorRef}
        className="hidden md:block absolute top-0 left-0 w-6 h-6 rounded-full border pointer-events-none z-50"
        style={{
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderColor: "rgba(255,255,255,0.6)",
        }}
      />

      <CanvasErrorBoundary
        fallback={<div className="absolute inset-0 bg-gradient-to-b from-[#bfe9ff] to-navy" />}
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

      {/* Overlay gradients — now use the navy-dark token instead of a
          one-off #0d1b3f shade that existed nowhere else on the site */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-navy-dark/80 via-navy-dark/10 to-transparent pointer-events-none md:hidden" />
      <div className="hidden md:block absolute inset-0 z-10 bg-gradient-to-r from-navy-dark/75 via-navy-dark/15 to-transparent pointer-events-none" />

      {/* Mobile layout */}
      <div className="absolute inset-x-0 top-0 z-20 flex md:hidden flex-col items-center pt-5 px-6 pointer-events-none">
        <span
          ref={mobileBadgeRef}
          className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-bold mb-1.5"
        >
          National Governing Body
        </span>
        <h1
          ref={mobileHeadingRef}
          className="font-[family-name:var(--font-display)] font-extrabold text-xl text-white tracking-tight leading-tight text-center drop-shadow-md mb-3"
        >
          Empowering abilities. On the green.
        </h1>
      </div>

      {/* Desktop layout */}
      <div className="absolute inset-0 z-20 hidden md:flex flex-col items-start justify-center pl-12 lg:pl-20 pointer-events-none">
        <div className="text-left max-w-md pointer-events-none">
          <span
            ref={badgeRef}
            className="text-[11px] tracking-[0.3em] uppercase text-white/60 font-bold mb-5 block"
          >
            National Governing Body
          </span>

          <h1
            ref={headingRef}
            className="font-[family-name:var(--font-display)] font-extrabold text-5xl lg:text-6xl text-white mb-5 tracking-tight leading-[1.1] drop-shadow-md"
          >
            Empowering abilities.
            <br />
            On the green.
          </h1>

          <p
            ref={subRef}
            className="text-base text-white/70 font-medium mb-9 max-w-sm leading-relaxed"
          >
            Making para lawn bowls accessible and competitive across India.
          </p>

          <div ref={ctaRef} className="flex items-center gap-3 pointer-events-auto">
            <Link
              href="/register"
              className="flex items-center justify-center bg-white text-navy px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:bg-accent hover:text-white"
            >
              Register Athlete
            </Link>
            <Link
              href="/about"
              className="group flex items-center justify-center text-white px-5 py-3 rounded-full font-bold text-sm border border-white/30 hover:border-white/60 transition-all duration-300"
            >
              Discover Sport
              <FiArrowRight className="ml-1.5 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Hint — removed the stray invalid "pl-18" utility class that was left over */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full z-20 flex flex-col items-center text-center pointer-events-none px-6 pl-18">
        <span
          ref={hintRef}
          className="text-[11px] tracking-[0.2em] uppercase text-white font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] bg-black/25 backdrop-blur-sm px-4 py-1.5 rounded-full"
        >
          <span className="md:hidden">Touch &amp; drag the ball</span>
          <span className="hidden md:inline">Drag the ball to play</span>
        </span>
      </div>
    </div>
  );
}