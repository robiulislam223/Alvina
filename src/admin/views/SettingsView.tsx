import React, { useState } from 'react';
import {
  SystemConfig,
  Language,
} from '../types';
import {
  Sliders,
  CheckCircle2,
  Lock,
  Store,
  Phone,
  MapPin,
  Download,
  Upload,
  RefreshCw,
} from 'lucide-react';

interface SettingsViewProps {
  config: SystemConfig;
  lang: Language;
  onUpdateConfig: (newConfig: SystemConfig) => void;
  onOpenCodeExport: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  config,
  lang,
  onUpdateConfig,
  onOpenCodeExport,
}) => {
  const [storeName, setStoreName] = useState(config.storeName || 'ALVINA Fashion BD');
  const [storeAddress, setStoreAddress] = useState(config.storeAddress || 'House 18, Road 4, Sector 11, Uttara, Dhaka-1230');
  const [whatsapp, setWhatsapp] = useState(config.whatsapp || '01999-973506');
  const [user, setUser] = useState(config.user || 'admin');
  const [password, setPassword] = useState(config.password || '123');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SystemConfig = {
      ...config,
      storeName,
      storeAddress,
      whatsapp,
      user,
      password,
    };
    onUpdateConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#bd70df]" />
            <span>সিস্টেম ও জেনারেল সেটিংস</span>
          </h3>
          <p className="text-xs text-[#a69ab1] mt-1">
            দোকানের নাম, ইনভয়েসের ঠিকানা, হোয়াটসঅ্যাপ নাম্বার ও পাসওয়ার্ড পরিবর্তন।
          </p>
        </div>

        <button
          onClick={onOpenCodeExport}
          className="px-4 py-2 rounded-xl bg-[#2b2238] border border-[#3e3250] hover:bg-[#362b46] text-[#e4aeff] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>সম্পূর্ণ ব্যাকআপ নিন</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm space-y-5 text-xs">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-[#2d2538] pb-2">
            <Store className="w-4 h-4 text-amber-400" />
            <span>দোকান ও ব্র্যান্ডের তথ্য</span>
          </h4>

          <div>
            <label className="block text-[#cbbdd7] mb-1 font-medium">ব্র্যান্ড / শোরুমের নাম</label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
            />
          </div>

          <div>
            <label className="block text-[#cbbdd7] mb-1 font-medium">অফিশিয়াল WhatsApp / হেল্পলাইন নাম্বার</label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
            />
          </div>

          <div>
            <label className="block text-[#cbbdd7] mb-1 font-medium">ইনভয়েসের ঠিকানা (Invoice Store Address)</label>
            <textarea
              rows={2}
              required
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#2d2538]">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-[#2d2538] pb-2">
            <Lock className="w-4 h-4 text-rose-400" />
            <span>এডমিন লগইন তথ্য (লগইন ক্রেডেনশিয়াল)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#cbbdd7] mb-1 font-medium">ইউজারনেম (Username)</label>
              <input
                type="text"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
              />
            </div>

            <div>
              <label className="block text-[#cbbdd7] mb-1 font-medium">পাসওয়ার্ড (Password)</label>
              <input
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#bd70df] text-white font-bold hover:bg-[#ce85ef] transition-colors cursor-pointer"
          >
            পরিবর্তন সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};
