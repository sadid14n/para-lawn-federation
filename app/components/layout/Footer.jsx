import Link from 'next/link';
// Feather icons for UI
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
// FontAwesome 6 for Brands
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  return (
    // Background updated to Deep Navy Blue, Top Border updated to Forest Green
    <footer className="bg-[#1E2265] text-white pt-16 pb-8 mt-auto border-t-[6px] border-[#228B45]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ================= TOP SECTION: CONTACT INFO & LOGOS ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start pb-10 border-b border-white/10 gap-10">
          
          {/* Logo & Federation Name - Updated to PILBF */}
          <div className="flex flex-col items-center lg:items-start shrink-0 text-center lg:text-left max-w-xs">
            <img src="/logo.svg" alt="PILBF Logo" className="h-24 w-24 bg-white rounded-full object-cover p-1 mb-4 shadow-lg" />
            <h2 className="text-xl font-black uppercase tracking-wide leading-tight">
              Para Indian Lawn Bowls <br /> Federation
            </h2>
            <p className="text-xs text-gray-400 mt-2 font-semibold uppercase tracking-widest">
              Recognized by IBD
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow max-w-4xl w-full">
            {/* Phone */}
            <div className="flex items-start space-x-4">
              {/* Icon boxes updated to Saffron Orange for emphasis */}
              <div className="bg-[#EF7D20] p-3 rounded-xl shadow-md shrink-0">
                <FiPhone size={22} className="text-white" />
              </div>
              <div className="text-sm font-medium">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Call Us</p>
                <p>+91 93106 64647</p>
                <p className="mt-1">+91 94018 22791</p>
              </div>
            </div>
            
            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="bg-[#EF7D20] p-3 rounded-xl shadow-md shrink-0">
                <FiMail size={22} className="text-white" />
              </div>
              <div className="text-sm">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Email Us</p>
                <p className="font-semibold break-all hover:text-[#EF7D20] transition-colors">
                  <a href="mailto:rajabowls79@gmail.com">rajabowls79@gmail.com</a>
                </p>
                <p className="font-semibold break-all hover:text-[#EF7D20] transition-colors mt-1">
                  <a href="mailto:kangkanaboro2018@gmail.com">kangkanaboro2018@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="bg-[#EF7D20] p-3 rounded-xl shadow-md shrink-0">
                <FiMapPin size={22} className="text-white" />
              </div>
              <div className="text-sm">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Head Office</p>
                <p className="font-semibold leading-relaxed">
                  Para Indian Lawn Bowls Federation, <br />
                  Bishnupur Main Road, <br />
                  Guwahati – 781016, Assam
                </p>
              </div>
            </div>
          </div>

          {/* Socials - Retained their brand colors on hover for recognizability */}
          <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 shrink-0 mt-4 lg:mt-0">
            <Link href="#" className="bg-white/10 p-3 rounded-xl hover:bg-[#1877F2] transition-colors duration-300 flex items-center justify-center border border-white/10 hover:border-transparent">
              <FaFacebookF size={20} />
            </Link>
            <Link href="#" className="bg-white/10 p-3 rounded-xl hover:bg-[#E4405F] transition-colors duration-300 flex items-center justify-center border border-white/10 hover:border-transparent">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="bg-white/10 p-3 rounded-xl hover:bg-[#FF0000] transition-colors duration-300 flex items-center justify-center border border-white/10 hover:border-transparent">
              <FaYoutube size={20} />
            </Link>
          </div>
        </div>

        {/* ================= BOTTOM SECTION: LINKS ================= */}
        {/* Link hovers updated to Saffron Orange */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-12 text-sm text-gray-300">
          
          {/* Col 1 */}
          <div>
            <h3 className="text-white font-extrabold text-lg mb-6 tracking-wide">About PILBF</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Executive Committee</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; State Associations</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; IBD Affiliation</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Constitution</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Annual Reports</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-white font-extrabold text-lg mb-6 tracking-wide">Athlete Hub</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Athlete Classification</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Adaptive Equipment</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Anti-Doping Guidelines</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Athlete Registration</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Grassroots Camps</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-white font-extrabold text-lg mb-6 tracking-wide">Events & Media</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Tournament Calendar</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; National Championships</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; State Trials</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Press Releases</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="text-white font-extrabold text-lg mb-6 tracking-wide">Committees</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Classification Committee</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Technical Committee</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Medical Commission</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Referee Commission</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Athlete Commission</Link></li>
            </ul>
          </div>

          {/* Col 5 (Quick Links) */}
          <div>
            <h3 className="text-white font-extrabold text-lg mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {/* Highlight link updated to Saffron Orange */}
              <li><Link href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block text-[#EF7D20] font-bold">&gt; Latest Results</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Contact Us</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-[#EF7D20] hover:translate-x-1 transition-all inline-block">&gt; Disclaimer</Link></li>
            </ul>
          </div>

        </div>
        
        {/* Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Para Indian Lawn Bowls Federation. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Recognized by the International Bowls for the Disabled (IBD).</p>
        </div>

      </div>
    </footer>
  );
}