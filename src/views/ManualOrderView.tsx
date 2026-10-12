import React, { useState, useEffect } from 'react';
import {
  Order,
  Product,
  OrderItem,
  CourierService,
  SystemConfig,
  DeliveryMethod,
  PaymentMethod,
  OrderSource,
  DeliveryArea,
  OrderStatus,
} from '../types';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Search,
  MessageSquare,
  Save,
  RotateCcw,
  Package,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Truck,
} from 'lucide-react';
import { checkCustomerFraud, normalizeBdPhone } from '../utils/fraudChecker';
import { STANDARD_SIZES, MAX_SIZES } from '../types';

interface ManualOrderViewProps {
  products: Product[];
  couriers: CourierService[];
  config: SystemConfig;
  initialOrderToEdit: Order | null;
  onSaveOrder: (order: Order) => void;
  onCancel: () => void;
}

export const ManualOrderView: React.FC<ManualOrderViewProps> = ({
  products,
  couriers,
  config,
  initialOrderToEdit,
  onSaveOrder,
  onCancel,
}) => {
  const isEditing = Boolean(initialOrderToEdit);

  // Form State
  const [customerName, setCustomerName] = useState(initialOrderToEdit?.customer || '');
  const [customerPhone, setCustomerPhone] = useState(initialOrderToEdit?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(initialOrderToEdit?.email || '');
  const [customerAddress, setCustomerAddress] = useState(initialOrderToEdit?.address || '');
  const [shippingNote, setShippingNote] = useState(initialOrderToEdit?.shippingNote || '');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    initialOrderToEdit?.deliveryMethod || 'Courier'
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    initialOrderToEdit?.paymentMethod || 'Cash on Delivery'
  );
  const [orderSource, setOrderSource] = useState<OrderSource>(
    initialOrderToEdit?.source || 'Facebook'
  );
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>(
    initialOrderToEdit?.area || 'dhaka'
  );
  const [dressSize, setDressSize] = useState(initialOrderToEdit?.dressSize || '');
  const [customArea, setCustomArea] = useState(initialOrderToEdit?.customArea || '');
  const [courierService, setCourierService] = useState(
    initialOrderToEdit?.courierService || 'Steadfast Courier'
  );
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    initialOrderToEdit?.status || 'Pending'
  );
  const [orderNote, setOrderNote] = useState(initialOrderToEdit?.note || '');

  // Cart Items
  const [cart, setCart] = useState<OrderItem[]>(
    initialOrderToEdit?.items ? [...initialOrderToEdit.items] : []
  );

  // Financials
  const [deliveryCharge, setDeliveryCharge] = useState<number>(
    initialOrderToEdit?.charge !== undefined
      ? initialOrderToEdit.charge
      : deliveryArea === 'dhaka'
      ? config.dhakaFee
      : config.outsideFee
  );
  const [discount, setDiscount] = useState<number>(initialOrderToEdit?.discount || 0);
  const [advance, setAdvance] = useState<number>(initialOrderToEdit?.advance || 0);

  // Product picker search
  const [pickerSearch, setPickerSearch] = useState('');
  const [customProdName, setCustomProdName] = useState('');
  const [customProdPrice, setCustomProdPrice] = useState<number | ''>('');
  const [customProdQty, setCustomProdQty] = useState<number>(1);

  // Auto-sync form when initialOrderToEdit changes
  useEffect(() => {
    if (initialOrderToEdit) {
      setCustomerName(initialOrderToEdit.customer || '');
      setCustomerPhone(initialOrderToEdit.phone || '');
      setCustomerEmail(initialOrderToEdit.email || '');
      setCustomerAddress(initialOrderToEdit.address || '');
      setShippingNote(initialOrderToEdit.shippingNote || '');
      setDeliveryMethod(initialOrderToEdit.deliveryMethod || 'Courier');
      setPaymentMethod(initialOrderToEdit.paymentMethod || 'Cash on Delivery');
      setOrderSource(initialOrderToEdit.source || 'Facebook');
      setDeliveryArea(initialOrderToEdit.area || 'dhaka');
      setDressSize(initialOrderToEdit.dressSize || '');
      setCustomArea(initialOrderToEdit.customArea || '');
      setCourierService(initialOrderToEdit.courierService || 'Steadfast Courier');
      setOrderStatus(initialOrderToEdit.status || 'Pending');
      setOrderNote(initialOrderToEdit.note || '');
      setCart(initialOrderToEdit.items ? [...initialOrderToEdit.items] : []);
      setDeliveryCharge(initialOrderToEdit.charge);
      setDiscount(initialOrderToEdit.discount || 0);
      setAdvance(initialOrderToEdit.advance || 0);
    } else {
      resetForm();
    }
  }, [initialOrderToEdit]);

  // Auto calculate delivery charge when area changes (unless custom edit)
  const handleAreaChange = (newArea: DeliveryArea) => {
    setDeliveryArea(newArea);
    if (newArea === 'dhaka') {
      setDeliveryCharge(config.dhakaFee);
    } else if (newArea === 'outside') {
      setDeliveryCharge(config.outsideFee);
    }
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const grandTotal = Math.max(0, subtotal - discount + deliveryCharge);
  const due = Math.max(0, grandTotal - advance);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.offer > 0 ? product.offer : product.price,
          qty: 1,
          size: dressSize || undefined,
          image: product.image,
        },
      ];
    });
  };

  const addCustomProduct = () => {
    if (!customProdName.trim() || customProdPrice === '' || Number(customProdPrice) < 0) {
      alert('দয়া করে প্রোডাক্টের নাম ও সঠিক মূল্য দিন।');
      return;
    }
    setCart((prev) => [
      ...prev,
      {
        productId: null,
        name: customProdName.trim(),
        price: Number(customProdPrice),
        qty: Math.max(1, customProdQty),
        size: dressSize || undefined,
      },
    ]);
    setCustomProdName('');
    setCustomProdPrice('');
    setCustomProdQty(1);
  };

  const updateQty = (index: number, delta: number) => {
    setCart((prev) => {
      const item = prev[index];
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      return prev.map((it, i) => (i === index ? { ...it, qty: newQty } : it));
    });
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setCustomerAddress('');
    setShippingNote('');
    setDeliveryMethod('Courier');
    setPaymentMethod('Cash on Delivery');
    setOrderSource('Facebook');
    setDeliveryArea('dhaka');
    setDeliveryCharge(config.dhakaFee);
    setDiscount(0);
    setAdvance(0);
    setDressSize('');
    setCustomArea('');
    setOrderStatus('Pending');
    setOrderNote('');
    setCart([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerPhone.trim() || !customerName.trim() || !customerAddress.trim()) {
      alert('কাস্টমারের নাম, ফোন নম্বর ও পূর্ণ ঠিকানা আবশ্যক।');
      return;
    }

    if (cart.length === 0) {
      alert('অর্ডারে অন্তত একটি প্রোডাক্ট যোগ করুন।');
      return;
    }

    if (discount > subtotal + deliveryCharge) {
      alert('ডিসকাউন্ট সর্বমোট মূল্যের চেয়ে বেশি হতে পারবে না।');
      return;
    }

    const orderData: Order = {
      id: initialOrderToEdit ? initialOrderToEdit.id : Date.now(),
      date: initialOrderToEdit ? initialOrderToEdit.date : new Date().toISOString(),
      customer: customerName.trim(),
      phone: customerPhone.trim(),
      email: customerEmail.trim() || undefined,
      address: customerAddress.trim(),
      shippingNote: shippingNote.trim() || undefined,
      deliveryMethod,
      paymentMethod,
      source: orderSource,
      area: deliveryArea,
      dressSize: dressSize || undefined,
      customArea: customArea.trim() || undefined,
      items: cart,
      subtotal,
      charge: deliveryCharge,
      discount,
      advance,
      total: grandTotal,
      due,
      status: orderStatus,
      note: orderNote.trim() || undefined,
      courierService,
    };

    onSaveOrder(orderData);
  };

  const openWhatsAppDraft = () => {
    const items = cart.map((p) => `${p.name} (x${p.qty})`).join(', ');
    const msg =
      `🌸 ALVINA Women Wear\n` +
      `আসসালামু আলাইকুম ${customerName || 'কাস্টমার'} আপু,\n` +
      `আপনার অর্ডার সামারি:\n\n` +
      `👗 আইটেম: ${items || 'কোনো প্রোডাক্ট যোগ করা হয়নি'}\n` +
      `💵 সর্বমোট: ৳${grandTotal}\n` +
      `💰 অগ্রিম: ৳${advance}\n` +
      `🚚 ক্যাশ অন ডেলিভারি (Due COD): ৳${due}\n` +
      `📍 ঠিকানা: ${customerAddress || 'দেওয়া হয়নি'}\n` +
      `🚚 কুরিয়ার: ${courierService}\n\n` +
      `ধন্যবাদ!`;

    const cleanPhone = (customerPhone || config.whatsapp).replace(/\D/g, '');
    const intlPhone = cleanPhone.startsWith('880')
      ? cleanPhone
      : cleanPhone.startsWith('0')
      ? '88' + cleanPhone
      : '880' + cleanPhone;

    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredCatalog = products.filter(
    (p) =>
      p.status !== 'Out of stock' &&
      (p.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(pickerSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(pickerSearch.toLowerCase()))
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header with Mode Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#181520] border border-[#342b40]">
        <div>
          <span className="text-xs text-[#a69ab1]">
            {isEditing ? 'Editing Order #' + initialOrderToEdit?.id : 'New Order Entry'}
          </span>
          <h2 className="text-lg font-bold text-white">
            {isEditing ? 'অর্ডার আপডেট করুন' : 'নতুন কাস্টমার অর্ডার তৈরি'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {isEditing && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#bd70df]/20 text-[#e6b4fa] border border-[#bd70df]/30 font-mono">
              #{initialOrderToEdit?.id}
            </span>
          )}
          <button
            type="button"
            onClick={openWhatsAppDraft}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#182a20] text-[#8de8bf] border border-[#2b5942] hover:bg-[#203a2c]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp প্রিভিউ</span>
          </button>
        </div>
      </div>

      {/* 1. Customer Information Card */}
      <div className="p-5 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-[#342b40]">
          <span>১. কাস্টমারের তথ্য ও ডেলিভারি ঠিকানা (Customer & Shipping)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-[#cfc4d9]">
                মোবাইল নম্বর (Phone) *
              </label>
              {normalizeBdPhone(customerPhone).length >= 8 && (
                <span className="text-[10px] text-[#bd70df] font-mono">
                  লাইভ কুরিয়ার চেক অন
                </span>
              )}
            </div>
            <input
              type="text"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="017XXXXXXXX"
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none font-mono"
            />
            {/* Live Inline Fraud Indicator */}
            {normalizeBdPhone(customerPhone).length >= 8 && (() => {
              const report = checkCustomerFraud(customerPhone);
              return (
                <div
                  className={`mt-2 p-2.5 rounded-xl border text-[11px] space-y-1.5 ${
                    report.riskLevel === 'High'
                      ? 'bg-[#3b121c] border-[#ff4264]/50 text-[#ffb4c1]'
                      : report.riskLevel === 'Moderate'
                      ? 'bg-[#33220d] border-[#f59e0b]/50 text-[#fde68a]'
                      : 'bg-[#102b1f] border-[#10b981]/50 text-[#a7f3d0]'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1">
                      {report.riskLevel === 'High' ? (
                        <ShieldAlert className="w-3.5 h-3.5 text-[#ff4264]" />
                      ) : report.riskLevel === 'Moderate' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />
                      ) : (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#36c98b]" />
                      )}
                      {report.riskLevel === 'High'
                        ? '🚨 ভুয়া কাস্টমার অ্যালার্ট! (High Risk)'
                        : report.riskLevel === 'Moderate'
                        ? '⚠️ মাঝারি ঝুঁকি (অগ্রিম নিন)'
                        : '✓ নিরাপদ কাস্টমার (Safe Buyer)'}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/30">
                      {report.deliveryRate}% ডেলিভারি
                    </span>
                  </div>

                  <div className="text-[10px] opacity-95">
                    মোট পার্সেল: <b className="font-mono">{report.totalParcels}টি</b> | ডেলিভার্ড:{' '}
                    <b className="font-mono text-[#36c98b]">{report.delivered}টি</b> | ক্যানসেল:{' '}
                    <b className="font-mono text-[#ff4264]">{report.cancelled}টি</b>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] pt-0.5 border-t border-white/10 font-mono">
                    <span>
                      Steadfast: {report.courierBreakdown.steadfast.delivered}✓ /{' '}
                      {report.courierBreakdown.steadfast.cancelled}✗
                    </span>
                    <span>
                      Pathao: {report.courierBreakdown.pathao.delivered}✓ /{' '}
                      {report.courierBreakdown.pathao.cancelled}✗
                    </span>
                  </div>

                  {report.riskLevel === 'High' && (
                    <div className="text-[10px] font-semibold text-[#ffd1d9] bg-[#ff4264]/20 p-1 rounded">
                      ⚠️ পরামর্শ: সম্পূর্ণ ডেলিভারি চার্জ অগ্রিম ছাড়া পার্সেল পাঠাবেন না!
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              কাস্টমারের নাম (Customer Name) *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Tanjina Akter"
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              ইমেইল (Email - Optional)
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="customer@example.com"
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              পূর্ণ ঠিকানা (Full Delivery Address) *
            </label>
            <textarea
              required
              rows={2}
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="বাসা নং, রোড নং, এলাকা, থানা, জেলা (e.g. House 12, Road 5, Dhanmondi, Dhaka)"
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              ডেলিভারি সংক্রান্ত বিশেষ নির্দেশনা (Shipping Note)
            </label>
            <input
              type="text"
              value={shippingNote}
              onChange={(e) => setShippingNote(e.target.value)}
              placeholder="বিকেলে ডেলিভারি দিন / দারোয়ানের কাছে দিন ইত্যাদি"
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              ডেলিভারি এরিয়া *
            </label>
            <select
              value={deliveryArea}
              onChange={(e) => handleAreaChange(e.target.value as DeliveryArea)}
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none cursor-pointer"
            >
              <option value="dhaka">ঢাকার ভিতরে (৳{config.dhakaFee})</option>
              <option value="outside">ঢাকার বাইরে (৳{config.outsideFee})</option>
              <option value="custom">Custom Area / চার্জ</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              কুরিয়ার সার্ভিস
            </label>
            <select
              value={courierService}
              onChange={(e) => setCourierService(e.target.value)}
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none cursor-pointer"
            >
              {couriers.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
              <option value="Standard Courier">অন্যান্য (Other)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              ড্রেস সাইজ (Dress Size: 36-48 স্ট্যান্ডার্ড, 50-56 ম্যাক্স)
            </label>
            <select
              value={dressSize}
              onChange={(e) => setDressSize(e.target.value)}
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none cursor-pointer"
            >
              <option value="">সাইজ বাছাই করুন</option>
              <optgroup label="স্ট্যান্ডার্ড সাইজ (Standard Sizes 36-48)">
                {STANDARD_SIZES.map((sz) => (
                  <option key={sz} value={sz}>
                    সাইজ {sz} (Size {sz})
                  </option>
                ))}
              </optgroup>
              <optgroup label="ম্যাক্স / প্লাস সাইজ (Max / Plus Sizes 50-56)">
                {MAX_SIZES.map((sz) => (
                  <option key={sz} value={sz}>
                    ম্যাক্স সাইজ {sz} (Max Size {sz})
                  </option>
                ))}
              </optgroup>
              <optgroup label="অন্যান্য (Special)">
                <option value="Free Size">Free Size (বডি ৪২-৪৮ ফ্রি সাইজ)</option>
                <option value="Custom Body Size">কাস্টম বডি মেজারমেন্ট</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              পেমেন্ট মাধ্যম *
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none cursor-pointer"
            >
              <option>Cash on Delivery</option>
              <option>bKash</option>
              <option>Nagad</option>
              <option>Bank Transfer</option>
              <option>Paid</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              অর্ডারের উৎস (Source)
            </label>
            <select
              value={orderSource}
              onChange={(e) => setOrderSource(e.target.value as OrderSource)}
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none cursor-pointer"
            >
              <option>Website</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>WhatsApp</option>
              <option>Phone</option>
              <option>Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              নির্দিষ্ট লোকেশন / সাব-জোন
            </label>
            <input
              type="text"
              value={customArea}
              onChange={(e) => setCustomArea(e.target.value)}
              placeholder="e.g. Dhanmondi, Chattogram Sadar"
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Product Picker & Cart */}
      <div className="p-5 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center justify-between pb-3 border-b border-[#342b40]">
          <span>২. অর্ডারের প্রোডাক্ট নির্বাচন (Order Products & Cart)</span>
          <span className="text-xs text-[#a69ab1]">
            মোট আইটেম:{' '}
            <b className="text-white tabular-nums">
              {cart.reduce((s, i) => s + i.qty, 0)} টি
            </b>
          </span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-medium text-[#cfc4d9]">
              যুক্ত করা প্রোডাক্টসমূহ ({cart.length})
            </div>

            {cart.length === 0 ? (
              <div className="p-8 rounded-xl border border-dashed border-[#342b40] text-center text-xs text-[#a69ab1] bg-[#120e18]">
                ডান পাশ থেকে প্রোডাক্ট নির্বাচন করে <b>"+ Add"</b> চাপুন।
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#211a2b] border border-[#342b40] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-white truncate">{item.name}</div>
                      <div className="text-[#a69ab1] mt-0.5 flex items-center gap-2">
                        <span>একক: ৳{item.price}</span>
                        {item.size && <span>· সাইজ: {item.size}</span>}
                      </div>
                      <div className="text-[#bd70df] font-mono font-bold mt-0.5 tabular-nums">
                        মোট: ৳{item.price * item.qty}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQty(idx, -1)}
                        className="w-7 h-7 rounded-lg bg-[#140f1a] hover:bg-[#34203f] text-white flex items-center justify-center border border-[#342b40]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-mono font-bold text-white tabular-nums">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(idx, 1)}
                        className="w-7 h-7 rounded-lg bg-[#140f1a] hover:bg-[#34203f] text-white flex items-center justify-center border border-[#342b40]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="w-7 h-7 ml-1 rounded-lg text-[#ff6b83] hover:bg-[#3d1a25] flex items-center justify-center"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Inventory Catalog Picker & Custom Product */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-medium text-[#cfc4d9]">ইনভেন্টরি প্রোডাক্ট সার্চ</div>
            <div className="relative">
              <Search className="w-4 h-4 text-[#a69ab1] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                placeholder="প্রোডাক্টের নাম / ক্যাটাগরি / SKU..."
                className="w-full pl-9 pr-3 py-2 bg-[#100d16] border border-[#342b40] rounded-xl text-xs text-white focus:border-[#bd70df] outline-none"
              />
            </div>

            <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
              {filteredCatalog.map((p) => {
                const currentPrice = p.offer > 0 ? p.offer : p.price;
                return (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-xl bg-[#140f1c] border border-[#342b40] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#261d31] overflow-hidden shrink-0 flex items-center justify-center">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Package className="w-5 h-5 text-[#bd70df]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">{p.name}</div>
                      <div className="text-[#a69ab1] text-[11px]">
                        {p.category} · ৳{currentPrice} · স্টক: {p.stock}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#35203f] hover:bg-[#bd70df] text-[#f7dcff] hover:text-[#160e1b] border border-[#5d3870] transition-colors shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Custom Product Insertion */}
            <div className="p-3 rounded-xl bg-[#140f1a] border border-[#342b40] space-y-2 mt-2">
              <div className="text-[11px] font-semibold text-[#a69ab1]">
                বা কাস্টম প্রোডাক্ট যোগ করুন:
              </div>
              <div className="grid grid-cols-12 gap-2">
                <input
                  type="text"
                  placeholder="প্রোডাক্টের নাম"
                  value={customProdName}
                  onChange={(e) => setCustomProdName(e.target.value)}
                  className="col-span-6 px-2.5 py-1.5 bg-[#100d16] border border-[#342b40] rounded-lg text-xs text-white outline-none"
                />
                <input
                  type="number"
                  placeholder="মূল্য (৳)"
                  value={customProdPrice}
                  onChange={(e) =>
                    setCustomProdPrice(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="col-span-3 px-2 py-1.5 bg-[#100d16] border border-[#342b40] rounded-lg text-xs text-white outline-none"
                />
                <button
                  type="button"
                  onClick={addCustomProduct}
                  className="col-span-3 px-2 py-1.5 rounded-lg bg-[#271b33] hover:bg-[#bd70df] text-[#e8d9f0] hover:text-[#160e1b] border border-[#482b5c] text-xs font-semibold"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Totals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-[#342b40]">
          <div className="p-3 rounded-xl bg-[#140f1a] border border-[#342b40]">
            <span className="text-[11px] text-[#a69ab1] block">Subtotal (৳)</span>
            <span className="text-lg font-bold text-white font-mono tabular-nums">৳{subtotal}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#140f1a] border border-[#342b40]">
            <span className="text-[11px] text-[#a69ab1] block">Delivery Charge (৳)</span>
            <input
              type="number"
              min={0}
              value={deliveryCharge}
              onChange={(e) => setDeliveryCharge(Math.max(0, Number(e.target.value)))}
              className="w-full mt-1 px-2 py-1 bg-[#100d16] border border-[#40344c] rounded-lg text-xs text-white font-mono"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#140f1a] border border-[#342b40]">
            <span className="text-[11px] text-[#a69ab1] block">Discount (৳)</span>
            <input
              type="number"
              min={0}
              value={discount}
              onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
              className="w-full mt-1 px-2 py-1 bg-[#100d16] border border-[#40344c] rounded-lg text-xs text-white font-mono"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#140f1a] border border-[#342b40]">
            <span className="text-[11px] text-[#a69ab1] block">Advance (৳)</span>
            <input
              type="number"
              min={0}
              value={advance}
              onChange={(e) => setAdvance(Math.max(0, Number(e.target.value)))}
              className="w-full mt-1 px-2 py-1 bg-[#100d16] border border-[#40344c] rounded-lg text-xs text-white font-mono"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#2b172a] border border-[#714786] col-span-2 sm:col-span-1">
            <span className="text-[11px] text-[#f7dcff] block">Due COD (৳)</span>
            <span className="text-xl font-bold text-[#ff9aaa] font-mono tabular-nums">৳{due}</span>
          </div>
        </div>

        <div className="text-right text-base font-bold text-white pt-2">
          Grand Total:{' '}
          <span className="text-[#bd70df] font-mono text-xl tabular-nums">৳ {grandTotal}</span>
        </div>
      </div>

      {/* 3. Status and Note & Submission */}
      <div className="p-5 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-white pb-3 border-b border-[#342b40]">
          ৩. অর্ডার স্ট্যাটাস ও নোট
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">অর্ডার স্ট্যাটাস</label>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value as OrderStatus)}
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none cursor-pointer"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
              <option>Returned</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cfc4d9] mb-1.5">
              অভ্যন্তরীণ অ্যাডমিন নোট
            </label>
            <input
              type="text"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="e.g. bKash 500 advance verified / phone call confirmed"
              className="w-full px-3 py-2 bg-[#100d16] border border-[#40344c] rounded-xl text-xs sm:text-sm text-white focus:border-[#bd70df] outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#342b40]">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#bd70df] text-[#160e1b] hover:bg-[#d091ee] transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'অর্ডার আপডেট করুন' : 'অর্ডার নিশ্চিত ও সেভ করুন'}</span>
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[#1d1726] text-[#bcb1c7] hover:text-white border border-[#342b40] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ফর্ম ক্লিয়ার</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#ff9aaa] hover:bg-[#341822] transition-colors"
          >
            বাতিল (Cancel)
          </button>
        </div>
      </div>
    </form>
  );
};
