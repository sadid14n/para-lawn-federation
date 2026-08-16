'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const eventsData = [
  {
    id: 1,
    title: '4th National Para Lawn Bowls Championship (Solapur)',
    img: 'https://media.gettyimages.com/id/458310987/photo/lawn-bowling.jpg?s=612x612&w=0&k=20&c=z-EGRqGwuXbCaGw08lH3yCYT4x26F_puJqGlnMwXyHA=',
    link: '#',
  },
  {
    id: 2,
    title: 'Assam State Para Bowls Trials (Guwahati)',
    img: 'https://media.gettyimages.com/id/1412833712/photo/leamington-spa-england-jamie-walker-of-team-england-competes-during-mens-singles-section-c.jpg?s=612x612&w=0&k=20&c=07AoVNx96RPUXNgx2qsKaabXnGVcag3wtMRj7-fD-rI=',
    link: '#',
  },
  {
    id: 3,
    title: 'Para Asian Games Selection Camp',
    img: 'https://media.gettyimages.com/id/904234186/photo/two-senior-women-playing-bowls.jpg?s=612x612&w=0&k=20&c=UQXcduEURxhiNnZCOFSjN1ilFLRBQgWL0uzcIiVsQ9Q=',
    link: '#',
  },
  {
    id: 4,
    title: 'National Coaching & Referee Certification',
    img: 'https://media.gettyimages.com/id/2275490354/photo/group-of-active-seniors-lawn-bowling-playing-bowls-in-the-uk.jpg?s=612x612&w=0&k=20&c=nTfiLaW9s9gbJS40KEYE6PFuC9DaPDahgiXRMs-MHGI=',
    link: '#',
  },
];

export default function HotEvents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const length = eventsData.length;

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + length) % length);

  useEffect(() => {
    if (isHovered) return; 
    
    const timer = setInterval(() => {
      nextSlide();
    }, 1500);

    return () => clearInterval(timer);
  }, [isHovered]);

  const getOffset = (index) => {
    let offset = (index - activeIndex) % length;
    if (offset < 0) offset += length;
    if (offset > Math.floor(length / 2)) {
      offset -= length;
    }
    return offset;
  };

  const getCardStyles = (offset) => {
    const baseClass = "absolute top-0 left-1/2 w-[260px] md:w-[320px] lg:w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] origin-center";

    if (offset === 0) {
      return `${baseClass} z-30 opacity-100 scale-100 -translate-x-1/2 -translate-y-4 md:-translate-y-8 brightness-100 shadow-[0_30px_60px_rgba(0,0,0,0.6)]`;
    } 
    else if (offset === -1) {
      return `${baseClass} z-20 opacity-80 scale-[0.85] -translate-x-[155%] md:-translate-x-[160%] translate-y-6 md:translate-y-10 brightness-50 hover:brightness-75 cursor-pointer`;
    } 
    else if (offset === 1) {
      return `${baseClass} z-20 opacity-80 scale-[0.85] translate-x-[55%] md:translate-x-[60%] translate-y-6 md:translate-y-10 brightness-50 hover:brightness-75 cursor-pointer`;
    } 
    else if (offset < -1) {
      return `${baseClass} z-10 opacity-0 scale-[0.6] -translate-x-[250%] translate-y-16 pointer-events-none`;
    } 
    else if (offset > 1) {
      return `${baseClass} z-10 opacity-0 scale-[0.6] translate-x-[150%] translate-y-16 pointer-events-none`;
    }
  };

  const handleCardClick = (e, offset, index) => {
    if (offset !== 0) {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  return (
    // Removed the border-t here so it blends perfectly with the section above
    <section className="w-full bg-[#090B24] py-24 overflow-hidden relative">
      
      <div 
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-12 h-1.5 bg-[#EF7D20] rounded-full mb-6"></div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white text-center tracking-wider uppercase drop-shadow-lg">
            Featured Events
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-[380px] md:h-[480px] lg:h-[580px] flex justify-center items-center mt-10">
          
          {eventsData.map((event, index) => {
            const offset = getOffset(index);
            
            return (
              <a 
                key={event.id} 
                href={event.link}
                onClick={(e) => handleCardClick(e, offset, index)}
                className={getCardStyles(offset)}
              >
                <img 
                  src={event.img} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                
                <div className={`absolute inset-0 bg-gradient-to-t from-[#1E2265]/95 via-[#1E2265]/30 to-transparent flex items-end p-6 md:p-8 transition-opacity duration-500 ${offset === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl drop-shadow-md leading-tight">
                    {event.title}
                  </h3>
                </div>
              </a>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide} 
          className="absolute left-2 lg:left-8 xl:left-16 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-[#EF7D20] hover:border-[#EF7D20] text-white rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <FiChevronLeft size={28} />
        </button>

        <button 
          onClick={nextSlide} 
          className="absolute right-2 lg:right-8 xl:right-16 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-[#EF7D20] hover:border-[#EF7D20] text-white rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <FiChevronRight size={28} />
        </button>

      </div>
    </section>
  );
}