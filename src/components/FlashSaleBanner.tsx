import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight, Zap } from 'lucide-react';
import { Product } from '../types';

interface FlashSaleBannerProps {
  onQuickOrderProduct: (product: Product) => void;
  flashSaleProduct: Product;
}

export const FlashSaleBanner: React.FC<FlashSaleBannerProps> = ({
  onQuickOrderProduct,
  flashSaleProduct
}) => {
  // Countdown timer: 14 hours 28 mins 45 secs initially
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 28,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="flash-sale" className="py-8 bg-gradient-to-r from-[#2c1d11] via-[#432314] to-[#2c1d11] text-white overflow-hidden relative border-y border-amber-900/30">
      {/* Background Decorative patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Title & Timer */}
          <div className="text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/50 text-red-300 text-xs font-bold uppercase tracking-wider animate-pulse">
              <Flame className="w-4 h-4 text-red-400" />
              <span>লিমিটেড টাইম ফ্ল্যাশ ডিল</span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-amber-100">
              ঈদ ও স্প্রিং স্পেশাল মেগা ডিসকাউন্ট!
            </h3>

            <p className="text-stone-300 text-xs sm:text-sm max-w-lg">
              আমাদের সর্বাধিক বিক্রিত থ্রি-পিস ও কুর্তিতে পাচ্ছেন বিশেষ মূল্যছাড়। স্টক শেষ হওয়ার আগেই অর্ডার কনফার্ম করুন!
            </p>

            {/* Countdown Blocks */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex items-center gap-1 text-xs text-amber-300/80 mr-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>বাকি সময়:</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <div className="bg-stone-900/90 border border-amber-500/30 rounded-lg px-3 py-1.5 text-center min-w-[50px]">
                  <span className="block text-lg sm:text-xl font-bold text-amber-300">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[9px] text-stone-400 uppercase">ঘণ্টা</span>
                </div>
                <span className="text-amber-400 font-bold">:</span>
                <div className="bg-stone-900/90 border border-amber-500/30 rounded-lg px-3 py-1.5 text-center min-w-[50px]">
                  <span className="block text-lg sm:text-xl font-bold text-amber-300">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[9px] text-stone-400 uppercase">মিনিট</span>
                </div>
                <span className="text-amber-400 font-bold">:</span>
                <div className="bg-stone-900/90 border border-amber-500/30 rounded-lg px-3 py-1.5 text-center min-w-[50px]">
                  <span className="block text-lg sm:text-xl font-bold text-amber-300">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[9px] text-stone-400 uppercase">সেকেন্ড</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Featured Item Card */}
          {flashSaleProduct && (() => {
            const featuredImg =
              (Array.isArray(flashSaleProduct.images) && flashSaleProduct.images.length > 0
                ? flashSaleProduct.images[0]
                : (flashSaleProduct as any)?.image) ||
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
            const price = flashSaleProduct.price ?? 2850;
            const originalPrice = flashSaleProduct.originalPrice ?? Math.round(price * 1.25);
            const discountPct = flashSaleProduct.discountPercentage ?? 20;

            return (
              <div className="bg-white/10 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 max-w-xl w-full">
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden flex-shrink-0 border border-white/20 bg-stone-900">
                  <img
                    src={featuredImg}
                    alt={flashSaleProduct.name || 'Flash Deal'}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {discountPct > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow">
                      -{discountPct}%
                    </span>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <div className="inline-block text-[11px] font-semibold text-amber-300 uppercase tracking-wide">
                    {flashSaleProduct.subCategory || 'Pakistani Luxury Lawn'}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                    {flashSaleProduct.name}
                  </h4>
                  {flashSaleProduct.banglaName && (
                    <p className="text-xs text-amber-200/80 font-bangla">
                      {flashSaleProduct.banglaName}
                    </p>
                  )}

                  <div className="flex items-center justify-center sm:justify-start gap-2.5 py-1">
                    <span className="text-lg sm:text-xl font-extrabold text-amber-300">
                      ৳ {price.toLocaleString()}
                    </span>
                    {originalPrice > price && (
                      <span className="text-xs text-stone-400 line-through">
                        ৳ {originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onQuickOrderProduct(flashSaleProduct)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-stone-950" />
                    <span>এখনই অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      </div>
    </section>
  );
};
