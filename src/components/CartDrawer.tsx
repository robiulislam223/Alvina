import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Sparkles, 
  Tag, 
  MessageCircle, 
  Check 
} from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  onStartShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onStartShopping
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalSubtotal = Math.max(0, subtotal - discountAmount);
  
  const freeShippingThreshold = STORE_INFO.freeDeliveryThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'ALVINA10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedCoupon({ code, discount });
    } else if (code === 'EID2026') {
      setAppliedCoupon({ code, discount: 200 });
    } else {
      setCouponError('কুপন কোডটি সঠিক নয়। ALVINA10 ব্যবহার করুন।');
    }
  };

  const handleWhatsAppOrder = () => {
    const itemsText = items.map(
      (it, idx) => `${idx + 1}. ${it.product.name} (Size: ${it.selectedSize}) x ${it.quantity} = ৳${it.product.price * it.quantity}`
    ).join('%0A');
    const msg = `হ্যালো আলভিনা,%0Aআমি ওয়েবসাইট থেকে নিচের ড্রেসগুলো অর্ডার করতে চাই:%0A${itemsText}%0A%0Aমোট মূল্য: ৳${finalSubtotal}%0Aদয়া করে অর্ডারটি কনফার্ম করুন।`;
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
              শপিং কার্ট ({items.reduce((acc, it) => acc + it.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-amber-50/70 p-3.5 border-b border-amber-900/10 text-xs">
          {amountNeededForFreeShipping > 0 ? (
            <div>
              <p className="text-stone-700 font-medium flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>
                  আর মাত্র <strong className="text-amber-900 font-bold">৳ {amountNeededForFreeShipping.toLocaleString()}</strong> এর কেনাকাটা করলেই <span className="text-emerald-700 font-bold">ফ্রি ডেলিভারি</span>!
                </span>
              </p>
              <div className="w-full h-2 bg-stone-200 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>অভিনন্দন! আপনার অর্ডারে সারা দেশে ফ্রি ডেলিভারি যুক্ত হয়েছে!</span>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${index}`}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/70 hover:border-amber-700/30 transition-colors"
              >
                <img
                  src={
                    (Array.isArray(item.product?.images) && item.product.images[0]) ||
                    (item.product as any)?.image ||
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={item.product?.name || 'Product'}
                  className="w-16 h-20 object-cover rounded-xl border border-stone-200 flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-amber-800 font-medium">
                    সাইজ: <span className="font-bold text-stone-800">{item.selectedSize}</span>
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden text-xs">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 font-bold text-stone-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-extrabold text-stone-900">
                      ৳ {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(index)}
                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors self-start cursor-pointer"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <ShoppingBag className="w-16 h-16 text-stone-300 stroke-1" />
              <h4 className="font-serif-luxury text-lg font-bold text-stone-800">আপনার কার্ট খালি আছে</h4>
              <p className="text-xs text-stone-500 max-w-xs">
                আমাদের ট্রেন্ডি থ্রি-পিস ও ডিজাইনার কুর্তি থেকে আপনার পছন্দের ড্রেস বেছে নিন।
              </p>
              <button
                onClick={() => {
                  onClose();
                  onStartShopping();
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#2c1d11] text-amber-200 text-xs font-bold hover:bg-amber-900 transition-all cursor-pointer"
              >
                ড্রেস কালেকশন দেখুন
              </button>
            </div>
          )}
        </div>

        {/* Footer with Totals & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="কুপন কোড (যেমন: ALVINA10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-2 text-xs text-stone-800 uppercase focus:outline-none focus:border-amber-800"
                />
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                প্রয়োগ
              </button>
            </form>

            {appliedCoupon && (
              <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> কুপন <strong>{appliedCoupon.code}</strong> কার্যকর!
                </span>
                <span className="font-bold">-৳{appliedCoupon.discount}</span>
              </div>
            )}

            {couponError && (
              <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>মোট পণ্যের দাম (Subtotal):</span>
                <span className="font-bold text-stone-900">৳ {subtotal.toLocaleString()}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700">
                  <span>ডিসকাউন্ট:</span>
                  <span className="font-bold">-৳ {appliedCoupon.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-bold text-stone-800">
                  {amountNeededForFreeShipping === 0 ? <span className="text-emerald-700 font-bold">ফ্রি</span> : 'চেকআউটে নির্ধারিত'}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-extrabold text-[#2c1d11]">
                <span>সর্বমোট:</span>
                <span>৳ {finalSubtotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Primary Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 rounded-2xl bg-[#2c1d11] hover:bg-amber-900 text-amber-200 hover:text-white font-extrabold text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ক্যাশ অন ডেলিভারিতে অর্ডার করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp-এ সরাসরি অর্ডার পাঠান</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
