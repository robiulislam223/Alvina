import React from 'react';
import {
  Menu,
  Languages,
  Plus,
  Truck,
  FileCode,
  ExternalLink,
  ShieldAlert,
  Bell,
  Search,
} from 'lucide-react';
import { PageId, Language } from '../types';

interface TopBarProps {
  currentPage: PageId;
  lang: Language;
  onToggleLang: () => void;
  onOpenMobileMenu: () => void;
  onOpenStorefront: () => void;
  onOpenCourierExport: () => void;
  onOpenCodeExport: () => void;
  onNavigate: (page: PageId) => void;
  unreadOrdersCount?: number;
}

const PAGE_TITLES: Partial<Record<PageId, { bn: string; en: string }>> = {
  dashboard: { bn: 'ওভারভিউ ড্যাশবোর্ড', en: 'Dashboard Overview' },
  orders: { bn: 'অর্ডার ম্যানেজমেন্ট', en: 'Orders Management' },
  manualOrder: { bn: 'নতুন ম্যানুয়াল অর্ডার এন্ট্রি', en: 'Create Manual Order' },
  pos: { bn: 'পয়েন্ট অফ সেল (POS কাউন্টার)', en: 'POS Billing' },
  preorders: { bn: 'প্রি-অর্ডার বুকিং', en: 'Pre-Orders' },
  returns: { bn: 'রিটার্ন ও রিফান্ড ম্যানেজমেন্ট', en: 'Returns & Refunds' },
  exchange: { bn: 'এক্সচেঞ্জ ও পার্সেল রিপ্লেসমেন্ট', en: 'Exchanges' },
  products: { bn: 'থ্রি-পিস ও কুর্তি ক্যাটালগ', en: 'Products & Catalog' },
  variants: { bn: 'কালার/সাইজ ভেরিয়েন্ট ও বান্ডেল', en: 'Variants & Bundles' },
  stockAudit: { bn: 'ইনভেন্টরি স্টক অডিট', en: 'Stock Audit' },
  priceHistory: { bn: 'দাম পরিবর্তনের হিস্টোরি', en: 'Price History' },
  imageManager: { bn: 'প্রোডাক্ট ইমেজ গ্যালারি', en: 'Image Manager' },
  couriers: { bn: 'কুরিয়ার বুকিং ও ট্র্যাকিং', en: 'Couriers API' },
  codSettlement: { bn: 'ক্যাশ অন ডেলিভারি (COD) সেটেলমেন্ট', en: 'COD Settlements' },
  suppliers: { bn: 'সাপ্লায়ার ও ওয়্যারহাউস', en: 'Suppliers & Warehouses' },
  warehouses: { bn: 'ওয়্যারহাউস লোকেশন', en: 'Warehouse Locations' },
  delivery: { bn: 'ডেলিভারি চার্জ ও জোন কনফিগারেশন', en: 'Delivery Rates' },
  reports: { bn: 'বিজনেস রিপোর্ট ও প্রফিট/লস', en: 'Reports & Analytics' },
  accounting: { bn: 'হিসাব খাতা ও লেজার', en: 'Accounting' },
  expenses: { bn: 'দৈনিক খরচ ও এক্সপেন্স', en: 'Expenses' },
  reconciliation: { bn: 'কুরিয়ার রিকনসিলিয়েশন', en: 'Courier Reconciliation' },
  crm: { bn: 'কাস্টমার ডাটাবেজ ও মার্কেটিং', en: 'CRM & Marketing' },
  coupons: { bn: 'ডিসকাউন্ট কুপন কোড', en: 'Promo Codes' },
  flashSales: { bn: 'ফ্ল্যাশ সেল অফার', en: 'Flash Sales' },
  giftCards: { bn: 'গিফট কার্ড', en: 'Gift Cards' },
  loyalty: { bn: 'লয়্যালটি পয়েন্টস', en: 'Loyalty Points' },
  affiliates: { bn: 'অ্যাফিলিয়েট পার্টনার্স', en: 'Affiliates' },
  marketing: { bn: 'মার্কেটিং ক্যাম্পেইন', en: 'Campaigns' },
  tickets: { bn: 'কাস্টমার সাপোর্ট টিকেট', en: 'Support Tickets' },
  merchants: { bn: 'মার্চেন্ট ও আউটলেট', en: 'Merchants & Outlets' },
  websites: { bn: 'ওয়েবসাইট চ্যানেল ও ল্যান্ডিং পেজ', en: 'Websites & Landing Pages' },
  landings: { bn: 'ল্যান্ডিং পেজ বিল্ডার', en: 'Landing Pages' },
  wholesale: { bn: 'পাইকারি বা হোলসেল বায়ার', en: 'Wholesale Orders' },
  pixels: { bn: 'ফেসবুক পিক্সেল ও ট্র্যাকিং', en: 'Tracking Pixels' },
  theme: { bn: 'থিম ও কালার স্কিম', en: 'Theme Settings' },
  staff: { bn: 'স্টাফ ও রোল পারমিশন', en: 'Staff Management' },
  approvals: { bn: 'অ্যাপ্রুভাল রিকোয়েস্ট', en: 'Approvals' },
  auditLogs: { bn: 'অডিট লগ ও সিকিউরিটি ব্যাকআপ', en: 'Audit Logs & Backup' },
  apiWebhooks: { bn: 'API ও ওয়েবহুক ইন্টিগ্রেশন', en: 'Webhooks' },
  healthMonitor: { bn: 'সিস্টেম হেলথ মনিটর', en: 'System Health' },
  documents: { bn: 'ডকুমেন্টস ও চালান', en: 'Documents' },
  privacy: { bn: 'প্রাইভেসি ও পলিসি', en: 'Privacy Policy' },
  settings: { bn: 'সিস্টেম ও জেনারেল সেটিংস', en: 'System Settings' },
};

export const TopBar: React.FC<TopBarProps> = ({
  currentPage,
  lang,
  onToggleLang,
  onOpenMobileMenu,
  onOpenStorefront,
  onOpenCourierExport,
  onOpenCodeExport,
  onNavigate,
  unreadOrdersCount = 0,
}) => {
  const title = PAGE_TITLES[currentPage] || { bn: 'অ্যাডমিন প্যানেল', en: 'Admin Panel' };

  return (
    <header className="sticky top-0 z-30 bg-[#14111c]/90 backdrop-blur-md border-b border-[#2d2538] px-4 py-3 flex items-center justify-between gap-4">
      {/* Left side: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-[#a69ab1] hover:text-white hover:bg-white/5 lg:hidden cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
            {title[lang]}
          </h1>
          <p className="text-[11px] text-[#8e829d] hidden sm:block">
            {lang === 'bn' ? 'আলভিনা কমার্স ম্যানেজমেন্ট সিস্টেম' : 'Alvina Commerce Management System'}
          </p>
        </div>
      </div>

      {/* Right side: quick actions */}
      <div className="flex items-center gap-2">
        {/* View storefront button */}
        <button
          onClick={onOpenStorefront}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 text-xs font-semibold transition-all cursor-pointer"
          title="গ্রাহকের লাইভ ওয়েবসাইট ওপেন করুন"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'লাইভ স্টোর' : 'Live Store'}</span>
        </button>

        {/* Create order button */}
        <button
          onClick={() => onNavigate('manualOrder')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#bd70df] text-white hover:bg-[#cf8cef] text-xs font-bold transition-all shadow-md shadow-[#bd70df]/20 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{lang === 'bn' ? 'নতুন অর্ডার' : 'New Order'}</span>
        </button>

        {/* Courier bulk export */}
        <button
          onClick={onOpenCourierExport}
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#231c2d] border border-[#3b2f4a] text-[#d6cce0] hover:text-white hover:bg-[#2e243b] text-xs font-medium transition-all cursor-pointer"
          title="কুরিয়ার শিট এক্সপোর্ট"
        >
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden lg:inline">{lang === 'bn' ? 'কুরিয়ার এক্সপোর্ট' : 'Couriers'}</span>
        </button>

        {/* Backup / Export Code */}
        <button
          onClick={onOpenCodeExport}
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#231c2d] border border-[#3b2f4a] text-[#d6cce0] hover:text-white hover:bg-[#2e243b] text-xs font-medium transition-all cursor-pointer"
          title="ডাটাবেজ ও কোড ব্যাকআপ"
        >
          <FileCode className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden lg:inline">{lang === 'bn' ? 'ডাটা ব্যাকআপ' : 'Backup'}</span>
        </button>

        {/* Notification bell */}
        <button
          onClick={() => onNavigate('orders')}
          className="relative p-2 rounded-xl text-[#a69ab1] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="নতুন অর্ডার"
        >
          <Bell className="w-4 h-4" />
          {unreadOrdersCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#14111c] animate-pulse" />
          )}
        </button>

        {/* Language switcher */}
        <button
          onClick={onToggleLang}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#231c2d] border border-[#3b2f4a] text-xs font-medium text-[#e4aeff] hover:border-[#bd70df] transition-colors cursor-pointer"
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'বাং' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
};
