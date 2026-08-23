import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import Link from 'next/link';
import AdminManager from './AdminManager';
import { FiShield } from 'react-icons/fi';

export default async function ManageAdminsPage() {
  // 1. Get the session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  
  if (!sessionCookie) redirect('/login');
  
  const session = JSON.parse(sessionCookie.value);

  // 2. BOUNCER: Kick out regular admins and normal users
  if (session.role !== 'super_admin') {
    redirect('/admin'); // Sends regular admins back to their dashboard
  }

  // 3. Fetch all current regular admins (excluding super_admins)
  const admins = await prisma.user.findMany({
    where: { role: 'admin' },
    orderBy: { createdAt: 'desc' },
  });

  // Serialize to prevent Date object errors in Client Components
  const serializedAdmins = JSON.parse(JSON.stringify(admins));

  return (
    <div className="py-10 md:py-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#1E2265] flex items-center gap-3">
              <FiShield className="text-[#EF7D20]" /> Admin Management
            </h1>
            <p className="text-gray-500 mt-2">Promote users to Admins or revoke existing privileges.</p>
          </div>
          <Link href="/admin" className="text-sm font-bold text-gray-400 hover:text-[#EF7D20] transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Client Component handling the UI & Actions */}
        <AdminManager admins={serializedAdmins} />

      </main>
    </div>
  );
}