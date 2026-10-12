import React, { useState } from 'react';
import {
  ExchangeRecord,
  Language,
} from '../types';
import {
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Plus,
  Truck,
  RotateCcw,
} from 'lucide-react';

interface ExchangeViewProps {
  exchanges: ExchangeRecord[];
  lang: Language;
}

export const ExchangeView: React.FC<ExchangeViewProps> = ({
  exchanges,
  lang,
}) => {
  const [exchangeList] = useState<ExchangeRecord[]>(exchanges);
  const [search, setSearch] = useState('');

  const filtered = exchangeList.filter(
    (e) =>
      String(e.orderId).includes(search) ||
      e.phone.includes(search) ||
      e.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#bd70df]" />
            <span>এক্সচেঞ্জ ও পার্সেল রিপ্লেসমেন্ট ম্যানেজমেন্ট</span>
          </h3>
          <p className="text-xs text-[#a69ab1] mt-1">
            সাইজ অমিল বা ত্রুটির কারণে গ্রাহকের প্রোডাক্ট বদলানোর রিকোয়েস্ট ও কুরিয়ার ট্র্যাকিং।
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14111c] text-[#8e829d] border-b border-[#2d2538]">
              <tr>
                <th className="py-3 px-4">অর্ডার আইডি ও গ্রাহক</th>
                <th className="py-3 px-4">পণ্য ও সাইজ পরিবর্তন</th>
                <th className="py-3 px-4">এক্সচেঞ্জের কারণ</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2538]/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#8e829d]">
                    কোনো এক্সচেঞ্জ রিকোয়েস্ট নেই
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">#{item.orderId}</div>
                      <div className="text-[11px] text-[#a69ab1]">{item.customer} ({item.phone})</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-white font-semibold">{item.productName}</div>
                      <div className="text-[11px] text-[#bd70df]">
                        পূর্বের সাইজ: <span className="line-through">{item.oldSize}</span> → নতুন সাইজ: <b>{item.newSize}</b>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#d6cce0]">{item.reason}</td>
                    <td className="py-3 px-4 text-[#8e829d]">{item.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-300'
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
