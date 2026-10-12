import React, { useState } from 'react';
import {
  ReturnRefund,
  Language,
} from '../types';
import {
  RotateCcw,
  Search,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

interface ReturnsRefundsViewProps {
  returns: ReturnRefund[];
  lang: Language;
}

export const ReturnsRefundsView: React.FC<ReturnsRefundsViewProps> = ({ returns, lang }) => {
  const [returnList] = useState<ReturnRefund[]>(returns);

  const totalRefundAmount = returnList.reduce((acc, r) => acc + (r.refundAmount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#bd70df]" />
            <span>রিটার্ন ও রিফান্ড ম্যানেজমেন্ট</span>
          </h3>
          <p className="text-xs text-[#a69ab1] mt-1">
            কুরিয়ার থেকে ফেরত আসা পার্সেল ও বিকাশ/নগদে রিফান্ড হিস্টোরি।
          </p>
        </div>
        <div className="bg-[#120f1a] px-4 py-2.5 rounded-2xl border border-[#2d2538] text-right">
          <span className="text-[10px] text-[#8e829d] block">মোট রিফান্ড ভলিউম</span>
          <span className="text-sm font-bold text-rose-400">৳ {totalRefundAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14111c] text-[#8e829d] border-b border-[#2d2538]">
              <tr>
                <th className="py-3 px-4">অর্ডার আইডি</th>
                <th className="py-3 px-4">গ্রাহক</th>
                <th className="py-3 px-4">কারণ</th>
                <th className="py-3 px-4">রিফান্ড পরিমাণ</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2538]/50">
              {returnList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#8e829d]">
                    কোনো রিটার্ন বা রিফান্ড রেকর্ড নেই
                  </td>
                </tr>
              ) : (
                returnList.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-bold text-white">#{item.orderId}</td>
                    <td className="py-3 px-4 text-[#d6cce0]">
                      <div>{item.customer}</div>
                      <div className="text-[11px] text-[#8e829d]">{item.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-[#a69ab1]">{item.reason}</td>
                    <td className="py-3 px-4 font-bold text-rose-400">৳ {item.refundAmount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Refunded'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : item.status === 'Approved'
                            ? 'bg-blue-500/20 text-blue-300'
                            : item.status === 'Rejected'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
