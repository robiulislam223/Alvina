import React, { useState } from 'react';
import { Product, Language } from '../types';
import { Image as ImageIcon, Plus, ExternalLink, Copy, Check } from 'lucide-react';

interface ImageManagerViewProps {
  products: Product[];
  lang: Language;
}

export const ImageManagerView: React.FC<ImageManagerViewProps> = ({ products, lang }) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[#bd70df]" />
          <span>প্রোডাক্ট ইমেজ ও মিডিয়া লাইব্রেরি</span>
        </h3>
        <p className="text-xs text-[#a69ab1] mt-1">
          ক্যাটালগের সকল থ্রি-পিস ও কুর্তির হাই-রেজোলিউশন ইমেজ লিংক কপি ও ম্যানেজমেন্ট।
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-[#181422] border border-[#2d2538] rounded-2xl overflow-hidden group">
            <div className="aspect-[3/4] bg-[#120f1a] relative overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <button
                onClick={() => handleCopy(p.image)}
                className="absolute bottom-2 right-2 p-2 rounded-xl bg-black/70 backdrop-blur-md text-white hover:bg-black transition-colors"
                title="URL কপি করুন"
              >
                {copiedUrl === p.image ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-white truncate">{p.name}</p>
              <p className="text-[10px] text-[#8e829d] truncate mt-0.5">{p.sku}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
