import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export default function WelcomeSection() {
  return (
    <section className="relative w-full bg-white pt-16 md:pt-24 pb-20 md:pb-32 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ================= LEFT: DUAL IMAGE COMPOSITION ================= */}
          <div className="relative z-20 order-2 lg:order-1 mt-8 lg:mt-0 pr-4 sm:pr-10">

            <div
              className="absolute -top-6 -left-6 w-32 h-32 opacity-20 z-0"
              style={{ backgroundImage: 'radial-gradient(#1E2265 2px, transparent 2px)', backgroundSize: '16px 16px' }}
            ></div>

            <div className="relative w-[85%] md:w-[80%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(30,34,101,0.15)] z-10 bg-off-white">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZaneo6zTGDN4t454nGduNWSWKnkFn7uPub97ENu_Tzw&s=10"
                alt="Para Lawn Bowls Athletes"
                className="w-full h-auto aspect-square md:aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute -bottom-10 right-0 md:-bottom-16 md:-right-4 w-[60%] md:w-[55%] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-[6px] md:border-8 border-white z-20 bg-off-white">
              <img
                src="https://media.gettyimages.com/id/136591923/photo/older-women-playing-lawn-bowling.jpg?s=612x612&w=0&k=20&c=XGAzgjoLX_zDiRxWBRc9hHHRKqq55_j2xLwS86SOT3Y="
                alt="Lawn Bowls Action Close Up"
                className="w-full h-auto aspect-square object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>

          {/* ================= RIGHT: TEXT CONTENT ================= */}
          <div className="order-1 lg:order-2">

            {/* Eyebrow — accent color reserved as the site's single "highlight" tone */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-accent rounded-full mr-4"></div>
              <h3 className="text-accent font-bold tracking-[0.25em] text-xs md:text-sm uppercase">
                Welcome to PILBF
              </h3>
            </div>

            {/* Headline — display font, single solid accent color instead of a gradient */}
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-navy mb-8 leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl">
              Making lawn bowls {" "}
              <br className="hidden lg:block" />
              <span className="text-accent">accessible to all.</span>
            </h2>

            {/* Body copy — plain gray, navy used for emphasis instead of a second accent color */}
            <div className="text-gray-600 space-y-6 mb-12 text-base md:text-lg leading-relaxed font-medium">
              <p>
                <strong className="text-navy">The Para Indian Lawn Bowls Federation (PILBF)</strong> is the official governing body dedicated to empowering athletes with physical and visual impairments through the sport of lawn bowls.
              </p>
              <p>
                From grassroots development to the international stage, we provide the <strong className="text-navy">structure, adaptive equipment, and pathways</strong> needed for every aspiring athlete to compete with pride and excellence.
              </p>
            </div>

            {/* Button — standard site-wide primary pill: accent fill, no navy/orange hover-swap */}
            <Link
              href="/about"
              className="inline-flex items-center bg-accent text-white px-8 py-4 font-bold text-sm md:text-base rounded-full hover:bg-accent-dark hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(239,125,32,0.3)] group"
            >
              Our Mission
              <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}