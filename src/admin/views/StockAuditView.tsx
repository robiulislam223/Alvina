import React from 'react';
import { StockAuditRecord, Language } from '../types';
import { Archive, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StockAuditViewProps {
  audits: StockAuditRecord[];
  lang: Language;
}

export const StockAuditView: React.FC<StockAuditViewProps> = ({ audits, lang }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Archive className="w-5 h-5 text-[#bd70df]" />
          <span>ইনভেন্টরি ফিজিক্যাল স্টক অডিট</span>
        </h3>
        <p className="text-xs text-[#a69ab1] mt-1">
          গোডাউনের বাস্তব স্টক গণনা এবং সিস্টেমে গরমিলের হিসেব নিরূপণ।
        </p>
      </div>

      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14111c] text-[#8e829d] border-b border-[#2d2538]">
              <tr>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">পণ্য</th>
                <th className="py-3 px-4">সিস্টেম স্টক</th>
                <th className="py-3 px-4">কাউন্ট করা স্টক</th>
                <th className="py-3 px-4">পার্থক্য / ভেরিয়েন্স</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2538]/50">
              {audits.map((a) => (
                <tr key={a.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-[#8e829d]">{a.date}</td>
                  <td className="py-3 px-4 font-bold text-white">{a.productName}</td>
                  <td className="py-3 px-4 text-[#d6cce0]">{a.systemStock}</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">{a.countedStock}</td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${a.difference === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {a.difference > 0 ? `+${a.difference}` : a.difference}
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
