import React, { useState } from 'react';
import {
  StaffMember,
  Language,
} from '../types';
import {
  Users,
  Shield,
  Plus,
  Trash2,
  Mail,
  Phone,
  CheckCircle2,
} from 'lucide-react';

interface StaffViewProps {
  staff: StaffMember[];
  lang: Language;
}

export const StaffView: React.FC<StaffViewProps> = ({ staff, lang }) => {
  const [staffList, setStaffList] = useState<StaffMember[]>(staff);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Super Admin' | 'Store Manager' | 'Order Dispatcher' | 'Accountant'>('Order Dispatcher');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStaff: StaffMember = {
      id: Date.now(),
      name: name.trim(),
      role,
      phone: phone.trim(),
      email: email.trim(),
      status: 'Active',
    };

    setStaffList([...staffList, newStaff]);
    setIsAddOpen(false);
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#bd70df]" />
            <span>স্টাফ ও রোল পারমিশন ম্যানেজমেন্ট</span>
          </h3>
          <p className="text-xs text-[#a69ab1] mt-1">
            ম্যানেজার, কল সেন্টার অপারেটর ও ডেলিভারি টিমের অ্যাক্সেস নিয়ন্ত্রণ।
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#bd70df] text-white font-bold text-xs hover:bg-[#ce85ef] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ নতুন স্টাফ সদস্য</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((member) => (
          <div
            key={member.id}
            className="bg-[#181422] border border-[#2d2538] rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2a2236] text-[#bd70df] font-bold flex items-center justify-center">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{member.name}</h4>
                  <p className="text-[11px] text-[#bd70df] font-medium">{member.role}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                {member.status}
              </span>
            </div>

            <div className="text-xs text-[#a69ab1] space-y-1 pt-2 border-t border-[#2d2538]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8e829d]" />
                <span>{member.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8e829d]" />
                <span className="truncate">{member.email || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#181422] border border-[#342b40] rounded-3xl p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-4">নতুন স্টাফ সদস্য যোগ করুন</h3>
            <form onSubmit={handleAddStaff} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#cbbdd7] mb-1">নাম *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                />
              </div>
              <div>
                <label className="block text-[#cbbdd7] mb-1">রোল / পদবী</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                >
                  <option value="Super Admin">সুপার এডমিন (Super Admin)</option>
                  <option value="Store Manager">স্টোর ম্যানেজার (Store Manager)</option>
                  <option value="Order Dispatcher">অর্ডার ডিসপ্যাচার (Order Dispatcher)</option>
                  <option value="Accountant">হিসাবরক্ষক (Accountant)</option>
                </select>
              </div>
              <div>
                <label className="block text-[#cbbdd7] mb-1">মোবাইল</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                />
              </div>
              <div>
                <label className="block text-[#cbbdd7] mb-1">ইমেইল</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-[#a69ab1]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#bd70df] text-white font-bold"
                >
                  যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
