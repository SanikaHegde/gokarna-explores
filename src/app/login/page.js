import { loginAdmin } from '../actions/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Login | Gokarna Explores',
};

export default async function LoginPage() {
  // If already logged in, redirect to admin
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value === 'true') {
    redirect('/admin');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: 'var(--primary-color)', fontSize: '1.8rem', marginBottom: '10px' }}>Gokarna Explores</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to Admin Dashboard</p>
        </div>

        <form action={loginAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '10px' }}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
