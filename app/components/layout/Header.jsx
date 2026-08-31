'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMail, FiPhone, FiMenu, FiX, FiChevronDown, FiGrid, FiUser } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import Button from '../UI/Button';

export default function Header({ session }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = session?.role === 'super_admin' || session?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white relative">
      {/* --- TOP HEADER --- */}
      <div
        className={`hidden md:flex items-center justify-between text-xs font-semibold text-white transition-all duration-300 overflow-hidden bg-navy ${
          isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
        }`}
      >
        <div className="bg-accent h-full flex items-center pl-4 lg:pl-8 pr-12 w-[40%] lg:w-[30%] [clip-path:polygon(0_0,calc(100%-25px)_0,100%_100%,0_100%)]">
          <p className="truncate tracking-wide w-full">National Governing Body for Para Lawn Bowls in India</p>
        </div>

        <div className="flex-1 h-full flex items-center justify-end px-4 lg:px-8 space-x-4 lg:space-x-6">
          <a href="mailto:rajabowls79@gmail.com" className="flex items-center hover:text-accent transition-colors">
            <FiMail size={14} className="mr-1.5" /> <span className="hidden lg:inline">rajabowls79@gmail.com</span>
          </a>
          <a href="tel:+919310664647" className="flex items-center hover:text-accent transition-colors">
            <FiPhone size={14} className="mr-1.5" /> +91 93106 64647
          </a>
          <div className="flex items-center space-x-3 lg:space-x-4 border-l border-white/30 pl-4">
            <Link href="#"><FaFacebookF size={14} className="hover:text-accent transition-colors" /></Link>
            <Link href="#"><FaInstagram size={14} className="hover:text-accent transition-colors" /></Link>
            <Link href="#"><FaLinkedinIn size={14} className="hover:text-accent transition-colors" /></Link>
            <Link href="#"><FaXTwitter size={14} className="hover:text-accent transition-colors" /></Link>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVBAR --- */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 h-16 sm:h-20 lg:h-24">
        <Link href="/" className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          <img src="/logo.svg" alt="PLBFI Logo" className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 bg-transparent rounded-full object-cover shrink-0" />

          <div className="flex flex-col justify-center">
             <span className="md:hidden font-[family-name:var(--font-display)] text-navy font-extrabold text-xl sm:text-2xl leading-tight tracking-wide">
               PILBF
             </span>
             <span className="hidden md:block font-[family-name:var(--font-display)] text-navy font-extrabold text-lg lg:text-xl leading-tight tracking-tight">
               Para Indian Lawn Bowls Federation
             </span>
             <span className="hidden sm:block text-[9px] md:text-xs text-navy/60 font-bold uppercase tracking-wider mt-0.5">
               Recognized by: International Bowls for the Disabled (IBD)
             </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-5 lg:space-x-7 text-sm font-bold text-navy uppercase tracking-wide">
          <Link href="/" className="text-accent">Home</Link>
          <Link href="/about" className="flex items-center hover:text-accent transition-colors">About PLBFI <FiChevronDown size={14} className="ml-1" /></Link>
          <Link href="/results" className="hover:text-accent transition-colors">Results</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>

          <div className="flex items-center space-x-4 ml-2 border-l-2 border-gray-200 pl-6">
            {session ? (
              <Button
                href={isAdmin ? '/admin' : '/dashboard'}
                variant="dark"
                size="sm"
                icon={isAdmin ? FiGrid : FiUser}
                iconPosition="left"
              >
                {isAdmin ? 'Admin Panel' : 'Profile'}
              </Button>
            ) : (
              <>
                {/* Kept as a plain link, not a <Button> — it's a low-emphasis
                    secondary action next to the primary Register button,
                    not meant to carry button chrome */}
                <Link href="/login" className="text-navy hover:text-accent transition-colors font-bold normal-case">
                  Log In
                </Link>
                <Button href="/register" variant="primary" size="sm">
                  Register
                </Button>
              </>
            )}
          </div>
        </nav>

        <button
          className="xl:hidden p-2 text-navy hover:text-accent transition-colors shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <FiX size={28} className="sm:w-8 sm:h-8" /> : <FiMenu size={28} className="sm:w-8 sm:h-8" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`xl:hidden absolute top-full left-0 w-full bg-white border-t-2 border-accent flex flex-col font-bold text-navy shadow-2xl uppercase tracking-wider transition-all duration-300 origin-top overflow-hidden ${
          mobileMenuOpen ? 'max-h-[600px] scale-y-100 opacity-100' : 'max-h-0 scale-y-0 opacity-0'
        }`}
      >
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-100 hover:bg-off-white hover:text-accent">Home</Link>
        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-100 hover:bg-off-white hover:text-accent">About PLBFI</Link>
        <Link href="/results" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-100 hover:bg-off-white hover:text-accent">Results & Rankings</Link>
        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 hover:bg-off-white hover:text-accent">Contact Us</Link>

        <div className="px-6 py-5 border-t border-gray-100 flex flex-col space-y-3 bg-off-white mt-auto normal-case">
          {session ? (
            <Button
              href={isAdmin ? '/admin' : '/dashboard'}
              variant="dark"
              size="lg"
              icon={isAdmin ? FiGrid : FiUser}
              iconPosition="left"
              fullWidth
              onClick={() => setMobileMenuOpen(false)}
            >
              {isAdmin ? 'Admin Panel' : 'My Dashboard'}
            </Button>
          ) : (
            <>
              <Button
                href="/login"
                variant="secondary-light"
                size="lg"
                fullWidth
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Button>
              <Button
                href="/register"
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setMobileMenuOpen(false)}
              >
                Register Now
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}