'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  // Hardcoded admin credentials
  if (username === 'admin' && password === 'password123') {
    // Set a secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    
    redirect('/admin');
  } else {
    redirect('/login?error=Invalid credentials');
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}
