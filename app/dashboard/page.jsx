import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import LogoutButton from './LogoutButton';
import { FiUser, FiMail, FiPhone, FiMapPin, FiActivity, FiAward, FiHome, FiCalendar } from 'react-icons/fi';
import ResetPasswordButton from './ResetPasswordButton';

// This is a Server Component, so it runs securely on the backend
export default async function DashboardPage() {
  // 1. Get the session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  // 2. If no session exists, redirect to login
  if (!sessionCookie) {
    redirect('/login');
  }

  // 3. Parse the session data
  const session = JSON.parse(sessionCookie.value);

  // 4. Fetch the full, fresh user profile from the database
  const user = await prisma.user.findUnique({
    where: { id: session.id }
  });

  // If the user was deleted from the DB but still has a cookie, redirect them
  if (!user) {
    redirect('/login');
  }

  // Helper to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10 md:py-16">
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= WELCOME BANNER ================= */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_rgba(30,34,101,0.05)] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-visible border border-gray-100">
          
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF7D20] opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center bg-blue-50 text-[#1E2265] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md">
                {user.role} Account
              </span>
              <span className="flex items-center text-xs font-bold text-[#228B45]">
                <span className="w-2 h-2 rounded-full bg-[#228B45] mr-1.5 animate-pulse"></span> Active
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#1E2265] mb-2 tracking-tight">
              Welcome, {user.name.split(' ')[0]}!
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Manage your official federation profile and registration details below.
            </p>
          </div>
          
          {/* Logout Button moved here */}
          {/* <div className="relative z-10 w-full md:w-auto flex justify-start md:justify-end">
            <LogoutButton />
          </div> */}

          {/* Action Buttons Container */}
          <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row items-center justify-start md:justify-end gap-3 mt-6 md:mt-0">
            
            {/* ADD THIS NEW COMPONENT (Passes the user's email) */}
            <ResetPasswordButton email={user.email} />
            
            {/* Your existing Logout Button */}
            <LogoutButton />
            
          </div>
        </div>

        {/* ================= DETAILS GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- CONTACT INFO CARD --- */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(30,34,101,0.03)] border border-gray-100">
            
            {/* Avatar Placeholder */}
            <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100">
              <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center text-[#1E2265] shadow-inner mb-4 border border-gray-200">
                {user.role === 'player' && <FiUser size={36} />}
                {user.role === 'coach' && <FiAward size={36} />}
                {user.role === 'association' && <FiHome size={36} />}
              </div>
              <h3 className="text-lg font-black text-[#1E2265]">{user.name}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                ID: PILBF-{user.id.toString().padStart(4, '0')}
              </p>
            </div>

            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-5">
              Contact Details
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-gray-50 p-2.5 rounded-lg text-gray-500"><FiMail size={18} /></div>
                <div className="overflow-hidden">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Email</p>
                  <p className="font-semibold text-sm text-[#1E2265] truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-50 p-2.5 rounded-lg text-gray-500"><FiPhone size={18} /></div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="font-semibold text-sm text-[#1E2265]">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-50 p-2.5 rounded-lg text-gray-500"><FiMapPin size={18} /></div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Region</p>
                  <p className="font-semibold text-sm text-[#1E2265]">{user.state}</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- FEDERATION PROFILE CARD --- */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(30,34,101,0.03)] border border-gray-100 flex flex-col">
            
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
              <div className="bg-[#EF7D20]/10 p-2.5 rounded-lg text-[#EF7D20]">
                <FiActivity size={20} />
              </div>
              <h3 className="text-lg font-black text-[#1E2265] tracking-wide">
                {user.role === 'player' && 'Official Athlete Data'}
                {user.role === 'coach' && 'Official Credential Data'}
                {user.role === 'association' && 'Organization Data'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
              
              {/* === PLAYER DETAILS === */}
              {user.role === 'player' && (
                <>
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Date of Birth</p>
                    <p className="font-bold text-[#1E2265] text-base">{formatDate(user.dob)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Gender</p>
                    <p className="font-bold text-[#1E2265] text-base">{user.gender || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 sm:col-span-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Impairment Category (IBD)</p>
                    <p className="font-bold text-[#1E2265] text-base">
                      {user.impairmentType === 'Other' ? user.otherImpairment : user.impairmentType}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Wheelchair Required</p>
                    <p className="font-bold text-[#1E2265] text-base">
                      {user.wheelchairUser ? 'Yes - Accessible Event Needed' : 'No'}
                    </p>
                  </div>
                </>
              )}

              {/* === COACH / OFFICIAL DETAILS === */}
              {user.role === 'coach' && (
                <>
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Primary Role</p>
                    <p className="font-bold text-[#1E2265] text-base">{user.roleType || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Certification Level</p>
                    <p className="font-bold text-[#1E2265] text-base">{user.certificationLevel || 'N/A'}</p>
                  </div>
                </>
              )}

              {/* === ASSOCIATION DETAILS === */}
              {user.role === 'association' && (
                <>
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 sm:col-span-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Organization Name</p>
                    <p className="font-bold text-[#1E2265] text-base">{user.orgName || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Organization Type</p>
                    <p className="font-bold text-[#1E2265] text-base">{user.orgType || 'N/A'}</p>
                  </div>
                </>
              )}
              
            </div>
            
            {/* Footer of the card */}
            <div className="mt-8 pt-5 border-t border-gray-100 flex items-center text-xs font-bold text-gray-400">
               <FiCalendar className="mr-2" size={14} /> Registered on {formatDate(user.createdAt)}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}