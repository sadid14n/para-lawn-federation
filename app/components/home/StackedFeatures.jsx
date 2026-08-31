'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

// ============================================================================
// SUB-COMPONENT: Automated Sweeping Image (Inside the Cards) — unchanged logic
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
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length, direction]);

  return (
    <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] lg:h-[420px] bg-off-white rounded-[1.5rem] md:rounded-[2rem] shadow-inner overflow-hidden flex items-center justify-center group">
      <div
        className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Feature Image ${idx + 1}`}
            className="w-full h-full object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-1000"
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
  // Data unchanged, only the per-card accent color fields removed —
  // every card now shares the site's single accent (orange) and navy,
  // no more per-card color identity
  const featuresData = [
    {
      id: 1,
      title: 'Inclusive Classification',
      description: 'We follow internationally recognized IBD classification systems to ensure fair and competitive opportunities for all athletes, regardless of physical or visual impairment.',
      linkText: 'Explore classifications',
      linkUrl: '#',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99zPU1POpAuLjSz66Ny5d0ePulx_Vd9johyvkwiMLtA&s=10',
        'https://media.gettyimages.com/id/1684026829/photo/players-competes-during-the-8th-senior-and-4th-u-25-national-lawn-bowls-championships-2023-at.jpg?s=612x612&w=0&k=20&c=bT_rVBwgGdVk7xGQgti_WC8d0jO_KwiqcrBFLIS4kkI='
      ]
    },
    {
      id: 2,
      title: 'Adaptive Equipment',
      description: 'Sport should have no barriers. We provide guidance on specialized delivery aids, wheelchair modifications, and assistant training to ensure everyone can get on the green.',
      linkText: 'View equipment guide',
      linkUrl: '#',
      images: [
        'https://media.gettyimages.com/id/1413249891/photo/leamington-spa-england-sunil-bahadur-navneet-singh-chandan-kumar-singh-and-dinesh-kumar-of.jpg?s=612x612&w=0&k=20&c=SrAIbdFyp7QopGAkrqMGUcv59Cg-4hKS56Xe3b7gE_w=',
        'https://media.gettyimages.com/id/157168909/photo/ready-to-bowl-lawn-bowls.jpg?s=612x612&w=0&k=20&c=pGvwJFmX4xC1zl1tHNX30gtq0o5YULDJ-zcf_ooNeAg='
      ]
    },
    {
      id: 3,
      title: "Grassroots to Global",
      description: "From regional state workshops to national trials, we provide a clear, supported roadmap for talent to eventually represent India at major events like the Para Asian Games.",
      linkText: 'Find upcoming events',
      linkUrl: '#',
      images: [
        'https://media.gettyimages.com/id/853799052/photo/englands-ellen-falkner-sian-gordon-and-sophie-tolchard-kiss-their-gold-medals-after-winning.jpg?s=612x612&w=0&k=20&c=Pxu-o-b8XQtylFzFzmwA_5AE45ucl1VeYeNfxeUqsr0=',
        'https://media.gettyimages.com/id/452614168/photo/glasgow-scotland-caroline-brown-of-scotland-competes-in-the-womans-singles-at-kelvingrove-lawn.jpg?s=612x612&w=0&k=20&c=pp8SZGUW_iAKdSUQvXIJHu6aocXZ9b9jWM-rvhCtR6Y='
      ]
    }
  ];

  return (
    <section className="w-full bg-off-white py-16 md:py-28 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">

          {/* ================= LEFT COLUMN: STICKY HEADER ================= */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-32 z-10 pt-4 md:pt-8 mb-8 lg:mb-0 pr-0 lg:pr-8">

            <div className="flex items-center space-x-4 mb-6 md:mb-8">
              <span className="h-1.5 w-12 bg-accent rounded-full"></span>
              <span className="text-accent font-bold tracking-[0.25em] uppercase text-xs">
                Why Join PILBF
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-[4.5rem] text-navy tracking-tight mb-6 md:mb-10 leading-[1.05]">
              A sport built <br />
              without barriers<span className="text-accent">.</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
              Discover how the <strong className="font-bold text-navy">Para Indian Lawn Bowls Federation</strong> is transforming the sporting landscape for athletes of all abilities, providing pathways from grassroots training to the global stage.
            </p>
          </div>

          {/* ================= RIGHT COLUMN: STACKING CARDS ================= */}
          <div className="w-full lg:w-[60%] flex flex-col pb-[10vh] md:pb-[20vh]">
            {featuresData.map((feature, index) => (
              <div
                key={feature.id}
                className="sticky w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-6 sm:p-8 md:p-10 mb-8 md:mb-16 shadow-[0_20px_60px_rgba(30,34,101,0.08)] rounded-[1.5rem] md:rounded-[2.5rem] border-t-[8px] border-accent transition-all duration-500"
                style={{
                  top: `calc(10vh + ${index * 1.5}rem)`,
                  zIndex: 20 + index
                }}
              >

                <div className="w-full md:w-[45%] order-1 md:order-2">
                  <AutoSweepingCardImage images={feature.images} />
                </div>

                <div className="w-full md:w-[55%] flex flex-col justify-center order-2 md:order-1 relative">

                  {/* Ghost numeral — now consistently navy across all 3 cards */}
                  <span className="absolute -top-10 -left-4 text-[100px] md:text-[140px] font-black opacity-[0.05] text-navy pointer-events-none select-none leading-none">
                    0{feature.id}
                  </span>

                  <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl sm:text-3xl md:text-4xl text-navy mb-4 md:mb-6 leading-tight relative z-10">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-medium relative z-10">
                    {feature.description}
                  </p>

                  <Link
                    href={feature.linkUrl}
                    className="group inline-flex items-center text-sm md:text-base font-bold text-navy hover:text-accent transition-colors duration-300 w-max relative z-10"
                  >
                    {feature.linkText}
                    <div className="ml-4 w-10 h-10 rounded-full flex items-center justify-center text-white bg-accent shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                      <FiArrowRight size={16} />
                    </div>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}