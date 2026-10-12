import React from 'react';
import { Merchant, Language } from '../types';
import { Building, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

interface MerchantsViewProps {
  merchants: Merchant[];
  lang: Language;
}

export const MerchantsView: React.FC<MerchantsViewProps> = ({ merchants, lang }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Building className="w-5 h-5 text-[#bd70df]" />
          <span>মার্চেন্ট ও আউটলেট ব্রাঞ্চ</span>
        </h3>
        <p className="text-xs text-[#a69ab1] mt-1">
          আলভিনা মাল্টি-ব্রাঞ্চ শোরুম ও পার্টনার আউটলেট ডিরেক্টরি।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {merchants.map((m) => (
          <div key={m.id} className="bg-[#181422] border border-[#2d2538] rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{m.storeName || m.name}</h4>
                <p className="text-[11px] text-[#bd70df]">{m.name}</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                {m.status}
              </span>
            </div>
            <div className="text-xs text-[#a69ab1] space-y-1 pt-2 border-t border-[#2d2538]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8e829d]" />
                <span>{m.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8e829d]" />
                <span>{m.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
