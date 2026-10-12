import React from 'react';
import { CodSettlement, Language } from '../types';
import { DollarSign, CheckCircle2, Clock, Truck } from 'lucide-react';

interface CodSettlementViewProps {
  settlements: CodSettlement[];
  lang: Language;
}

export const CodSettlementView: React.FC<CodSettlementViewProps> = ({ settlements, lang }) => {
  const totalSettled = settlements.reduce((sum, s) => sum + (s.totalReceived || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span>কুরিয়ার ক্যাশ অন ডেলিভারি (COD) সেটেলমেন্ট</span>
          </h3>
          <p className="text-xs text-[#a69ab1] mt-1">
            Steadfast ও Pathao থেকে ব্যাংকে ও বিকাশে আসা টাকা সংগ্রহের অডিট ও হিসাব।
          </p>
        </div>
        <div className="bg-[#120f1a] px-4 py-2 rounded-2xl border border-[#2d2538] text-right">
          <span className="text-[10px] text-[#8e829d] block">মোট সেটেলমেন্ট রিসিভ</span>
          <span className="text-sm font-black text-emerald-400">৳ {totalSettled.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14111c] text-[#8e829d] border-b border-[#2d2538]">
              <tr>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">কুরিয়ার সার্ভিস</th>
                <th className="py-3 px-4">পার্সেল সংখ্যা</th>
                <th className="py-3 px-4">মোট সংগৃহীত (COD)</th>
                <th className="py-3 px-4">বকেয়া COD</th>
                <th className="py-3 px-4">প্রাপ্ত টাকা</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2538]/50">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-[#8e829d]">{s.settlementDate}</td>
                  <td className="py-3 px-4 font-bold text-white">{s.courierName}</td>
                  <td className="py-3 px-4 text-[#d6cce0]">{s.consignmentCount} টি</td>
                  <td className="py-3 px-4 font-bold text-amber-300">৳ {s.totalCodDue}</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">৳ {s.pendingCod}</td>
                  <td className="py-3 px-4 text-emerald-400 font-black">৳ {s.totalReceived}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
