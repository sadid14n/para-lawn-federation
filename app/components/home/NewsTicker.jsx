'use client';

import Link from 'next/link';
import { FaHandPointRight } from 'react-icons/fa6';
import { FiBell } from 'react-icons/fi';

const notifications = [
  { id: 1, text: "Guidelines For Athlete Classification & Adaptive Equipment 2026 Released", link: "#" },
  { id: 2, text: "Upcoming National Para Lawn Bowls Championship Registration Now Open", link: "#" },
  { id: 3, text: "Assam State Trials Finalized for Asian Games Selection", link: "#" },
  { id: 4, text: "New IBD Rule Updates for Visually Impaired Categories", link: "#" },
];

export default function NewsTicker() {
  const tickerItems = [...notifications, ...notifications, ...notifications];

  return (
    <div className="relative w-full bg-navy-dark border-b-4 border-accent flex flex-col md:flex-row items-center overflow-hidden shadow-md">

      {/* ================= MOBILE STATIC BADGE (Top Bar) ================= */}
      <div className="md:hidden w-full bg-accent text-white font-bold text-[10px] py-1.5 flex items-center justify-center z-20 shadow-sm tracking-widest uppercase">
        <FiBell className="mr-2 animate-pulse" size={12} />
        Latest Federation Updates
      </div>

      {/* ================= DESKTOP STATIC BADGE (Left Overlay) ================= */}
      <div className="hidden md:flex absolute left-0 top-0 h-full bg-accent text-white font-bold text-sm px-6 items-center z-10 shadow-[5px_0_15px_rgba(0,0,0,0.3)] whitespace-nowrap clip-path-slant-right">
        <FiBell className="mr-2 animate-pulse" size={16} />
        LATEST UPDATES
      </div>

      {/* ================= SCROLLING CONTENT ================= */}
      <div className="flex w-full h-10 md:h-12 items-center overflow-hidden">
        <div className="flex pl-4 md:pl-56 w-max animate-ticker hover:[animation-play-state:paused] transition-all">
          {tickerItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center text-white text-xs sm:text-sm md:text-base font-medium hover:text-accent transition-colors duration-200 mx-6 whitespace-nowrap"
            >
              <FaHandPointRight className="text-accent mr-2 md:mr-3 shrink-0" size={16} />
              {item.text}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}