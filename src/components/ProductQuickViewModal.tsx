import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Star, 
  Ruler, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCartWithSize: (product: Product, size: string, quantity: number) => void;
  onDirectOrderWithSize: (product: Product, size: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCartWithSize,
  onDirectOrderWithSize,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const imagesList: string[] =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [(product as any)?.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'];

  const sizesList: string[] =
    Array.isArray(product.availableSizes) && product.availableSizes.length > 0
      ? product.availableSizes
      : Array.isArray((product as any)?.sizes) && (product as any).sizes.length > 0
      ? (product as any).sizes
      : ['Free Size'];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(sizesList[0] || 'Free Size');
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeImg = imagesList[selectedImage] || imagesList[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-stone-200 my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Image Gallery */}
          <div className="p-4 sm:p-6 bg-stone-50 flex flex-col justify-between">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-200 shadow-sm border border-stone-200">
              <img
                src={activeImg}
                alt={product.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {product.discountPercentage && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-red-600 text-white text-xs font-extrabold shadow">
                  -{product.discountPercentage}% OFF
                </span>
              )}

              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#2c1d11]/80 text-amber-200 text-xs font-bold backdrop-blur-xs">
                {product.type || 'Unstitched'}
              </span>
            </div>

            {/* Thumbnail selector */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      selectedImage === idx ? 'border-amber-700 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-5 sm:p-8 flex flex-col justify-between space-y-5 max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Code */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  {product.subCategory}
                </span>
                <span className="font-mono text-stone-400">কোড: {product.code}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>
              {product.banglaName && (
                <p className="text-sm text-stone-600 font-bangla mt-1 font-medium">
                  {product.banglaName}
                </p>
              )}

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mt-2.5">
                <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span>{product.rating} ({product.reviewsCount} রিভিউ)</span>
                </div>
                <span className="text-stone-300">|</span>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ইন-স্টক (উপলব্ধ)</span>
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 p-3 bg-amber-50/60 rounded-xl border border-amber-900/10 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#2c1d11]">
                  ৳ {product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm sm:text-base text-stone-400 line-through">
                    ৳ {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                    সাশ্রয় ৳ {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Detailed Fabric Specs */}
              {product.details ? (
                <div className="mt-4 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5 text-xs">
                  <div className="font-bold text-stone-800 text-[11px] uppercase tracking-wider mb-1">
                    ফেব্রিক ও কারুকাজ বিবরণ:
                  </div>
                  <div className="grid grid-cols-1 gap-1 text-stone-600">
                    <p><strong className="text-stone-800">কামিজ / কুর্তি:</strong> {product.details.kameezOrKurti || product.fabric || '১০০% পিওর কটন / লন'}</p>
                    {product.details.dupatta && (
                      <p><strong className="text-stone-800">ওড়না:</strong> {product.details.dupatta}</p>
                    )}
                    {product.details.trouserOrSalwar && (
                      <p><strong className="text-stone-800">সালোয়ার / ট্রাউজার:</strong> {product.details.trouserOrSalwar}</p>
                    )}
                    <p><strong className="text-stone-800">কাজ:</strong> {product.details.work || 'এক্সক্লুসিভ কারুকাজ'}</p>
                    <p><strong className="text-stone-800">যত্ন:</strong> {product.details.careInstructions || 'ঠান্ডা পানিতে হ্যান্ড ওয়াশ / ড্রাই ওয়াশ'}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600">
                  <p><strong className="text-stone-800">ফেব্রিক:</strong> {product.fabric || '১০০% পিওর কটন লন'}</p>
                  <p className="mt-1"><strong className="text-stone-800">ধরন:</strong> {product.type || 'Unstitched'}</p>
                </div>
              )}

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                    সাইজ সিলেক্ট করুন:
                  </label>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>সাইজ চার্ট গাইড</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizesList.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#2c1d11] bg-[#2c1d11] text-amber-100 shadow-sm'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-amber-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">পরিমাণ:</span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1-Click Cash on Delivery */}
                <button
                  onClick={() => {
                    onClose();
                    onDirectOrderWithSize(product, selectedSize, quantity);
                  }}
                  className="py-3 px-4 rounded-xl bg-[#2c1d11] hover:bg-amber-800 text-amber-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
                </button>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    onAddToCartWithSize(product, selectedSize, quantity);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl border border-stone-300 hover:border-amber-800 bg-white hover:bg-amber-50/50 text-stone-800 text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-stone-700" />
                  <span>কার্টে যোগ করুন</span>
                </button>
              </div>

              {/* Extra Perks info */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                  <span>ঢাকা ৮০৳ | ঢাকার বাইরে ১৫০৳</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>৭ দিনের সহজ এক্সচেঞ্জ গ্যারান্টি</span>
                </div>
              </div>

              {/* Wishlist & Share buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="flex items-center gap-1.5 text-stone-600 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                  <span>{isWishlisted ? 'উইশলিস্ট থেকে সরান' : 'উইশলিস্টে রাখুন'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'লিঙ্ক কপি হয়েছে!' : 'শেয়ার করুন'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
