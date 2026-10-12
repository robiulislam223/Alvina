import React, { useState } from 'react';
import { PageId, Language } from '../types';
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  Receipt,
  Clock,
  RotateCcw,
  ArrowLeftRight,
  Package,
  Layers,
  Sparkles,
  ClipboardCheck,
  History,
  Image as ImageIcon,
  Truck,
  CircleDollarSign,
  Boxes,
  Building2,
  Sliders,
  BarChart3,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Users,
  Tag,
  Zap,
  Gift,
  Award,
  Share2,
  MessageSquare,
  LifeBuoy,
  Store,
  Globe,
  Briefcase,
  Target,
  Palette,
  ShieldCheck,
  FileCheck,
  ScrollText,
  Webhook,
  Activity,
  FolderArchive,
  Lock,
  Settings,
  ChevronDown,
  ChevronRight,
  X,
  LogOut,
  Search,
  Languages,
  UserCheck,
  MessageCircle,
  ShieldAlert,
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageId;
  lang?: Language;
  onToggleLanguage?: () => void;
  onNavigate: (page: PageId) => void;
  onLogout: () => void;
  userName: string;
  userRole?: string;
  onOpenWhatsApp?: () => void;
  isOpen: boolean;
  onClose: () => void;
  pendingOrdersCount: number;
  pendingApprovalsCount?: number;
}

interface NavGroup {
  name: string;
  items: {
    id: PageId;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  lang = 'bn',
  onToggleLanguage,
  onNavigate,
  onLogout,
  userName,
  userRole = 'Admin',
  onOpenWhatsApp,
  isOpen,
  onClose,
  pendingOrdersCount,
  pendingApprovalsCount = 0,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const isBn = lang === 'bn';

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const navGroups: NavGroup[] = [
    {
      name: isBn ? 'অপারেশন ও বিক্রয় (Operations)' : 'Operations & Sales',
      items: [
        { id: 'dashboard', label: isBn ? 'ড্যাশবোর্ড (Dashboard)' : 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
        {
          id: 'orders',
          label: isBn ? 'অর্ডার ও প্রফিট (Orders)' : 'Orders & Profit',
          icon: <ShoppingBag className="w-4 h-4" />,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
        },
        { id: 'manualOrder', label: isBn ? 'ম্যানুয়াল অর্ডার এন্ট্রি' : 'Manual Order Entry', icon: <PlusCircle className="w-4 h-4" /> },
        { id: 'pos', label: isBn ? 'শোরুম POS বিলিং' : 'Showroom POS Billing', icon: <Receipt className="w-4 h-4" /> },
        { id: 'preorders', label: isBn ? 'প্রি-অর্ডার ও ব্যাক-অর্ডার' : 'Pre-Order & Backorders', icon: <Clock className="w-4 h-4" /> },
        { id: 'returns', label: isBn ? 'রিটার্ন ও রিফান্ড' : 'Returns & Refunds', icon: <RotateCcw className="w-4 h-4" /> },
        { id: 'exchange', label: isBn ? 'ড্রেস ও সাইজ এক্সচেঞ্জ' : 'Exchange & Size Swap', icon: <ArrowLeftRight className="w-4 h-4" /> },
      ],
    },
    {
      name: isBn ? 'পণ্য ও ইনভেন্টরি (Catalog)' : 'Catalog & Inventory',
      items: [
        { id: 'products', label: isBn ? 'সকল প্রোডাক্ট ও স্টক' : 'All Products & Stock', icon: <Package className="w-4 h-4" /> },
        { id: 'variants', label: isBn ? 'প্রোডাক্ট ভ্যারিয়েন্ট (৩৬-৫৬)' : 'Product Variants (36-56)', icon: <Layers className="w-4 h-4" /> },
        { id: 'bundles', label: isBn ? 'বান্ডেল ও কম্বো বিল্ডার' : 'Bundle & Combo Builder', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'stockAudit', label: isBn ? 'ইনভেন্টরি স্টক অডিট' : 'Stock Audit & Count', icon: <ClipboardCheck className="w-4 h-4" /> },
        { id: 'priceHistory', label: isBn ? 'মূল্য পরিবর্তনের ইতিহাস' : 'Price Change History', icon: <History className="w-4 h-4" /> },
        { id: 'imageManager', label: isBn ? 'ইমেজ ও মিডিয়া গ্যালারি' : 'Image & Gallery Asset', icon: <ImageIcon className="w-4 h-4" /> },
      ],
    },
    {
      name: isBn ? 'লজিস্টিকস ও সাপ্লায়ার (Supply & COD)' : 'Logistics & Supply',
      items: [
        { id: 'couriers', label: isBn ? 'কুরিয়ার সার্ভিস' : 'Courier Service', icon: <Truck className="w-4 h-4" /> },
        { id: 'codSettlement', label: isBn ? 'COD সেটেলমেন্ট ট্র্যাকার' : 'COD Settlement Tracker', icon: <CircleDollarSign className="w-4 h-4" /> },
        { id: 'suppliers', label: isBn ? 'সাপ্লায়ার ও পারচেজ অর্ডার' : 'Suppliers & Purchases', icon: <Boxes className="w-4 h-4" /> },
        { id: 'warehouses', label: isBn ? 'মাল্টি-স্টোর ও ওয়্যারহাউজ' : 'Multi-Store & Warehouse', icon: <Building2 className="w-4 h-4" /> },
        { id: 'delivery', label: isBn ? 'ডেলিভারি ফি ও সেটিংস' : 'Delivery & Shipping Fee', icon: <Sliders className="w-4 h-4" /> },
      ],
    },
    {
      name: isBn ? 'গ্রাহক ও প্রচারণা (CRM & Growth)' : 'CRM & Marketing',
      items: [
        { id: 'websiteLeads', label: isBn ? 'ওয়েবসাইট ভিজিটর ও ড্রপ-কার্ট' : 'Website Leads & Dropped Cart', icon: <UserCheck className="w-4 h-4 text-[#bd70df]" /> },
        { id: 'crm', label: isBn ? 'কাস্টমার CRM ও ফ্রড চেকার' : 'Customer CRM & Fraud', icon: <Users className="w-4 h-4" /> },
        { id: 'coupons', label: isBn ? 'প্রোমো কোড ও ডিসকাউন্ট' : 'Promo Codes & Discounts', icon: <Tag className="w-4 h-4" /> },
        { id: 'flashSales', label: isBn ? 'ফ্ল্যাশ সেল শিডিউলার' : 'Flash Sale Scheduler', icon: <Zap className="w-4 h-4" /> },
        { id: 'giftCards', label: isBn ? 'গিফট কার্ড ও ক্রেডিট' : 'Gift Cards & Credit', icon: <Gift className="w-4 h-4" /> },
        { id: 'loyalty', label: isBn ? 'লয়ালটি পয়েন্ট প্রোগ্রাম' : 'Loyalty Points Program', icon: <Award className="w-4 h-4" /> },
        { id: 'affiliates', label: isBn ? 'অ্যাফিলিয়েট ও রেফারেল' : 'Affiliate & Referral', icon: <Share2 className="w-4 h-4" /> },
        { id: 'marketing', label: isBn ? 'মার্কেটিং ও ক্যাম্পেইন' : 'Marketing & Campaigns', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'tickets', label: isBn ? 'কমপ্লেইন্ট ও টিকেটিং' : 'Complaints & Ticketing', icon: <LifeBuoy className="w-4 h-4" /> },
      ],
    },
    {
      name: isBn ? 'স্টোরফ্রন্ট ও চ্যানেল (Storefront)' : 'Storefront & Channels',
      items: [
        { id: 'merchants', label: isBn ? 'মার্চেন্ট ও আউটলেট' : 'Merchants & Outlets', icon: <Store className="w-4 h-4" /> },
        { id: 'websites', label: isBn ? 'ওয়েবসাইট ও ডোমেইন' : 'Websites & Domains', icon: <Globe className="w-4 h-4" /> },
        { id: 'landings', label: isBn ? 'ল্যান্ডিং পেজ ও ফানেল' : 'Landing Pages & Funnels', icon: <Layers className="w-4 h-4" /> },
        { id: 'wholesale', label: isBn ? 'B2B পাইকারি পোর্টাল' : 'B2B / Wholesale Portal', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'pixels', label: isBn ? 'পিক্সেল ও কনভার্সন' : 'Pixel & Conversions', icon: <Target className="w-4 h-4" /> },
        { id: 'theme', label: isBn ? 'থিম ও মাল্টি-কারেন্সি' : 'Theme & Multi-Currency', icon: <Palette className="w-4 h-4" /> },
      ],
    },
    {
      name: isBn ? 'সিকিউরিটি ও সিস্টেম (System)' : 'Security & System',
      items: [
        { id: 'staff', label: isBn ? 'স্টাফ ও পারমিশন' : 'Staff & Permissions', icon: <ShieldCheck className="w-4 h-4" /> },
        {
          id: 'approvals',
          label: isBn ? 'ম্যানেজার অ্যাপ্রুভাল' : 'Approval Workflow',
          icon: <FileCheck className="w-4 h-4" />,
          badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
        },
        ...((!userRole || userRole === 'Admin')
          ? [
              {
                id: 'loginAudit' as PageId,
                label: isBn ? 'লগইন হিস্ট্রি ও ডিভাইস ট্র্যাকার (Admin)' : 'Login Device Tracker (Admin)',
                icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
              },
            ]
          : []),
        { id: 'auditLogs', label: isBn ? 'অডিট ট্রেইল ও লগ' : 'Audit Trail & Logs', icon: <ScrollText className="w-4 h-4" /> },
        { id: 'apiWebhooks', label: isBn ? 'API ও ওয়েবহুক ম্যানেজার' : 'API & Webhook Manager', icon: <Webhook className="w-4 h-4" /> },
        { id: 'healthMonitor', label: isBn ? 'সিস্টেম হেলথ মনিটর' : 'System Health Monitor', icon: <Activity className="w-4 h-4" /> },
        { id: 'documents', label: isBn ? 'ডকুমেন্ট ও ফাইল সেন্টার' : 'Document Center', icon: <FolderArchive className="w-4 h-4" /> },
        { id: 'privacy', label: isBn ? 'ডাটা প্রাইভেসি ও GDPR' : 'Data Privacy & GDPR', icon: <Lock className="w-4 h-4" /> },
        { id: 'settings', label: isBn ? 'সেটিংস ও VS Code এক্সপোর্ট' : 'Settings & VS Code Export', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  const filterText = searchFilter.trim().toLowerCase();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#130f19] border-r border-[#342b40] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="p-4 border-b border-[#342b40] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                ALVINA
              </span>
              <span className="text-xl font-bold text-[#bd70df] font-['Plus_Jakarta_Sans']">
                COMMERCE
              </span>
            </div>
            <p className="text-[10px] text-[#a69ab1] uppercase tracking-wider font-semibold mt-0.5">
              Enterprise Multi-Merchant Suite
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {onToggleLanguage && (
              <button
                onClick={onToggleLanguage}
                title="Switch Language (বাংলা / English)"
                className="px-2 py-1 rounded-lg text-[11px] font-bold bg-[#1b1524] hover:bg-[#2c2038] text-white border border-[#483959] transition-colors"
              >
                {isBn ? '🇧🇩 বাংলা' : '🇬🇧 EN'}
              </button>
            )}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-[#a69ab1] hover:text-white hover:bg-[#211b2b]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Menu Search */}
        <div className="px-3 pt-3 pb-1 border-b border-[#282133]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#a69ab1] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={isBn ? 'মেনু খুঁজুন (Search menu)...' : 'Search menu items...'}
              className="w-full pl-8 pr-2.5 py-1.5 bg-[#100d16] border border-[#342b40] rounded-lg text-xs text-white placeholder:text-[#7d718b] focus:border-[#bd70df] outline-none"
            />
          </div>
        </div>

        {/* Navigation items grouped */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
          {navGroups.map((group) => {
            const isGroupCollapsed = collapsedGroups[group.name] && !filterText;
            const filteredItems = group.items.filter((item) =>
              filterText
                ? item.label.toLowerCase().includes(filterText) ||
                  group.name.toLowerCase().includes(filterText)
                : true
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={group.name} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.name)}
                  className="w-full flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-[#8d7f9c] uppercase tracking-wider hover:text-[#d3b2e6] transition-colors"
                >
                  <span className="truncate">{group.name}</span>
                  {!filterText && (
                    <span className="text-[#a69ab1]">
                      {isGroupCollapsed ? (
                        <ChevronRight className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  )}
                </button>

                {!isGroupCollapsed && (
                  <div className="space-y-0.5">
                    {filteredItems.map((item) => {
                      const isActive = currentPage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onNavigate(item.id);
                            onClose();
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-[#3a2346] text-[#f7dcff] border border-[#714786]/60 shadow-sm'
                              : 'text-[#bcb1c7] hover:bg-[#211a2a] hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={isActive ? 'text-[#bd70df]' : 'text-[#8e819b]'}>
                              {item.icon}
                            </span>
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge !== undefined && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#bd70df]/20 text-[#e6b4fa] border border-[#bd70df]/30 tabular-nums shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* WhatsApp Direct Chat Trigger Button */}
        {onOpenWhatsApp && (
          <div className="px-3 py-2 border-t border-[#342b40]/60 bg-[#16111e]">
            <button
              onClick={() => {
                onOpenWhatsApp();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#25D366]/20 border border-[#25D366]/40 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#128C7E]" />
              <span>{isBn ? 'সরাসরি WhatsApp চ্যাট' : 'Direct WhatsApp Chat'}</span>
            </button>
          </div>
        )}

        {/* User footer */}
        <div className="p-3.5 border-t border-[#342b40] bg-[#110d17]">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-[10px] text-[#a69ab1]">Signed in as</div>
              <div className="text-xs font-semibold text-white truncate">{userName}</div>
            </div>
            <button
              onClick={onLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-[#a69ab1] hover:text-[#ff6b83] hover:bg-[#2b1720] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
