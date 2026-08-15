'use client';

import Link from 'next/link';
import { FaHandPointRight } from 'react-icons/fa6';
import { FiBell } from 'react-icons/fi'; 

// Updated content to match PLBFI
const notifications = [
  { id: 1, text: "Guidelines For Athlete Classification & Adaptive Equipment 2026 Released", link: "#" },
  { id: 2, text: "Upcoming National Para Lawn Bowls Championship Registration Now Open", link: "#" },
  { id: 3, text: "Assam State Trials Finalized for Asian Games Selection", link: "#" },
  { id: 4, text: "New IBD Rule Updates for Visually Impaired Categories", link: "#" },
];

export default function NewsTicker() {
  // We duplicate the array to create a seamless infinite scroll effect
  const tickerItems = [...notifications, ...notifications, ...notifications];

  return (
    <div className="relative w-full bg-[#0B1242] border-b-4 border-[#E62227] flex flex-col md:flex-row items-center overflow-hidden shadow-md">
      
      {/* ================= MOBILE STATIC BADGE (Top Bar) ================= */}
      {/* This only shows on mobile screens and sits neatly above the scrolling text */}
      <div className="md:hidden w-full bg-[#E62227] text-white font-bold text-[10px] py-1.5 flex items-center justify-center z-20 shadow-sm tracking-widest uppercase">
        <FiBell className="mr-2 animate-pulse" size={12} />
        Latest Federation Updates
      </div>

      {/* ================= DESKTOP STATIC BADGE (Left Overlay) ================= */}
      {/* This only shows on tablet/desktop and uses the cool slanted design */}
      <div className="hidden md:flex absolute left-0 top-0 h-full bg-[#E62227] text-white font-bold text-sm px-6 items-center z-10 shadow-[5px_0_15px_rgba(0,0,0,0.3)] whitespace-nowrap clip-path-slant-right">
        <FiBell className="mr-2 animate-pulse" size={16} />
        LATEST UPDATES
      </div>

      {/* ================= SCROLLING CONTENT ================= */}
      {/* 
        h-10 on mobile, h-12 on desktop. 
        Full width allowed on mobile, but pushed to the right (pl-56) on desktop to clear the badge.
      */}
      <div className="flex w-full h-10 md:h-12 items-center overflow-hidden">
        {/* Added group-hover to pause animation when user tries to read/click a link */}
        <div className="flex pl-4 md:pl-56 w-max animate-ticker hover:[animation-play-state:paused] transition-all">
          {tickerItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.link}
              className="flex items-center text-white text-xs sm:text-sm md:text-base font-medium hover:text-[#E62227] transition-colors duration-200 mx-6 whitespace-nowrap"
            >
              <FaHandPointRight className="text-[#E62227] mr-2 md:mr-3 shrink-0" size={16} />
              {item.text}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}