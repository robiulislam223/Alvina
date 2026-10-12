import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'kurti' | 'three-piece'>('kurti');

  const kurtiSizes = [
    { size: '36 (S)', chest: '৩৬"', length: '৪৪"', waist: '৩২"', hip: '৩৮"', sleeve: '১৭"' },
    { size: '38 (M)', chest: '৩৮"', length: '৪৪"', waist: '৩৪"', hip: '৪০"', sleeve: '১৭.৫"' },
    { size: '40 (L)', chest: '৪০"', length: '৪৫"', waist: '৩৬"', hip: '৪২"', sleeve: '১৮"' },
    { size: '42 (XL)', chest: '৪২"', length: '৪৫"', waist: '৩৮"', hip: '৪৪"', sleeve: '১৮.৫"' },
    { size: '44 (XXL)', chest: '৪৪"', length: '৪৬"', waist: '৪০"', hip: '৪৬"', sleeve: '১৯"' },
  ];

  const threePieceSizes = [
    { size: '38 (M)', kameezChest: '৩৮"', kameezLength: '৪৫"', pantLength: '৩৮"', waist: '২৮-৩৪"' },
    { size: '40 (L)', kameezChest: '৪০"', kameezLength: '৪৬"', pantLength: '৩৯"', waist: '৩০-৩৬"' },
    { size: '42 (XL)', kameezChest: '৪২"', kameezLength: '৪৬"', pantLength: '৩৯"', waist: '৩২-৩৮"' },
    { size: '44 (XXL)', kameezChest: '৪৪"', kameezLength: '৪৭"', pantLength: '৪০"', waist: '৩৪-৪০"' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-stone-200 my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2c1d11] text-amber-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-luxury text-xl font-bold text-white">আলভিনা সাইজ গাইড চার্ট</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-amber-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-stone-100 p-1">
            <button
              onClick={() => setActiveTab('kurti')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'kurti' ? 'bg-[#2c1d11] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              কুর্তি ও টিউনিক সাইজ চার্ট
            </button>
            <button
              onClick={() => setActiveTab('three-piece')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'three-piece' ? 'bg-[#2c1d11] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              স্টিচড থ্রি-পিস ও সালোয়ার স্যুট
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            {activeTab === 'kurti' ? (
              <table className="w-full text-xs text-left">
                <thead className="bg-amber-50 text-amber-950 uppercase font-bold text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">সাইজ</th>
                    <th className="py-3 px-3">বুকের মাপ (Chest)</th>
                    <th className="py-3 px-3">লম্বা (Length)</th>
                    <th className="py-3 px-3">কোমর (Waist)</th>
                    <th className="py-3 px-3">হিপ (Hip)</th>
                    <th className="py-3 px-3">হাতা (Sleeve)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                  {kurtiSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-amber-50/40">
                      <td className="py-3 px-4 font-bold text-amber-900">{row.size}</td>
                      <td className="py-3 px-3">{row.chest}</td>
                      <td className="py-3 px-3">{row.length}</td>
                      <td className="py-3 px-3">{row.waist}</td>
                      <td className="py-3 px-3">{row.hip}</td>
                      <td className="py-3 px-3">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-xs text-left">
                <thead className="bg-amber-50 text-amber-950 uppercase font-bold text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">সাইজ</th>
                    <th className="py-3 px-3">কামিজ চেস্ট</th>
                    <th className="py-3 px-3">কামিজ লম্বা</th>
                    <th className="py-3 px-3">প্যান্ট লম্বা</th>
                    <th className="py-3 px-3">প্যান্ট কোমর (ইলাস্টিক)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                  {threePieceSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-amber-50/40">
                      <td className="py-3 px-4 font-bold text-amber-900">{row.size}</td>
                      <td className="py-3 px-3">{row.kameezChest}</td>
                      <td className="py-3 px-3">{row.kameezLength}</td>
                      <td className="py-3 px-3">{row.pantLength}</td>
                      <td className="py-3 px-3">{row.waist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Unstitched Note */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-xs text-stone-700">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              আনস্টিচড (Unstitched) থ্রি-পিস মাপের বিবরণ:
            </h4>
            <p>
              • কামিজ: ৩.২৫ গজ প্রিমিয়াম লন কটন (৪৮ ইঞ্চি বডি পর্যন্ত যেকোনো সাইজে সেলাই করা সম্ভব)
            </p>
            <p>
              • ওড়না: সম্পূর্ণ ৫ হাত পিওর শিফন / সুতি লন
            </p>
            <p>
              • সালোয়ার: ২.৫ গজ ম্যাচিং সফট কটন
            </p>
          </div>

          {/* Measurement Advice */}
          <div className="space-y-1.5 text-xs text-stone-600">
            <p className="font-bold text-stone-800">পরিমাপের টিপস:</p>
            <p className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>আপনার পরা সবচেয়ে পারফেক্ট সাইজের কুর্তি সমতল জায়গায় রেখে ইঞ্চি টেপ দিয়ে মেপে সাইজ নির্ধারণ করুন।</span>
            </p>
            <p className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>সাইজ নিয়ে কোনো দ্বিধা থাকলে আমাদের ফেসবুক পেজ বা হোয়াটসঅ্যাপে মেসেজ দিন, আমরা সঠিক সাইজ বেছে দিতে সাহায্য করবো।</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
