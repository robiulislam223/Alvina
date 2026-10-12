import React, { useState } from 'react';
import {
  Product,
  Order,
  OrderItem,
  SystemConfig,
  Language,
} from '../types';
import {
  Plus,
  Trash2,
  User,
  Phone,
  MapPin,
  Package,
  DollarSign,
  ShieldAlert,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { LiveFraudCheckerWidget } from '../components/LiveFraudCheckerWidget';

interface ManualOrderViewProps {
  products: Product[];
  config: SystemConfig;
  lang: Language;
  onSaveOrder: (newOrder: Order) => void;
  onNavigateToOrders: () => void;
}

export const ManualOrderView: React.FC<ManualOrderViewProps> = ({
  products,
  config,
  lang,
  onSaveOrder,
  onNavigateToOrders,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'suburbs' | 'outside'>('dhaka');
  const [deliveryCharge, setDeliveryCharge] = useState<number>(config.deliveryDhaka || 80);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash' | 'Nagad' | 'Bank'>('COD');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | string>('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Free Size');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Delivery charge sync
  const handleAreaChange = (area: 'dhaka' | 'suburbs' | 'outside') => {
    setDeliveryArea(area);
    if (area === 'dhaka') setDeliveryCharge(config.deliveryDhaka || 80);
    else if (area === 'suburbs') setDeliveryCharge(config.deliverySuburbs || 100);
    else setDeliveryCharge(config.deliveryOutside || 150);
  };

  const handleAddItem = () => {
    const prod = products.find((p) => String(p.id) === String(selectedProductId));
    if (!prod) return;

    const existingIdx = orderItems.findIndex(
      (item) => item.id === String(prod.id) && item.size === selectedSize
    );

    if (existingIdx >= 0) {
      const updated = [...orderItems];
      updated[existingIdx].qty += Number(selectedQuantity);
      setOrderItems(updated);
    } else {
      const newItem: OrderItem = {
        id: String(prod.id),
        name: prod.name,
        price: prod.price,
        qty: Number(selectedQuantity),
        size: selectedSize,
        color: 'Default',
        image: prod.image,
      };
      setOrderItems([...orderItems, newItem]);
    }

    setSelectedProductId('');
    setSelectedQuantity(1);
  };

  const handleRemoveItem = (idx: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== idx));
  };

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = subtotal + Number(deliveryCharge);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || orderItems.length === 0) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে গ্রাহকের তথ্য ও কমপক্ষে একটি পণ্য যোগ করুন!' : 'Please fill details and add at least one item!');
      return;
    }

    const newOrder: Order = {
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      customer: customerName.trim(),
      phone: customerPhone.trim(),
      address: customerAddress.trim(),
      area: deliveryArea,
      deliveryMethod: 'Standard Courier',
      paymentMethod,
      subtotal,
      charge: deliveryCharge,
      discount: 0,
      total,
      advance: 0,
      due: total,
      status: 'Pending',
      items: orderItems,
      shippingNote: orderNotes.trim(),
      source: 'Admin Manual Entry',
    };

    onSaveOrder(newOrder);
    setIsSuccess(true);
    setTimeout(() => {
      onNavigateToOrders();
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {isSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>অর্ডার সফলভাবে সেভ হয়েছে! অর্ডার তালিকায় পাঠানো হচ্ছে...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Details Form (2 cols) */}
          <div className="md:col-span-2 bg-[#181422] border border-[#2d2538] rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-[#bd70df]" />
              <span>গ্রাহকের ঠিকানা ও যোগাযোগের তথ্য</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#cbbdd7] mb-1">গ্রাহকের পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="যেমন: নুসরাত জাহান"
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
                />
              </div>

              <div>
                <label className="block text-[#cbbdd7] mb-1">মোবাইল নাম্বার *</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-[#cbbdd7] mb-1">ডেলিভারি এরিয়া / লোকেশন *</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleAreaChange('dhaka')}
                  className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    deliveryArea === 'dhaka'
                      ? 'bg-[#bd70df]/20 border-[#bd70df] text-white font-bold'
                      : 'border-[#342b40] text-[#a69ab1] hover:text-white'
                  }`}
                >
                  ঢাকার ভিতর (৳{config.deliveryDhaka || 80})
                </button>
                <button
                  type="button"
                  onClick={() => handleAreaChange('suburbs')}
                  className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    deliveryArea === 'suburbs'
                      ? 'bg-[#bd70df]/20 border-[#bd70df] text-white font-bold'
                      : 'border-[#342b40] text-[#a69ab1] hover:text-white'
                  }`}
                >
                  ঢাকা উপশহর (৳{config.deliverySuburbs || 100})
                </button>
                <button
                  type="button"
                  onClick={() => handleAreaChange('outside')}
                  className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    deliveryArea === 'outside'
                      ? 'bg-[#bd70df]/20 border-[#bd70df] text-white font-bold'
                      : 'border-[#342b40] text-[#a69ab1] hover:text-white'
                  }`}
                >
                  ঢাকার বাহিরে (৳{config.deliveryOutside || 150})
                </button>
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-[#cbbdd7] mb-1">বিস্তারিত ডেলিভারি ঠিকানা *</label>
              <textarea
                required
                rows={2}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="বাসা নং, রোড নং, এলাকা, থানা ও জেলা..."
                className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#cbbdd7] mb-1">পেমেন্ট মেথড</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                >
                  <option value="COD">ক্যাশ অন ডেলিভারি (COD)</option>
                  <option value="bKash">বিকাশ (bKash)</option>
                  <option value="Nagad">নগদ (Nagad)</option>
                  <option value="Bank">ব্যাংক ডিপোজিট (Bank)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#cbbdd7] mb-1">অর্ডার নোট / ডেলিভারি নোট</label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="যেমন: বিকেলে ডেলিভারি দিতে হবে"
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
                />
              </div>
            </div>
          </div>

          {/* Mini Fraud Checker Widget */}
          <div className="space-y-4">
            <LiveFraudCheckerWidget
              initialPhone={customerPhone}
              onSelectPhone={(phone) => setCustomerPhone(phone)}
              lang={lang}
              compact={false}
            />
          </div>
        </div>

        {/* Product Selection Section */}
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-[#bd70df]" />
            <span>অর্ডারে পণ্য যোগ করুন</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
            <div className="sm:col-span-6">
              <label className="block text-[#cbbdd7] mb-1">পণ্য নির্বাচন করুন</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
              >
                <option value="">-- ক্যাটালগ থেকে পণ্য বাছুন --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - ৳{p.price} (স্টক: {p.stock})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[#cbbdd7] mb-1">সাইজ / টাইপ</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
              >
                <option value="Free Size">Free Size (আনস্টিচড)</option>
                <option value="36 (S)">36 (S)</option>
                <option value="38 (M)">38 (M)</option>
                <option value="40 (L)">40 (L)</option>
                <option value="42 (XL)">42 (XL)</option>
                <option value="44 (XXL)">44 (XXL)</option>
              </select>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-[#cbbdd7] mb-1">পরিমাণ</label>
              <input
                type="number"
                min="1"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-2 py-2 text-white text-center focus:outline-none focus:border-[#bd70df]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="button"
                onClick={handleAddItem}
                className="w-full py-2 rounded-xl bg-[#bd70df] text-white font-bold hover:bg-[#ce85ef] transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>যোগ করুন</span>
              </button>
            </div>
          </div>

          {/* Selected Items Table */}
          {orderItems.length > 0 ? (
            <div className="mt-4 border border-[#2d2538] rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#120f1a] text-[#8e829d] border-b border-[#2d2538]">
                  <tr>
                    <th className="py-2.5 px-3">পণ্য</th>
                    <th className="py-2.5 px-3">সাইজ</th>
                    <th className="py-2.5 px-3">মূল্য</th>
                    <th className="py-2.5 px-3">পরিমাণ</th>
                    <th className="py-2.5 px-3">মোট</th>
                    <th className="py-2.5 px-3 text-right">বাদ দিন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d2538]/50">
                  {orderItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3 font-medium text-white">{item.name}</td>
                      <td className="py-2.5 px-3 text-[#a69ab1]">{item.size}</td>
                      <td className="py-2.5 px-3 text-white">৳ {item.price}</td>
                      <td className="py-2.5 px-3 text-white font-bold">{item.qty}</td>
                      <td className="py-2.5 px-3 text-amber-300 font-bold">
                        ৳ {item.price * item.qty}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1 rounded text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Summary Calculations */}
              <div className="bg-[#14111c] p-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs border-t border-[#2d2538]">
                <div className="text-[#a69ab1]">
                  মোট আইটেম: <span className="text-white font-bold">{orderItems.length}</span> টি
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    সাবটোটাল: <span className="font-bold text-white">৳ {subtotal}</span>
                  </div>
                  <div>
                    ডেলিভারি চার্জ: <span className="font-bold text-white">৳ {deliveryCharge}</span>
                  </div>
                  <div className="text-sm font-black text-amber-300">
                    সর্বমোট: ৳ {total}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center border border-dashed border-[#342b40] rounded-2xl text-xs text-[#8e829d]">
              এখনো কোনো পণ্য যোগ করা হয়নি। উপরের ড্রপডাউন থেকে পণ্য সিলেক্ট করে "যোগ করুন" চাপুন।
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onNavigateToOrders}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#a69ab1] font-semibold text-xs transition-colors cursor-pointer"
          >
            বাতিল করুন
          </button>
          <button
            type="submit"
            disabled={orderItems.length === 0}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#bd70df] to-[#9245b6] hover:from-[#cb82ec] hover:to-[#9f52c3] text-white font-bold text-xs shadow-lg shadow-[#bd70df]/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>অর্ডার চূড়ান্তভাবে বুক করুন</span>
          </button>
        </div>
      </form>
    </div>
  );
};
