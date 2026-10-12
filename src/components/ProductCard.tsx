import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Zap, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onDirectOrder,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const imagesList =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [(product as any)?.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'];

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (imagesList.length > 1) {
      setImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setImageIndex(0);
  };

  const currentImg = imagesList[imageIndex] || imagesList[0];

  return (
    <div
      className="group relative bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:border-amber-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Area */}
      <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={currentImg}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Badges on Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[11px] font-extrabold shadow-xs">
              -{product.discountPercentage}%
            </span>
          )}
          <span className="px-2 py-0.5 rounded-md bg-[#2c1d11]/85 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
            {product.type}
          </span>
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[10px] font-extrabold shadow-xs">
              জনপ্রিয়
            </span>
          )}
        </div>

        {/* Wishlist Button on Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-red-50 text-red-600 shadow-md'
              : 'bg-white/80 hover:bg-white text-stone-600 hover:text-red-500 shadow-xs'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
        </button>

        {/* Quick View Button on Image Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 px-3 rounded-xl bg-white/95 hover:bg-white text-stone-900 text-xs font-bold shadow-lg backdrop-blur-xs flex items-center justify-center gap-1.5 hover:text-amber-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-amber-700" />
            <span>বিস্তারিত দেখুন (Quick View)</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              {product.subCategory}
            </span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating} ({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Bengali Name */}
          {product.banglaName && (
            <p className="text-[11px] text-stone-500 font-bangla line-clamp-1 mt-0.5">
              {product.banglaName}
            </p>
          )}

          {/* Fabric Details */}
          <p className="text-[11px] text-stone-400 truncate mt-1">
            ফেব্রিক: {product.fabric}
          </p>

          {/* Pricing */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-stone-950 font-sans">
              ৳ {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                ৳ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Urgency Tag */}
          {product.stock <= 7 && (
            <p className="text-[10px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
              <span>স্টক সীমিত: মাত্র {product.stock} টি অবশিষ্ট আছে</span>
            </p>
          )}
        </div>

        {/* Action Buttons: 2 Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          {/* Add to Cart */}
          <button
            onClick={() => onAddToCart(product)}
            className="py-2.5 px-2 rounded-xl border border-stone-300 hover:border-amber-800 text-stone-800 hover:text-amber-900 hover:bg-amber-50/50 text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
            title="কার্টে যোগ করুন"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-stone-700" />
            <span>কার্টে যোগ</span>
          </button>

          {/* Direct 1-Click Order (অর্ডার করুন) */}
          <button
            onClick={() => onDirectOrder(product)}
            className="py-2.5 px-2 rounded-xl bg-[#2c1d11] hover:bg-amber-800 text-amber-100 hover:text-white text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            title="ক্যাশ অন ডেলিভারিতে সরাসরি অর্ডার করুন"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>অর্ডার করুন</span>
          </button>
        </div>

      </div>
    </div>
  );
};
