import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onDirectOrder
}) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'Stitched' | 'Unstitched'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }
      // Stitched / Unstitched filter
      if (typeFilter !== 'all') {
        if (typeFilter === 'Stitched' && prod.type !== 'Stitched') return false;
        if (typeFilter === 'Unstitched' && prod.type !== 'Unstitched' && prod.type !== 'Semi-Stitched') return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [products, activeCategory, typeFilter, sortBy]);

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'সব কালেকশন', count: products.length },
    { id: 'three-piece', label: 'থ্রি-পিস (Three Piece)', count: products.filter(p => p.category === 'three-piece').length },
    { id: 'kurti', label: 'কুর্তি (Kurtis)', count: products.filter(p => p.category === 'kurti').length },
    { id: 'two-piece', label: 'টু-পিস (Two-Piece)', count: products.filter(p => p.category === 'two-piece').length },
    { id: 'party-wear', label: 'পার্টি স্যুট (Party Wear)', count: products.filter(p => p.category === 'party-wear').length },
  ];

  return (
    <section id="products-section" className="py-12 sm:py-16 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>এক্সক্লুসিভ ড্রেস কালেকশন</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-stone-900">
              {activeCategory === 'all' && 'সমস্ত থ্রি-পিস ও কুর্তি কালেকশন'}
              {activeCategory === 'three-piece' && 'পাকিস্তানি ও সুতি লন থ্রি-পিস'}
              {activeCategory === 'kurti' && 'ডিজাইনার রেডিমেড কুর্তি'}
              {activeCategory === 'two-piece' && 'টু-পিস কো-অর্ড সেট'}
              {activeCategory === 'party-wear' && 'লাক্সারি পার্টি ওয়্যার স্যুট'}
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              মোট {filteredProducts.length} টি অসাধারণ ডিজাইন পাওয়া গেছে।
            </p>
          </div>

          {/* Type Filter & Sort by Dropdown */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Stitched vs Unstitched Pill Filter */}
            <div className="bg-white p-1 rounded-xl border border-stone-200 flex items-center shadow-2xs">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  typeFilter === 'all' ? 'bg-[#2c1d11] text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                সব
              </button>
              <button
                onClick={() => setTypeFilter('Stitched')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  typeFilter === 'Stitched' ? 'bg-[#2c1d11] text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                সেলাই করা (Stitched)
              </button>
              <button
                onClick={() => setTypeFilter('Unstitched')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  typeFilter === 'Unstitched' ? 'bg-[#2c1d11] text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                আনস্টিচড (Unstitched)
              </button>
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-200 text-stone-700 text-xs font-semibold rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 shadow-2xs appearance-none cursor-pointer"
              >
                <option value="featured">ফিচার্ড কালেকশন</option>
                <option value="price-asc">দাম: কম থেকে বেশি</option>
                <option value="price-desc">দাম: বেশি থেকে কম</option>
                <option value="rating">সর্বোচ্চ রেটিং</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-2xs cursor-pointer ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onDirectOrder={onDirectOrder}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8">
            <Filter className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">কোনো ড্রেস পাওয়া যায়নি</h3>
            <p className="text-xs text-stone-500 mt-1">
              অন্য কোনো ফিল্টার বা ক্যাটাগরি সিলেক্ট করে পুনরায় চেষ্টা করুন।
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setTypeFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 transition-colors"
            >
              সকল ড্রেস দেখুন
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
