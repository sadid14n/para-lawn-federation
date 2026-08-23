'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiBriefcase, FiHome, FiCheckCircle, FiEye, FiEyeOff, FiArrowLeft, FiMail } from 'react-icons/fi';
import { sendRegistrationOtp, registerUser } from './action';

export default function Register() {
  const router = useRouter();
  
  // States
  const [activeTab, setActiveTab] = useState('player'); 
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // OTP States
  const [otpStep, setOtpStep] = useState(false);
  const [otpToken, setOtpToken] = useState('');
  const [userOtp, setUserOtp] = useState('');

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', state: '',
    dob: '', gender: '', impairmentType: '', otherImpairment: '', wheelchair: '',
    roleType: '', certification: '', orgName: '', orgType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  // 1. Handle Initial Form Submit (Send OTP)
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await sendRegistrationOtp(formData.email);
      if (response.error) {
        setErrorMsg(response.error);
      } else if (response.success) {
        setOtpToken(response.token);
        setOtpStep(true); // Switch to OTP Screen
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Final OTP Verification & Registration
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await registerUser(activeTab, formData, userOtp, otpToken);
      if (response.error) {
        setErrorMsg(response.error);
      } else if (response.success) {
        alert(response.success);
        router.push('/login');
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = "w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-[#EF7D20] focus:ring-1 focus:ring-[#EF7D20] transition-all";

  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(30,34,101,0.1)] overflow-hidden flex flex-col lg:flex-row">
        
        {/* LEFT SIDE: BRANDING BANNER (Remains Same) */}
        <div className="w-full lg:w-2/5 bg-[#1E2265] p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden text-white hidden md:flex">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="relative z-10">
            <Link href="/" className="inline-block mb-12">
              <img src="/logo-1.png" alt="PILBF Logo" className="h-16 w-16 bg-white rounded-full p-1 shadow-md" />
            </Link>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Join The <br /><span className="text-[#EF7D20]">Movement.</span></h1>
            <p className="text-blue-100/80 text-base md:text-lg mb-8 leading-relaxed">Create an account to register for tournaments, manage classifications, and become an official part of the Para Indian Lawn Bowls Federation.</p>
          </div>
          <div className="relative z-10 space-y-4 text-sm font-medium text-blue-100">
            <div className="flex items-center gap-3"><FiCheckCircle className="text-[#EF7D20]" size={20} /> Access National Tournaments</div>
            <div className="flex items-center gap-3"><FiCheckCircle className="text-[#EF7D20]" size={20} /> Official IBD Classification</div>
            <div className="flex items-center gap-3"><FiCheckCircle className="text-[#EF7D20]" size={20} /> Grassroots to Global Pathways</div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM / OTP SCREEN */}
        <div className="w-full lg:w-3/5 p-8 sm:p-10 lg:p-12 bg-white flex flex-col justify-center">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold animate-fade-in">
              {errorMsg}
            </div>
          )}

          {/* ================= OTP VERIFICATION SCREEN ================= */}
          {otpStep ? (
            <div className="max-w-md w-full mx-auto animate-fade-in-up">
              <button 
                onClick={() => setOtpStep(false)}
                className="flex items-center text-sm font-bold text-gray-400 hover:text-[#1E2265] mb-8 transition-colors"
              >
                <FiArrowLeft className="mr-2" /> Back to form
              </button>
              
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center text-[#EF7D20] mb-6">
                <FiMail size={28} />
              </div>
              
              <h2 className="text-3xl font-black text-[#1E2265] mb-2">Verify Email</h2>
              <p className="text-gray-500 text-sm mb-8">
                We sent a 6-digit verification code to <strong className="text-gray-800">{formData.email}</strong>.
              </p>

              <form onSubmit={handleVerifyAndRegister} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Enter OTP <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    type="text" 
                    maxLength="6"
                    value={userOtp} 
                    onChange={(e) => setUserOtp(e.target.value)} 
                    className={`${inputStyles} text-2xl tracking-[0.5em] font-black text-center py-4`} 
                    placeholder="••••••" 
                  />
                </div>
                
                <button type="submit" disabled={isLoading} className="w-full bg-[#EF7D20] text-white font-bold py-4 rounded-xl hover:bg-[#d66a15] transition-colors shadow-lg">
                  {isLoading ? 'Verifying...' : 'Verify & Complete Registration'}
                </button>
              </form>
            </div>
          ) : (
            /* ================= MAIN REGISTRATION FORM ================= */
            <>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-[#1E2265] mb-2">Create an Account</h2>
                <p className="text-gray-500 text-sm">Already have an account? <Link href="/login" className="text-[#EF7D20] font-bold hover:underline">Log in here</Link></p>
              </div>

              {/* TABS */}
              <div className="flex p-1 bg-gray-100 rounded-xl mb-8 overflow-x-auto hide-scrollbar">
                {['player', 'coach', 'association'].map((tab) => (
                  <button 
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all whitespace-nowrap capitalize ${activeTab === tab ? 'bg-white text-[#1E2265] shadow-sm border border-gray-200' : 'text-gray-500 hover:text-[#1E2265]'}`}
                  >
                    {tab === 'player' && <FiUser size={16} />}
                    {tab === 'coach' && <FiBriefcase size={16} />}
                    {tab === 'association' && <FiHome size={16} />}
                    {tab === 'coach' ? 'Coach/Official' : tab}
                  </button>
                ))}
              </div>

              {/* FORM */}
              <form onSubmit={handleSendOtp} className="space-y-6">
                
                {/* COMMON FIELDS (Same as before) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">
                      {activeTab === 'association' ? 'Contact Person Name' : 'Full Name'} *
                    </label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyles} placeholder="John Doe" />
                  </div>
                  
                  {activeTab === 'association' && (
                    <div>
                      <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Organization Name *</label>
                      <input required type="text" name="orgName" value={formData.orgName} onChange={handleChange} className={inputStyles} placeholder="Assam Para Bowls Assoc." />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputStyles} placeholder="name@example.com" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Password *</label>
                    <div className="relative">
                      <input required type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className={`${inputStyles} pr-12`} placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputStyles} placeholder="+91 99999 99999" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">State / Region *</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleChange} className={inputStyles} placeholder="e.g., Assam" />
                  </div>
                </div>

                {/* DYNAMIC FIELDS: PLAYER */}
                {activeTab === 'player' && (
                  <>
                    <div className="w-full h-px bg-gray-200 my-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Date of Birth *</label>
                        <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputStyles} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Gender *</label>
                        <select required name="gender" value={formData.gender} onChange={handleChange} className={inputStyles}>
                          <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Impairment Category *</label>
                        <select required name="impairmentType" value={formData.impairmentType} onChange={handleChange} className={inputStyles}>
                          <option value="">Select Category</option><option value="Visual Impairment (B1-B4)">Visual Impairment (B1-B4)</option><option value="Physical Impairment (B5-B8)">Physical Impairment (B5-B8)</option><option value="Pending Classification">Pending Classification</option><option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Wheelchair User? *</label>
                        <select required name="wheelchair" value={formData.wheelchair} onChange={handleChange} className={inputStyles}>
                          <option value="">Select...</option><option value="Yes">Yes</option><option value="No">No</option>
                        </select>
                      </div>
                      {formData.impairmentType === 'Other' && (
                        <div className="col-span-1 md:col-span-2 mt-2">
                          <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Specify Impairment *</label>
                          <input required minLength={5} type="text" name="otherImpairment" value={formData.otherImpairment} onChange={handleChange} className={inputStyles} placeholder="Describe impairment" />
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* DYNAMIC FIELDS: COACH */}
                {activeTab === 'coach' && (
                  <>
                    <div className="w-full h-px bg-gray-200 my-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Primary Role *</label>
                        <select required name="roleType" value={formData.roleType} onChange={handleChange} className={inputStyles}>
                          <option value="">Select Role</option><option value="Coach">Coach</option><option value="Referee / Umpire">Referee / Umpire</option><option value="Classifier">Classifier</option><option value="Volunteer">Volunteer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Certification Level *</label>
                        <select required name="certification" value={formData.certification} onChange={handleChange} className={inputStyles}>
                          <option value="">Select Level</option><option value="National Level">National Level</option><option value="State Level">State Level</option><option value="Trainee / Beginner">Trainee / Beginner</option><option value="None">None</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* DYNAMIC FIELDS: ASSOCIATION */}
                {activeTab === 'association' && (
                  <>
                    <div className="w-full h-px bg-gray-200 my-6"></div>
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#1E2265] uppercase tracking-wide mb-2">Organization Type *</label>
                        <select required name="orgType" value={formData.orgType} onChange={handleChange} className={inputStyles}>
                          <option value="">Select Type</option><option value="State Para Bowls Association">State Para Bowls Association</option><option value="Sports Club / Academy">Sports Club / Academy</option><option value="NGO / Trust">NGO / Trust</option><option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4">
                  <button type="submit" disabled={isLoading} className="w-full bg-[#EF7D20] text-white font-bold py-4 rounded-xl hover:bg-[#d66a15] transition-colors shadow-lg flex items-center justify-center">
                    {isLoading ? 'Sending Verification Code...' : 'Send OTP & Continue'}
                  </button>
                </div>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}