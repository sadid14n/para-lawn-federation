import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export default function WelcomeSection() {
  return (
    <section className="relative w-full bg-white pt-16 md:pt-24 pb-8 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GRID: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: IMAGE CONTAINER (The "Spill-out" Effect) */}
          <div className="relative z-20 order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="relative -mb-16 lg:-mb-32 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden bg-gray-100">
              {/* Image showing Para athletes in action */}
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop" 
                alt="Para Lawn Bowls Athletes" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* RIGHT: TEXT CONTENT */}
          <div className="order-1 lg:order-2">
            
            {/* Aesthetic Eyebrow Text */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-[#E62227] rounded-full mr-4"></div>
              <h3 className="text-[#E62227] font-extrabold tracking-[0.2em] text-sm md:text-base uppercase">
                Welcome To PLBFI
              </h3>
            </div>
            
            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1242] mb-8 leading-[1.15] tracking-tight">
              Making Lawn Bowls <br className="hidden lg:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B1242] to-[#E62227]">
                Accessible To All.
              </span>
            </h2>
            
            {/* Mission Statement */}
            <div className="text-gray-600 space-y-6 mb-12 text-base md:text-lg lg:text-xl leading-relaxed">
              <p>
                <strong className="text-[#0B1242]">The Para Lawn Bowls Federation of India (PLBFI)</strong> is the official governing body dedicated to empowering athletes with physical and visual impairments through the sport of lawn bowls.
              </p>
              <p>
                From grassroots development to the international stage, we provide the <strong className="text-[#0B1242]">structure, adaptive equipment, and pathways</strong> needed for every aspiring athlete to compete with pride and excellence.
              </p>
            </div>

            {/* Aesthetic Button */}
            <Link 
              href="/about" 
              className="inline-flex items-center bg-[#0B1242] text-white px-8 py-4 font-bold text-base md:text-lg rounded-full hover:bg-[#E62227] hover:shadow-[0_10px_20px_rgba(230,34,39,0.3)] hover:-translate-y-1 transition-all duration-300 group"
            >
              Our Mission
              <div className="ml-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                <FiChevronRight className="text-white group-hover:text-[#E62227] transition-colors duration-300" size={18} />
              </div>
            </Link>
            
          </div>

        </div>
      </div>
    </section>
  );
}