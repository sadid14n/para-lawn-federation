'use client';

import Link from 'next/link';
import { FiChevronRight, FiUsers } from 'react-icons/fi';
import { FaCircleChevronRight } from 'react-icons/fa6'; 

// Updated for PILBF News/Events
const newsData = [
  {
    id: 1,
    title: '4th National Para Lawn Bowls Championship Concludes in Solapur',
    day: '26',
    month: 'MAR',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjzJKOes13-6LSZXsYAOAVwr1bzG-1Z_9igQoO8QLSw&s=10',
    link: '#'
  },
  {
    id: 2,
    title: 'Assam State Trials Finalized for Upcoming Asian Games Selection',
    day: '15',
    month: 'MAY',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6PF9oxtwKKR8i7wrq0Bzdkgl1RqkUUpIDXLjxv5hbGQ&s=10',
    link: '#'
  },
  {
    id: 3,
    title: 'New Adaptive Equipment Guidelines Released by IBD',
    day: '02',
    month: 'JUN',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAhF5AyKOcPN0oz9rPaCk_Dk1mcQMxLbnEaQ0mIxkrlw&s=10',
    link: '#'
  }
];

// Placeholder array for official partners/sponsors of Para Lawn Bowls
const sponsors = [
  { id: 1, name: 'Taylor Bowls' },
  { id: 2, name: 'Henselite' },
  { id: 3, name: 'Aero Bowls' },
  { id: 4, name: 'Drakes Pride' },
  { id: 5, name: 'Sports Authority of India' },
];

export default function LatestNews() {
  return (
    <section className="w-full bg-[#FAFAFA] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ================= HEADER: TITLE & VIEW ALL ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              {/* Eyebrow Accent - Forest Green */}
              <span className="h-px w-8 bg-[#228B45]"></span>
              <span className="text-[#228B45] font-bold tracking-[0.2em] uppercase text-sm">
                Federation Updates
              </span>
            </div>
            {/* Main Title - Deep Navy Blue */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1E2265] leading-[1.1] tracking-tight">
              Latest News <br className="hidden md:block" /> & Announcements
            </h2>
          </div>
          
          <Link 
            href="/news" 
            className="group inline-flex items-center justify-center bg-white border-2 border-gray-100 text-[#1E2265] px-8 py-4 mt-8 md:mt-0 font-bold text-sm hover:border-[#1E2265] hover:bg-[#1E2265] hover:text-white transition-all duration-300 rounded-full shadow-sm hover:shadow-xl"
          >
            View All Updates
            <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </div>

        {/* ================= EDITORIAL NEWS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-28">
          {newsData.map((news) => (
            <div key={news.id} className="flex flex-col group cursor-pointer h-full">
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-[1.5rem] mb-6 aspect-[4/3] bg-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_rgba(30,34,101,0.15)] transition-all duration-500">
                <img 
                  src={news.img} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Deep Navy overlay gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1E2265]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Floating Date Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1E2265] flex flex-col items-center justify-center min-w-[3.5rem] py-2 px-3 rounded-xl shadow-lg border border-white">
                  <span className="text-2xl font-black leading-none">{news.day}</span>
                  {/* Month text - Saffron Orange */}
                  <span className="text-[10px] font-bold text-[#EF7D20] uppercase tracking-widest mt-1">{news.month}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow pr-4">
                {/* Hover title - Forest Green */}
                <h3 className="font-extrabold text-xl md:text-2xl text-[#1E2265] mb-5 group-hover:text-[#228B45] transition-colors duration-300 line-clamp-3 leading-snug">
                  {news.title}
                </h3>
                
                <Link href={news.link} className="inline-flex items-center text-sm font-bold text-gray-500 group-hover:text-[#1E2265] mt-auto uppercase tracking-wider transition-colors duration-300">
                  Read Full Story 
                  {/* Icon - Saffron Orange */}
                  <FaCircleChevronRight className="ml-3 text-[#EF7D20] group-hover:translate-x-2 transition-transform duration-300" size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PREMIUM REGISTRATION BANNER ================= */}
        {/* ================= REGISTRATION BANNER ================= */}
<div className="relative w-full rounded-[2rem] lg:rounded-[2.5rem] bg-[#1E2265] overflow-hidden mb-24">

  {/* Single soft ambient glow — subtle, not competing with the content */}
  <div className="absolute -bottom-40 -right-40 w-[36rem] h-[36rem] bg-[#EF7D20] rounded-full mix-blend-screen filter blur-[140px] opacity-20"></div>

  {/* Faint watermark text — kept, but toned down further */}
  <div className="absolute -bottom-6 -right-4 text-[100px] md:text-[160px] font-black text-white/[0.03] tracking-tighter leading-none pointer-events-none select-none">
    PILBF
  </div>

  {/* Rolling ball accent line — pure CSS, no 3D, no JS. A small dot rolls
      left-to-right along a thin rule, echoing the hero without any extra weight */}
  <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
    <div className="w-full h-full bg-white/10"></div>
    <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#EF7D20] animate-[roll_6s_linear_infinite]"></div>
  </div>

  <style>{`
    @keyframes roll {
      0% { left: -2%; }
      100% { left: 102%; }
    }
  `}</style>

  {/* Content */}
  <div className="relative z-10 px-10 py-14 md:px-16 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

    {/* Left: Text only, no icon, no status pill */}
    <div className="text-center lg:text-left max-w-xl">
      <span className="text-[11px] tracking-[0.3em] uppercase text-[#EF7D20] font-semibold mb-4 block">
        Membership Open
      </span>

      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.15]">
        Join The Federation
      </h3>

      <p className="text-blue-100/70 text-base md:text-lg font-normal leading-relaxed">
        Register as a para-athlete, coach, or official and become part of India's most inclusive sporting community.
      </p>
    </div>

    {/* Right: One clean button, no icon */}
    <div className="shrink-0 w-full lg:w-auto flex justify-center">
      <Link
        href="/register"
        className="group inline-flex items-center justify-center bg-white text-[#1E2265] px-9 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-[#EF7D20] hover:text-white w-full sm:w-auto"
      >
        Start Registration
        <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>

  </div>
</div>

        {/* ================= OFFICIAL PARTNERS ================= */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-10">
            <span className="h-px w-12 bg-gray-300"></span>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
              Official Equipment Partners & Sponsors
            </h3>
            <span className="h-px w-12 bg-gray-300"></span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {sponsors.map(sponsor => (
              <div key={sponsor.id} className="text-xl md:text-2xl font-black text-[#1E2265] uppercase tracking-widest hover:text-[#228B45] hover:scale-110 transition-all duration-300 cursor-default">
                {sponsor.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}