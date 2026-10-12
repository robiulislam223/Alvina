import React, { useState } from 'react';
import {
  SystemConfig,
  Language,
} from '../types';
import {
  Truck,
  CheckCircle2,
  DollarSign,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface DeliverySettingsViewProps {
  config: SystemConfig;
  lang: Language;
  onUpdateConfig: (newConfig: SystemConfig) => void;
}

export const DeliverySettingsView: React.FC<DeliverySettingsViewProps> = ({
  config,
  lang,
  onUpdateConfig,
}) => {
  const [dhaka, setDhaka] = useState(config.deliveryDhaka || 80);
  const [suburbs, setSuburbs] = useState(config.deliverySuburbs || 100);
  const [outside, setOutside] = useState(config.deliveryOutside || 150);
  const [freeMin, setFreeMin] = useState(config.freeDeliveryMin || 2500);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SystemConfig = {
      ...config,
      deliveryDhaka: Number(dhaka),
      deliverySuburbs: Number(suburbs),
      deliveryOutside: Number(outside),
      freeDeliveryMin: Number(freeMin),
    };
    onUpdateConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm space-y-2">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#bd70df]" />
          <span>ডেলিভারি চার্জ রেট ও ফ্রি ডেলিভারি কনফিগারেশন</span>
        </h3>
        <p className="text-xs text-[#a69ab1]">
          এই চার্জগুলো গ্রাহকের চেকআউট ফর্ম এবং অ্যাডমিন প্যানেলে তাৎক্ষণিকভাবে প্রভাব ফেলবে।
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>ডেলিভারি চার্জ সফলভাবে আপডেট ও সংরক্ষিত হয়েছে!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm space-y-4 text-xs">
        <div className="space-y-4">
          <div>
            <label className="block text-[#cbbdd7] mb-1 font-medium">
              ঢাকার ভিতরের চার্জ (৳)
            </label>
            <input
              type="number"
              required
              value={dhaka}
              onChange={(e) => setDhaka(Number(e.target.value))}
              className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
            />
          </div>

          <div>
            <label className="block text-[#cbbdd7] mb-1 font-medium">
              ঢাকা উপশহর (সাভার, কেরানীগঞ্জ, গাজীপুর ইত্যাদি) চার্জ (৳)
            </label>
            <input
              type="number"
              required
              value={suburbs}
              onChange={(e) => setSuburbs(Number(e.target.value))}
              className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
            />
          </div>

          <div>
            <label className="block text-[#cbbdd7] mb-1 font-medium">
              সমগ্র বাংলাদেশ / ঢাকার বাইরের চার্জ (৳)
            </label>
            <input
              type="number"
              required
              value={outside}
              onChange={(e) => setOutside(Number(e.target.value))}
              className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
            />
          </div>

          <div className="pt-2 border-t border-[#2d2538]">
            <label className="block text-amber-300 mb-1 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ফ্রি ডেলিভারি পাওয়ার ন্যূনতম অর্ডার মূল্য (৳)</span>
            </label>
            <input
              type="number"
              required
              value={freeMin}
              onChange={(e) => setFreeMin(Number(e.target.value))}
              className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
            />
            <p className="text-[11px] text-[#8e829d] mt-1">
              গ্রাহক এর চেয়ে বেশি টাকার অর্ডার করলে ডেলিভারি চার্জ অটোমেটিক ৳০ (ফ্রি) হয়ে যাবে।
            </p>
          </div>
        </div>

        <div className="pt-3 flex justify-end">
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
