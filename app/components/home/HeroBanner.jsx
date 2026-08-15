'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const bannerImages = [
  "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop",
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [overlayState, setOverlayState] = useState('idle'); // 'idle' | 'sweeping-in' | 'sweeping-out'
  const [sweepDirection, setSweepDirection] = useState('rtl'); // 'rtl' | 'ltr'

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
    <div className="relative w-full h-[75vh] md:h-[80vh] lg:h-[90vh] overflow-hidden bg-gray-900 group">
      
      {/* THE OVERLAY CURTAIN */}
      <div 
        className="absolute inset-0 z-20 bg-[#0B1242] transition-transform duration-500 ease-in-out"
        style={{ transform: getOverlayTransform() }}
      />

      {/* THE IMAGE */}
      <img
        src={bannerImages[currentIndex]}
        alt={`Para Lawn Bowls Action ${currentIndex + 1}`}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* TEXT & BUTTON OVERLAY */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-t from-black/90 via-black/50 to-black/20 pb-10 md:pb-0">
        <div className="text-center px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center mt-8 md:mt-12 w-full">
          
          {/* Aesthetic Tagline - Made much smaller for mobile */}
          <span className="inline-block py-1 px-3 sm:py-1.5 sm:px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] sm:text-xs md:text-sm font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase mb-4 md:mb-6">
            Para Lawn Bowls Federation of India
          </span>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-6 drop-shadow-lg uppercase tracking-tight leading-[1.1] md:leading-[1.1] w-full">
            Empowering Abilities <br className="hidden sm:block" /> 
            <span className="text-[#E62227] block sm:inline mt-1 sm:mt-0">On The Green.</span>
          </h1>
          
          {/* Subheading - Hidden on mobile (sm) for a cleaner look */}
          <p className="hidden sm:block text-sm md:text-xl lg:text-2xl text-gray-200 drop-shadow-md font-medium mb-8 md:mb-10 max-w-2xl px-2 leading-relaxed">
            The official governing body making lawn bowls accessible, competitive, and inclusive for athletes across India.
          </p>

          {/* Action Buttons - Side by side on mobile, smaller sizing */}
          <div className="flex flex-row justify-center gap-2 sm:gap-4 w-full sm:w-auto px-2 sm:px-0 mt-2 sm:mt-0">
            <Link 
              href="/register" 
              className="flex items-center justify-center bg-[#E62227] hover:bg-red-700 text-white w-auto px-4 sm:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-bold text-[11px] sm:text-sm md:text-base transition-all duration-300 shadow-[0_10px_20px_rgba(230,34,39,0.3)] hover:shadow-[0_15px_30px_rgba(230,34,39,0.5)] hover:-translate-y-1 whitespace-nowrap"
            >
              Register Athlete
            </Link>
            
            <Link 
              href="/about" 
              className="group flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-[#0B1242] backdrop-blur-md border border-white/30 w-auto px-4 sm:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-bold text-[11px] sm:text-sm md:text-base transition-all duration-300 hover:-translate-y-1 whitespace-nowrap"
            >
              Discover Sport
              <FiArrowRight className="hidden sm:block ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" size={18} />
            </Link>
          </div>

        </div>
      </div>

      {/* PAGINATION DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-30 flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3">
        {bannerImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full border border-white md:border-2 transition-all duration-300 ${
              currentIndex === idx ? 'bg-white scale-125' : 'bg-transparent hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      
    </div>
  );
}