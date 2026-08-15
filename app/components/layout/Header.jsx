'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Feather icons for UI
import { FiMail, FiPhone, FiMenu, FiX, FiChevronDown, FiGrid } from 'react-icons/fi';
// FontAwesome 6 for Brands
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide top header after scrolling down 40px
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white">
      {/* --- TOP HEADER (Hides on scroll & mobile) --- */}
      <div 
        className={`hidden md:flex items-center justify-between text-xs font-semibold text-white transition-all duration-300 overflow-hidden ${
          isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
        }`}
      >
        {/* Left Side (Red) */}
        <div className="bg-[#E62227] h-full flex items-center px-8 w-1/2 clip-path-slant-right">
          <p>National Governing Body for Para Lawn Bowls in India</p>
        </div>
        
        {/* Right Side (Dark Blue) */}
        <div className="bg-[#0B1242] h-full flex items-center justify-end px-8 w-1/2 space-x-6">
          <a href="mailto:rajabowls79@gmail.com" className="flex items-center hover:text-gray-300 transition">
            <FiMail size={14} className="mr-2" /> rajabowls79@gmail.com
          </a>
          <a href="tel:+919310664647" className="flex items-center hover:text-gray-300 transition">
            <FiPhone size={14} className="mr-2" /> +91 93106 64647
          </a>
          <div className="flex items-center space-x-4 border-l border-white/30 pl-4">
            <Link href="#"><FaFacebookF size={14} className="hover:text-blue-400" /></Link>
            <Link href="#"><FaInstagram size={14} className="hover:text-pink-500" /></Link>
            <Link href="#"><FaLinkedinIn size={14} className="hover:text-blue-300" /></Link>
            <Link href="#"><FaXTwitter size={14} className="hover:text-gray-300" /></Link>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVBAR --- */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 h-20 lg:h-24">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3 shrink-0">
          {/* Replace src with your actual logo paths */}
          <img src="/logo-1.png" alt="PLBFI Logo" className="h-12 w-12 md:h-16 md:w-16 bg-gray-200 rounded-full object-cover" />
          <div className="flex flex-col justify-center">
             <span className="text-[#E62227] font-black text-[15px] md:text-lg lg:text-xl leading-tight tracking-wide uppercase">
               Para Lawn Bowls Federation of India
             </span>
             <span className="text-[10px] md:text-xs text-[#0B1242] font-bold uppercase tracking-wider mt-0.5">
               Recognized by: International Bowls for the Disabled (IBD)
             </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-5 lg:space-x-7 text-sm font-extrabold text-[#0B1242] uppercase tracking-wide">
          <Link href="/" className="text-[#E62227]">Home</Link>
          <Link href="/about" className="flex items-center hover:text-[#E62227] transition-colors">About PLBFI <FiChevronDown size={14} className="ml-1" /></Link>
          <Link href="/classification" className="flex items-center hover:text-[#E62227] transition-colors">Classification <FiChevronDown size={14} className="ml-1" /></Link>
          <Link href="/events" className="flex items-center hover:text-[#E62227] transition-colors">Events <FiChevronDown size={14} className="ml-1" /></Link>
          <Link href="/officials" className="flex items-center hover:text-[#E62227] transition-colors">Coaches & Referees <FiChevronDown size={14} className="ml-1" /></Link>
          <Link href="/results" className="hover:text-[#E62227] transition-colors">Results</Link>
          <Link href="/ibd" className="hover:text-[#E62227] transition-colors">IBD</Link>
          <Link href="/contact" className="hover:text-[#E62227] transition-colors">Contact</Link>
          
          <button className="text-[#0B1242] hover:text-[#E62227] transition-colors p-2">
            <FiGrid size={22} />
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="xl:hidden p-2 text-[#0B1242] hover:text-[#E62227] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t-2 border-[#E62227] p-6 flex flex-col space-y-4 font-bold text-[#0B1242] shadow-2xl uppercase tracking-wider">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E62227]">Home</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E62227]">About PLBFI</Link>
          <Link href="/classification" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E62227]">Classification</Link>
          <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E62227]">Events & Calendar</Link>
          <Link href="/officials" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E62227]">Coaches & Referees</Link>
          <Link href="/results" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E62227]">Results & Rankings</Link>
          <Link href="/ibd" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E62227]">IBD Affiliation</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E62227]">Contact Us</Link>
        </div>
      )}
    </header>
  );
}