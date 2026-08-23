'use server';

import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Helper function to ensure caller is a super_admin
async function checkSuperAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return false;
  const session = JSON.parse(sessionCookie.value);
  return session.role === 'super_admin';
}

export async function makeAdmin(email) {
  try {
    const isSuper = await checkSuperAdmin();
    if (!isSuper) return { error: 'Unauthorized. Only Super Admins can perform this action.' };
    if (!email) return { error: 'Email is required.' };

    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });

    if (!user) return { error: 'No user found with this email. They must register an account first.' };
    if (user.role === 'super_admin') return { error: 'This user is already a Super Admin.' };
    if (user.role === 'admin') return { error: 'This user is already an Admin.' };

    // Update their role to admin
    await prisma.user.update({
      where: { email: user.email },
      data: { role: 'admin' }
    });

    // Refresh the page data instantly
    revalidatePath('/admin/manage-admins');
    
    return { success: `${user.name} has been successfully promoted to Admin!` };
  } catch (error) {
    console.error('Make Admin Error:', error);
    return { error: 'A database error occurred.' };
  }
}

export async function removeAdmin(userId) {
  try {
    const isSuper = await checkSuperAdmin();
    if (!isSuper) return { error: 'Unauthorized.' };

    // Demote the admin back to a regular player
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'player' }
    });

    revalidatePath('/admin/manage-admins');
    return { success: 'Admin rights removed. User demoted to Player.' };
  } catch (error) {
    console.error('Remove Admin Error:', error);
    return { error: 'A database error occurred.' };
  }
}