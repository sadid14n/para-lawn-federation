'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

// ============================================================================
// SUB-COMPONENT: Automated Sweeping Image Slider (Simulating a Phone Mockup)
// ============================================================================
const AutoSweepingPhone = ({ images, bgColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        // If we hit the end, reverse direction to left
        if (prev === images.length - 1 && direction === 1) {
          setDirection(-1);
          return prev - 1;
        }
        // If we hit the start, reverse direction to right
        if (prev === 0 && direction === -1) {
          setDirection(1);
          return prev + 1;
        }
        // Otherwise, keep moving in the current direction
        return prev + direction;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, [images.length, direction]);

  return (
    <div className={`relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2.5rem] flex items-center justify-center p-8 overflow-hidden shadow-sm ${bgColor}`}>
      {/* Decorative background pattern (optional, adds texture like the reference) */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')] [background-size:12px_12px]"></div>
      
      {/* Phone Mockup Frame */}
      <div className="relative z-10 w-[60%] sm:w-[45%] lg:w-[55%] h-[90%] bg-white rounded-[2rem] shadow-2xl border-4 md:border-8 border-white overflow-hidden">
        
        {/* Sweeping Images Track */}
        <div 
          className="flex h-full w-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`Slide ${idx + 1}`} 
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};


// ============================================================================
// MAIN COMPONENT: Features Showcase
// ============================================================================
export default function FeaturesShowcase() {
  // Data array mirroring the sections in your provided screenshots
  const features = [
    {
      id: 1,
      title: 'Collect unlimited reviews, at any scale',
      description: 'Automated requests. Smart timing. Import from anywhere. Unlimited product and store reviews collection, to get you started at speed, from day one.',
      extraContent: (
        <div className="border border-gray-200 rounded-xl p-4 w-max mt-6 mb-8 shadow-sm">
          <p className="text-2xl font-black text-[#0B3B3C] mb-1">137M+</p>
          <p className="text-xs text-gray-500">verified reviews collected</p>
        </div>
      ),
      linkText: 'Explore product reviews',
      linkUrl: '#',
      bgColor: 'bg-[#CFF3DA]', // Soft Mint Green
      images: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=400&auto=format&fit=crop'
      ],
      imageLeft: false, // Text on left, image on right
    },
    {
      id: 2,
      title: 'Display beautiful widgets that actually convert',
      description: 'Use text reviews, photo and video galleries. AI summaries. Star ratings everywhere. Built to match your brand, powerful enough to drive revenue.',
      extraContent: (
        <div className="border border-gray-200 rounded-xl p-4 w-max mt-6 mb-8 shadow-sm">
          <p className="text-2xl font-black text-[#0B3B3C] mb-1">16</p>
          <p className="text-xs text-gray-500">widgets</p>
        </div>
      ),
      linkText: 'Explore widgets',
      linkUrl: '#',
      bgColor: 'bg-[#D3EAFC]', // Soft Blue
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=400&auto=format&fit=crop'
      ],
      imageLeft: true, // Image on left, text on right
    },
    {
      id: 3,
      title: 'Share your reviews and ratings, everywhere.',
      description: 'Syndicate to Google Shopping, Rich Snippets, TikTok Shop, Meta Shop, and the Shop app automatically. Your ecommerce reviews work where your customers shop.',
      extraContent: (
        <div className="border border-gray-200 rounded-xl p-4 mt-6 mb-8 shadow-sm">
          <p className="text-xs text-gray-500 mb-3">Official Partners:</p>
          <div className="flex items-center space-x-4">
            <span className="font-bold text-purple-600">shop</span>
            <span className="font-bold text-blue-600">Meta</span>
            <span className="font-bold text-red-500">Google</span>
            <span className="font-bold text-black">TikTok</span>
          </div>
        </div>
      ),
      linkText: 'Explore features',
      linkUrl: '#',
      bgColor: 'bg-[#CFF3DA]',
      images: [
        'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=400&auto=format&fit=crop'
      ],
      imageLeft: false,
    },
    {
      id: 4,
      title: 'Powered by AI, which saves you time',
      description: 'AI product and store review summaries that help shoppers decide. Reply suggestions in seconds. Auto-translation across 38 languages. All included at $15/month.',
      extraContent: null, // No extra box for this one
      linkText: 'Start for free',
      linkUrl: '#',
      bgColor: 'bg-[#D3EAFC]',
      images: [
        'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop'
      ],
      imageLeft: true,
    }
  ];

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <span className="inline-block border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full mb-6 shadow-sm">
            Platform
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B3B3C] tracking-tight mb-6 leading-tight">
            The complete product and store reviews app for Shopify
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Collect, display, and syndicate ratings and reviews - powered by AI. 
            Everything you need to turn customer confidence into revenue.
          </p>
        </div>

        {/* ================= FEATURE ROWS ================= */}
        <div className="space-y-24 md:space-y-32">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                feature.imageLeft ? 'lg:flex-row-reverse' : ''
              }`}
            >
              
              {/* TEXT CONTENT COLUMN */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#0B3B3C] mb-6 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Extra Content (Stats, Logos, etc.) */}
                {feature.extraContent}

                {/* Call to Action Link */}
                <Link 
                  href={feature.linkUrl} 
                  className={`group inline-flex items-center text-sm font-bold text-[#0B3B3C] hover:text-blue-600 transition-colors duration-300 ${!feature.extraContent && 'mt-8'}`}
                >
                  {feature.linkText}
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </div>

              {/* IMAGE/PHONE SLIDER COLUMN */}
              <div className="w-full lg:w-1/2">
                <AutoSweepingPhone images={feature.images} bgColor={feature.bgColor} />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}