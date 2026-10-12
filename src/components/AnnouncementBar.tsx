import React from 'react';
import { Phone, MessageCircle, Truck, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#1a120c] text-[#f5ebd7] text-xs py-2 px-4 border-b border-[#3d2c20]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Hotline & WhatsApp */}
        <div className="flex items-center gap-4 text-amber-200/90 font-medium">
          <a
            href={`tel:${STORE_INFO.phone}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>হটলাইন: {STORE_INFO.phone}</span>
          </a>
          <span className="hidden md:inline text-amber-700">|</span>
          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Alvina,%20I%20want%20to%20know%20about%20your%20collection`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp অর্ডার করুন</span>
          </a>
        </div>

        {/* Center: Offer & Shipping announcement */}
        <div className="flex items-center gap-2 text-center text-amber-100 font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse hidden sm:inline" />
          <span>
            ✨ স্পেশাল অফার! ২৫০০ টাকার অর্ডারে সারা বাংলাদেশে <span className="text-amber-300 underline font-bold">ফ্রি হোম ডেলিভারি</span>!
          </span>
        </div>

        {/* Right: Cash on delivery tag */}
        <div className="hidden lg:flex items-center gap-2 text-amber-200/90 font-medium">
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          <span>৬৪ জেলায় ক্যাশ অন ডেলিভারি সুবিধা</span>
        </div>
      </div>
    </div>
  );
};
