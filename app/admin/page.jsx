import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import LogoutButton from '@/app/dashboard/LogoutButton'; // Reusing your existing logout button
import { FiUsers, FiAward, FiHome, FiShield, FiUser } from 'react-icons/fi';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = JSON.parse(cookieStore.get('session').value);

  // Fetch live stats from your database using Prisma
  const totalUsers = await prisma.user.count();
  const totalPlayers = await prisma.user.count({ where: { role: 'player' } });
  const totalCoaches = await prisma.user.count({ where: { role: 'coach' } });
  const totalAssociations = await prisma.user.count({ where: { role: 'association' } });

  return (
    <div className="py-10 md:py-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-[#1E2265] rounded-3xl p-8 md:p-10 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF7D20] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md">
                {session.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
              Control Panel
            </h2>
            <p className="text-blue-200 text-sm md:text-base">
              Welcome back, {session.name}. Manage PILBF platform data.
            </p>
          </div>

          <div className="relative z-10">
            <LogoutButton />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-blue-50 text-blue-600 p-4 rounded-xl"><FiUsers size={24} /></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Users</p>
              <p className="text-2xl font-black text-[#1E2265]">{totalUsers}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-orange-50 text-[#EF7D20] p-4 rounded-xl"><FiUser size={24} /></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Players</p>
              <p className="text-2xl font-black text-[#1E2265]">{totalPlayers}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-green-50 text-green-600 p-4 rounded-xl"><FiAward size={24} /></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Coaches</p>
              <p className="text-2xl font-black text-[#1E2265]">{totalCoaches}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
            <div className="bg-purple-50 text-purple-600 p-4 rounded-xl"><FiHome size={24} /></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Associations</p>
              <p className="text-2xl font-black text-[#1E2265]">{totalAssociations}</p>
            </div>
          </div>

        </div>

       

      </main>
    </div>
  );
}
// Note: Ensure you import FiUser from react-icons/fi at the top if it isn't already!