'use client';

import { useState } from 'react';
import { FiEye, FiTrash2, FiUserPlus, FiX, FiMail, FiPhone, FiMapPin, FiCalendar, FiShield } from 'react-icons/fi';
import { makeAdmin, removeAdmin } from './action';

export default function AdminManager({ admins }) {
  const [emailInput, setEmailInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isRemoving, setIsRemoving] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    setMessage({ type: '', text: '' });

    const response = await makeAdmin(emailInput);
    
    if (response.error) {
      setMessage({ type: 'error', text: response.error });
    } else {
      setMessage({ type: 'success', text: response.success });
      setEmailInput('');
    }
    setIsAdding(false);
  };

  const handleRemoveAdmin = async (adminId, adminName) => {
    if (!window.confirm(`Are you sure you want to remove Admin rights from ${adminName}? They will be demoted to a regular Player.`)) {
      return;
    }
    
    setIsRemoving(adminId);
    const response = await removeAdmin(adminId);
    
    if (response.error) {
      alert(response.error);
    } else {
      alert(response.success);
      setSelectedAdmin(null); // Close modal if open
    }
    setIsRemoving(null);
  };

  return (
    <div className="space-y-8">
      
      {/* ================= ADD ADMIN SECTION ================= */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-black text-[#1E2265] mb-2 flex items-center gap-2">
          <FiUserPlus className="text-[#EF7D20]" /> Promote New Admin
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter the registered email address of the user you want to grant Admin privileges to.
        </p>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-3 animate-fade-in ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            required 
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter user's email address..." 
            className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#EF7D20] focus:ring-1 focus:ring-[#EF7D20] transition-all"
          />
          <button 
            type="submit" 
            disabled={isAdding}
            className="bg-[#1E2265] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#EF7D20] transition-colors disabled:opacity-70 whitespace-nowrap"
          >
            {isAdding ? 'Promoting...' : 'Make Admin'}
          </button>
        </form>
      </div>

      {/* ================= ADMINS LIST TABLE ================= */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-lg font-black text-[#1E2265] flex items-center gap-2">
            <FiShield className="text-[#228B45]" /> Current Platform Admins
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-widest">
                <th className="p-5">Name</th>
                <th className="p-5">Email</th>
                <th className="p-5">Phone</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admins.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-400 font-bold">
                    No active admins found.
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-5 font-bold text-[#1E2265]">{admin.name}</td>
                    <td className="p-5 text-sm text-gray-500">{admin.email}</td>
                    <td className="p-5 text-sm font-semibold text-gray-700">{admin.phone}</td>
                    <td className="p-5 text-center flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setSelectedAdmin(admin)}
                        className="inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        <FiEye size={14} /> View
                      </button>
                      <button 
                        onClick={() => handleRemoveAdmin(admin.id, admin.name)}
                        disabled={isRemoving === admin.id}
                        className="inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        <FiTrash2 size={14} /> {isRemoving === admin.id ? 'Removing...' : 'Remove'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ADMIN DETAILS POPUP ================= */}
      {selectedAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2265]/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up relative flex flex-col">
            
            <div className="bg-[#1E2265] p-6 text-white flex justify-between items-center shrink-0">
              <div>
                <span className="inline-block bg-[#228B45] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded mb-2">
                  System Admin
                </span>
                <h3 className="text-2xl font-black">{selectedAdmin.name}</h3>
                <p className="text-blue-200 text-sm opacity-80">ID: PILBF-{selectedAdmin.id.toString().padStart(4, '0')}</p>
              </div>
              <button onClick={() => setSelectedAdmin(null)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white">
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Admin Contact Info</h4>
              <div className="grid grid-cols-1 gap-5 mb-8">
                <div className="flex items-center gap-3">
                  <div className="text-gray-400"><FiMail /></div>
                  <div><p className="text-[10px] text-gray-400 font-bold uppercase">Email</p><p className="font-semibold text-[#1E2265]">{selectedAdmin.email}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-gray-400"><FiPhone /></div>
                  <div><p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p><p className="font-semibold text-[#1E2265]">{selectedAdmin.phone}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-gray-400"><FiMapPin /></div>
                  <div><p className="text-[10px] text-gray-400 font-bold uppercase">State</p><p className="font-semibold text-[#1E2265]">{selectedAdmin.state}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-gray-400"><FiCalendar /></div>
                  <div><p className="text-[10px] text-gray-400 font-bold uppercase">Registered On</p><p className="font-semibold text-[#1E2265]">{formatDate(selectedAdmin.createdAt)}</p></div>
                </div>
              </div>
              
              <button 
                onClick={() => handleRemoveAdmin(selectedAdmin.id, selectedAdmin.name)}
                disabled={isRemoving === selectedAdmin.id}
                className="w-full bg-red-50 text-red-600 font-bold py-3.5 rounded-xl hover:bg-red-600 hover:text-white transition-colors border border-red-100"
              >
                {isRemoving === selectedAdmin.id ? 'Revoking Rights...' : 'Revoke Admin Privileges'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}