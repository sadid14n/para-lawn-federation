import prisma from '@/lib/db';
import Link from 'next/link';
import UsersTable from './UsersTable';
import { FiChevronLeft, FiChevronRight, FiUsers } from 'react-icons/fi';

// Define the valid roles for tabs
const ROLES = ['player', 'coach', 'association'];
const ITEMS_PER_PAGE = 10;

export default async function AdminUsersPage({ searchParams }) {
  // Await searchParams (Required in Next.js 15+)
  const params = await searchParams;
  
  // 1. Get current state from URL
  const currentRole = ROLES.includes(params?.role) ? params.role : 'player';
  const currentPage = Math.max(1, parseInt(params?.page) || 1);

  // 2. Fetch Data from Prisma
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: { role: currentRole },
      skip: skip,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({
      where: { role: currentRole }
    })
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

  // We stringify and parse the data to ensure Date objects don't crash Client Components
  const serializedUsers = JSON.parse(JSON.stringify(users));

  return (
    <div className="py-10 md:py-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#1E2265] flex items-center gap-3">
              <FiUsers className="text-[#EF7D20]" /> Manage Users
            </h1>
            <p className="text-gray-500 mt-2">View and inspect registered members on the platform.</p>
          </div>
          <Link href="/admin" className="text-sm font-bold text-gray-400 hover:text-[#EF7D20] transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

        {/* ================= TABS ================= */}
       <div className="flex gap-1 border-b-2 border-gray-200 mb-6 overflow-x-auto hide-scrollbar">
          {ROLES.map((role) => {
            const isActive = currentRole === role;
            return (
              <Link 
                key={role}
                href={`/admin/users?role=${role}&page=1`}
                className={`py-3 px-6 text-sm font-bold transition-all capitalize whitespace-nowrap rounded-t-xl ${
                  isActive 
                    ? 'bg-[#1E2265] text-white shadow-sm' // Active: Blue bg, white text
                    : 'bg-transparent text-gray-500 hover:text-[#1E2265] hover:bg-gray-100' // Inactive: Transparent bg
                }`}
              >
                {role}s
              </Link>
            );
          })}
        </div>

        {/* ================= TABLE COMPONENT ================= */}
        <UsersTable users={serializedUsers} currentRole={currentRole} />

        {/* ================= PAGINATION ================= */}
       {/* REPLACE YOUR CURRENT PAGINATION WITH THIS: */}
        {/* ================= PAGINATION ================= */}
        <div className="mt-8 flex items-center justify-center gap-8">
          <Link 
            href={currentPage > 1 ? `/admin/users?role=${currentRole}&page=${currentPage - 1}` : '#'}
            className={`flex items-center gap-1 text-sm font-bold transition-colors ${
              currentPage <= 1 ? 'text-gray-300 pointer-events-none' : 'text-[#1E2265] hover:text-[#EF7D20]'
            }`}
          >
            <FiChevronLeft size={18} /> Prev
          </Link>
          
          <span className="text-sm font-bold text-gray-500">
            Page <span className="text-[#1E2265]">{currentPage}</span> of {totalPages}
          </span>
          
          <Link 
            href={currentPage < totalPages ? `/admin/users?role=${currentRole}&page=${currentPage + 1}` : '#'}
            className={`flex items-center gap-1 text-sm font-bold transition-colors ${
              currentPage >= totalPages ? 'text-gray-300 pointer-events-none' : 'text-[#1E2265] hover:text-[#EF7D20]'
            }`}
          >
            Next <FiChevronRight size={18} />
          </Link>
        </div>

      </main>
    </div>
  );
}