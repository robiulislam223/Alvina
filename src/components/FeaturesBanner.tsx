import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones, Award } from 'lucide-react';

export const FeaturesBanner: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'সারা দেশে ক্যাশ অন ডেলিভারি',
      desc: '৬৪ জেলায় হোম ডেলিভারি। পণ্য হাতে পেয়ে চেক করে পেমেন্ট করার সুবিধা।',
      color: 'text-amber-800 bg-amber-100/60'
    },
    {
      icon: Award,
      title: '১০০% অরিজিনাল ফেব্রিক',
      desc: 'পাকিস্তানি লন, খাদি ও প্রিমিয়াম সুতি কাপড়ের নিখুঁত কারুকাজ ও কালার গ্যারান্টি।',
      color: 'text-emerald-800 bg-emerald-100/60'
    },
    {
      icon: RefreshCw,
      title: 'সহজ ৭ দিনের এক্সচেঞ্জ',
      desc: 'সাইজ বা ফিটিং নিয়ে কোনো চিন্তা নেই, ৭ দিনের মধ্যে ঝামেলাহীন এক্সচেঞ্জ।',
      color: 'text-blue-800 bg-blue-100/60'
    },
    {
      icon: Headphones,
      title: 'ডেডিকেটেড কাস্টমার সাপোর্ট',
      desc: 'সকাল ১০টা থেকে রাত ১১টা পর্যন্ত ফোন ও হোয়াটসঅ্যাপে আন্তরিক সেবা।',
      color: 'text-purple-800 bg-purple-100/60'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl border border-stone-100 bg-[#fdfbf9] hover:border-amber-700/20 hover:shadow-md transition-all group"
              >
                <div className={`p-3 rounded-xl flex-shrink-0 ${feat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
