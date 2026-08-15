import Link from 'next/link';
import { FaHandPointRight } from 'react-icons/fa6';
import { FiBell } from 'react-icons/fi'; // Using a bell for the static badge

const notifications = [
  { id: 1, text: "Changes For Renewal Of GFI Licence", link: "#" },
  { id: 2, text: "Letter For All GFI Members", link: "#" },
  { id: 3, text: "Upcoming National Championship Registration Now Open", link: "#" },
  { id: 4, text: "New Guidelines for Referee Certification 2026", link: "#" },
];

export default function NewsTicker() {
  // We duplicate the array to create a seamless infinite scroll effect
  const tickerItems = [...notifications, ...notifications, ...notifications];

  return (
    <div className="relative w-full bg-[#0B1242] border-b-4 border-[#E62227] flex items-center h-12 overflow-hidden shadow-md">
      
      {/* STATIC BADGE (Left Side) - Adds a premium look */}
      <div className="absolute left-0 top-0 h-full bg-[#E62227] text-white font-bold text-xs sm:text-sm px-4 md:px-6 flex items-center z-10 shadow-[5px_0_15px_rgba(0,0,0,0.3)] whitespace-nowrap clip-path-slant-right">
        <FiBell className="mr-2 animate-pulse" size={16} />
        LATEST UPDATES
      </div>

      {/* SCROLLING CONTENT */}
      {/* The padding-left ensures the text doesn't hide under the static badge initially */}
      <div className="flex pl-40 md:pl-56 w-max animate-ticker">
        {tickerItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.link}
            className="flex items-center text-white text-sm md:text-base font-medium hover:text-[#E62227] transition-colors duration-200 mx-6 whitespace-nowrap"
          >
            <FaHandPointRight className="text-[#E62227] mr-3" size={18} />
            {item.text}
          </Link>
        ))}
      </div>

    </div>
  );
}