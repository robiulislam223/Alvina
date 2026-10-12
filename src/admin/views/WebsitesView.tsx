import React from 'react';
import { Website, Language } from '../types';
import { Globe, ExternalLink, CheckCircle2 } from 'lucide-react';

interface WebsitesViewProps {
  websites: Website[];
  lang: Language;
  onOpenStorefront: () => void;
}

export const WebsitesView: React.FC<WebsitesViewProps> = ({
  websites,
  lang,
  onOpenStorefront,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#bd70df]" />
            <span>সংযুক্ত ওয়েবসাইট ও সেলস চ্যানেল</span>
          </h3>
          <p className="text-xs text-[#a69ab1] mt-1">
            আলভিনা লাইভ অনলাইন স্টোরফ্রন্ট এবং অন্যান্য কমার্স চ্যানেল।
          </p>
        </div>
        <button
          onClick={onOpenStorefront}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/40 text-amber-200 text-xs font-bold hover:bg-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>লাইভ ওয়েবসাইট ভিজিট করুন</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {websites.map((w) => (
          <div key={w.id} className="bg-[#181422] border border-[#2d2538] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{w.name}</h4>
                <div className="text-xs text-[#bd70df] flex items-center gap-1 mt-0.5">
                  <span>https://{w.domain}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                {w.status}
              </span>
            </div>
            <div className="pt-2 border-t border-[#2d2538] flex items-center justify-between text-xs text-[#a69ab1]">
              <span>মার্চেন্ট: {w.merchantName}</span>
              <span className="text-emerald-400 font-semibold">থিম: {w.theme}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
