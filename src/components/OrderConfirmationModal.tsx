import React from 'react';
import { CheckCircle2, MessageCircle, Package, Truck, Phone, ArrowRight } from 'lucide-react';
import { Order } from '../types';
import { STORE_INFO } from '../data/products';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (order: Order) => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder
}) => {
  if (!order) return null;

  const handleWhatsAppConfirm = () => {
    const text = `আসসালামু আলাইকুম আলভিনা টিম,%0Aআমার অর্ডার আইডি: ${order.orderNumber}%0Aনাম: ${order.customerName}%0Aফোন: ${order.phone}%0Aমোট প্রদেয়: ৳${order.total}%0Aদয়া করে দ্রুত পার্সেলটি পাঠিয়ে দিন।`;
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-amber-900/10 my-8 p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Check Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
          অর্ডার সফল হয়েছে!
        </span>

        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
          ধন্যবাদ, {order.customerName}!
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-sm mx-auto">
          আপনার অর্ডারটি গ্রহণ করা হয়েছে। শীঘ্রই আমাদের কাস্টমার কেয়ার প্রতিনিধি ফোন করে অর্ডারটি ভেরিফাই করবেন।
        </p>

        {/* Order Details Card */}
        <div className="mt-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-stone-200">
            <span className="text-stone-500">অর্ডার নম্বর:</span>
            <span className="font-mono font-bold text-amber-900 text-sm">{order.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">মোবাইল নম্বর:</span>
            <span className="font-semibold text-stone-800">{order.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">ডেলিভারি ঠিকানা:</span>
            <span className="font-semibold text-stone-800 max-w-[200px] text-right truncate">{order.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">পেমেন্ট মেথড:</span>
            <span className="font-bold text-emerald-700 uppercase">
              {order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (পণ্য দেখে টাকা)' : order.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-extrabold text-[#2c1d11]">
            <span>মোট প্রদেয় টাকা:</span>
            <span>৳ {order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Estimated Delivery Notice */}
        <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-900/10 text-amber-900 text-xs font-medium flex items-center justify-center gap-2">
          <Truck className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <span>
            আনুমানিক ডেলিভারি সময়: <strong>{STORE_INFO.deliveryRates[order.district]?.duration || '২৪-৪৮ ঘণ্টা (দ্রুত ডেলিভারি)'}</strong>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5">
          <button
            onClick={handleWhatsAppConfirm}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp-এ অর্ডার রিসিট নিশ্চিত করুন</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onTrackOrder(order);
            }}
            className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:border-amber-800 text-stone-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <Package className="w-4 h-4 text-amber-800" />
            <span>অর্ডারের বর্তমান অবস্থা ট্র্যাক করুন</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs font-medium cursor-pointer"
          >
            আরও ড্রেস ব্রাউজ করুন
          </button>
        </div>

        {/* Support Hotline */}
        <p className="mt-4 text-[11px] text-stone-400">
          যেকোনো প্রয়োজনে কল করুন: <a href={`tel:${STORE_INFO.phone}`} className="text-amber-800 font-semibold underline">{STORE_INFO.phone}</a>
        </p>

      </div>
    </div>
  );
};
