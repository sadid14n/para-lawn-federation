import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 mt-auto border-t-[4px] border-accent">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* ================= TOP SECTION: CONTACT INFO & LOGOS ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start pb-10 border-b border-white/10 gap-10">

          <div className="flex flex-col items-center lg:items-start shrink-0 text-center lg:text-left max-w-xs">
            <img src="/logo.svg" alt="PILBF Logo" className="h-20 w-20 bg-white rounded-full object-cover p-1 mb-4 shadow-lg" />
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight leading-tight">
              Para Indian Lawn Bowls Federation
            </h2>
            <p className="text-xs text-gray-400 mt-2 font-semibold uppercase tracking-widest">
              Recognized by IBD
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow max-w-4xl w-full">
            <div className="flex items-start gap-4">
              <FiPhone size={18} className="text-accent mt-1 shrink-0" />
              <div className="text-sm font-medium">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Call us</p>
                <p>+91 93106 64647</p>
                <p className="mt-1">+91 94018 22791</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiMail size={18} className="text-accent mt-1 shrink-0" />
              <div className="text-sm">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Email us</p>
                <p className="font-semibold break-all hover:text-accent transition-colors">
                  <a href="mailto:rajabowls79@gmail.com">rajabowls79@gmail.com</a>
                </p>
                <p className="font-semibold break-all hover:text-accent transition-colors mt-1">
                  <a href="mailto:kangkanaboro2018@gmail.com">kangkanaboro2018@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FiMapPin size={18} className="text-accent mt-1 shrink-0" />
              <div className="text-sm">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Head office</p>
                <p className="font-semibold leading-relaxed">
                  Para Indian Lawn Bowls Federation, <br />
                  Bishnupur Main Road, <br />
                  Guwahati – 781016, Assam
                </p>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-col gap-3 shrink-0 mt-4 lg:mt-0">
            <Link href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-colors duration-300 flex items-center justify-center">
              <FaFacebookF size={16} />
            </Link>
            <Link href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-colors duration-300 flex items-center justify-center">
              <FaInstagram size={17} />
            </Link>
            <Link href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent transition-colors duration-300 flex items-center justify-center">
              <FaYoutube size={17} />
            </Link>
          </div>
        </div>

        {/* ================= BOTTOM SECTION: LINKS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-12 text-sm text-gray-300">

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-white font-bold text-base mb-6 tracking-tight">About PILBF</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Executive Committee</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">State Associations</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">IBD Affiliation</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Constitution</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Annual Reports</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-white font-bold text-base mb-6 tracking-tight">Athlete Hub</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Athlete Classification</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Adaptive Equipment</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Anti-Doping Guidelines</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Athlete Registration</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Grassroots Camps</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-white font-bold text-base mb-6 tracking-tight">Events & Media</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Tournament Calendar</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">National Championships</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">State Trials</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Press Releases</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Photo Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-white font-bold text-base mb-6 tracking-tight">Committees</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Classification Committee</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Technical Committee</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Medical Commission</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Referee Commission</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Athlete Commission</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-white font-bold text-base mb-6 tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-accent font-bold hover:text-white hover:translate-x-1 transition-all inline-block">Latest Results</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-accent hover:translate-x-1 transition-all inline-block">Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Para Indian Lawn Bowls Federation. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Recognized by the International Bowls for the Disabled (IBD).</p>
        </div>

      </div>
    </footer>
  );
}