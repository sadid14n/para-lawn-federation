"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const eventsData = [
  {
    id: 1,
    title: "4th National Para Lawn Bowls Championship (Solapur)",
    img: "https://media.gettyimages.com/id/458310987/photo/lawn-bowling.jpg?s=612x612&w=0&k=20&c=z-EGRqGwuXbCaGw08lH3yCYT4x26F_puJqGlnMwXyHA=",
    link: "#",
  },
  {
    id: 2,
    title: "Assam State Para Bowls Trials (Guwahati)",
    img: "https://media.gettyimages.com/id/1412833712/photo/leamington-spa-england-jamie-walker-of-team-england-competes-during-mens-singles-section-c.jpg?s=612x612&w=0&k=20&c=07AoVNx96RPUXNgx2qsKaabXnGVcag3wtMRj7-fD-rI=",
    link: "#",
  },
  {
    id: 3,
    title: "Para Asian Games Selection Camp",
    img: "https://media.gettyimages.com/id/904234186/photo/two-senior-women-playing-bowls.jpg?s=612x612&w=0&k=20&c=UQXcduEURxhiNnZCOFSjN1ilFLRBQgWL0uzcIiVsQ9Q=",
    link: "#",
  },
  {
    id: 4,
    title: "National Coaching & Referee Certification",
    img: "https://media.gettyimages.com/id/2275490354/photo/group-of-active-seniors-lawn-bowling-playing-bowls-in-the-uk.jpg?s=612x612&w=0&k=20&c=nTfiLaW9s9gbJS40KEYE6PFuC9DaPDahgiXRMs-MHGI=",
    link: "#",
  },
];

const REAL_LENGTH = eventsData.length;
const extendedEvents = [
  eventsData[REAL_LENGTH - 1],
  ...eventsData,
  eventsData[0],
];
const TRANSITION_MS = 700;

function getCardStyles(distance) {
  const base =
    "absolute top-0 left-1/2 w-[260px] md:w-[300px] lg:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)]";

  if (distance === 0) {
    return `${base} z-30 opacity-100 scale-100 -translate-x-1/2 -translate-y-4 md:-translate-y-8 brightness-100 shadow-[0_30px_60px_rgba(0,0,0,0.6)]`;
  }
  if (distance === -1) {
    return `${base} z-20 opacity-100 scale-[0.8] -translate-x-[calc(50%+100vw)] md:-translate-x-[155%] translate-y-6 md:translate-y-10 brightness-[0.28] cursor-pointer`;
  }
  if (distance === 1) {
    return `${base} z-20 opacity-100 scale-[0.8] translate-x-[calc(-50%+100vw)] md:translate-x-[55%] translate-y-6 md:translate-y-10 brightness-[0.28] cursor-pointer`;
  }
  if (distance < -1) {
    return `${base} z-10 opacity-0 scale-[0.6] translate-y-16 pointer-events-none -translate-x-[calc(50%+200vw)]`;
  }
  return `${base} z-10 opacity-0 scale-[0.6] translate-y-16 pointer-events-none translate-x-[calc(-50%+200vw)]`;
}

export default function HotEvents() {
  const [position, setPosition] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isSnapping = useRef(false);

  const goTo = useCallback((next) => {
    if (isSnapping.current) return;
    setWithTransition(true);
    setPosition(next);
  }, []);

  const nextSlide = useCallback(() => goTo(position + 1), [goTo, position]);
  const prevSlide = useCallback(() => goTo(position - 1), [goTo, position]);

  useEffect(() => {
    if (position !== 0 && position !== extendedEvents.length - 1) return;
    isSnapping.current = true;
    const timeout = setTimeout(() => {
      setWithTransition(false);
      setPosition(position === 0 ? REAL_LENGTH : 1);
    }, TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [position]);

  useEffect(() => {
    if (withTransition) return;
    const raf = requestAnimationFrame(() => {
      setWithTransition(true);
      isSnapping.current = false;
    });
    return () => cancelAnimationFrame(raf);
  }, [withTransition]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 2500);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  const handleCardClick = (e, distance, index) => {
    if (distance !== 0) {
      e.preventDefault();
      goTo(index);
    }
  };

  return (
    // Same navy-dark token StatsSection's bottom half uses — the two
    // sections now share an identical background, so the seam between
    // them disappears and they read as one continuous dark zone.
    <section className="w-full bg-navy-dark py-24 overflow-hidden relative">
      <div
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center mb-16">
          <div className="w-12 h-1.5 bg-accent rounded-full mb-6"></div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl md:text-4xl lg:text-5xl text-white text-center tracking-tight">
            Featured Events
          </h2>
        </div>

        <div className="relative w-full h-[380px] md:h-[440px] lg:h-[520px] flex justify-center items-center mt-10">
          {extendedEvents.map((event, i) => {
            const distance = i - position;

            return (
              <a
                key={`${event.id}-${i}`}
                href={event.link}
                onClick={(e) => handleCardClick(e, distance, i)}
                className={getCardStyles(distance)}
                style={{
                  transitionDuration: withTransition
                    ? `${TRANSITION_MS}ms`
                    : "0ms",
                }}
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent flex items-end p-6 md:p-8 transition-opacity duration-500 ${
                    distance === 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-white text-xl md:text-2xl lg:text-3xl drop-shadow-md leading-tight">
                    {event.title}
                  </h3>
                </div>
              </a>
            );
          })}

          <button
            onClick={prevSlide}
            aria-label="Previous event"
            className="absolute left-1 md:left-0 lg:-left-10 top-1/2 -translate-y-1/2 z-40 w-9 h-9 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 bg-transparent border-0 shadow-none md:bg-white/[0.08] md:hover:bg-accent md:border md:border-white/15 md:hover:border-accent md:backdrop-blur-md md:rounded-full md:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          >
            <FiChevronLeft
              size={26}
              className="md:hidden drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
            />
            <FiChevronLeft size={26} className="hidden md:block" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next event"
            className="absolute right-1 md:right-0 lg:-right-10 top-1/2 -translate-y-1/2 z-40 w-9 h-9 md:w-13 md:h-13 lg:w-14 lg:h-14 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 bg-transparent border-0 shadow-none md:bg-white/[0.08] md:hover:bg-accent md:border md:border-white/15 md:hover:border-accent md:backdrop-blur-md md:rounded-full md:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          >
            <FiChevronRight
              size={26}
              className="md:hidden drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
            />
            <FiChevronRight size={26} className="hidden md:block" />
          </button>
        </div>
      </div>
    </section>
  );
}