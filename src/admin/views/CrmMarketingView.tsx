import React from 'react';
import { CrmCustomer, PromoCode, Language } from '../types';
import { Users, Tag, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';

interface CrmMarketingViewProps {
  customers: CrmCustomer[];
  coupons: PromoCode[];
  lang: Language;
}

export const CrmMarketingView: React.FC<CrmMarketingViewProps> = ({
  customers,
  coupons,
  lang,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-[#bd70df]" />
          <span>কাস্টমার ডাটাবেজ ও প্রমো কোড মার্কেটিং</span>
        </h3>
        <p className="text-xs text-[#a69ab1] mt-1">
          নিয়মিত কাস্টমারদের ডাটা, মোট কেনাকাটা ও ডিসকাউন্ট ভাউচার পরিচালনা।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer List */}
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>টপ লয়াল কাস্টমারস ({customers.length})</span>
          </h4>
          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
            {customers.map((c) => (
              <div key={c.id} className="p-3 rounded-xl bg-[#120f1a] border border-[#2d2538] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{c.name}</span>
                  <p className="text-[11px] text-[#8e829d]">{c.phone}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-300">৳ {c.totalSpent}</span>
                  <span className="text-[10px] text-emerald-400 block">{c.ordersCount} টি অর্ডার</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Codes */}
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#bd70df]" />
            <span>সক্রিয় ডিসকাউন্ট কুপন</span>
          </h4>
          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
            {coupons.map((cp) => (
              <div key={cp.id} className="p-3 rounded-xl bg-[#120f1a] border border-[#2d2538] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#e4aeff] font-mono tracking-wider">{cp.code}</span>
                  <p className="text-[11px] text-[#8e829d]">
                    {cp.discountType === 'percentage' ? `${cp.discountValue}% ছাড়` : `৳ ${cp.discountValue} ছাড়`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    {cp.status}
                  </span>
                  <span className="text-[10px] text-[#8e829d] block mt-1">ব্যবহার: {cp.usedCount || 0} বার</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
