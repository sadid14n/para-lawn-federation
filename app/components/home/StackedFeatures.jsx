'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

// ============================================================================
// SUB-COMPONENT: Automated Sweeping Image (Inside the Cards)
// ============================================================================
const AutoSweepingCardImage = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === images.length - 1 && direction === 1) {
          setDirection(-1);
          return prev - 1;
        }
        if (prev === 0 && direction === -1) {
          setDirection(1);
          return prev + 1;
        }
        return prev + direction;
      });
    }, 3000); // Sweeps every 3 seconds

    return () => clearInterval(timer);
  }, [images.length, direction]);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] bg-white rounded-t-3xl md:rounded-3xl shadow-xl overflow-hidden border-4 border-white mt-8 md:mt-0 flex items-center justify-center">
      <div 
        className="flex w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`Feature Image ${idx + 1}`} 
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT: Stacked Cards Section
// ============================================================================
export default function StackedFeatures() {
  const featuresData = [
    {
      id: 1,
      title: 'Inclusive Classification',
      description: 'We follow internationally recognized IBD classification systems to ensure fair and competitive opportunities for all athletes, regardless of physical or visual impairment.',
      linkText: 'Explore classifications',
      linkUrl: '#',
      bgColor: 'from-[#0B1242] to-[#16215C]', // Federation Navy
      textColor: 'text-white',
      linkColor: 'text-blue-200 hover:text-white',
      images: [
        'https://images.unsplash.com/photo-1599058917212-32cd24bc61be?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 2,
      title: 'Adaptive Equipment',
      description: 'Sport should have no barriers. We provide guidance on specialized delivery aids, wheelchair modifications, and assistant training to ensure everyone can get on the green.',
      linkText: 'View equipment guide',
      linkUrl: '#',
      bgColor: 'from-[#E62227] to-[#B91C1C]', // Federation Red
      textColor: 'text-white',
      linkColor: 'text-red-200 hover:text-white',
      images: [
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526676537331-7bc28f731a57?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 3,
      title: "Grassroots to Global",
      description: "From regional state workshops to national trials, we provide a clear, supported roadmap for talent to eventually represent India at major events like the Para Asian Games.",
      linkText: 'Find upcoming events',
      linkUrl: '#',
      bgColor: 'from-[#1A1A1A] to-[#333333]', // Charcoal/Black
      textColor: 'text-white',
      linkColor: 'text-gray-300 hover:text-white',
      images: [
        'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599058917212-32cd24bc61be?q=80&w=800&auto=format&fit=crop'
      ]
    }
  ];

  return (
    <section className="w-full bg-[#F8F9FA] py-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">
          
          {/* ================= LEFT COLUMN: STICKY HEADER ================= */}
          <div className="w-full lg:w-[30%] sticky top-32 z-10 pt-8">
            <span className="inline-block border border-gray-300 text-[#0B1242] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 bg-white shadow-sm">
              Why Join PLBFI
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0B1242] tracking-tight mb-6 leading-tight">
              A Sport Built <br className="hidden md:block"/> Without Barriers.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover how the Para Lawn Bowls Federation of India is transforming the sporting landscape for athletes of all abilities:
            </p>
          </div>

          {/* ================= RIGHT COLUMN: STACKING CARDS ================= */}
          <div className="w-full lg:w-[70%] flex flex-col pb-[30vh]">
            {featuresData.map((feature, index) => (
              <div 
                key={feature.id} 
                className={`sticky shadow-2xl rounded-[2.5rem] bg-gradient-to-br ${feature.bgColor} p-8 md:p-12 border border-white/20 w-full flex flex-col md:flex-row items-center gap-8 lg:gap-12 mb-12 lg:mb-24 transition-all duration-500`}
                style={{ 
                  top: `calc(15vh + ${index * 2.5}rem)`,
                  zIndex: 20 + index 
                }}
              >
                
                {/* Text Side */}
                <div className="w-full md:w-[45%] flex flex-col justify-center">
                  <h3 className={`text-3xl md:text-4xl font-bold ${feature.textColor} mb-4 leading-tight`}>
                    {feature.title}
                  </h3>
                  <p className={`${feature.textColor} opacity-90 text-base md:text-lg leading-relaxed mb-8`}>
                    {feature.description}
                  </p>

                  <Link 
                    href={feature.linkUrl} 
                    className={`group inline-flex items-center text-sm font-bold ${feature.linkColor} transition-colors duration-300`}
                  >
                    {feature.linkText}
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-[55%]">
                  <AutoSweepingCardImage images={feature.images} />
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}