import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  User, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { CartItem, Order, Product } from '../types';
import { STORE_INFO } from '../data/products';

interface FastCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutItems: CartItem[];
  onOrderPlaced: (order: Order) => void;
}

export const FastCheckoutModal: React.FC<FastCheckoutModalProps> = ({
  isOpen,
  onClose,
  checkoutItems,
  onOrderPlaced
}) => {
  if (!isOpen || checkoutItems.length === 0) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState<'inside-dhaka' | 'dhaka-suburbs' | 'outside-dhaka'>('inside-dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal calculation
  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Free delivery threshold check
  const isFreeDelivery = subtotal >= STORE_INFO.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : STORE_INFO.deliveryRates[district].fee;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার নাম লিখুন।');
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)');
      return;
    }

    if (!address.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা দিন।');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `ALV-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        createdAt: new Date().toLocaleDateString('bn-BD', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        district,
        deliveryFee,
        items: checkoutItems,
        subtotal,
        discount: isFreeDelivery ? STORE_INFO.deliveryRates[district].fee : 0,
        total,
        paymentMethod,
        status: 'Order Placed',
        notes: notes.trim()
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-amber-900/10 my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2c1d11] text-amber-100 p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-2xl font-bold tracking-widest text-white">ALVINA</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30">
                ক্যাশ অন ডেলিভারি
              </span>
            </div>
            <p className="text-xs text-amber-200/80 mt-1 font-bangla">
              অর্ডার করতে নিচের ফর্মটি পূরণ করুন—আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবে।
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-amber-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Order Summary Preview */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
              <span>আপনার অর্ডারকৃত আইটেম ({checkoutItems.length})</span>
              <span className="text-amber-800 lowercase font-normal">পরিবর্তন করতে পারেন</span>
            </div>

            <div className="divide-y divide-stone-200/70 max-h-48 overflow-y-auto pr-1">
              {checkoutItems.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center gap-3">
                  <img
                    src={
                      (Array.isArray(item.product?.images) && item.product.images[0]) ||
                      (item.product as any)?.image ||
                      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={item.product?.name || 'Product'}
                    className="w-12 h-14 object-cover rounded-lg border border-stone-200 flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-amber-800 font-medium">
                      সাইজ: <span className="font-bold text-stone-800">{item.selectedSize}</span> • পরিমাণ: {item.quantity}টি
                    </p>
                    <p className="text-xs font-extrabold text-stone-900 mt-0.5">
                      ৳ {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Free Delivery alert */}
            {isFreeDelivery && (
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>অভিনন্দন! আপনার অর্ডারে ফ্রি ডেলিভারি যুক্ত হয়েছে!</span>
              </div>
            )}
          </div>

          {/* Error notice */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Customer Input Fields */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
              গ্রাহকের তথ্য ও ডেলিভারি ঠিকানা
            </h3>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                আপনার পুরো নাম <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="যেমন: নুসরাত জাহান"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-800"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                মোবাইল নম্বর <span className="text-red-500">*</span> (অর্ডার কনফার্ম করার জন্য)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 017XXXXXXXX বা 019XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-800"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Delivery Area Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                ডেলিভারির এরিয়া নির্বাচন করুন <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(Object.keys(STORE_INFO.deliveryRates) as Array<keyof typeof STORE_INFO.deliveryRates>).map((key) => {
                  const rate = STORE_INFO.deliveryRates[key];
                  const isSelected = district === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setDistrict(key)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/70 text-stone-900 font-bold shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>{key === 'inside-dhaka' ? 'ঢাকার ভিতরে' : key === 'dhaka-suburbs' ? 'ঢাকা সাব-আর্বান' : 'ঢাকার বাইরে'}</span>
                        <span className="font-extrabold text-amber-900">
                          {isFreeDelivery ? 'ফ্রি' : `৳${rate.fee}`}
                        </span>
                      </div>
                      <span className="block text-[10px] text-stone-500 mt-1">{rate.duration}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span> (বাসা নং, রোড, থানা, জেলা)
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={2}
                  placeholder="যেমন: বাসা ১২, রোড ৫, ব্লক ডি, মিরপুর-১১, ঢাকা"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-800"
                />
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Optional note */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)
              </label>
              <input
                type="text"
                placeholder="যেমন: বিকেলে ডেলিভারি করবেন বা নির্দিষ্ট সময়..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-800"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide mb-2">
              পেমেন্ট মাধ্যম বেছে নিন:
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-amber-800 bg-amber-50 text-stone-900 font-bold'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="sr-only"
                />
                <span className="text-xs font-bold">ক্যাশ অন ডেলিভারি</span>
                <span className="text-[10px] text-stone-500 mt-0.5">পণ্য হাতে পেয়ে পেমেন্ট</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'bkash'
                    ? 'border-pink-600 bg-pink-50 text-pink-900 font-bold'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="sr-only"
                />
                <span className="text-xs font-bold text-pink-700">বিকাশ (bKash)</span>
                <span className="text-[10px] text-stone-500 mt-0.5">মার্চেন্ট / সেন্ড মানি</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'nagad'
                    ? 'border-orange-600 bg-orange-50 text-orange-900 font-bold'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'nagad'}
                  onChange={() => setPaymentMethod('nagad')}
                  className="sr-only"
                />
                <span className="text-xs font-bold text-orange-700">নগদ (Nagad)</span>
                <span className="text-[10px] text-stone-500 mt-0.5">অনলাইন পেমেন্ট</span>
              </label>
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="bg-stone-100/80 rounded-2xl p-4 border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>মোট পণ্যের দাম (Subtotal):</span>
              <span className="font-semibold text-stone-900">৳ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>ডেলিভারি চার্জ:</span>
              <span className="font-semibold text-stone-900">
                {deliveryFee === 0 ? <span className="text-emerald-700 font-bold">ফ্রি (Free)</span> : `৳ ${deliveryFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-stone-300/60 flex justify-between text-sm sm:text-base font-extrabold text-[#2c1d11]">
              <span>সর্বমোট প্রদেয় টাকা:</span>
              <span>৳ {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#2c1d11] hover:bg-amber-900 text-amber-200 hover:text-white font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <span>অর্ডার প্রসেস হচ্ছে...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>অর্ডার নিশ্চিত করুন (৳ {total.toLocaleString()})</span>
              </>
            )}
          </button>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-6 text-[11px] text-stone-500 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ১০০% নিরাপদ শপিং
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              হোম ডেলিভারিতে চেক করে পেমেন্ট
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};
