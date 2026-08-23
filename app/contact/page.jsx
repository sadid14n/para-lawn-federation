'use client';

import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { submitContactForm } from './action';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    const formData = new FormData(e.target);
    const response = await submitContactForm(formData);

    if (response.error) {
      setStatus({ type: 'error', text: response.error });
    } else {
      setStatus({ type: 'success', text: response.success });
      e.target.reset(); // Clear the form inputs
    }
    
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#1E2265] mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Have a question about the federation, tournaments, or registration? Fill out the form below and our team will get back to you.
          </p>
        </div>

        {/* Contact Container */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* LEFT SIDE: Animated Federation Cards & Info */}
          {/* Added 'group' to trigger hover animations on the children */}
          <div className="lg:w-2/5 bg-[#1E2265] text-white p-10 md:p-14 relative overflow-hidden flex flex-col justify-between group">
            
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF7D20] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              
              <div className="mb-8">
                <h2 className="text-3xl font-black mb-2">Get in Touch</h2>
                <p className="text-blue-200 leading-relaxed text-sm">
                  We are here to support our athletes, coaches, and associations across India.
                </p>
              </div>

              {/* ================= ANIMATED IMAGE CARDS ================= */}
              <div className="relative h-48 sm:h-56 mb-10 w-full shrink-0">
                
                {/* Back Image Card (Rotated Left) */}
                <div className="absolute top-0 left-0 w-[70%] h-40 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform -rotate-6 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 ease-out z-10">
                  {/* Replace src with your actual federation images in the public folder if you have them */}
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6PF9oxtwKKR8i7wrq0Bzdkgl1RqkUUpIDXLjxv5hbGQ&s=10" alt="Para Sports Team" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-[#1E2265]/40 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>

                {/* Front Image Card (Rotated Right) */}
                <div className="absolute bottom-0 right-0 w-[70%] h-40 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#EF7D20]/30 transform rotate-3 translate-y-4 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-out z-20 delay-75">
                   {/* Replace src with your actual federation images in the public folder if you have them */}
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz9Nzb63cc_H7Cd4J4UbtK5KzBWFCFWE2kKT8miL08WA&s=10" alt="Lawn Bowls Field" className="w-full h-full object-cover" />
                </div>

              </div>
              
              {/* Contact Information */}
              <div className="space-y-6 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-2.5 rounded-lg shrink-0 text-[#EF7D20]"><FiMail size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-0.5">Email Us</p>
                    <a href="mailto:rajabowls79@gmail.com" className="font-bold text-sm hover:text-[#EF7D20] transition-colors">rajabowls79@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-2.5 rounded-lg shrink-0 text-[#EF7D20]"><FiPhone size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-0.5">Call Us</p>
                    <a href="tel:+919310664647" className="font-bold text-sm hover:text-[#EF7D20] transition-colors">+91 93106 64647</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-2.5 rounded-lg shrink-0 text-[#EF7D20]"><FiMapPin size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-0.5">Headquarters</p>
                    <p className="font-bold text-sm">New Delhi, India</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Contact Form */}
          <div className="lg:w-3/5 p-10 md:p-14">
            
            {status.text && (
              <div className={`mb-8 p-5 rounded-2xl text-sm font-bold flex items-center gap-3 animate-fade-in ${
                status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'
              }`}>
                {status.type === 'error' ? <FiAlertCircle size={20} className="shrink-0" /> : <FiCheckCircle size={20} className="shrink-0" />}
                <span>{status.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full bg-gray-50 border border-gray-200 text-[#1E2265] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#EF7D20] focus:ring-1 focus:ring-[#EF7D20] transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full bg-gray-50 border border-gray-200 text-[#1E2265] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#EF7D20] focus:ring-1 focus:ring-[#EF7D20] transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  required 
                  className="w-full bg-gray-50 border border-gray-200 text-[#1E2265] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#EF7D20] focus:ring-1 focus:ring-[#EF7D20] transition-all" 
                  placeholder="How can we help you?" 
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  name="message" 
                  required 
                  rows="5"
                  className="w-full bg-gray-50 border border-gray-200 text-[#1E2265] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#EF7D20] focus:ring-1 focus:ring-[#EF7D20] transition-all resize-none" 
                  placeholder="Write your message here..." 
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#EF7D20] text-white font-black px-10 py-4 rounded-xl hover:bg-[#d66a15] transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sending...
                  </span>
                ) : (
                  <><FiSend size={18} /> Send Message</>
                )}
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}