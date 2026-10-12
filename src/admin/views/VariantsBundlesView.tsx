import React from 'react';
import { ProductVariant, ProductBundle, Language } from '../types';
import { Layers, Package, Sparkles } from 'lucide-react';

interface VariantsBundlesViewProps {
  variants: ProductVariant[];
  bundles: ProductBundle[];
  lang: Language;
}

export const VariantsBundlesView: React.FC<VariantsBundlesViewProps> = ({
  variants,
  bundles,
  lang,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#bd70df]" />
          <span>সাইজ/কালার ভেরিয়েন্ট ও কম্বো বান্ডেল অফার</span>
        </h3>
        <p className="text-xs text-[#a69ab1] mt-1">
          থ্রি-পিস ও কুর্তির সাইজ গ্রেড (36/38/40/42/44) এবং কম্বো ডিসকাউন্ট সেট।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Variants */}
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-400" />
            <span>সক্রিয় সাইজ ও কালার ভেরিয়েন্ট</span>
          </h4>
          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
            {variants.map((v) => (
              <div key={v.id} className="p-3 rounded-xl bg-[#120f1a] border border-[#2d2538] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{v.productName} ({v.size})</span>
                  <p className="text-[11px] text-[#8e829d]">কালার: {v.color} • SKU: {v.sku}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-300">৳ {v.price}</span>
                  <span className="text-[10px] text-emerald-400 block">স্টক: {v.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bundles */}
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#bd70df]" />
            <span>কম্বো বান্ডেল ডিল</span>
          </h4>
          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
            {bundles.map((b) => (
              <div key={b.id} className="p-3 rounded-xl bg-[#120f1a] border border-[#2d2538] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{b.name}</span>
                  <p className="text-[11px] text-[#8e829d]">{b.items.join(' + ')}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-300">৳ {b.bundlePrice}</span>
                  <span className="text-[10px] text-rose-400 line-through block">৳ {b.originalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
