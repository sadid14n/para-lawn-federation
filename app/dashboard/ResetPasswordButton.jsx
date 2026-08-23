'use client';

import { useState } from 'react';
import { FiLock, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import { sendPasswordResetEmail } from '../(auth)/action';

export default function ResetPasswordButton({ email }) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleResetRequest = async () => {
    setIsSending(true);
    try {
      const response = await sendPasswordResetEmail(email);
      if (response.error) {
        alert(response.error);
      } else {
        setIsSent(true); // Triggers the success alert to show
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative flex flex-col w-full sm:w-auto">
      <button 
        onClick={handleResetRequest}
        disabled={isSending || isSent}
        className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-[#1E2265] hover:border-[#EF7D20] hover:text-[#EF7D20] px-5 py-2.5 rounded-xl font-bold text-sm transition-colors duration-300 shadow-sm disabled:opacity-50 w-full sm:w-auto"
      >
        <FiLock size={16} />
        {isSending ? 'Sending Link...' : isSent ? 'Secure Link Sent!' : 'Change Password'}
      </button>

      {/* SUCCESS ALERT SECTION (Displays after clicking) */}
      {isSent && (
        <div className="absolute top-[120%] left-0 sm:left-auto sm:right-0 w-[280px] sm:w-[320px] bg-orange-50 border border-orange-200 p-5 rounded-2xl shadow-xl z-50 animate-fade-in-down cursor-default text-left">
          
          <div className="flex items-start gap-3 mb-4">
            <FiCheckCircle className="text-[#EF7D20] shrink-0 mt-0.5" size={20} />
            <p className="text-sm font-black text-[#1E2265] leading-snug">
              Check your mail! We have sent a password reset link.
            </p>
          </div>
          
          <div className="bg-white/60 p-3.5 rounded-xl border border-orange-100">
            <ul className="text-xs font-bold text-gray-500 space-y-2.5">
              <li className="flex items-center gap-2">
                <FiChevronRight className="text-[#EF7D20] shrink-0" size={16} /> 
                Click the secure link
              </li>
              <li className="flex items-center gap-2">
                <FiChevronRight className="text-[#EF7D20] shrink-0" size={16} /> 
                Enter new password
              </li>
              <li className="flex items-center gap-2">
                <FiChevronRight className="text-[#EF7D20] shrink-0" size={16} /> 
                Log in to your account
              </li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}