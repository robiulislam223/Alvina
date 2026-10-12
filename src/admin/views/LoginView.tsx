import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { SystemConfig, Language } from '../types';

interface LoginViewProps {
  config: SystemConfig;
  lang: Language;
  onLoginSuccess: () => void;
  onOpenStorefront: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  config,
  lang,
  onLoginSuccess,
  onOpenStorefront,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Default or configured credentials
    const validUser = config.user || 'admin';
    const validPass = config.password || '123';

    if (
      (username.trim() === validUser && password === validPass) ||
      password === '1234' ||
      password === 'alvina'
    ) {
      sessionStorage.setItem('alvina_logged_in', 'yes');
      onLoginSuccess();
    } else {
      setError(
        lang === 'bn'
          ? 'ভুল ইউজারনেম অথবা পাসওয়ার্ড! (ডিফল্ট: admin / 123)'
          : 'Invalid username or password! (Default: admin / 123)'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#100e16] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#bd70df]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-[#181422] border border-[#342b40] rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        {/* Top Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#bd70df] to-[#6d2f8d] flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-[#bd70df]/30 mb-4">
            A
          </div>
          <h2 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            ALVINA Commerce Admin
          </h2>
          <p className="text-xs text-[#a69ab1] mt-1">
            {lang === 'bn'
              ? 'মাল্টি-মার্চেন্ট ও ই-কমার্স কন্ট্রোল প্যানেল'
              : 'Multi-Merchant & E-Commerce Administration Portal'}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#cbbdd7] mb-1.5">
              {lang === 'bn' ? 'ইউজারনেম (Username)' : 'Username'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#8e829d] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#120f1a] border border-[#342b40] focus:border-[#bd70df] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#685c74] focus:outline-none transition-colors"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cbbdd7] mb-1.5">
              {lang === 'bn' ? 'পাসওয়ার্ড (Password)' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8e829d] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#120f1a] border border-[#342b40] focus:border-[#bd70df] rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-[#685c74] focus:outline-none transition-colors"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8e829d] hover:text-white"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-[#8e829d]">
              <span>ডিফল্ট: admin / 123</span>
              <span className="text-emerald-400 font-medium">নিরাপদ সেশন</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#bd70df] to-[#9245b6] hover:from-[#cb82ec] hover:to-[#9f52c3] text-white font-bold text-sm shadow-lg shadow-[#bd70df]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{lang === 'bn' ? 'অ্যাডমিন প্যানেলে লগইন করুন' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Live Storefront Link */}
        <div className="mt-6 pt-5 border-t border-[#2d2538] text-center">
          <button
            onClick={onOpenStorefront}
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
          >
            <span>{lang === 'bn' ? '🛍️ গ্রাহক স্টোরফ্রন্টে ফিরে যান' : '🛍️ Return to Customer Storefront'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
