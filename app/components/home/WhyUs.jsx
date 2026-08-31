'use client';

import { useState, useEffect } from 'react';
import { FiFlag, FiGlobe, FiHeart, FiAward } from 'react-icons/fi';

const whyUsData = [
  {
    id: 1,
    title: 'National Governing Body',
    description: 'The official federation dedicated to the development, regulation, and promotion of Para Lawn Bowls across India, creating grassroots-to-elite pathways.',
    icon: <FiFlag size={24} />,
  },
  {
    id: 2,
    title: 'Global Affiliation',
    description: "Proudly recognized by the International Bowls for the Disabled (IBD). This ensures our athletes compete under global standards and qualify for major international events.",
    icon: <FiGlobe size={24} />,
  },
  {
    id: 3,
    title: 'Absolute Accessibility',
    description: "Sport is for everyone. We ensure fair classification, adaptive equipment, and specialized coaching for athletes with visual and physical impairments.",
    icon: <FiHeart size={24} />,
  }
];

const carouselImages = [
  'https://media.gettyimages.com/id/458310987/photo/lawn-bowling.jpg?s=612x612&w=0&k=20&c=z-EGRqGwuXbCaGw08lH3yCYT4x26F_puJqGlnMwXyHA=',
  'https://media.gettyimages.com/id/2275488918/photo/two-active-seniors-lawn-bowling-playing-bowls-in-the-uk.jpg?s=612x612&w=0&k=20&c=fAuKJh2YJU0eNOX8XlucQUcVcUxa-lyi8N98BTSCxlg=',
  'https://media.gettyimages.com/id/2275490196/photo/two-active-seniors-lawn-bowling-playing-bowls-in-the-uk.jpg?s=612x612&w=0&k=20&c=vfCjbGu54UEEoVXJl2PtmaRxE9pRFxi6xlRuGI6aeh8=',
];

export default function WhyUs() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-white py-20 lg:py-28 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ================= LEFT COLUMN: CLEAN TYPOGRAPHY ================= */}
          <div>

            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-accent font-bold tracking-[0.25em] uppercase text-xs">
                  The PILBF Standard
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] font-extrabold text-navy tracking-tight mb-6 text-4xl md:text-5xl lg:text-6xl">
                Championing <br /> inclusion.
              </h2>
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-accent"></div>
              </div>
            </div>

            <div className="space-y-4">
              {whyUsData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start gap-5 group p-5 -ml-5 rounded-2xl hover:bg-off-white hover:shadow-[0_10px_30px_rgba(30,34,101,0.06)] transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl text-white shrink-0 shadow-md bg-navy group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium text-justify">
                      {item.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: ANIMATED CAROUSEL WITH EXTRA ELEMENTS ================= */}
          <div className="relative w-full h-full mt-12 lg:mt-0 px-4 md:px-0">

            {/* Decorative border frame — now accent instead of green */}
            <div className="absolute top-6 -right-6 md:top-8 md:-right-8 w-full h-full rounded-[2rem] border-2 border-accent/30 z-0 hidden sm:block transition-all duration-500"></div>

            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(30,34,101,0.15)] border-4 border-white aspect-[4/3] lg:aspect-auto lg:h-[550px] z-10 group">

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

              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/90 to-transparent pointer-events-none z-10"></div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImgIndex === idx ? 'w-8 bg-accent' : 'w-2 bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Glassmorphism badge — green label swapped to accent */}
            <div className="absolute top-12 -right-4 md:-right-10 bg-white/40 backdrop-blur-md border border-white p-4 px-6 rounded-2xl shadow-xl z-20 hidden md:flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300">
              <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-navy drop-shadow-sm leading-none">100%</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">Inclusive</span>
            </div>

            {/* Trust badge — icon background swapped from green to navy */}
            <div className="absolute -left-2 md:-left-12 bottom-12 bg-white p-5 rounded-2xl shadow-[0_20px_40px_rgba(30,34,101,0.12)] flex items-center gap-4 z-20 border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-navy w-12 h-12 rounded-full flex items-center justify-center text-white shadow-inner">
                <FiAward size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Recognized By</span>
                <span className="text-sm md:text-base font-bold text-navy">IBD Global</span>
              </div>
            </div>

            <div
              className="absolute -top-8 -left-8 w-40 h-40 opacity-20 z-0 hidden md:block"
              style={{ backgroundImage: 'radial-gradient(#1E2265 2px, transparent 2px)', backgroundSize: '20px 20px' }}
            ></div>

          </div>

        </div>
      </div>
    </section>
  );
}