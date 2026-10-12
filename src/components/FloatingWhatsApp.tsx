import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip message bubble */}
      {showTooltip && (
        <div className="mb-2 bg-white text-stone-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span className="font-semibold">যে কোনো প্রশ্ন থাকলে WhatsApp করুন!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-600 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Alvina,%20I%20want%20to%20order%20dresses`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer ring-4 ring-emerald-500/20 group"
        aria-label="Chat on WhatsApp"
        title="WhatsApp এ কথা বলুন"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
};
