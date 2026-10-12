import React from 'react';
import {
  Order,
  Product,
  SystemConfig,
  Language,
  PageId,
} from '../types';
import {
  ShoppingCart,
  DollarSign,
  Truck,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Package,
  Plus,
  ArrowRight,
  Printer,
  Search,
} from 'lucide-react';
import { LiveFraudCheckerWidget } from '../components/LiveFraudCheckerWidget';

interface DashboardViewProps {
  orders: Order[];
  products: Product[];
  config: SystemConfig;
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenInvoice: (order: Order) => void;
  onUpdateOrderStatus: (orderId: number, status: Order['status']) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  products,
  config,
  lang,
  onNavigate,
  onOpenInvoice,
  onUpdateOrderStatus,
}) => {
  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const confirmedOrders = orders.filter((o) => o.status === 'Confirmed' || o.status === 'Packaging');
  const inCourierOrders = orders.filter((o) => o.status === 'In Courier' || o.status === 'Shipped');
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered');
  const returnedOrders = orders.filter((o) => o.status === 'Returned' || o.status === 'Cancelled');

  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const recentOrders = [...orders].reverse().slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#211a2f] via-[#1a1427] to-[#161020] border border-[#3b2f4c] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
              {lang === 'bn' ? 'স্বাগতম, আলভিনা এডমিন' : 'Welcome back, Alvina Admin'}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              {lang === 'bn' ? 'লাইভ সক্রিয়' : 'System Live'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#a69ab1]">
            {lang === 'bn'
              ? 'আপনার ওয়েবসাইট থেকে আসা নতুন অর্ডারগুলো স্বয়ংক্রিয়ভাবে নিচে রিয়েল-টাইমে আপডেট হচ্ছে।'
              : 'Orders placed on the website appear here automatically in real time.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('manualOrder')}
            className="px-4 py-2.5 rounded-xl bg-[#bd70df] hover:bg-[#cd83ee] text-white font-bold text-xs shadow-lg shadow-[#bd70df]/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'bn' ? 'নতুন ম্যানুয়াল অর্ডার' : 'New Manual Order'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#181422] border border-[#2d2538] shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a69ab1]">
              {lang === 'bn' ? 'মোট বিক্রয় (Total Sales)' : 'Total Revenue'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black text-white font-['Plus_Jakarta_Sans']">
              ৳ {totalRevenue.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-[#8e829d] mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>{orders.length} টি অর্ডারের হিসেব</span>
          </p>
        </div>

        {/* Pending Orders */}
        <div
          onClick={() => onNavigate('orders')}
          className="p-5 rounded-2xl bg-[#181422] border border-[#2d2538] hover:border-amber-500/50 transition-colors shadow-sm cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a69ab1]">
              {lang === 'bn' ? 'অপেক্ষমান অর্ডার (Pending)' : 'Pending Orders'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-amber-300 font-['Plus_Jakarta_Sans']">
              {pendingOrders.length}
            </span>
            {pendingOrders.length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 animate-pulse">
                কল করুন
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#8e829d] mt-1">
            {lang === 'bn' ? 'কনফার্মেশনের অপেক্ষায়' : 'Awaiting Confirmation'}
          </p>
        </div>

        {/* In Courier */}
        <div
          onClick={() => onNavigate('couriers')}
          className="p-5 rounded-2xl bg-[#181422] border border-[#2d2538] hover:border-[#bd70df]/50 transition-colors shadow-sm cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a69ab1]">
              {lang === 'bn' ? 'কুরিয়ারে চলমান (In Courier)' : 'In Courier'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-[#bd70df] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black text-white font-['Plus_Jakarta_Sans']">
              {inCourierOrders.length}
            </span>
          </div>
          <p className="text-[11px] text-[#8e829d] mt-1">
            {lang === 'bn' ? 'ডেলিভারি ট্র্যাকিং সক্রিয়' : 'Active Parcels on Road'}
          </p>
        </div>

        {/* Delivered Rate */}
        <div className="p-5 rounded-2xl bg-[#181422] border border-[#2d2538] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#a69ab1]">
              {lang === 'bn' ? 'সফল ডেলিভারি (Delivered)' : 'Delivered'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-['Plus_Jakarta_Sans']">
              {deliveredOrders.length}
            </span>
            <span className="text-xs text-[#a69ab1]">
              ({orders.length ? Math.round((deliveredOrders.length / orders.length) * 100) : 0}%)
            </span>
          </div>
          <p className="text-[11px] text-[#8e829d] mt-1">
            {lang === 'bn' ? 'টাকা রিসিভ সম্পন্ন' : 'Successful Cash Collections'}
          </p>
        </div>
      </div>

      {/* Center Layout: Recent Orders + Live Fraud Checker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (2 cols) */}
        <div className="lg:col-span-2 bg-[#181422] border border-[#2d2538] rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                {lang === 'bn' ? 'সাম্প্রতিক লাইভ অর্ডারসমূহ' : 'Recent Live Orders'}
              </h3>
              <p className="text-xs text-[#8e829d]">
                {lang === 'bn' ? 'ওয়েবসাইট ও ম্যানুয়াল বুকিং' : 'From website & manual entry'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-semibold text-[#bd70df] hover:text-[#d38eed] flex items-center gap-1 transition-colors"
            >
              <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#2d2538] text-[#8e829d]">
                  <th className="py-2.5 px-3">অর্ডার আইডি</th>
                  <th className="py-2.5 px-3">গ্রাহক ও মোবাইল</th>
                  <th className="py-2.5 px-3">পণ্য</th>
                  <th className="py-2.5 px-3">টাকার পরিমাণ</th>
                  <th className="py-2.5 px-3">স্ট্যাটাস</th>
                  <th className="py-2.5 px-3 text-right">একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d2538]/50">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#8e829d]">
                      কোনো অর্ডার নেই
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3 font-semibold text-white">
                        #{ord.id}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-white">{ord.customer}</div>
                        <div className="text-[11px] text-[#a69ab1]">{ord.phone}</div>
                      </td>
                      <td className="py-3 px-3 max-w-[140px] truncate text-[#d6cce0]">
                        {ord.items.map((i) => i.name).join(', ')}
                      </td>
                      <td className="py-3 px-3 font-bold text-amber-300">
                        ৳ {ord.total.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'Pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : ord.status === 'Confirmed'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : ord.status === 'Delivered'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-stone-500/20 text-stone-300'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => onOpenInvoice(ord)}
                          className="p-1.5 rounded-lg bg-[#251f33] hover:bg-[#342b45] text-amber-300 transition-colors cursor-pointer"
                          title="চালান / ইনভয়েস প্রিন্ট"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fraud Checker + Low Stock Alert */}
        <div className="space-y-6">
          <LiveFraudCheckerWidget lang={lang} compact={true} />

          {/* Low Stock Warning */}
          <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {lang === 'bn' ? 'কম স্টক অ্যালার্ট' : 'Low Stock Warning'}
                </h4>
              </div>
              <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10">
                {lowStockProducts.length} টি
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {lowStockProducts.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#120f1a] border border-[#2d2538] text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-[#8e829d]">৳ {p.price}</p>
                  </div>
                  <span className="shrink-0 text-rose-400 font-bold px-1.5 py-0.5 rounded bg-rose-500/10">
                    স্টক: {p.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
