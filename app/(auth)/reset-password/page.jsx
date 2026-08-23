'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { resetPassword } from '../action';

// Inner component that safely uses useSearchParams()
function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetPassword(token, formData.password);
      if (response.error) {
        setMessage({ type: 'error', text: response.error });
      } else {
        setMessage({ type: 'success', text: response.success });
        setTimeout(() => router.push('/login'), 2000); // Redirect to login after 2 seconds
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network connection error.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold mb-4">Invalid or missing reset token.</div>
        <Link href="/forgot-password" className="text-[#EF7D20] font-bold hover:underline">Request a new link</Link>
      </div>
    );
  }

  const inputStyles = "w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3.5 text-sm placeholder-gray-400 focus:outline-none focus:border-[#EF7D20] focus:ring-1 focus:ring-[#EF7D20] transition-all";

  return (
    <>
      <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center text-[#EF7D20] mb-6">
        <FiLock size={28} />
      </div>

      <h2 className="text-3xl font-black text-[#1E2265] mb-2">New Password</h2>
      <p className="text-gray-500 text-sm mb-8">
        Create a new, secure password for your federation account.
      </p>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-3 animate-fade-in ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">New Password</label>
          <div className="relative">
            <input 
              required 
              type={showPassword ? "text" : "password"} 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`${inputStyles} pr-12`} 
              placeholder="••••••••" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Confirm Password</label>
          <input 
            required 
            type={showPassword ? "text" : "password"} 
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={inputStyles} 
            placeholder="••••••••" 
          />
        </div>

        <button type="submit" disabled={isLoading || message.type === 'success'} className="w-full bg-[#EF7D20] text-white font-bold py-4 rounded-xl hover:bg-[#d66a15] transition-all shadow-lg mt-4 disabled:opacity-70">
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </>
  );
}

// Next.js requirement: Wrap useSearchParams in a Suspense boundary
export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(30,34,101,0.08)] p-8 sm:p-10 border border-gray-100">
        <Suspense fallback={<div className="text-center font-bold text-gray-500">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}