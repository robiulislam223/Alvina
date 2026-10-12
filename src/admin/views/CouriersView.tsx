import React, { useState } from 'react';
import {
  CourierService,
  Language,
} from '../types';
import {
  Truck,
  CheckCircle2,
  Key,
  Globe,
  Phone,
  DollarSign,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface ExtendedCourier extends CourierService {
  apiKey?: string;
  secretKey?: string;
  baseChargeDhaka?: number;
  baseChargeOutside?: number;
}

interface CouriersViewProps {
  couriers: CourierService[];
  lang: Language;
}

export const CouriersView: React.FC<CouriersViewProps> = ({ couriers, lang }) => {
  const [courierList, setCourierList] = useState<ExtendedCourier[]>(() =>
    couriers.map((c) => ({
      ...c,
      apiKey: c.name === 'Steadfast' ? 'st_live_93817' : '',
      baseChargeDhaka: 70,
      baseChargeOutside: 130,
    }))
  );
  const [selectedCourier, setSelectedCourier] = useState<ExtendedCourier | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleConfigure = (c: ExtendedCourier) => {
    setSelectedCourier(c);
    setApiKey(c.apiKey || '');
    setSecretKey(c.secretKey || '');
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourier) return;

    setCourierList((prev) =>
      prev.map((item) =>
        item.id === selectedCourier.id
          ? { ...item, apiKey, secretKey, status: 'Active' }
          : item
      )
    );
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setSelectedCourier(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Intro card */}
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans'] flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#bd70df]" />
            <span>বাংলাদেশ কুরিয়ার এপিআই ইন্টিগ্রেশন</span>
          </h3>
          <p className="text-xs text-[#a69ab1] mt-1">
            Steadfast, Pathao, RedX ও Paperfly এর সাথে অটোমেটিক পার্সেল ক্রিয়েশন ও লাইভ ট্র্যাকিং।
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            API গেটওয়ে সক্রিয়
          </span>
        </div>
      </div>

      {/* Courier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courierList.map((courier) => (
          <div
            key={courier.id}
            className="bg-[#181422] border border-[#2d2538] rounded-2xl p-5 shadow-sm space-y-4 hover:border-[#bd70df]/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{courier.name}</h4>
                  <p className="text-[11px] text-[#8e829d]">ক্যাশ অন ডেলিভারি ও রিয়েল-টাইম ট্র্যাকিং</p>
                </div>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  courier.status === 'Active'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-stone-500/20 text-stone-300'
                }`}
              >
                {courier.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-[#120f1a] p-3 rounded-xl border border-[#2d2538]">
              <div>
                <span className="text-[10px] text-[#8e829d] block">ঢাকা রেট:</span>
                <span className="text-white font-bold">৳ {courier.baseChargeDhaka || 70}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8e829d] block">ঢাকার বাইরে রেট:</span>
                <span className="text-white font-bold">৳ {courier.baseChargeOutside || 130}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-[#a69ab1]">
                API কী: {courier.apiKey ? '••••••••••••' : 'সংযুক্ত করা হয়নি'}
              </span>
              <button
                onClick={() => handleConfigure(courier)}
                className="px-3 py-1.5 rounded-xl bg-[#2a2236] hover:bg-[#382d49] text-[#e4aeff] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>API কনফিগারেশন</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Config Modal */}
      {selectedCourier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#181422] border border-[#342b40] rounded-3xl p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-1">
              {selectedCourier.name} এপিআই কী সেট করুন
            </h3>
            <p className="text-xs text-[#a69ab1] mb-4">
              আপনার {selectedCourier.name} মার্চেন্ট প্যানেল থেকে প্রাপ্ত API কী ও Secret কী প্রদান করুন।
            </p>

            {savedSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>API কনফিগারেশন সফলভাবে আপডেট হয়েছে!</span>
              </div>
            )}

            <form onSubmit={handleSaveConfig} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#cbbdd7] mb-1">API Key *</label>
                <input
                  type="text"
                  required
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="e.g. st_live_key_93817..."
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
                />
              </div>

              <div>
                <label className="block text-[#cbbdd7] mb-1">Secret Key / Merchant ID</label>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="e.g. sec_9302..."
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedCourier(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#a69ab1] font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#bd70df] text-white font-bold hover:bg-[#ce85ef]"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
