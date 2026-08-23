'use client';

import { useRouter } from 'next/navigation';
import { logoutUser } from '@/app/(auth)/login/action';
import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutUser();
    router.push('/login');
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors duration-300"
    >
      <FiLogOut size={16} />
      {isLoggingOut ? 'Logging out...' : 'Log Out'}
    </button>
  );
}