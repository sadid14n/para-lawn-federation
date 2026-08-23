'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Feather icons for UI
import { FiMail, FiPhone, FiMenu, FiX, FiChevronDown, FiGrid, FiUser } from 'react-icons/fi';
// FontAwesome 6 for Brands
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

export default function Header({ session }) {
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
    <header className="sticky top-0 z-50 w-full shadow-md bg-white relative">
      {/* --- TOP HEADER (Hides on scroll & mobile) --- */}
     {/* --- TOP HEADER (Hides on scroll & mobile) --- */}
      <div 
        className={`hidden md:flex items-center justify-between text-xs font-semibold text-white transition-all duration-300 overflow-hidden bg-[#1E2265] ${
          isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
        }`}
      >
        {/* Left Side (Saffron Orange Accent - Angled Cut) */}
        {/* w-[30%] keeps it small. The clip-path polygon creates the forward-leaning slash ( / ) effect */}
        <div className="bg-[#EF7D20] h-full flex items-center pl-4 lg:pl-8 pr-12 w-[40%] lg:w-[30%] [clip-path:polygon(0_0,calc(100%-25px)_0,100%_100%,0_100%)]">
          <p className="truncate tracking-wide w-full">National Governing Body for Para Lawn Bowls in India</p>
        </div>
        
        {/* Right Side (Deep Navy Blue - Takes up the remaining space) */}
        <div className="flex-1 h-full flex items-center justify-end px-4 lg:px-8 space-x-4 lg:space-x-6">
          <a href="mailto:rajabowls79@gmail.com" className="flex items-center hover:text-gray-300 transition">
            <FiMail size={14} className="mr-1.5" /> <span className="hidden lg:inline">rajabowls79@gmail.com</span>
          </a>
          <a href="tel:+919310664647" className="flex items-center hover:text-gray-300 transition">
            <FiPhone size={14} className="mr-1.5" /> +91 93106 64647
          </a>
          <div className="flex items-center space-x-3 lg:space-x-4 border-l border-white/30 pl-4">
            <Link href="#"><FaFacebookF size={14} className="hover:text-[#EF7D20] transition-colors" /></Link>
            <Link href="#"><FaInstagram size={14} className="hover:text-[#EF7D20] transition-colors" /></Link>
            <Link href="#"><FaLinkedinIn size={14} className="hover:text-[#EF7D20] transition-colors" /></Link>
            <Link href="#"><FaXTwitter size={14} className="hover:text-[#EF7D20] transition-colors" /></Link>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVBAR --- */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 h-16 sm:h-20 lg:h-24">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          {/* Responsive Image Size */}
          <img src="/logo.svg" alt="PLBFI Logo" className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 bg-transparent rounded-full object-cover shrink-0" />
          
          <div className="flex flex-col justify-center">
             {/* Mobile View: Short Name (PLBFI) */}
             <span className="md:hidden text-[#1E2265] font-black text-xl sm:text-2xl leading-tight tracking-wider uppercase">
               PILBF
             </span>
             
             {/* Desktop/Tablet View: Full Name - Using Deep Navy to match logo text */}
             <span className="hidden md:block text-[#1E2265] font-black text-lg lg:text-xl leading-tight tracking-wide uppercase">
               Para Indian Lawn Bowls Federation
             </span>

             {/* Subtitle: Using Forest Green to tie into the logo's inner circles nicely */}
             <span className="hidden sm:block text-[9px] md:text-xs text-[#228B45] font-bold uppercase tracking-wider mt-0.5">
               Recognized by: International Bowls for the Disabled (IBD)
             </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-5 lg:space-x-7 text-sm font-extrabold text-[#1E2265] uppercase tracking-wide">
          <Link href="/" className="text-[#EF7D20]">Home</Link>
          <Link href="/about" className="flex items-center hover:text-[#EF7D20] transition-colors">About PLBFI <FiChevronDown size={14} className="ml-1" /></Link>
          <Link href="/results" className="hover:text-[#EF7D20] transition-colors">Results</Link>
          <Link href="/contact" className="hover:text-[#EF7D20] transition-colors">Contact</Link>

          <div className="flex items-center space-x-4 ml-2 border-l-2 border-gray-200 pl-6">
          {session ? (
            <Link 
              href={(session.role === 'super_admin' || session.role === 'admin') ? '/admin' : '/dashboard'} 
              className="flex items-center bg-[#1E2265] text-white px-5 py-2.5 rounded-full hover:bg-[#EF7D20] transition-colors shadow-md"
            >
              {(session.role === 'super_admin' || session.role === 'admin') ? (
                <><FiGrid className="mr-2" size={16} /> Admin Panel</>
              ) : (
                <><FiUser className="mr-2" size={16} /> Profile</>
              )}
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-[#1E2265] hover:text-[#EF7D20] transition-colors font-bold">Log In</Link>
              <Link href="/register" className="bg-[#EF7D20] text-white px-5 py-2.5 rounded-full hover:bg-[#d66a15] transition-colors shadow-md font-bold">Register</Link>
            </>
          )}
          </div>
          
          {/* <button className="text-[#1E2265] hover:text-[#EF7D20] transition-colors p-2">
            <FiGrid size={22} />
          </button> */}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="xl:hidden p-2 text-[#1E2265] hover:text-[#EF7D20] transition-colors shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <FiX size={28} className="sm:w-8 sm:h-8" /> : <FiMenu size={28} className="sm:w-8 sm:h-8" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown (Absolute Overlay) */}
      <div 
        className={`xl:hidden absolute top-full left-0 w-full bg-white border-t-2 border-[#EF7D20] flex flex-col font-bold text-[#1E2265] shadow-2xl uppercase tracking-wider transition-all duration-300 origin-top overflow-hidden ${
          mobileMenuOpen ? 'max-h-[600px] scale-y-100 opacity-100' : 'max-h-0 scale-y-0 opacity-0'
        }`}
      >
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 hover:text-[#EF7D20]">Home</Link>
        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 hover:text-[#EF7D20]">About PLBFI</Link>
        <Link href="/results" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 hover:text-[#EF7D20]">Results & Rankings</Link>
        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 hover:bg-gray-50 hover:text-[#EF7D20]">Contact Us</Link>

        {/* === MOBILE AUTH BUTTONS === */}
        <div className="px-6 py-5 border-t border-gray-100 flex flex-col space-y-3 bg-gray-50 mt-auto">
          {session ? (
            <Link 
              href={(session.role === 'super_admin' || session.role === 'admin') ? '/admin' : '/dashboard'} 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center justify-center bg-[#1E2265] text-white py-3.5 rounded-xl hover:bg-[#EF7D20] transition-colors shadow-sm"
            >
              {(session.role === 'super_admin' || session.role === 'admin') ? (
                <><FiGrid className="mr-2" size={18} /> Admin Panel</>
              ) : (
                <><FiUser className="mr-2" size={18} /> My Dashboard</>
              )}
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-3.5 border-2 border-[#1E2265] text-[#1E2265] rounded-xl hover:bg-[#1E2265] hover:text-white transition-colors font-bold">Log In</Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-center py-3.5 bg-[#EF7D20] text-white rounded-xl hover:bg-[#d66a15] transition-colors shadow-sm font-bold">Register Now</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}