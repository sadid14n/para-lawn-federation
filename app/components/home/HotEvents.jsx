'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const eventsData = [
  {
    id: 1,
    title: '4th National Para Lawn Bowls Championship (Solapur)',
    img: 'https://images.unsplash.com/photo-1599058917212-32cd24bc61be?q=80&w=600&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 2,
    title: 'Assam State Para Bowls Trials (Guwahati)',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 3,
    title: 'Para Asian Games Selection Camp',
    img: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 4,
    title: 'National Coaching & Referee Certification',
    img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 5,
    title: 'All-India Inter-State Para Bowls Tournament',
    img: 'https://images.unsplash.com/photo-1526676537331-7bc28f731a57?q=80&w=600&auto=format&fit=crop',
    link: '#',
  }
];

export default function HotEvents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const length = eventsData.length;

  // Next and Previous handlers
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + length) % length);

  // Auto-scrolling interval
  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const timer = setInterval(() => {
      nextSlide();
    }, 1500); // Swipes every 1.5 seconds

    return () => clearInterval(timer);
  }, [isHovered]);

  // Calculates the circular offset of each card relative to the active card
  const getOffset = (index) => {
    let offset = (index - activeIndex) % length;
    // Normalize negative numbers
    if (offset < 0) offset += length;
    // Shift so that offsets go from -half to +half
    if (offset > Math.floor(length / 2)) {
      offset -= length;
    }
    return offset;
  };

  // Maps the offset to specific 3D animation classes
  const getCardStyles = (offset) => {
    const baseClass = "absolute top-0 left-1/2 w-[260px] md:w-[320px] lg:w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] origin-center";

    if (offset === 0) {
      // MIDDLE CARD (Elevated, Scaled up, Centered)
      return `${baseClass} z-30 opacity-100 scale-100 -translate-x-1/2 -translate-y-4 md:-translate-y-8 brightness-100`;
    } 
    else if (offset === -1) {
      // LEFT CARD (Lowered, Scaled down, Pushed Left to create a gap)
      // -translate-x-[160%] ensures it clears the middle card's left edge perfectly
      return `${baseClass} z-20 opacity-80 scale-[0.85] -translate-x-[155%] md:-translate-x-[160%] translate-y-6 md:translate-y-10 brightness-50 hover:brightness-75 cursor-pointer`;
    } 
    else if (offset === 1) {
      // RIGHT CARD (Lowered, Scaled down, Pushed Right to create a gap)
      // translate-x-[60%] ensures it clears the middle card's right edge perfectly
      return `${baseClass} z-20 opacity-80 scale-[0.85] translate-x-[55%] md:translate-x-[60%] translate-y-6 md:translate-y-10 brightness-50 hover:brightness-75 cursor-pointer`;
    } 
    else if (offset < -1) {
      // HIDDEN FAR LEFT (Invisible, scaling down as it exits)
      return `${baseClass} z-10 opacity-0 scale-[0.6] -translate-x-[250%] translate-y-16 pointer-events-none`;
    } 
    else if (offset > 1) {
      // HIDDEN FAR RIGHT (Invisible, scaling down as it exits)
      return `${baseClass} z-10 opacity-0 scale-[0.6] translate-x-[150%] translate-y-16 pointer-events-none`;
    }
  };

  // Handle clicking on side cards to bring them to the center
  const handleCardClick = (e, offset, index) => {
    if (offset !== 0) {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  return (
    <section className="w-full bg-[#1A1A1A] py-24 overflow-hidden relative">
      
      <div 
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white text-center mb-16 tracking-wider uppercase drop-shadow-lg">
          Featured Events
        </h2>

        {/* Carousel Container (Fixed height to support absolute positioning) */}
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
                {/* Event Poster Image */}
                <img 
                  src={event.img} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Title Overlay (Only shows perfectly on the center card) */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#050A24]/90 via-[#050A24]/20 to-transparent flex items-end p-6 transition-opacity duration-500 ${offset === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-md">
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
          className="absolute left-2 lg:left-8 xl:left-16 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-[#E62227] text-white rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <FiChevronLeft size={28} />
        </button>

        <button 
          onClick={nextSlide} 
          className="absolute right-2 lg:right-8 xl:right-16 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-[#E62227] text-white rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <FiChevronRight size={28} />
        </button>

      </div>
    </section>
  );
}