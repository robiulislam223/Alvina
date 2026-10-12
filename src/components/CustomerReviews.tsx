import React from 'react';
import { Star, CheckCircle2, MessageSquare, Quote } from 'lucide-react';
import { REVIEWS_DATA } from '../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#faf7f2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and aggregate stats */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-amber-800" />
              <span>কাস্টমারদের মতামত</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-stone-900">
              গ্রাহকদের ভালোবাসায় আলভিনা
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              সারা দেশের হাজারো সন্তুষ্ট নারী গ্রাহক নিয়মিত বেছে নিচ্ছেন আমাদের থ্রি-পিস ও কুর্তি।
            </p>
          </div>

          {/* Rating stats banner */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex items-center gap-4">
            <div className="text-3xl font-extrabold text-[#2c1d11]">৪.৯</div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
                ২,৫০০+ সফল ক্যাশ অন ডেলিভারি রিভিউ
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-amber-100 absolute top-4 right-4 pointer-events-none group-hover:text-amber-200 transition-colors" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                  <span className="text-[11px] text-stone-400 ml-1">({rev.date})</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-bangla italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 mt-4 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span title="ভেরিফাইড ক্রেতা">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-stone-500">{rev.location}</p>
                  </div>
                </div>
                <p className="text-[10px] text-amber-800 font-medium truncate mt-1 bg-amber-50/70 px-2 py-0.5 rounded">
                  ক্রয়: {rev.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
