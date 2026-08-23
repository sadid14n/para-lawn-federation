'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiCheckCircle, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { loginUser } from './action';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(''); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await loginUser(formData);
      console.log('Login response:', response);

      if (response?.error) {
        setErrorMessage(response.error);
      } else if (response?.success) {
        // Redirect to dashboard on successful login
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = "w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3.5 text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF7D20] focus:ring-1 focus:ring-[#EF7D20] transition-all";

  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(30,34,101,0.1)] overflow-hidden flex flex-col md:flex-row">
        
        {/* ================= LEFT SIDE: BRANDING BANNER ================= */}
        <div className="w-full md:w-2/5 bg-[#1E2265] p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden text-white hidden md:flex">
          {/* Subtle Geometric Background */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          ></div>
          
          <div className="relative z-10">
            <Link href="/" className="inline-block mb-12">
              <img src="/logo-1.png" alt="PILBF Logo" className="h-16 w-16 bg-white rounded-full p-1 shadow-md" />
            </Link>
            
            <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Welcome <br />
              <span className="text-[#EF7D20]">Back.</span>
            </h1>
            <p className="text-blue-100/80 text-base leading-relaxed mb-8">
              Sign in to manage your classifications, enter official championships, and view your federation records.
            </p>
          </div>

          <div className="relative z-10 space-y-4 text-sm font-medium text-blue-100">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#EF7D20]" size={20} /> Official Member Dashboard
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#EF7D20]" size={20} /> Event Registration & Records
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-[#EF7D20]" size={20} /> Secure IBD Standard Portal
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: LOGIN FORM ================= */}
        <div className="w-full md:w-3/5 p-8 sm:p-10 lg:p-16 bg-white flex flex-col justify-center">
          
          {/* Mobile Logo Header */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <Link href="/">
              <img src="/logo-1.png" alt="PILBF Logo" className="h-16 w-16 bg-white rounded-full p-1 shadow-md border border-gray-100 mb-3" />
            </Link>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E2265]">PILBF Portal</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#1E2265] mb-2">Member Sign In</h2>
            <p className="text-gray-500 text-sm">
              Dont have an account?{' '}
              <Link href="/register" className="text-[#EF7D20] font-bold hover:underline">
                Register here
              </Link>
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3 animate-fade-in">
              <FiAlertCircle className="shrink-0 text-red-500" size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md w-full">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                required 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={inputStyles} 
                placeholder="name@example.com" 
                autoComplete="email"
              />
            </div>

            {/* Password Field with Show/Hide toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide">
                  Password <span className="text-red-500">*</span>
                </label>
                
                {/* ADD THIS FORGOT PASSWORD LINK */}
                <Link 
                  href="/forgot-password" 
                  className="text-xs font-bold text-gray-400 hover:text-[#EF7D20] transition-colors"
                >
                  Forgot Password?
                </Link>
                {/* ============================= */}
                
              </div>
              
              <div className="relative">
                <input 
                  required 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className={`${inputStyles} pr-12`} 
                  placeholder="••••••••" 
                  autoComplete="current-password"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#EF7D20] text-white font-bold py-4 rounded-xl hover:bg-[#d66a15] transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}