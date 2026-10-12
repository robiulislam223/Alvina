import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroSliderProps {
  onShopCategory: (category: ProductCategory) => void;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  buttonText: string;
  category: ProductCategory;
  imageUrl: string;
  accentColor: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onShopCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Exclusive Three-Piece Collection 2026",
      subtitle: "পাকিস্তানি লাক্সারি লন ও কাশ্মীরি এমব্রয়ডারি থ্রি-পিস",
      description: "আকর্ষণীয় ডিজিটাল প্রিন্ট এবং পিওর শিফন ওড়নার মেলবন্ধন। গরমে সর্বোচ্চ প্রশান্তি আর জমকালো আভিজাত্য এনে দেবে প্রতিটি সুতো।",
      badge: "নতুন কালেকশন ২০২৬",
      buttonText: "থ্রি-পিস কালেকশন দেখুন",
      category: "three-piece",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=85",
      accentColor: "from-amber-950/80 via-stone-900/60 to-transparent"
    },
    {
      id: 2,
      title: "Designer Kurtis & Tunics",
      subtitle: "আধুনিক ডিজাইনার কুর্তি ও ট্রেন্ডি এ-লাইন টিউনিস",
      description: "অফিস, ভার্সিটি কিংবা বৈকালিক আড্ডার জন্য আরামদায়ক ১০০% সুতি স্ল্যাব ও খাদি কটন। নিখুঁত কাটিং ও নান্দনিক ফ্লোরাল কারুকাজ।",
      badge: "জনপ্রিয় ও ট্রেন্ডি",
      buttonText: "কুর্তি কালেকশন দেখুন",
      category: "kurti",
      imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1800&q=85",
      accentColor: "from-stone-950/80 via-amber-950/60 to-transparent"
    },
    {
      id: 3,
      title: "Festive Party Wear & Co-ords",
      subtitle: "গর্জিয়াস পার্টি ওয়্যার স্যুট ও টু-পিস কো-অর্ড সেট",
      description: "বিয়েবাড়ি বা বিশেষ সন্ধ্যার জন্য খাঁটি জর্জেট, অরগাঞ্জা ও ভেলভেট সিকোয়েন্সের এক্সক্লুসিভ কালেকশন। কোনো শাড়ি নয়—সব রাজকীয় স্যুট ও কুর্তি!",
      badge: "সীমিত স্টক অফার",
      buttonText: "পার্টি কালেকশন এক্সপ্লোর করুন",
      category: "party-wear",
      imageUrl: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1800&q=85",
      accentColor: "from-emerald-950/85 via-stone-900/60 to-transparent"
    }
  ];

  // Auto advance slide every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative overflow-hidden bg-stone-950">
      {/* Slides Container */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Zoom Effect */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className={`w-full h-full object-cover object-top transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />

              {/* Gradient Dark Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentColor}`} />
              <div className="absolute inset-0 bg-black/35" />

              {/* Content Box */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full">
                  <div className="max-w-2xl text-white space-y-4 sm:space-y-6">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                      {slide.title}
                    </h1>

                    {/* Subtitle in Bengali */}
                    <p className="text-amber-200 text-base sm:text-xl font-medium font-bangla">
                      {slide.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-none max-w-xl">
                      {slide.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => onShopCategory(slide.category)}
                        className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/30 hover:shadow-amber-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onShopCategory('all')}
                        className="px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                      >
                        সব আইটেম দেখুন
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide
                  ? 'w-8 bg-amber-400'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Trust Bar below Hero */}
      <div className="bg-[#24170d] text-stone-200 border-t border-amber-900/30 py-3.5 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2 text-center md:text-left">
            <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-medium text-amber-100">সারা দেশে ক্যাশ অন ডেলিভারি</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium text-amber-100">১০০% অরিজিনাল ফেব্রিক গ্যারান্টি</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-center md:text-left">
            <RefreshCw className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="font-medium text-amber-100">সহজ ৭ দিনের এক্সচেঞ্জ পলিসি</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-center md:text-left">
            <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
            <span className="font-medium text-amber-100">এক্সক্লুসিভ থ্রি-পিস ও কুর্তি কালেকশন</span>
          </div>
        </div>
      </div>
    </div>
  );
};
