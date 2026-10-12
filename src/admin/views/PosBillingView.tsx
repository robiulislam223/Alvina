import React, { useState } from 'react';
import {
  Product,
  Order,
  OrderItem,
  Language,
} from '../types';
import {
  CreditCard,
  Plus,
  Trash2,
  Printer,
  CheckCircle2,
  Search,
  DollarSign,
  User,
} from 'lucide-react';

interface PosBillingViewProps {
  products: Product[];
  lang: Language;
  onSaveOrder: (order: Order) => void;
  onOpenInvoice: (order: Order) => void;
}

export const PosBillingView: React.FC<PosBillingViewProps> = ({
  products,
  lang,
  onSaveOrder,
  onOpenInvoice,
}) => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState('Showroom Walk-in Customer');
  const [customerPhone, setCustomerPhone] = useState('01900000000');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash' | 'Nagad' | 'Bank'>('COD');
  const [search, setSearch] = useState('');

  const addToCart = (product: Product) => {
    const existing = cart.find((i) => i.id === String(product.id));
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === String(product.id) ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: String(product.id),
          name: product.name,
          price: product.price,
          qty: 1,
          size: product.sizes[0] || 'Free Size',
          image: product.image,
        },
      ]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      customer: customerName,
      phone: customerPhone,
      address: 'Showroom Counter Purchase, Uttara Flagship Store',
      area: 'dhaka',
      deliveryMethod: 'Store Pickup',
      paymentMethod,
      subtotal,
      charge: 0,
      discount: 0,
      total: subtotal,
      advance: subtotal,
      due: 0,
      status: 'Delivered',
      items: cart,
      shippingNote: 'POS Counter Sale',
      source: 'POS Showroom',
    };

    onSaveOrder(newOrder);
    onOpenInvoice(newOrder);
    setCart([]);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Product Catalog Grid (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-4 flex items-center gap-3">
          <Search className="w-4 h-4 text-[#8e829d]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="বারকোড বা পোশাকের নাম দিয়ে দ্রুত খুঁজুন..."
            className="w-full bg-transparent text-xs text-white placeholder-[#685c74] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[680px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-[#181422] border border-[#2d2538] hover:border-[#bd70df] rounded-2xl p-3 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#120f1a] mb-2">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div>
                <p className="text-xs font-bold text-white line-clamp-1">{p.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-amber-300">৳ {p.price}</span>
                  <span className="text-[10px] text-[#8e829d]">স্টক: {p.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POS Register Counter (5 cols) */}
      <div className="lg:col-span-5 bg-[#181422] border border-[#2d2538] rounded-3xl p-5 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between border-b border-[#2d2538] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#bd70df]" />
              <h3 className="text-sm font-bold text-white">POS ক্যাশ রেজিস্টার</h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10">
              কাউন্টার লাইভ
            </span>
          </div>

          <div className="space-y-3 mb-4 text-xs">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="গ্রাহকের নাম"
              className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none"
            />
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="মোবাইল নাম্বার"
              className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          {/* Cart Items */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar text-xs">
            {cart.length === 0 ? (
              <div className="py-12 text-center text-[#8e829d]">
                কাউন্টার খালি। বামপাশ থেকে পোশাক সিলেক্ট করুন।
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#120f1a] border border-[#2d2538]">
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-white truncate">{item.name}</p>
                    <p className="text-[11px] text-[#a69ab1]">৳ {item.price} × {item.qty}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-amber-300">৳ {item.price * item.qty}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-rose-400 hover:text-rose-300">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payment & Checkout */}
        <div className="border-t border-[#2d2538] pt-4 space-y-4">
          <div className="flex items-center justify-between text-base font-bold">
            <span className="text-[#a69ab1]">সর্বমোট বিল:</span>
            <span className="text-xl font-black text-amber-300">৳ {subtotal.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-xs">
            {(['COD', 'bKash', 'Nagad', 'Bank'] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`py-2 rounded-xl font-bold transition-all ${
                  paymentMethod === method
                    ? 'bg-[#bd70df] text-white'
                    : 'bg-[#120f1a] text-[#8e829d] hover:text-white'
                }`}
              >
                {method}
              </button>
            ))}
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
          >
            <Printer className="w-4 h-4" />
            <span>বিল সম্পন্ন ও ইনভয়েস প্রিন্ট করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
