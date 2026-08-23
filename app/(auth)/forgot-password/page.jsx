'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import { sendPasswordResetEmail } from '../action';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await sendPasswordResetEmail(email);
      if (response.error) {
        setMessage({ type: 'error', text: response.error });
      } else {
        setMessage({ type: 'success', text: response.success });
        setEmail(''); // Clear the input
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network connection error.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(30,34,101,0.08)] p-8 sm:p-10 border border-gray-100">
        
        <Link href="/login" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-[#1E2265] mb-8 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Login
        </Link>

        {/* If successfully sent, show the stylized instruction banner instead of the form */}
        {message.type === 'success' ? (
          <div className="animate-fade-in">
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl shadow-sm text-left mb-6">
              <div className="flex items-start gap-3 mb-5">
                <FiCheckCircle className="text-[#EF7D20] shrink-0 mt-0.5" size={24} />
                <p className="text-base font-black text-[#1E2265] leading-snug">
                  Check your mail! We have sent a password reset link.
                </p>
              </div>
              
              <div className="bg-white/70 p-4 rounded-xl border border-orange-100">
                <ul className="text-sm font-bold text-gray-500 space-y-3">
                  <li className="flex items-center gap-2">
                    <FiChevronRight className="text-[#EF7D20] shrink-0" size={18} /> 
                    Click the secure link
                  </li>
                  <li className="flex items-center gap-2">
                    <FiChevronRight className="text-[#EF7D20] shrink-0" size={18} /> 
                    Enter new password
                  </li>
                  <li className="flex items-center gap-2">
                    <FiChevronRight className="text-[#EF7D20] shrink-0" size={18} /> 
                    Log in to your account
                  </li>
                </ul>
              </div>
            </div>

            <Link href="/login" className="w-full flex items-center justify-center bg-[#1E2265] text-white font-bold py-4 rounded-xl hover:bg-[#2a2f8c] transition-all shadow-md">
              Return to Login
            </Link>
          </div>
        ) : (
          /* Default Form View */
          <>
            <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center text-[#EF7D20] mb-6">
              <FiMail size={28} />
            </div>

            <h2 className="text-3xl font-black text-[#1E2265] mb-2">Reset Password</h2>
            <p className="text-gray-500 text-sm mb-8">
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>

            {message.type === 'error' && (
              <div className="mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-3 animate-fade-in bg-red-50 text-red-700">
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Email Address</label>
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3.5 text-sm placeholder-gray-400 focus:outline-none focus:border-[#EF7D20] focus:ring-1 focus:ring-[#EF7D20] transition-all" 
                  placeholder="name@example.com" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#EF7D20] text-white font-bold py-4 rounded-xl hover:bg-[#d66a15] transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sending Link...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}