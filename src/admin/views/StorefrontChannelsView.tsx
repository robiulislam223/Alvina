import React from 'react';
import { TrackingPixel, WholesaleBuyer, Language } from '../types';
import { Globe, Eye, Briefcase, ExternalLink } from 'lucide-react';

interface StorefrontChannelsViewProps {
  pixels: TrackingPixel[];
  wholesale: WholesaleBuyer[];
  lang: Language;
}

export const StorefrontChannelsView: React.FC<StorefrontChannelsViewProps> = ({
  pixels,
  wholesale,
  lang,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#bd70df]" />
          <span>ফেসবুক পিক্সেল ও হোলসেল (পাইকারি) বায়ার্স</span>
        </h3>
        <p className="text-xs text-[#a69ab1] mt-1">
          ফেসবুক ও টিকটক কনভার্সন পিক্সেল ট্র্যাকিং এবং হোলসেল পার্টনার রেকর্ড।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tracking Pixels */}
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <span>ফেসবুক ও অ্যাড পিক্সেল ({pixels.length})</span>
          </h4>
          <div className="space-y-2">
            {pixels.map((px) => (
              <div key={px.id} className="p-3 rounded-xl bg-[#120f1a] border border-[#2d2538] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{px.platform}</span>
                  <p className="text-[11px] text-[#8e829d] font-mono">{px.pixelId}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  px.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-stone-500/20 text-stone-300'
                }`}>
                  {px.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wholesale Buyers */}
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>হোলসেল (পাইকারি) ক্লায়েন্ট ({wholesale.length})</span>
          </h4>
          <div className="space-y-2">
            {wholesale.map((w) => (
              <div key={w.id} className="p-3 rounded-xl bg-[#120f1a] border border-[#2d2538] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{w.businessName}</span>
                  <p className="text-[11px] text-[#8e829d]">{w.ownerName} • {w.phone} ({w.city})</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-300">ক্রেডিট: ৳ {w.creditLimit.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-400 block">{w.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
