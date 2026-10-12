import React from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  PlusCircle,
  CreditCard,
  Clock,
  RotateCcw,
  RefreshCw,
  Package,
  Layers,
  Archive,
  BarChart2,
  DollarSign,
  Truck,
  Building,
  Warehouse,
  PieChart,
  Users,
  Tag,
  Flame,
  Globe,
  Sliders,
  Shield,
  FileText,
  LogOut,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { PageId, Language } from '../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: Language;
  onLogout: () => void;
  onOpenStorefront: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavGroup {
  title: { bn: string; en: string };
  items: {
    id: PageId;
    label: { bn: string; en: string };
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  lang,
  onLogout,
  onOpenStorefront,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const groups: NavGroup[] = [
    {
      title: { bn: 'মূল কন্ট্রোল', en: 'Core' },
      items: [
        { id: 'dashboard', label: { bn: 'ড্যাশবোর্ড', en: 'Dashboard' }, icon: LayoutDashboard },
        { id: 'orders', label: { bn: 'সকল অর্ডার', en: 'Orders' }, icon: ShoppingCart },
        { id: 'manualOrder', label: { bn: 'ম্যানুয়াল অর্ডার এন্ট্রি', en: 'Create Order' }, icon: PlusCircle },
        { id: 'pos', label: { bn: 'POS ক্যাশ কাউন্টার', en: 'POS Billing' }, icon: CreditCard, badge: 'Live' },
      ],
    },
    {
      title: { bn: 'অর্ডার ও ডেলিভারি', en: 'Fulfillment' },
      items: [
        { id: 'couriers', label: { bn: 'কুরিয়ার ইন্টিগ্রেশন', en: 'Couriers (Steadfast/Pathao)' }, icon: Truck },
        { id: 'delivery', label: { bn: 'ডেলিভারি চার্জ রেট', en: 'Delivery Rates' }, icon: Sliders },
        { id: 'exchange', label: { bn: 'এক্সচেঞ্জ ও পরিবর্তন', en: 'Exchanges' }, icon: RefreshCw },
        { id: 'returns', label: { bn: 'রিটার্ন ও রিফান্ড', en: 'Returns & Refunds' }, icon: RotateCcw },
        { id: 'codSettlement', label: { bn: 'COD টাকা সেটেলমেন্ট', en: 'COD Settlements' }, icon: DollarSign },
      ],
    },
    {
      title: { bn: 'পণ্য ও ইনভেন্টরি', en: 'Catalog & Stock' },
      items: [
        { id: 'products', label: { bn: 'প্রোডাক্ট ক্যাটালগ', en: 'Products' }, icon: Package },
        { id: 'variants', label: { bn: 'ভেরিয়েন্ট ও বান্ডেল', en: 'Variants & Bundles' }, icon: Layers },
        { id: 'stockAudit', label: { bn: 'স্টক অডিট ও স্টক-আউট', en: 'Stock Audit' }, icon: Archive },
        { id: 'imageManager', label: { bn: 'ইমেজ গ্যালারি', en: 'Image Manager' }, icon: FileText },
      ],
    },
    {
      title: { bn: 'সাপ্লাই চেইন ও একাউন্টস', en: 'Supply & Finance' },
      items: [
        { id: 'suppliers', label: { bn: 'সাপ্লায়ার ও ওয়্যারহাউস', en: 'Suppliers & Warehouses' }, icon: Warehouse },
        { id: 'reports', label: { bn: 'রিপোর্ট ও প্রফিট লস', en: 'Reports & P&L' }, icon: BarChart2 },
        { id: 'crm', label: { bn: 'গ্রাহক ও সিআরএম', en: 'CRM & Marketing' }, icon: Users },
      ],
    },
    {
      title: { bn: 'চ্যানেল ও সেটিংস', en: 'Channels & System' },
      items: [
        { id: 'websites', label: { bn: 'ওয়েবসাইট ও ল্যান্ডিং পেজ', en: 'Channels & Landings' }, icon: Globe },
        { id: 'staff', label: { bn: 'স্টাফ ও পারমিশন', en: 'Staff & Roles' }, icon: Building },
        { id: 'auditLogs', label: { bn: 'সিকিউরিটি ও ব্যাকআপ', en: 'Security & Backup' }, icon: Shield },
        { id: 'settings', label: { bn: 'সিস্টেম সেটিংস', en: 'Settings' }, icon: Sliders },
      ],
    },
  ];

  const handleItemClick = (page: PageId) => {
    onNavigate(page);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#14111c] border-r border-[#2d2538] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="p-4 border-b border-[#2d2538] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#bd70df] to-[#7f39a0] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#bd70df]/20">
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-wide text-white font-['Plus_Jakarta_Sans']">
                  ALVINA
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#bd70df]/20 text-[#e4aeff] border border-[#bd70df]/40">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-[#a69ab1]">বাণিজ্য ও অর্ডার ম্যানেজমেন্ট</p>
            </div>
          </div>
        </div>

        {/* View Storefront Quick Button */}
        <div className="p-3 border-b border-[#2d2538]/60 bg-[#181422]">
          <button
            onClick={onOpenStorefront}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-500/30 text-amber-200 hover:text-white hover:border-amber-400 text-xs font-semibold transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === 'bn' ? '🛍️ লাইভ স্টোরফ্রন্ট দেখুন' : '🛍️ View Live Store'}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-5 text-sm custom-scrollbar">
          {groups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[11px] font-semibold text-[#8e829d] tracking-wider uppercase">
                {group.title[lang]}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#bd70df] text-white shadow-md shadow-[#bd70df]/30 font-semibold'
                        : 'text-[#d6cce0] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#a69ab1]'}`} />
                      <span className="truncate">{item.label[lang]}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/30 text-white'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User footer & logout */}
        <div className="p-3 border-t border-[#2d2538] bg-[#100e16]/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#342b40] flex items-center justify-center text-xs font-bold text-amber-300 shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Alvina Super Admin</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                সক্রিয় (Online)
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            title={lang === 'bn' ? 'লগআউট' : 'Logout'}
            className="p-1.5 rounded-lg text-[#a69ab1] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
