'use client';

import { useState, useEffect } from 'react';
import { FiFlag, FiGlobe, FiHeart, FiAward } from 'react-icons/fi';

const whyUsData = [
  {
    id: 1,
    title: 'National Governing Body',
    description: 'The official federation dedicated to the development, regulation, and promotion of Para Lawn Bowls across India, creating grassroots-to-elite pathways.',
    icon: <FiFlag size={24} />,
    iconBg: 'bg-[#0B1242]',
  },
  {
    id: 2,
    title: 'Global Affiliation',
    description: "Proudly recognized by the International Bowls for the Disabled (IBD). This ensures our athletes compete under global standards and qualify for major international events.",
    icon: <FiGlobe size={24} />,
    iconBg: 'bg-[#E62227]',
  },
  {
    id: 3,
    title: 'Absolute Accessibility',
    description: "Sport is for everyone. We ensure fair classification, adaptive equipment, and specialized coaching for athletes with visual and physical impairments.",
    icon: <FiHeart size={24} />,
    iconBg: 'bg-[#1A1A1A]',
  }
];

// 3 Images for the automated carousel
const carouselImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo0XUbkWuuli_-JiFR7lyXiuu8_TbMbMigkXyY9lJGRA&s=10',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',

];

export default function WhyUs() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Automatic scrolling logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Changed to 4 seconds for a calm, premium viewing experience

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-white py-20 lg:py-28 overflow-hidden">
      
      {/* 
        ================= CENTERED RED SEPARATOR LINE =================
      */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] md:w-[60%] lg:w-[40%] max-w-3xl h-2 md:h-3 bg-[#E62227] rounded-t-2xl z-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* ================= LEFT COLUMN: CLEAN TYPOGRAPHY ================= */}
          <div>
            
            {/* Simple Section Header */}
            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <span className="h-px w-8 bg-[#E62227]"></span>
                <span className="text-[#E62227] font-bold tracking-[0.2em] uppercase text-sm">
                  The PLBFI Standard
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1242] tracking-tight mb-6">
                Championing <br /> Inclusion.
              </h2>
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-[#0B1242]"></div>
              </div>
            </div>

            {/* Feature Blocks with subtle card-hover effect */}
            <div className="space-y-4">
              {whyUsData.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-start gap-5 group p-5 -ml-5 rounded-2xl hover:bg-gray-50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  {/* Icon Container */}
                  <div className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl text-white shrink-0 shadow-md ${item.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1242] mb-2 group-hover:text-[#E62227] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed text-justify">
                      {item.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: ANIMATED CAROUSEL WITH EXTRA ELEMENTS ================= */}
          <div className="relative w-full h-full mt-12 lg:mt-0 px-4 md:px-0">
            
            {/* 1. EXTRA ELEMENT: Offset Decorative Border Frame */}
            <div className="absolute top-6 -right-6 md:top-8 md:-right-8 w-full h-full rounded-[2rem] border-2 border-[#E62227]/30 z-0 hidden sm:block transition-all duration-500"></div>

            {/* Main Animated Carousel Container */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(11,18,66,0.15)] border-4 border-white aspect-[4/3] lg:aspect-auto lg:h-[550px] z-10 group">
              
              {/* Sliding Image Track */}
              <div 
                className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}
              >
                {carouselImages.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt={`Para Lawn Bowls India ${idx + 1}`} 
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>

              {/* Inner Gradient Overlay to make Pagination Dots visible */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B1242]/80 to-transparent pointer-events-none z-10"></div>

              {/* Slider Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImgIndex === idx ? 'w-8 bg-[#E62227]' : 'w-2 bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 2. EXTRA ELEMENT: Top Right Glassmorphism Badge */}
            <div className="absolute top-12 -right-4 md:-right-10 bg-white/40 backdrop-blur-md border border-white p-4 px-6 rounded-2xl shadow-xl z-20 hidden md:flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300">
              <span className="text-2xl font-black text-[#0B1242] drop-shadow-sm leading-none">100%</span>
              <span className="text-[10px] font-bold text-[#E62227] uppercase tracking-widest mt-1">Inclusive</span>
            </div>

            {/* Overlapping Floating Trust Badge (Bottom Left) */}
            <div className="absolute -left-2 md:-left-12 bottom-12 bg-white p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] flex items-center gap-4 z-20 border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#E62227] w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shadow-inner">
                <FiAward size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Recognized By</span>
                <span className="text-sm md:text-base font-black text-[#0B1242]">IBD Global</span>
              </div>
            </div>

            {/* Decorative dot grid behind the image */}
            <div 
              className="absolute -top-8 -left-8 w-40 h-40 opacity-20 z-0 hidden md:block"
              style={{ backgroundImage: 'radial-gradient(#0B1242 2px, transparent 2px)', backgroundSize: '20px 20px' }}
            ></div>

          </div>

        </div>
      </div>
    </section>
  );
}