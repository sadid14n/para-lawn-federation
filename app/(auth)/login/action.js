'use server';

import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function loginUser(formData) {
  try {
    const { email, password } = formData;

    // 1. Validation
    if (!email || !password) {
      return { error: 'Please provide both email and password.' };
    }

    // 2. Lookup user in database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return { error: 'Invalid email or password.' };
    }

    // 3. Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return { error: 'Invalid email or password.' };
    }

    // 4. Create session payload
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // 5. Store session in HTTP-Only cookie
    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 Days
    });

    return { 
      success: true, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      } 
    };

  } catch (error) {
    console.error('Login Error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return { success: true };
}