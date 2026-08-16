'use client';

import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

// Updated to reflect Para Lawn Bowls and related governing bodies
const memberLogos = [
  { id: 1, name: 'International Bowls for the Disabled', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUkzpng-nI3XUpIYX_Hfegxg7w707p1PCn5idxpjdXpg&s' },
  { id: 2, name: 'Bowling Federation of India', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6qkuifCU88jv2g4g0N_JrbA7deOmc-gdCSBuw8GCswA&s=10' },
  { id: 3, name: 'Para Lawn Bowls Federation of India', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ragHuakHupZOcBlvCXifPjXa-BzZnKQzyxhqKYgWRQ&s=10' }, 
  { id: 4, name: 'Paralympic Committee of India', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJbCBFu84ShS3SsHLmmcM9pubkvIJO4CnMPKAw_r2aTA&s=10' },
];

export default function MembersAndCTA() {
  // Double the array to create a seamless scrolling marquee effect
  const marqueeLogos = [...memberLogos, ...memberLogos, ...memberLogos];

  return (
    <div className="w-full flex flex-col">
      
      {/* ================= TOP SECTION: AFFILIATIONS ================= */}
      {/* Background updated to Deep Navy Blue, Bottom Border updated to Forest Green */}
      <section className="relative bg-[#1E2265] py-20 md:py-28 overflow-hidden border-b-[6px] border-[#228B45]">
        
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            {/* Eyebrow Accent updated to Saffron Orange */}
            <span className="h-px w-8 bg-[#EF7D20]"></span>
            <span className="text-[#EF7D20] font-bold tracking-[0.2em] uppercase text-sm">
              Global & National Network
            </span>
            <span className="h-px w-8 bg-[#EF7D20]"></span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Official Affiliations
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Proudly recognized by the <strong className="text-white">International Bowls for the Disabled (IBD)</strong>. We work in tandem with national sporting bodies to provide an official, globally recognized pathway for our athletes.
          </p>
        </div>

        {/* Auto-Scrolling Marquee for Logos */}
        <div className="relative z-10 flex overflow-hidden w-full group">
          {/* Gradient masks updated to Deep Navy Blue for smooth fading */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#1E2265] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#1E2265] to-transparent z-20 pointer-events-none"></div>

          <div className="flex w-max animate-ticker items-center group-hover:[animation-play-state:paused] transition-all">
            {marqueeLogos.map((logo, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 w-48 h-28 md:w-64 md:h-36 mx-4 flex items-center justify-center p-6 rounded-2xl hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0"
              >
                <img 
                  src={logo.img} 
                  alt={logo.name} 
                  title={logo.name}
                  className="max-w-full max-h-full object-contain drop-shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= BOTTOM SECTION: PARALLAX CTA ================= */}
      <section 
        className="relative py-28 md:py-40 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{ 
          // Beautiful green lawn bowls aesthetic image
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOTj6MdP8sterS6C6ZpJ1vhLxuwYAwDU-5Wj0QL6gAqg&s=10')" 
        }}
      >
        {/* Dark Overlay updated to Deep Navy Blue */}
        <div className="absolute inset-0 bg-[#1E2265]/80 md:bg-gradient-to-r md:from-[#1E2265]/95 md:via-[#1E2265]/80 md:to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between">
          
          {/* Left Text */}
          <div className="max-w-2xl text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight uppercase">
              Join the Movement. <br />
              {/* Highlight text updated to Saffron Orange */}
              <span className="text-[#EF7D20]">Represent India.</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-light">
              Whether you are an aspiring para-athlete, a passionate coach, or a dedicated volunteer, there is a place for you on the green.
            </p>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            {/* Primary Button updated to Saffron Orange with matching glow */}
            <Link 
              href="/register" 
              className="group flex items-center justify-center bg-[#EF7D20] text-white px-8 py-4 font-bold text-base hover:bg-[#d66a15] transition-all duration-300 shadow-[0_10px_20px_rgba(239,125,32,0.3)] hover:shadow-[0_15px_30px_rgba(239,125,32,0.5)] rounded-full hover:-translate-y-1"
            >
              Register as Athlete
              <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            
            {/* Secondary Button hover text updated to Deep Navy Blue */}
            <Link 
              href="/contact" 
              className="group flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 font-bold text-base hover:bg-white hover:text-[#1E2265] transition-all duration-300 rounded-full hover:-translate-y-1"
            >
              Contact Federation
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}