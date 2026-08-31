"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const memberLogos = [
  {
    id: 1,
    name: "International Bowls for the Disabled",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUkzpng-nI3XUpIYX_Hfegxg7w707p1PCn5idxpjdXpg&s",
  },
  {
    id: 2,
    name: "Bowling Federation of India",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6qkuifCU88jv2g4g0N_JrbA7deOmc-gdCSBuw8GCswA&s=10",
  },
  {
    id: 3,
    name: "Para Lawn Bowls Federation of India",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ragHuakHupZOcBlvCXifPjXa-BzZnKQzyxhqKYgWRQ&s=10",
  },
  {
    id: 4,
    name: "Paralympic Committee of India",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJbCBFu84ShS3SsHLmmcM9pubkvIJO4CnMPKAw_r2aTA&s=10",
  },
];

export default function MembersAndCTA() {
  const marqueeLogos = [...memberLogos, ...memberLogos, ...memberLogos];

  return (
    <div className="w-full flex flex-col">
      {/* Border swapped from green to accent — border-b now marks a
          transition point using the site's one accent color, not a
          second color that only appeared here */}
      <section className="relative bg-navy py-20 md:py-28 overflow-hidden border-b-[6px] border-accent">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="h-px w-8 bg-accent"></span>
            <span className="text-accent font-bold tracking-[0.25em] uppercase text-xs">
              Global & National Network
            </span>
            <span className="h-px w-8 bg-accent"></span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-white tracking-tight mb-6 text-3xl md:text-5xl">
            Official affiliations
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Proudly recognized by the{" "}
            <strong className="text-white">
              International Bowls for the Disabled (IBD)
            </strong>
            . We work in tandem with national sporting bodies to provide an
            official, globally recognized pathway for our athletes.
          </p>
        </div>

        {/* Auto-Scrolling Marquee for Logos */}
        <div className="relative z-10 flex overflow-hidden w-full group">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-navy to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-navy to-transparent z-20 pointer-events-none"></div>

          <div className="flex w-max animate-ticker items-center group-hover:[animation-play-state:paused] transition-all">
            {marqueeLogos.map((logo, index) => (
              <div
  key={index}
  className="w-24 h-16 md:w-72 md:h-40 mx-1 md:mx-6 flex items-center justify-center p-2 md:p-8 cursor-pointer transition-transform duration-300 ease-out hover:scale-110"
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

      <section
        className="relative py-28 md:py-40 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOTj6MdP8sterS6C6ZpJ1vhLxuwYAwDU-5Wj0QL6gAqg&s=10')",
        }}
      >
        <div className="absolute inset-0 bg-navy/80 md:bg-gradient-to-r md:from-navy/95 md:via-navy/80 md:to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-2xl text-center md:text-left mb-10 md:mb-0">
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-white mb-6 leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl">
              Join the movement. <br />
              <span className="text-accent">Represent India.</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-medium">
              Whether you are an aspiring para-athlete, a passionate coach, or a
              dedicated volunteer, there is a place for you on the green.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/register"
              className="group flex items-center justify-center bg-accent text-white px-8 py-4 font-bold text-base hover:bg-accent-dark transition-all duration-300 shadow-[0_10px_20px_rgba(239,125,32,0.3)] hover:shadow-[0_15px_30px_rgba(239,125,32,0.5)] rounded-full hover:-translate-y-1"
            >
              Register as Athlete
            </Link>

            <Link
              href="/contact"
              className="group flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 font-bold text-base hover:bg-white hover:text-navy transition-all duration-300 rounded-full hover:-translate-y-1"
            >
              Contact Federation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}