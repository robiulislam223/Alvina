import React, { useState } from 'react';
import {
  Order,
  Merchant,
  PageId,
  OrderStatus,
  Product,
  CrmCustomer,
  ProductCategory,
  STANDARD_SIZES,
  MAX_SIZES,
} from '../types';
import {
  ShoppingBag,
  CircleDollarSign,
  Clock,
  Store,
  ArrowRight,
  TrendingUp,
  Package,
  PlusCircle,
  Truck,
  ArrowLeftRight,
  Printer,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Receipt,
  Layers,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Phone,
  MessageSquare,
  Plus,
  X,
} from 'lucide-react';
import { checkCustomerFraud, normalizeBdPhone } from '../utils/fraudChecker';
import { WhatsAppChatModal } from '../components/WhatsAppChatModal';

interface DashboardViewProps {
  orders: Order[];
  merchants: Merchant[];
  products?: Product[];
  crmCustomers?: CrmCustomer[];
  onNavigate: (page: PageId) => void;
  onSelectOrderForInvoice: (order: Order) => void;
  onUpdateOrderStatus: (orderId: number, newStatus: OrderStatus) => void;
  onSaveProduct?: (product: Product) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  merchants,
  products = [],
  crmCustomers = [],
  onNavigate,
  onSelectOrderForInvoice,
  onUpdateOrderStatus,
  onSaveProduct,
}) => {
  // Live Dashboard Filter states
  const [selectedCourierFilter, setSelectedCourierFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [dashboardSearch, setDashboardSearch] = useState<string>('');

  // WhatsApp Chat Modal state
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppPhone, setWhatsAppPhone] = useState('');
  const [whatsAppCustomerName, setWhatsAppCustomerName] = useState('');

  // Live Inline Fraud Checker state
  const [fraudPhoneInput, setFraudPhoneInput] = useState<string>('');
  const [fraudReport, setFraudReport] = useState<any>(null);

  // Quick Add Product Modal state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
  const [newProdName, setNewProdName] = useState<string>('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('Three Piece');
  const [newProdPrice, setNewProdPrice] = useState<number | ''>('');
  const [newProdOffer, setNewProdOffer] = useState<number | ''>('');
  const [newProdStock, setNewProdStock] = useState<number>(10);
  const [newProdSizes, setNewProdSizes] = useState<string[]>(['38', '40', '42']);
  const [newProdSku, setNewProdSku] = useState<string>('');

  // Handlers for Live Fraud Check
  const handleFraudPhoneChange = (val: string) => {
    setFraudPhoneInput(val);
    const clean = normalizeBdPhone(val);
    if (clean.length >= 6) {
      const rep = checkCustomerFraud(clean, crmCustomers);
      setFraudReport(rep);
    } else {
      setFraudReport(null);
    }
  };

  // Quick Add Product Submit
  const handleQuickAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || newProdPrice === '' || Number(newProdPrice) <= 0) {
      alert('সঠিক প্রোডাক্ট নাম ও মূল্য লিখুন।');
      return;
    }

    if (onSaveProduct) {
      const productToAdd: Product = {
        id: Date.now(),
        name: newProdName.trim(),
        category: newProdCategory,
        sku: newProdSku.trim() || 'ALV-' + Math.floor(100 + Math.random() * 900),
        description: `আকর্ষণীয় কালেকশন। সাইজ: ${newProdSizes.join(', ')}`,
        price: Number(newProdPrice),
        offer: newProdOffer === '' ? 0 : Number(newProdOffer),
        stock: Number(newProdStock) || 0,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
        status: 'Active',
      };
      onSaveProduct(productToAdd);
    }

    // Reset form
    setNewProdName('');
    setNewProdPrice('');
    setNewProdOffer('');
    setNewProdSku('');
    setIsAddProductModalOpen(false);
  };

  const toggleSizeSelection = (size: string) => {
    setNewProdSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Sales calculations
  const deliveredSales = orders
    .filter((o) => o.status === 'Delivered')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const totalSalesAll = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => !['Delivered', 'Cancelled'].includes(o.status)).length;
  const totalOrders = orders.length;

  const statuses: OrderStatus[] = [
    'Pending',
    'Preorder',
    'Confirmed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
    'Returned',
  ];

  const courierOptions = [
    'All',
    'Steadfast Courier',
    'Pathao Courier',
    'RedX Courier',
    'Paperfly',
    'Sundarban',
  ];

  const sources = ['Facebook', 'Instagram', 'Website', 'WhatsApp', 'Phone', 'Manual'];

  // Filtered orders list for Dashboard
  const filteredDashboardOrders = orders.filter((o) => {
    const matchesStatus =
      selectedStatusFilter === 'All' || o.status === selectedStatusFilter;
    const matchesCourier =
      selectedCourierFilter === 'All' ||
      (o.courierService && o.courierService.toLowerCase().includes(selectedCourierFilter.toLowerCase())) ||
      (selectedCourierFilter === 'Steadfast Courier' && (!o.courierService || o.courierService.includes('Steadfast')));
    const matchesSearch =
      !dashboardSearch ||
      String(o.id).includes(dashboardSearch) ||
      o.customer.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
      o.phone.includes(dashboardSearch);

    return matchesStatus && matchesCourier && matchesSearch;
  });

  const recentOrders = filteredDashboardOrders.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* 0. PROMINENT HEADER: LIVE OVERVIEW & ANALYSIS OF YOUR STORE + REQUESTED 5 TOP BUTTONS */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1b1424] via-[#241731] to-[#1a1322] border border-[#48345b] shadow-xl flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#bd70df] animate-ping" />
            <span className="text-[11px] font-bold text-[#e6b4fa] uppercase tracking-wider">Live Store Intelligence</span>
          </div>
          <h1 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>লাইভ ওভারভিউ এন্ড অ্যানালাইসিস অফ ইওর স্টোর</span>
            <span className="text-xs text-[#a69ab1] font-normal hidden md:inline">(Live Overview & Analysis)</span>
          </h1>
          <p className="text-xs text-[#a69ab1] mt-0.5">
            শোরুম, ওয়েবসাইট ও সোশ্যাল কমার্সের রিয়েল-টাইম বিক্রয়, স্টক ও পার্সেল মনিটর
          </p>
        </div>

        {/* 5 Prominent Quick Action Buttons next to the overview */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* 1. New Order */}
          <button
            onClick={() => onNavigate('manualOrder')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#bd70df] text-[#160e1b] hover:bg-[#d091ee] transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>নিউ অর্ডার</span>
          </button>

          {/* 2. Order List */}
          <button
            onClick={() => onNavigate('orders')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#261c33] text-white hover:bg-[#38264e] border border-[#533b6e] transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#bd70df]" />
            <span>অর্ডার লিস্ট</span>
          </button>

          {/* 3. Website Orders */}
          <button
            onClick={() => {
              onNavigate('websiteLeads');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#1a2333] text-[#93c5fd] hover:bg-[#25344f] border border-[#3b5987] transition-all active:scale-95 cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span>ওয়েবসাইট অর্ডার ও লিড</span>
          </button>

          {/* 4. Inventory List */}
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#1a2822] text-[#6ee7b7] hover:bg-[#253c33] border border-[#2e624c] transition-all active:scale-95 cursor-pointer"
          >
            <Package className="w-3.5 h-3.5 text-[#34d399]" />
            <span>ইনভেন্টরি লিস্ট</span>
          </button>

          {/* 5. Customer Message (WhatsApp) */}
          <button
            onClick={() => {
              setWhatsAppPhone('');
              setWhatsAppCustomerName('');
              setIsWhatsAppModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white hover:brightness-110 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>কাস্টমার মেসেজ</span>
          </button>
        </div>
      </div>

      {/* 1. QUICK ACTION TASK BAR (User Photo Inspired) */}
      <div className="p-4 rounded-2xl bg-[#16121f] border border-[#382d46] shadow-md">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2e243a]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#bd70df] animate-pulse"></span>
            <h2 className="text-sm font-bold text-white tracking-wide">
              দ্রুত কাজের মেনু ও শর্টকাট (Quick Tasks & Actions)
            </h2>
          </div>
          <span className="text-[11px] text-[#a69ab1] font-medium hidden sm:inline">
            ক্লিক করলে সাথে সাথে পেজে নিয়ে যাবে
          </span>
        </div>

        {/* Task Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {/* New Order */}
          <button
            onClick={() => onNavigate('manualOrder')}
            className="p-2.5 rounded-xl bg-[#261633] hover:bg-[#3d1d57] border border-[#6b2f96] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#bd70df] text-[#160e1b] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">নতুন অর্ডার তৈরি</div>
              <div className="text-[10px] text-[#bd70df]">Manual Entry</div>
            </div>
          </button>

          {/* Add Product Modal */}
          <button
            onClick={() => setIsAddProductModalOpen(true)}
            className="p-2.5 rounded-xl bg-[#191e2b] hover:bg-[#25324d] border border-[#36517e] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#3b82f6] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Package className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">নতুন প্রোডাক্ট যোগ</div>
              <div className="text-[10px] text-[#93c5fd]">Add Dress (36-56)</div>
            </div>
          </button>

          {/* Showroom POS */}
          <button
            onClick={() => onNavigate('pos')}
            className="p-2.5 rounded-xl bg-[#291e1d] hover:bg-[#462d29] border border-[#7a4237] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#f97316] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Receipt className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">শোরুম POS বিল</div>
              <div className="text-[10px] text-[#fdba74]">Counter Billing</div>
            </div>
          </button>

          {/* Fraud Checker */}
          <button
            onClick={() => onNavigate('crm')}
            className="p-2.5 rounded-xl bg-[#29131d] hover:bg-[#4a1c2d] border border-[#7a283e] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#ff4264] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">কাস্টমার ফ্রড চেক</div>
              <div className="text-[10px] text-[#ff8fa3]">Live Courier Check</div>
            </div>
          </button>

          {/* Courier Sync */}
          <button
            onClick={() => onNavigate('couriers')}
            className="p-2.5 rounded-xl bg-[#14261f] hover:bg-[#1e4234] border border-[#2b6b50] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#10b981] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Truck className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Steadfast ও কুরিয়ার</div>
              <div className="text-[10px] text-[#6ee7b7]">Courier Booking</div>
            </div>
          </button>

          {/* COD Settlement */}
          <button
            onClick={() => onNavigate('codSettlement')}
            className="p-2.5 rounded-xl bg-[#292215] hover:bg-[#473a21] border border-[#7a642e] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#eab308] text-[#1b1502] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CircleDollarSign className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">COD টাকা সেটেলমেন্ট</div>
              <div className="text-[10px] text-[#fef08a]">Courier Payment</div>
            </div>
          </button>

          {/* Profit & Loss */}
          <button
            onClick={() => onNavigate('accounting')}
            className="p-2.5 rounded-xl bg-[#1c182b] hover:bg-[#2d254b] border border-[#493a7d] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#8b5cf6] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">লাভ-ক্ষতি ও P&L</div>
              <div className="text-[10px] text-[#c4b5fd]">Profit & Accounts</div>
            </div>
          </button>

          {/* Size Exchange */}
          <button
            onClick={() => onNavigate('exchange')}
            className="p-2.5 rounded-xl bg-[#231828] hover:bg-[#3c2446] border border-[#6b3580] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#d946ef] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ArrowLeftRight className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">ড্রেস সাইজ বদল</div>
              <div className="text-[10px] text-[#f0abfc]">Exchange & Swap</div>
            </div>
          </button>

          {/* Variants 36-56 */}
          <button
            onClick={() => onNavigate('variants')}
            className="p-2.5 rounded-xl bg-[#192429] hover:bg-[#233a44] border border-[#2b5d6e] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#06b6d4] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">সাইজ ভ্যারিয়েন্ট (৩৬-৫৬)</div>
              <div className="text-[10px] text-[#a5f3fc]">Stock Matrix</div>
            </div>
          </button>

          {/* Bundle & Combo */}
          <button
            onClick={() => onNavigate('bundles')}
            className="p-2.5 rounded-xl bg-[#271d2e] hover:bg-[#432d52] border border-[#764593] text-left flex items-center gap-2.5 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-[#ec4899] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">কম্বো ও বান্ডেল অফার</div>
              <div className="text-[10px] text-[#fbcfe8]">Combo Builder</div>
            </div>
          </button>
        </div>
      </div>

      {/* 2. PRIMARY 4 KPI STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a69ab1]">মোট অর্ডার (Total Orders)</span>
            <div className="w-9 h-9 rounded-xl bg-[#35203f] flex items-center justify-center text-[#bd70df]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-white tabular-nums">{totalOrders}</div>
            <div className="text-xs text-[#a69ab1] mt-1">সব চ্যানেলের মোট কাস্টমার অর্ডার</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a69ab1]">ডেলিভার্ড সেলস (Revenue)</span>
            <div className="w-9 h-9 rounded-xl bg-[#1e2f28] flex items-center justify-center text-[#36c98b]">
              <CircleDollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-[#36c98b] tabular-nums">
              ৳ {deliveredSales.toLocaleString()}
            </div>
            <div className="text-xs text-[#a69ab1] mt-1">
              মোট বুকিং: ৳ {totalSalesAll.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a69ab1]">চলমান অর্ডার (Active/Pending)</span>
            <div className="w-9 h-9 rounded-xl bg-[#38261e] flex items-center justify-center text-[#f59e0b]">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-[#f59e0b] tabular-nums">{pendingOrders}</div>
            <div className="text-xs text-[#a69ab1] mt-1">পেন্ডিং, প্রসেসিং ও শিফট অর্ডার</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#181520] border border-[#342b40] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a69ab1]">অ্যাক্টিভ মার্চেন্ট ও শোরুম</span>
            <div className="w-9 h-9 rounded-xl bg-[#281b37] flex items-center justify-center text-[#bd70df]">
              <Store className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-white tabular-nums">{merchants.length}</div>
            <div className="text-xs text-[#a69ab1] mt-1">রেজিস্টার্ড শোরুম ও অনলাইন বুটিক</div>
          </div>
        </div>
      </div>

      {/* 3. EMBEDDED LIVE FRAUD CHECKER WIDGET (Direct Phone Box as requested) */}
      <div className="p-5 rounded-2xl bg-[#171321] border border-[#392d47] shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2d2238] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ff4264]/20 text-[#ff708b] flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>লাইভ ফ্রড কাস্টমার চেকার (Live Courier Verification)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#291c36] text-[#e6b4fa] border border-[#5c307a]">
                  Steadfast • Pathao • RedX
                </span>
              </h3>
              <p className="text-xs text-[#a69ab1]">
                গ্রাহকের মোবাইল নম্বর লিখুন — সাথে সাথে দেখাবে সে কয়টা পার্সেল রিসিভ করেছে আর কয়টা ক্যানসেল করেছে
              </p>
            </div>
          </div>
        </div>

        {/* Number Box Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Phone className="w-4 h-4 text-[#a69ab1] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={fraudPhoneInput}
              onChange={(e) => handleFraudPhoneChange(e.target.value)}
              placeholder="কাস্টমারের ফোন নম্বর দিন (যেমন: 01712345678 বা 018...)"
              className="w-full pl-9 pr-3 py-2.5 bg-[#100d16] border border-[#3d2e4f] rounded-xl text-sm text-white placeholder:text-[#6d5f7b] focus:border-[#bd70df] outline-none"
            />
          </div>
          {fraudPhoneInput && (
            <button
              onClick={() => handleFraudPhoneChange('')}
              className="px-3 py-2 text-xs text-[#a69ab1] hover:text-white"
            >
              মুছে ফেলুন
            </button>
          )}
        </div>

        {/* Live Result Cards */}
        {fraudReport && (
          <div className="p-4 rounded-xl bg-[#120f18] border border-[#322740] space-y-3 mt-2 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white text-sm">{fraudReport.phone}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    fraudReport.riskLevel === 'High'
                      ? 'bg-[#4b1421] text-[#ff7991] border border-[#ff4264]/50'
                      : fraudReport.riskLevel === 'Moderate'
                      ? 'bg-[#432f11] text-[#fcd34d] border border-[#f59e0b]/50'
                      : 'bg-[#113926] text-[#6ee7b7] border border-[#10b981]/50'
                  }`}
                >
                  {fraudReport.riskLevel === 'High'
                    ? '⚠️ উচ্চ ঝুঁকি (High Fraud Risk)'
                    : fraudReport.riskLevel === 'Moderate'
                    ? '⚠️ মাঝারি সতর্কতা (Moderate Risk)'
                    : '✅ নিরাপদ গ্রাহক (Safe Buyer)'}
                </span>
              </div>
              <div className="text-xs text-[#a69ab1]">
                ডেলিভারি সাকসেস রেট:{' '}
                <span className="font-bold text-white font-mono">{fraudReport.deliveryRate}%</span>
              </div>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-[#1b1524] border border-[#31253e]">
                <div className="text-xs text-[#a69ab1]">মোট কুরিয়ার পার্সেল</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">
                  {fraudReport.totalParcels} টি
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#11291f] border border-[#1d4d38]">
                <div className="text-xs text-[#6ee7b7]">সফলভাবে রিসিভ করেছে</div>
                <div className="text-lg font-bold text-[#36c98b] font-mono mt-0.5">
                  {fraudReport.delivered} টি
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#30131d] border border-[#571e2e]">
                <div className="text-xs text-[#ff9aaa]">ক্যানসেল / রিটার্ন করেছে</div>
                <div className="text-lg font-bold text-[#ff6b83] font-mono mt-0.5">
                  {fraudReport.cancelled} টি
                </div>
              </div>
            </div>

            {/* Courier Breakdown Details */}
            <div className="pt-2 border-t border-[#261d31]">
              <div className="text-[11px] font-bold text-[#a69ab1] mb-1.5">
                কুরিয়ার অনুযায়ী বাতিল ও রিসিভ হিসাব (Courier Breakdown):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {/* Steadfast */}
                <div className="p-2 rounded bg-[#181422] border border-[#2d2238] flex items-center justify-between">
                  <span className="font-semibold text-white">Steadfast:</span>
                  <span className="font-mono">
                    <span className="text-[#36c98b]">✓ {fraudReport.courierBreakdown.steadfast.delivered}</span>
                    {' / '}
                    <span className="text-[#ff6b83]">✗ {fraudReport.courierBreakdown.steadfast.cancelled}</span>
                  </span>
                </div>
                {/* Pathao */}
                <div className="p-2 rounded bg-[#181422] border border-[#2d2238] flex items-center justify-between">
                  <span className="font-semibold text-white">Pathao:</span>
                  <span className="font-mono">
                    <span className="text-[#36c98b]">✓ {fraudReport.courierBreakdown.pathao.delivered}</span>
                    {' / '}
                    <span className="text-[#ff6b83]">✗ {fraudReport.courierBreakdown.pathao.cancelled}</span>
                  </span>
                </div>
                {/* RedX */}
                <div className="p-2 rounded bg-[#181422] border border-[#2d2238] flex items-center justify-between">
                  <span className="font-semibold text-white">RedX:</span>
                  <span className="font-mono">
                    <span className="text-[#36c98b]">✓ {fraudReport.courierBreakdown.redx.delivered}</span>
                    {' / '}
                    <span className="text-[#ff6b83]">✗ {fraudReport.courierBreakdown.redx.cancelled}</span>
                  </span>
                </div>
              </div>
              <div className="mt-2 text-xs text-[#d7cddd] italic bg-[#1f182a] p-2 rounded">
                💡 পরামর্শ: {fraudReport.recommendation}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. RECENT ORDERS TABLE WITH FILTER BAR & MINI PRINT BUTTON */}
      <div className="bg-[#181520] border border-[#342b40] rounded-2xl p-5 shadow-sm space-y-4">
        {/* Table Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#342b40]">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>সাম্প্রতিক কাস্টমার অর্ডার (Recent Orders)</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#291b37] text-[#bd70df] font-semibold">
                {filteredDashboardOrders.length} টি
              </span>
            </h2>
            <p className="text-xs text-[#a69ab1]">
              স্ট্যাটাস পরিবর্তন করুন এবং সরাসরি ছোট সাইজের ইনভয়েস প্রিন্ট করুন
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-[#a69ab1] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dashboardSearch}
                onChange={(e) => setDashboardSearch(e.target.value)}
                placeholder="অর্ডার ID / ফোন নম্বর..."
                className="w-full pl-8 pr-2.5 py-1.5 bg-[#120f18] border border-[#342b40] rounded-lg text-xs text-white placeholder:text-[#6d5f7b] focus:border-[#bd70df] outline-none"
              />
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#271b37] text-[#e6b4fa] hover:bg-[#3d2454] border border-[#6b3580] transition-colors"
            >
              <span>সকল অর্ডার</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Courier & Status Filter Tabs Bar */}
        <div className="flex flex-col gap-2 pt-1 text-xs">
          {/* Status Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[#a69ab1] font-semibold shrink-0 pr-1">স্ট্যাটাস:</span>
            <button
              onClick={() => setSelectedStatusFilter('All')}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
                selectedStatusFilter === 'All'
                  ? 'bg-[#bd70df] text-[#160e1b] font-bold'
                  : 'bg-[#120f18] text-[#bcb1c7] hover:text-white border border-[#342b40]'
              }`}
            >
              সকল ({orders.length})
            </button>
            {statuses.map((st) => {
              const count = orders.filter((o) => o.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setSelectedStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
                    selectedStatusFilter === st
                      ? 'bg-[#bd70df] text-[#160e1b] font-bold'
                      : 'bg-[#120f18] text-[#bcb1c7] hover:text-white border border-[#342b40]'
                  }`}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>

          {/* Courier Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[#a69ab1] font-semibold shrink-0 pr-1">কুরিয়ার:</span>
            {courierOptions.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCourierFilter(c)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap text-[11px] font-medium transition-colors ${
                  selectedCourierFilter === c
                    ? 'bg-[#3b82f6] text-white font-bold'
                    : 'bg-[#120f18] text-[#93a2b7] hover:text-white border border-[#2b3a4e]'
                }`}
              >
                {c === 'All' ? 'সব কুরিয়ার' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#342b40] text-[#a69ab1] bg-[#14101c]">
                <th className="py-2.5 px-3 font-semibold">Order ID</th>
                <th className="py-2.5 px-3 font-semibold">গ্রাহকের নাম ও ফোন</th>
                <th className="py-2.5 px-3 font-semibold">পণ্য ও সাইজ</th>
                <th className="py-2.5 px-3 font-semibold">টোটাল (৳)</th>
                <th className="py-2.5 px-3 font-semibold">কুরিয়ার ও স্ট্যাটাস</th>
                <th className="py-2.5 px-3 font-semibold text-right">ছোট প্রিন্ট রসিদ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2233]">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#a69ab1]">
                    এই ফিল্টারে কোনো অর্ডার পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#201927] transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-white">#{o.id}</div>
                      <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.5 rounded bg-[#281b37] text-[#bd70df]">
                        {o.source}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{o.customer}</div>
                      <div className="font-mono text-[#a69ab1] text-[11px]">{o.phone}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-[#d7cddd] leading-tight">
                        {o.items.map((i, idx) => (
                          <div key={idx} className="truncate max-w-[200px]">
                            {i.name} (x{i.qty}) {i.size ? `· সাইজ: ${i.size}` : ''}
                          </div>
                        ))}
                      </div>
                      {o.dressSize && !o.items.some((i) => i.size) && (
                        <div className="text-[10px] text-[#bd70df] font-semibold mt-0.5">
                          সাইজ: {o.dressSize}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-sm text-[#bd70df] tabular-nums">
                        ৳{o.total}
                      </div>
                      <div className="text-[10px] text-[#ff9aaa] font-semibold tabular-nums">
                        COD: ৳{o.due}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                        className={`text-xs px-2.5 py-1 rounded-full border outline-none font-medium cursor-pointer ${
                          o.status === 'Delivered'
                            ? 'bg-[#16382d] text-[#8de8bf] border-[#255845]'
                            : o.status === 'Cancelled'
                            ? 'bg-[#44202a] text-[#ff9aaa] border-[#6b2a3a]'
                            : o.status === 'Shipped'
                            ? 'bg-[#1c2e4a] text-[#93c5fd] border-[#2b4c7e]'
                            : o.status === 'Preorder'
                            ? 'bg-[#3b2a1a] text-[#fbbf24] border-[#784f18]'
                            : 'bg-[#34213d] text-[#e3b7f3] border-[#553265]'
                        }`}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st} className="bg-[#181520] text-white">
                            {st === 'Preorder' ? 'Preorder (প্রি-অর্ডার)' : st}
                          </option>
                        ))}
                      </select>
                      <div className="text-[10px] text-[#a69ab1] mt-1 font-medium">
                        {o.courierService || 'Steadfast Courier'}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Direct WhatsApp Message to Customer */}
                        <button
                          onClick={() => {
                            setWhatsAppPhone(o.phone);
                            setWhatsAppCustomerName(o.customer);
                            setIsWhatsAppModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-[#25D366] hover:bg-[#128C7E]/20 border border-[#25D366]/30 transition-colors"
                          title="কাস্টমারের সাথে WhatsApp-এ চ্যাট করুন"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                        </button>

                        {/* Mini Print button */}
                        <button
                          onClick={() => onSelectOrderForInvoice(o)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#2e1d3d] hover:bg-[#462761] text-[#e6b4fa] border border-[#6b3580] transition-all"
                          title="ছোট সাইজের রসিদ / পার্সেল স্টিকার প্রিন্ট করুন"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#bd70df]" />
                          <span className="hidden sm:inline">ছোট প্রিন্ট</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. QUICK ADD PRODUCT MODAL (Dress sizes 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56) */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#181424] border border-[#48375c] rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#382d46]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/20 text-[#60a5fa] flex items-center justify-center">
                  <Package className="w-4 h-4 font-bold" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">নতুন ড্রেস / প্রোডাক্ট যোগ করুন</h3>
                  <p className="text-[10px] text-[#a69ab1]">সাইজ ৩৬ থেকে ৫৬ পর্যন্ত সেট করুন</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="p-1 rounded-lg text-[#a69ab1] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleQuickAddProductSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-white font-medium mb-1">প্রোডাক্টের নাম *</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="যেমন: Kashmiri Silk Three Piece - Black"
                  className="w-full px-3 py-2 bg-[#100d16] border border-[#382d46] rounded-xl text-white outline-none focus:border-[#bd70df]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white font-medium mb-1">ক্যাটাগরি</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 bg-[#100d16] border border-[#382d46] rounded-xl text-white outline-none focus:border-[#bd70df]"
                  >
                    <option value="Three Piece">Three Piece</option>
                    <option value="Kurti">Kurti</option>
                    <option value="Co-ord Set">Co-ord Set</option>
                    <option value="Anarkali">Anarkali</option>
                    <option value="One Piece">One Piece</option>
                    <option value="Khadi">Khadi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-1">SKU কোড</label>
                  <input
                    type="text"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    placeholder="ALV-802"
                    className="w-full px-3 py-2 bg-[#100d16] border border-[#382d46] rounded-xl text-white outline-none focus:border-[#bd70df]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-white font-medium mb-1">মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value ? Number(e.target.value) : '')}
                    placeholder="1850"
                    className="w-full px-3 py-2 bg-[#100d16] border border-[#382d46] rounded-xl text-white outline-none focus:border-[#bd70df] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">অফার মূল্য (৳)</label>
                  <input
                    type="number"
                    value={newProdOffer}
                    onChange={(e) => setNewProdOffer(e.target.value ? Number(e.target.value) : '')}
                    placeholder="1650"
                    className="w-full px-3 py-2 bg-[#100d16] border border-[#382d46] rounded-xl text-white outline-none focus:border-[#bd70df] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">মোট স্টক</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#100d16] border border-[#382d46] rounded-xl text-white outline-none focus:border-[#bd70df] font-mono"
                  />
                </div>
              </div>

              {/* Sizes Selector (36-48 standard, 50-56 max) */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#120f18] border border-[#322740]">
                <label className="block text-white font-semibold text-xs">
                  উপলব্ধ ড্রেস সাইজ নির্বাচন করুন (Dress Sizes):
                </label>
                <div className="space-y-1.5">
                  <div className="text-[11px] text-[#a69ab1]">স্ট্যান্ডার্ড সাইজ (৩৬ - ৪৮):</div>
                  <div className="flex flex-wrap gap-1.5">
                    {STANDARD_SIZES.map((s) => {
                      const isSel = newProdSizes.includes(s);
                      return (
                        <button
                          type="button"
                          key={s}
                          onClick={() => toggleSizeSelection(s)}
                          className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs transition-colors ${
                            isSel
                              ? 'bg-[#bd70df] text-[#160e1b]'
                              : 'bg-[#1e1728] text-[#bcb1c7] border border-[#3b2d4c]'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[11px] text-[#f59e0b] pt-1">ম্যাক্স সাইজ (৫০ - ৫৬):</div>
                  <div className="flex flex-wrap gap-1.5">
                    {MAX_SIZES.map((s) => {
                      const isSel = newProdSizes.includes(s);
                      return (
                        <button
                          type="button"
                          key={s}
                          onClick={() => toggleSizeSelection(s)}
                          className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs transition-colors ${
                            isSel
                              ? 'bg-[#f59e0b] text-[#160e1b]'
                              : 'bg-[#1e1728] text-[#fcd34d] border border-[#523e1b]'
                          }`}
                        >
                          {s} (Max)
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#342b40]">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#a69ab1] hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#bd70df] text-[#160e1b] hover:bg-[#cf8fed] transition-all active:scale-95 shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>প্রোডাক্ট সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Chat Modal */}
      {isWhatsAppModalOpen && (
        <WhatsAppChatModal
          isOpen={true}
          onClose={() => setIsWhatsAppModalOpen(false)}
          defaultPhone={whatsAppPhone}
          defaultCustomerName={whatsAppCustomerName}
        />
      )}
    </div>
  );
};
