import React from 'react';
import { X, Heart, ShoppingBag, Zap, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onDirectOrder,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-stone-200 my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2c1d11] text-amber-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              পছন্দের তালিকা (Wishlist) ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-amber-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-4">
          {wishlistProducts.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="py-3.5 flex items-center gap-4">
                  <img
                    src={
                      (Array.isArray(product?.images) && product.images[0]) ||
                      (product as any)?.image ||
                      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={product.name || 'Wishlist item'}
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                    className="w-16 h-20 object-cover rounded-xl border border-stone-200 flex-shrink-0 cursor-pointer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {product.subCategory}
                    </span>
                    <h4 
                      onClick={() => {
                        onClose();
                        onQuickView(product);
                      }}
                      className="text-xs sm:text-sm font-bold text-stone-900 truncate mt-1 cursor-pointer hover:text-amber-800"
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs sm:text-sm font-extrabold text-stone-900 mt-1">
                      ৳ {product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 sm:px-3 sm:py-2 rounded-xl border border-stone-300 hover:border-amber-800 text-stone-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="কার্টে যোগ করুন"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">কার্টে নিন</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onDirectOrder(product);
                      }}
                      className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#2c1d11] hover:bg-amber-900 text-amber-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="অর্ডার করুন"
                    >
                      <Zap className="w-3.5 h-3.5 fill-amber-300" />
                      <span className="hidden sm:inline">অর্ডার করুন</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-2 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="সরিয়ে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-700">আপনার উইশলিস্ট খালি</p>
              <p className="text-xs text-stone-500">
                পছন্দের থ্রি-পিস বা কুর্তির হার্ট আইকনে ক্লিক করে তালিকায় রাখুন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
