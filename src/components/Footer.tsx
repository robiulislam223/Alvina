import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Heart,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenOrderTracking: () => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenOrderTracking,
  onOpenSizeGuide,
}) => {
  return (
    <footer className="bg-[#1a120c] text-stone-300 border-t border-amber-950">
      {/* Upper Newsletter / WhatsApp CTA */}
      <div className="border-b border-stone-800/80 py-8 bg-[#221710]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-amber-100">
              আলভিনা ভিআইপি মেম্বারশিপে যুক্ত থাকুন
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              নতুন থ্রি-পিস ও কুর্তি কালেকশন এবং স্পেশাল ডিসকাউন্ট অফার সবার আগে পেতে জয়েন করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hi%20Alvina,%20I%20want%20to%20subscribe%20for%20updates`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp কমিউনিটিতে যুক্ত হন</span>
            </a>
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-200 font-bold text-xs flex items-center gap-2 border border-stone-700 transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>কল করুন: {STORE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-serif-luxury text-3xl font-bold tracking-[0.2em] text-amber-100 uppercase">
                ALVINA
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mb-1"></span>
            </div>
            
            <p className="text-xs text-stone-400 leading-relaxed font-bangla max-w-sm">
              আলভিনা (Alvina) বাংলাদেশের অন্যতম প্রিমিয়াম অনলাইন ফ্যাশন স্টোর। এখানে পাবেন পাকিস্তানি অরিজিনাল লন থ্রি-পিস, ট্র্যাডিশনাল ও মডার্ন ডিজাইনার কুর্তি, টু-পিস কো-অর্ড এবং জমকালো পার্টি স্যুট। কোনো শাড়ি নয়—আমরা বিশেষায়িত শুধুই সালোয়ার কামিজ ও কুর্তিতে।
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>হটলাইন: {STORE_INFO.phone} (প্রতিদিন সকাল ১০টা - রাত ১১টা)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>{STORE_INFO.email}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-amber-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-amber-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-amber-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-100 text-sm tracking-wide uppercase">
              ক্যাটাগরি
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onSelectCategory('three-piece')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  পাকিস্তানি লন থ্রি-পিস
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('three-piece')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  এমব্রয়ডারি কটন থ্রি-পিস
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('kurti')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  ডিজাইনার লং কুর্তি
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('two-piece')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  টু-পিস কো-অর্ড সেট
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('party-wear')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  লাক্সারি পার্টি ওয়্যার স্যুট
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-100 text-sm tracking-wide uppercase">
              কাস্টমার কেয়ার
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onOpenOrderTracking} className="hover:text-amber-300 transition-colors cursor-pointer">
                  অর্ডার ট্র্যাকিং করুন
                </button>
              </li>
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-amber-300 transition-colors cursor-pointer">
                  সাইজ গাইড চার্ট
                </button>
              </li>
              <li>
                <a href="#flash-sale" className="hover:text-amber-300 transition-colors">
                  ফ্ল্যাশ সেল ও ডিসকাউন্ট
                </a>
              </li>
              <li>
                <span className="text-stone-500">৭ দিনের রিটার্ন ও এক্সচেঞ্জ</span>
              </li>
              <li>
                <span className="text-stone-500">প্রাইভেসি পলিসি ও শর্তাবলী</span>
              </li>
            </ul>
          </div>

          {/* Showroom & Delivery Partners */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-100 text-sm tracking-wide uppercase">
              শোরুম ও ডেলিভারি
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              <strong className="text-stone-200">আউটলেট:</strong> {STORE_INFO.showroom}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-stone-400 block mb-1.5 uppercase">
                ডেলিভারি পার্টনার:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-amber-200">
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">স্টিডফাস্ট</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">পেপারফ্লাই</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">পাঠাও</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">রেডএক্স</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-stone-400 block mb-1.5 uppercase">
                পেমেন্ট মেথড:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-emerald-300">
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">ক্যাশ অন ডেলিভারি</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">বিকাশ (bKash)</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700">নগদ (Nagad)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-10 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} ALVINA Fashion BD. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Made with passion for authentic women's boutique fashion</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
