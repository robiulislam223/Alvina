import React from 'react';
import { PreOrder, Language } from '../types';
import { Clock, Phone, DollarSign, Calendar } from 'lucide-react';

interface PreOrdersViewProps {
  preorders: PreOrder[];
  lang: Language;
}

export const PreOrdersView: React.FC<PreOrdersViewProps> = ({ preorders, lang }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          <span>প্রি-অর্ডার ও অগ্রিম বুকিং</span>
        </h3>
        <p className="text-xs text-[#a69ab1] mt-1">
          পাকিস্তানি লঞ্চ ও আসন্ন কালেকশনের অ্যাডভান্স পেমেন্ট ও প্রি-অর্ডার ট্র্যাকিং।
        </p>
      </div>

      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14111c] text-[#8e829d] border-b border-[#2d2538]">
              <tr>
                <th className="py-3 px-4">প্রোডাক্ট</th>
                <th className="py-3 px-4">গ্রাহক ও মোবাইল</th>
                <th className="py-3 px-4">সম্ভাব্য ডেলিভারি</th>
                <th className="py-3 px-4">অগ্রিম পেমেন্ট</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2538]/50">
              {preorders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#8e829d]">
                    কোনো সক্রিয় প্রি-অর্ডার নেই
                  </td>
                </tr>
              ) : (
                preorders.map((po) => (
                  <tr key={po.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-bold text-white">{po.productName}</td>
                    <td className="py-3 px-4">
                      <div className="text-white">{po.customer}</div>
                      <div className="text-[11px] text-[#a69ab1]">{po.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-[#d6cce0]">{po.expectedDate}</td>
                    <td className="py-3 px-4 font-bold text-amber-300">৳ {po.advancePaid} / ৳ {po.totalPrice}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">
                        {po.status}
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
