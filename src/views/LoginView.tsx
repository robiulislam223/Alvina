import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: string, pass: string) => boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(user.trim(), password);
    if (!success) {
      setError('User ID অথবা Password ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  const handleQuickDemo = () => {
    setUser('admin');
    setPassword('admin123');
    onLogin('admin', 'admin123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#100e16] via-[#1a1223] to-[#100e16] relative overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#bd70df]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#181520]/95 backdrop-blur-xl border border-[#342b40] rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
              ALVINA
            </span>
            <span className="text-2xl font-bold text-[#bd70df] font-['Plus_Jakarta_Sans']">
              COMMERCE
            </span>
          </div>
          <p className="text-xs font-semibold text-[#bd70df] tracking-wider uppercase">
            Multi-Merchant Admin Panel
          </p>
          <h2 className="text-xl font-bold text-white mt-4">Admin Sign In</h2>
          <p className="text-xs text-[#a69ab1] mt-1">
            আপনার অ্যাডমিন User ID ও Password দিয়ে ড্যাশবোর্ডে প্রবেশ করুন।
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-[#351822] border border-[#6b2a3a] text-xs text-[#ff9aaa] font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">User ID</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#a69ab1] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                autoComplete="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="admin"
                className="w-full pl-9 pr-3 py-2.5 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#a69ab1] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#bd70df] text-[#160e1b] hover:bg-[#d091ee] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#bd70df]/20 mt-2"
          >
            <span>লগইন করুন (Login)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 px-4 rounded-xl font-medium text-xs bg-[#211a2b] hover:bg-[#2b2138] text-[#e8d9f0] border border-[#3d2e4c] transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#bd70df]" />
            <span>ডিফল্ট তথ্য দিয়ে প্রবেশ (One-Click Demo Login)</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#342b40] text-center">
          <p className="text-[11px] text-[#a69ab1]">
            প্রাথমিক ডিফল্ট লগইন: User ID: <b className="text-white">admin</b>, Password:{' '}
            <b className="text-white">admin123</b>
          </p>
          <div className="mt-2 flex items-center justify-center gap-1 text-[11px] text-[#36c98b]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>লগইন করার পর সেটিংস থেকে পরিবর্তন করে নিন</span>
          </div>
        </div>
      </div>
    </div>
  );
};
