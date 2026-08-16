'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const bannerImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjzJKOes13-6LSZXsYAOAVwr1bzG-1Z_9igQoO8QLSw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAhF5AyKOcPN0oz9rPaCk_Dk1mcQMxLbnEaQ0mIxkrlw&s=10",
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [overlayState, setOverlayState] = useState('idle');
  const [sweepDirection, setSweepDirection] = useState('rtl');

  useEffect(() => {
    const timer = setInterval(() => {
      setOverlayState('sweeping-in');

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
        setOverlayState('sweeping-out');

        setTimeout(() => {
          setOverlayState('idle');
          setSweepDirection((prev) => (prev === 'rtl' ? 'ltr' : 'rtl'));
        }, 600);
      }, 600);
      
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const getOverlayTransform = () => {
    if (overlayState === 'idle') {
      return sweepDirection === 'rtl' ? 'translateX(100%)' : 'translateX(-100%)';
    }
    if (overlayState === 'sweeping-in') {
      return 'translateX(0%)';
    }
    if (overlayState === 'sweeping-out') {
      return sweepDirection === 'rtl' ? 'translateX(-100%)' : 'translateX(100%)';
    }
  };

  return (
    <div className="relative w-full h-[75vh] md:h-[80vh] lg:h-[88vh] overflow-hidden bg-black group">
      
      {/* TRANSITION OVERLAY */}
      <div 
        className="absolute inset-0 z-20 bg-[#1E2265] transition-transform duration-500 ease-in-out"
        style={{ transform: getOverlayTransform() }}
      />

      {/* BACKGROUND IMAGE */}
      <img
        src={bannerImages[currentIndex]}
        alt={`Para Lawn Bowls Action ${currentIndex + 1}`}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* CLEAN PHOTOGRAPHIC OVERLAY (Non-muddy gradient) */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

      {/* HERO CONTENT */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
        <div className="text-center px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center mt-6 w-full">
          
          {/* Tagline Badge */}
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            National Governing Body
          </span>

          {/* Clean Solid White Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-[1.08] drop-shadow-md">
            Empowering Abilities <br />
            On The Green.
          </h1>
          
          {/* Subheading */}
          <p className="hidden sm:block text-base md:text-xl text-gray-200 font-normal mb-10 max-w-2xl px-4 leading-relaxed">
            The official federation making lawn bowls accessible, competitive, and inclusive for para-athletes across India.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link 
              href="/register" 
              className="flex items-center justify-center bg-[#EF7D20] hover:bg-[#d66a15] text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              Register Athlete
            </Link>
            
            <Link 
              href="/about" 
              className="group flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-[#1E2265] backdrop-blur-md border border-white/30 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Discover Sport
              <FiArrowRight className="hidden sm:block ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </div>

        </div>
      </div>

      {/* MINIMAL PAGINATION DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-30 flex flex-row md:flex-col space-x-2.5 md:space-x-0 md:space-y-3">
        {bannerImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      
    </div>
  );
}