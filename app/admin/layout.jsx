import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from './Sidebar';

export default async function AdminLayout({ children }) {
  // 1. Get the session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  // 2. If no session, send to login
  if (!sessionCookie) {
    redirect('/login');
  }

  const session = JSON.parse(sessionCookie.value);

  // 3. THE BOUNCER: Kick non-admins to the standard dashboard
  if (session.role !== 'super_admin' && session.role !== 'admin') {
    redirect('/dashboard');
  }

  // 4. Render the Layout (Removed h-screen to fix the hidden logout button)
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8F9FA]">
      
      {/* The new Sidebar Navigation */}
      <Sidebar userRole={session.role} />

      {/* The main content area */}
      <div className="flex-1 w-full">
        {children}
      </div>
      
    </div>
  );
}