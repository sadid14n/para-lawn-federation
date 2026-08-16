import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export default function WelcomeSection() {
  return (
    <section className="relative w-full bg-white pt-16 md:pt-24 pb-20 md:pb-32 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GRID: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* ================= LEFT: DUAL IMAGE COMPOSITION ================= */}
          <div className="relative z-20 order-2 lg:order-1 mt-8 lg:mt-0 pr-4 sm:pr-10">
            
            {/* Decorative Dot Pattern (Background) */}
            <div 
              className="absolute -top-6 -left-6 w-32 h-32 opacity-20 z-0"
              style={{ backgroundImage: 'radial-gradient(#1E2265 2px, transparent 2px)', backgroundSize: '16px 16px' }}
            ></div>

            {/* Primary Image (Back) */}
            <div className="relative w-[85%] md:w-[80%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(30,34,101,0.15)] z-10 bg-gray-100">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZaneo6zTGDN4t454nGduNWSWKnkFn7uPub97ENu_Tzw&s=10" 
                alt="Para Lawn Bowls Athletes" 
                className="w-full h-auto aspect-square md:aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Secondary Image (Front/Overlapping) */}
            <div className="absolute -bottom-10 right-0 md:-bottom-16 md:-right-4 w-[60%] md:w-[55%] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-[6px] md:border-8 border-white z-20 bg-gray-100">
              <img 
                src="https://media.gettyimages.com/id/136591923/photo/older-women-playing-lawn-bowling.jpg?s=612x612&w=0&k=20&c=XGAzgjoLX_zDiRxWBRc9hHHRKqq55_j2xLwS86SOT3Y=" 
                alt="Lawn Bowls Action Close Up" 
                className="w-full h-auto aspect-square object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>

          {/* ================= RIGHT: TEXT CONTENT ================= */}
          <div className="order-1 lg:order-2">
            
            {/* Aesthetic Eyebrow Text (Saffron Orange) */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-[#EF7D20] rounded-full mr-4"></div>
              <h3 className="text-[#EF7D20] font-extrabold tracking-[0.2em] text-sm md:text-base uppercase">
                Welcome To PILBF
              </h3>
            </div>
            
            {/* Main Headline (Navy Blue with Orange Gradient) */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1E2265] mb-8 leading-[1.15] tracking-tight">
              Making Lawn Bowls <br className="hidden lg:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E2265] to-[#EF7D20]">
                Accessible To All.
              </span>
            </h2>
            
            {/* Mission Statement */}
            <div className="text-gray-600 space-y-6 mb-12 text-base md:text-lg lg:text-xl leading-relaxed">
              <p>
                <strong className="text-[#1E2265]">The Para Indian Lawn Bowls Federation (PILBF)</strong> is the official governing body dedicated to empowering athletes with physical and visual impairments through the sport of lawn bowls.
              </p>
              <p>
                From grassroots development to the international stage, we provide the <strong className="text-[#228B45]">structure, adaptive equipment, and pathways</strong> needed for every aspiring athlete to compete with pride and excellence.
              </p>
            </div>

            {/* Aesthetic Button (Navy Blue -> Orange Hover) */}
            <Link 
              href="/about" 
              className="inline-flex items-center bg-[#1E2265] text-white px-8 py-4 font-bold text-base md:text-lg rounded-full hover:bg-[#EF7D20] hover:shadow-[0_10px_20px_rgba(239,125,32,0.3)] hover:-translate-y-1 transition-all duration-300 group"
            >
              Our Mission
              <div className="ml-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                <FiChevronRight className="text-white group-hover:text-[#EF7D20] transition-colors duration-300" size={18} />
              </div>
            </Link>
            
          </div>

        </div>
      </div>
    </section>
  );
}