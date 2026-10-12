import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, ShieldAlert } from 'lucide-react';
import { Order } from '../types';
import { STORE_INFO } from '../data/products';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrders
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(
    recentOrders.length > 0 ? recentOrders[recentOrders.length - 1] : null
  );
  const [hasSearched, setHasSearched] = useState(recentOrders.length > 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const found = recentOrders.find(
      (o) => o.orderNumber.toLowerCase() === q || o.phone.includes(q)
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      // If demo lookup
      if (q.startsWith('alv-') || q.length >= 8) {
        setSearchedOrder({
          id: 'demo-ord',
          orderNumber: q.toUpperCase(),
          createdAt: 'আজকে',
          customerName: 'সম্মানিত গ্রাহক',
          phone: '017XXXXXXXX',
          address: 'ঢাকা, বাংলাদেশ',
          district: 'inside-dhaka',
          deliveryFee: 80,
          items: [],
          subtotal: 2850,
          discount: 0,
          total: 2930,
          paymentMethod: 'cod',
          status: 'Packaging',
        });
      } else {
        setSearchedOrder(null);
      }
    }
  };

  const steps = [
    { label: 'অর্ডার গ্রহণ', desc: 'অর্ডার সফলভাবে ডাটাবেজে যুক্ত হয়েছে', icon: Clock },
    { label: 'ভেরিফিকেশন সম্পন্ন', desc: 'কাস্টমার কেয়ার থেকে ফোন কনফার্ম করা হয়েছে', icon: CheckCircle2 },
    { label: 'প্যাকেজিং ও কোয়ালিটি চেক', desc: 'কাপড়ের কোয়ালিটি চেক করে সুরক্ষিত প্যাকেজিং সম্পন্ন', icon: Package },
    { label: 'কুরিয়ারে হস্তান্তর', desc: 'স্টিডফাস্ট / পেপারফ্লাই কুরিয়ারে হস্তান্তর করা হয়েছে', icon: Truck },
    { label: 'ডেলিভারি সম্পন্ন', desc: 'গ্রাহকের ঠিকানায় পণ্য পৌঁছে দেওয়া হয়েছে', icon: CheckCircle2 },
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'Order Placed': return 0;
      case 'Confirmed': return 1;
      case 'Packaging': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const currentStepIndex = searchedOrder ? getStepIndex(searchedOrder.status) : 1;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-stone-200 my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2c1d11] text-amber-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-luxury text-xl font-bold text-white">অর্ডার ট্র্যাকিং</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-amber-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-bold text-stone-700">
              অর্ডার নম্বর (যেমন: ALV-123456) অথবা মোবাইল নম্বর লিখুন:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="যেমন: ALV-294812 বা 017..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-800"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#2c1d11] hover:bg-amber-900 text-amber-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                ট্র্যাক করুন
              </button>
            </div>
          </form>

          {/* Searched Order Info */}
          {searchedOrder ? (
            <div className="space-y-5">
              <div className="p-3.5 bg-amber-50/70 border border-amber-900/10 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 block">অর্ডার আইডি:</span>
                  <span className="font-bold text-amber-950 font-mono text-sm">{searchedOrder.orderNumber}</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 block">তারিখ:</span>
                  <span className="font-semibold text-stone-800">{searchedOrder.createdAt}</span>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {steps.map((st, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  const Icon = st.icon;

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Step Circle */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10 ${
                          isDone
                            ? 'bg-amber-800 text-white ring-4 ring-amber-100'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-amber-900' : isDone ? 'text-stone-900' : 'text-stone-400'}`}>
                            {st.label}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                              বর্তমান অবস্থা
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Courier support notice */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600">
                ডেলিভারি সংক্রান্ত জরুরি তথ্যের জন্য যোগাযোগ করুন: <a href={`tel:${STORE_INFO.phone}`} className="font-bold text-amber-900 underline">{STORE_INFO.phone}</a>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="text-center py-6 space-y-2">
              <ShieldAlert className="w-10 h-10 text-amber-600 mx-auto" />
              <p className="text-xs font-bold text-stone-800">কোনো অর্ডার পাওয়া যায়নি</p>
              <p className="text-[11px] text-stone-500">
                সঠিক অর্ডার নম্বর বা আপনি যে নম্বর দিয়ে অর্ডার করেছিলেন তা দিন।
              </p>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
};
