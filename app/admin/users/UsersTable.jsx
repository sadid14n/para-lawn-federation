'use client';

import { useState } from 'react';
import { FiEye, FiX, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiSearch } from 'react-icons/fi';

export default function UsersTable({ users, currentRole }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ================= SEARCH BAR ================= */}
      <div className="mb-6 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3.5 shadow-sm focus-within:border-[#EF7D20] focus-within:ring-1 focus-within:ring-[#EF7D20] transition-all">
        <FiSearch className="text-gray-400 mr-3 shrink-0" size={18} />
        <input
          type="text"
          placeholder="Search by name or email address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm font-semibold text-[#1E2265] placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-widest">
                <th className="p-5">Name</th>
                <th className="p-5">Email</th>
                <th className="p-5">Phone</th>
                <th className="p-5">State</th>
                <th className="p-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Use filteredUsers instead of users here */}
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400 font-bold">
                    No {currentRole}s found matching "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-orange-50/50 transition-colors">
                    <td className="p-5 font-bold text-[#1E2265]">{user.name}</td>
                    <td className="p-5 text-sm text-gray-500">{user.email}</td>
                    <td className="p-5 text-sm font-semibold text-gray-700">{user.phone}</td>
                    <td className="p-5 text-sm font-semibold text-gray-700">{user.state}</td>
                    <td className="p-5 text-center">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        <FiEye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL / POPUP ================= */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2265]/40 backdrop-blur-sm animate-fade-in">
          
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#1E2265] p-6 text-white flex justify-between items-center shrink-0">
              <div>
                <span className="inline-block bg-[#EF7D20] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded mb-2">
                  {selectedUser.role} Profile
                </span>
                <h3 className="text-2xl font-black">{selectedUser.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto">
              
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Basic Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-0.5"><FiMail /></div>
                  <div><p className="text-[10px] text-gray-400 font-bold uppercase">Email</p><p className="font-semibold text-[#1E2265]">{selectedUser.email}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-0.5"><FiPhone /></div>
                  <div><p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p><p className="font-semibold text-[#1E2265]">{selectedUser.phone}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-0.5"><FiMapPin /></div>
                  <div><p className="text-[10px] text-gray-400 font-bold uppercase">State</p><p className="font-semibold text-[#1E2265]">{selectedUser.state}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-0.5"><FiCalendar /></div>
                  <div><p className="text-[10px] text-gray-400 font-bold uppercase">Registered On</p><p className="font-semibold text-[#1E2265]">{formatDate(selectedUser.createdAt)}</p></div>
                </div>
              </div>

              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Role Specific Data</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                
                {selectedUser.role === 'player' && (
                  <>
                    <div><p className="text-[10px] text-gray-400 font-bold uppercase">Date of Birth</p><p className="font-bold text-[#1E2265]">{formatDate(selectedUser.dob)}</p></div>
                    <div><p className="text-[10px] text-gray-400 font-bold uppercase">Gender</p><p className="font-bold text-[#1E2265]">{selectedUser.gender || 'N/A'}</p></div>
                    <div className="sm:col-span-2"><p className="text-[10px] text-gray-400 font-bold uppercase">Impairment Type (IBD)</p><p className="font-bold text-[#1E2265]">{selectedUser.impairmentType === 'Other' ? selectedUser.otherImpairment : selectedUser.impairmentType}</p></div>
                    <div><p className="text-[10px] text-gray-400 font-bold uppercase">Wheelchair User</p><p className="font-bold text-[#1E2265]">{selectedUser.wheelchairUser ? 'Yes' : 'No'}</p></div>
                  </>
                )}

                {selectedUser.role === 'coach' && (
                  <>
                    <div><p className="text-[10px] text-gray-400 font-bold uppercase">Primary Role</p><p className="font-bold text-[#1E2265]">{selectedUser.roleType || 'N/A'}</p></div>
                    <div><p className="text-[10px] text-gray-400 font-bold uppercase">Certification</p><p className="font-bold text-[#1E2265]">{selectedUser.certificationLevel || 'N/A'}</p></div>
                  </>
                )}

                {selectedUser.role === 'association' && (
                  <>
                    <div className="sm:col-span-2"><p className="text-[10px] text-gray-400 font-bold uppercase">Organization Name</p><p className="font-bold text-[#1E2265]">{selectedUser.orgName || 'N/A'}</p></div>
                    <div><p className="text-[10px] text-gray-400 font-bold uppercase">Organization Type</p><p className="font-bold text-[#1E2265]">{selectedUser.orgType || 'N/A'}</p></div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}