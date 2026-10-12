import React from 'react';
import { LandingPage, Language } from '../types';
import { Layout, ExternalLink, Plus, Eye } from 'lucide-react';

interface LandingsViewProps {
  landings: LandingPage[];
  lang: Language;
}

export const LandingsView: React.FC<LandingsViewProps> = ({ landings, lang }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layout className="w-5 h-5 text-[#bd70df]" />
            <span>হাই-কনভার্সন ল্যান্ডিং পেজ ক্যাম্পেইন</span>
          </h3>
          <p className="text-xs text-[#a69ab1] mt-1">
            ঈদ স্পেশাল থ্রি-পিস ও ফ্ল্যাশ সেলের জন্য কাস্টম ল্যান্ডিং পেজ।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {landings.map((lp) => (
          <div key={lp.id} className="bg-[#181422] border border-[#2d2538] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{lp.name}</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                {lp.status}
              </span>
            </div>
            <p className="text-xs text-[#a69ab1] font-mono">/{lp.slug}</p>
            <div className="pt-2 border-t border-[#2d2538] flex items-center justify-between text-xs text-[#8e829d]">
              <span>টার্গেট: {lp.targetProduct}</span>
              <span className="text-amber-300 font-bold">কনভার্সন: {lp.conversionRate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
