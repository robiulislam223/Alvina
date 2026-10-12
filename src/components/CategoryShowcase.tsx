import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCategory } from '../types';

interface CategoryShowcaseProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#fcf9f5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>আমাদের স্পেশাল কালেকশন</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            ক্যাটাগরি ভিত্তিক কালেকশন
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm">
            আলভিনার প্রতিটি ড্রেস উন্নত সুতো ও কারিগরিতে তৈরি। কোনো শাড়ি নেই—এখানে পাবেন ১০০% অথেন্টিক থ্রি-পিস ও ডিজাইনার কুর্তি।
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id as ProductCategory);
                  const elem = document.getElementById('products-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isSelected ? 'ring-2 ring-amber-700 shadow-md' : 'border border-stone-200'
                }`}
              >
                {/* Image */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-500/90 text-stone-950 shadow-sm backdrop-blur-xs">
                      {cat.tag}
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <span className="text-[10px] sm:text-xs font-medium text-amber-200/90 uppercase tracking-wider block">
                      {cat.count}+ টি ডিজাইন
                    </span>
                    <h3 className="text-sm sm:text-lg font-bold font-serif-luxury tracking-wide group-hover:text-amber-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-stone-300 hidden sm:block line-clamp-1 mt-0.5">
                      {cat.subtitle}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                      <span>কালেকশন দেখুন</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
