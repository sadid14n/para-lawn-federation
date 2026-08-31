"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiGlobe, FiCalendar, FiUserCheck } from "react-icons/fi";
import { FaSquareFull } from "react-icons/fa6";

const AnimatedCounter = ({ target, suffix = "+", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export default function StatsSection() {
  // Padding now scales up from mobile instead of being fixed at p-8 everywhere
  const cardHoverStyles =
    "flex-1 flex flex-col items-center justify-center p-3 sm:p-5 md:p-8 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 group cursor-default text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]";

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 w-full h-[60%] bg-off-white z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-navy-dark z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto bg-navy rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden flex flex-col lg:flex-row">
        {/* ================= LEFT COLUMN: TEXT & LIST ================= */}
        <div className="w-full lg:w-[45%] p-10 lg:p-16 flex flex-col justify-center">
          <p className="text-xs font-bold text-accent tracking-[0.25em] uppercase mb-3">
            National Authority
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-4xl md:text-5xl text-white mb-8 leading-tight tracking-tight">
            Recognized by
          </h2>

          <ul className="space-y-4 text-gray-200 text-sm md:text-base leading-relaxed mb-8 font-medium">
            <li className="flex items-start">
              <FaSquareFull
                className="text-accent mt-1.5 mr-4 flex-shrink-0"
                size={8}
              />
              <span>International Bowls for the Disabled (IBD)</span>
            </li>
            <li className="flex items-start">
              <FaSquareFull
                className="text-accent mt-1.5 mr-4 flex-shrink-0"
                size={8}
              />
              <span>
                Affiliated alongside the Bowling Federation of India (BFI)
              </span>
            </li>
            <li className="flex items-start">
              <FaSquareFull
                className="text-accent mt-1.5 mr-4 flex-shrink-0"
                size={8}
              />
              <span>
                Official Pathway for Para Asian Games & Commonwealth Games
              </span>
            </li>
            <li className="flex items-start">
              <FaSquareFull
                className="text-accent mt-1.5 mr-4 flex-shrink-0"
                size={8}
              />
              <span>
                Supported by State Para Sports Associations across India
              </span>
            </li>
          </ul>

          <p className="text-xs text-gray-400 mb-8 border-t border-white/10 pt-6">
            Dedicated to the development, regulation, and inclusion of athletes
            with physical and visual impairments.
          </p>

          <div>
            <Link
              href="/about"
              className="inline-flex items-center bg-white text-navy px-8 py-3.5 font-bold text-sm hover:bg-accent hover:text-white transition-colors duration-300 group rounded-full shadow-lg"
            >
              Explore Affiliations
            </Link>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: ANIMATED STATS ================= */}
        <div className="w-full lg:w-[55%] grid grid-cols-3 place-items-center p-4 sm:p-6 md:p-10 gap-2 sm:gap-3 md:gap-4">
          {/* Stat 1 */}
          <div className={`${cardHoverStyles} aspect-square w-full`}>
            <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-6 shadow-lg group-hover:shadow-[0_0_25px_rgba(239,125,32,0.4)] group-hover:-translate-y-1 transition-all duration-500">
              <FiGlobe className="block sm:hidden text-navy" size={16} />
              <FiGlobe
                className="hidden sm:block md:hidden text-navy"
                size={22}
              />
              <FiGlobe className="hidden md:block text-navy" size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 md:mb-2 group-hover:scale-110 group-hover:text-accent transition-all duration-500">
              <AnimatedCounter target={15} />
            </h3>
            <p className="text-[7px] sm:text-[10px] md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-500 uppercase tracking-wide leading-tight">
              <span className="block whitespace-nowrap">States</span>
              <span className="block whitespace-nowrap">Represented</span>
            </p>
          </div>

          {/* Stat 2 */}
          <div className={`${cardHoverStyles} aspect-square w-full`}>
            <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-6 shadow-lg group-hover:shadow-[0_0_25px_rgba(239,125,32,0.4)] group-hover:-translate-y-1 transition-all duration-500">
              <FiCalendar className="block sm:hidden text-navy" size={16} />
              <FiCalendar
                className="hidden sm:block md:hidden text-navy"
                size={22}
              />
              <FiCalendar className="hidden md:block text-navy" size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 md:mb-2 group-hover:scale-110 group-hover:text-accent transition-all duration-500">
              <AnimatedCounter target={10} />
            </h3>
            <p className="text-[7px] sm:text-[10px] md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-500 uppercase tracking-wide leading-tight">
              <span className="block whitespace-nowrap">State & National</span>
              <span className="block whitespace-nowrap">Events</span>
            </p>
          </div>

          {/* Stat 3 */}
          <div className={`${cardHoverStyles} aspect-square w-full`}>
            <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-6 shadow-lg group-hover:shadow-[0_0_25px_rgba(239,125,32,0.4)] group-hover:-translate-y-1 transition-all duration-500">
              <FiUserCheck className="block sm:hidden text-navy" size={16} />
              <FiUserCheck
                className="hidden sm:block md:hidden text-navy"
                size={22}
              />
              <FiUserCheck className="hidden md:block text-navy" size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 md:mb-2 group-hover:scale-110 group-hover:text-accent transition-all duration-500">
              <AnimatedCounter target={500} />
            </h3>
            <p className="text-[7px] sm:text-[10px] md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-500 uppercase tracking-wide leading-tight">
              <span className="block whitespace-nowrap">Registered</span>
              <span className="block whitespace-nowrap">Athletes</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
