'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiUsers, FiShield, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { logoutUser } from '@/app/(auth)/login/action'; // Make sure this path is correct for your project!

export default function Sidebar({ userRole }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Define your navigation links here
  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: FiGrid },
    { name: 'Manage Users', href: '/admin/users', icon: FiUsers },
    // Only add this link if the user is a super_admin
    ...(userRole === 'super_admin' ? [{ name: 'Manage Admins', href: '/admin/manage-admins', icon: FiShield }] : []),
  ];

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile Top Bar (Only visible on small screens) */}
      <div className="lg:hidden bg-[#1E2265] text-white p-4 flex justify-between items-center relative shadow-sm z-30">
        <span className="font-bold text-xs uppercase tracking-widest text-blue-200">Admin Menu</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-[#EF7D20] transition-colors">
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay Background (z-40 so it stays under your global Header's z-50) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <div className={`fixed lg:sticky lg:top-[96px] z-40 w-64 bg-[#1E2265] text-white flex flex-col transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none shrink-0 
        ${isOpen ? 'inset-y-0 left-0 translate-x-0 mt-[72px] lg:mt-0' : '-translate-x-full lg:translate-x-0'} 
        h-[calc(100vh-72px)] lg:h-[calc(100vh-96px)]`}
      >
        
        {/* Navigation Links (Redundant Title Removed) */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            // Exact match for dashboard, partial match for sub-pages
            const isActive = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href);
            
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu on mobile click
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-[#EF7D20] text-white shadow-md' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <link.icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button at Bottom - Now always visible! */}
        <div className="p-4 border-t border-white/10 shrink-0 bg-[#1E2265]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
        
      </div>
    </>
  );
}