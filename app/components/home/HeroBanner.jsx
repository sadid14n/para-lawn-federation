'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

// Expanded to 5 images as requested. Replace these URLs with real Para Bowls images.
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
      // 1. Start the sweep in
      setOverlayState('sweeping-in');

      // 2. Wait for sweep to cover the screen, then swap image
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
        setOverlayState('sweeping-out');

        // 3. Wait for sweep to reveal new image, then reset and alternate direction
        setTimeout(() => {
          setOverlayState('idle');
          setSweepDirection((prev) => (prev === 'rtl' ? 'ltr' : 'rtl'));
        }, 600); // 600ms sweep out duration
      }, 600); // 600ms sweep in duration
      
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Calculate the CSS transform for the dark overlay based on current state
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
    <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden bg-gray-900 group">
      
      {/* 
        THE OVERLAY CURTAIN
        Uses the dark blue color for the transition sweep.
      */}
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

      {/* 
        TEXT & BUTTON OVERLAY 
        Uses a gradient instead of a flat background so the text pops 
        while still letting the image shine through beautifully.
      */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-black/10">
        <div className="text-center px-6 max-w-4xl mx-auto flex flex-col items-center mt-12">
          
          {/* Aesthetic Tagline */}
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6">
            Para Lawn Bowls Federation of India
          </span>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-lg uppercase tracking-tight leading-[1.1]">
            Empowering Abilities <br className="hidden md:block" /> 
            <span className="text-[#E62227]">On The Green.</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-2xl text-gray-200 drop-shadow-md font-medium mb-10 max-w-2xl">
            The official governing body making lawn bowls accessible, competitive, and inclusive for athletes across India.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/register" 
              className="bg-[#E62227] hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-[0_10px_20px_rgba(230,34,39,0.3)] hover:shadow-[0_15px_30px_rgba(230,34,39,0.5)] hover:-translate-y-1"
            >
              Register as Athlete
            </Link>
            
            <Link 
              href="/about" 
              className="group flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-[#0B1242] backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 hover:-translate-y-1"
            >
              Discover the Sport
              <FiArrowRight className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" size={18} />
            </Link>
          </div>

        </div>
      </div>

      {/* PAGINATION DOTS */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-3">
        {bannerImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 border-white transition-all duration-300 ${
              currentIndex === idx ? 'bg-white scale-125' : 'bg-transparent hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      
    </div>
  );
}