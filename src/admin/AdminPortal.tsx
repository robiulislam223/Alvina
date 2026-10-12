import React, { useState, useEffect } from 'react';
import {
  PageId,
  Language,
  Merchant,
  Website,
  LandingPage,
  Product,
  Order,
  CourierService,
  ExchangeRecord,
  StaffMember,
  SystemConfig,
  OrderStatus,
  PosTransaction,
  PreOrder,
  ReturnRefund,
  ProductVariant,
  ProductBundle,
  StockAuditRecord,
  PriceChangeRecord,
  CodSettlement,
  Supplier,
  PurchaseOrder,
  Warehouse,
  ExpenseRecord,
  ReconciliationRecord,
  CrmCustomer,
  PromoCode,
  FlashSale,
  GiftCard,
  LoyaltyAccount,
  AffiliatePartner,
  MarketingCampaign,
  SupportTicket,
  WholesaleBuyer,
  TrackingPixel,
  ApprovalRequest,
  AuditLogEntry,
  ApiWebhook,
  DocumentFile,
} from './types';
import {
  getStoredData,
  setStoredData,
  initializeStorage,
} from './utils/storage';
import {
  INITIAL_CONFIG,
  INITIAL_MERCHANTS,
  INITIAL_WEBSITES,
  INITIAL_LANDINGS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_COURIERS,
  INITIAL_EXCHANGES,
  INITIAL_STAFF,
  INITIAL_PREORDERS,
  INITIAL_RETURNS,
  INITIAL_VARIANTS,
  INITIAL_BUNDLES,
  INITIAL_STOCK_AUDITS,
  INITIAL_COD_SETTLEMENTS,
  INITIAL_SUPPLIERS,
  INITIAL_WAREHOUSES,
  INITIAL_EXPENSES,
  INITIAL_CRM_CUSTOMERS,
  INITIAL_PROMO_CODES,
  INITIAL_WHOLESALE,
  INITIAL_PIXELS,
  INITIAL_AUDIT_LOGS,
  INITIAL_WEBHOOKS,
} from './data/initialData';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ToastContainer, ToastMessage } from './components/Toast';
import { InvoiceModal } from './components/InvoiceModal';
import { CourierExportModal } from './components/CourierExportModal';
import { CodeExportModal } from './components/CodeExportModal';
import { storeOrderToAdminOrder, storeProductToAdminProduct } from '../utils/orderBridge';

import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { OrdersView } from './views/OrdersView';
import { ManualOrderView } from './views/ManualOrderView';
import { ProductsView } from './views/ProductsView';
import { MerchantsView } from './views/MerchantsView';
import { WebsitesView } from './views/WebsitesView';
import { LandingsView } from './views/LandingsView';
import { DeliverySettingsView } from './views/DeliverySettingsView';
import { CouriersView } from './views/CouriersView';
import { ExchangeView } from './views/ExchangeView';
import { StaffView } from './views/StaffView';
import { SettingsView } from './views/SettingsView';

import { PosBillingView } from './views/PosBillingView';
import { PreOrdersView } from './views/PreOrdersView';
import { ReturnsRefundsView } from './views/ReturnsRefundsView';
import { VariantsBundlesView } from './views/VariantsBundlesView';
import { StockAuditView } from './views/StockAuditView';
import { ImageManagerView } from './views/ImageManagerView';
import { CodSettlementView } from './views/CodSettlementView';
import { SuppliersWarehousesView } from './views/SuppliersWarehousesView';
import { ReportsAccountingView } from './views/ReportsAccountingView';
import { CrmMarketingView } from './views/CrmMarketingView';
import { StorefrontChannelsView } from './views/StorefrontChannelsView';
import { SecuritySystemView } from './views/SecuritySystemView';

interface AdminPortalProps {
  onOpenStorefront: () => void;
  // Shared state sync with storefront
  storeOrders?: any[];
  onSyncStoreOrders?: (orders: any[]) => void;
  storeProducts?: any[];
  onSyncStoreProducts?: (products: any[]) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onOpenStorefront,
  storeOrders,
  onSyncStoreOrders,
  storeProducts,
  onSyncStoreProducts,
}) => {
  useEffect(() => {
    initializeStorage();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('alvina_logged_in') === 'yes';
  });

  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('alvina_lang') as Language) || 'bn';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [isCourierExportOpen, setIsCourierExportOpen] = useState(false);
  const [isCodeExportOpen, setIsCodeExportOpen] = useState(false);

  // Entities state
  const [config, setConfig] = useState<SystemConfig>(() =>
    getStoredData('config', INITIAL_CONFIG)
  );

  const [merchants] = useState<Merchant[]>(() =>
    getStoredData('merchants', INITIAL_MERCHANTS)
  );

  const [websites] = useState<Website[]>(() =>
    getStoredData('websites', INITIAL_WEBSITES)
  );

  const [landings] = useState<LandingPage[]>(() =>
    getStoredData('landings', INITIAL_LANDINGS)
  );

  // Synchronized orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = getStoredData('orders', INITIAL_ORDERS);
    return saved;
  });

  // Synchronized products
  const [products, setProducts] = useState<Product[]>(() => {
    return getStoredData('products', INITIAL_PRODUCTS);
  });

  const [couriers, setCouriers] = useState<CourierService[]>(() =>
    getStoredData('couriers', INITIAL_COURIERS)
  );

  const [exchanges, setExchanges] = useState<ExchangeRecord[]>(() =>
    getStoredData('exchanges', INITIAL_EXCHANGES)
  );

  const [returns] = useState<ReturnRefund[]>(() =>
    getStoredData('returns', INITIAL_RETURNS)
  );

  const [preorders] = useState<PreOrder[]>(() =>
    getStoredData('preorders', INITIAL_PREORDERS)
  );

  const [variants] = useState<ProductVariant[]>(() =>
    getStoredData('variants', INITIAL_VARIANTS)
  );

  const [bundles] = useState<ProductBundle[]>(() =>
    getStoredData('bundles', INITIAL_BUNDLES)
  );

  const [stockAudits] = useState<StockAuditRecord[]>(() =>
    getStoredData('stockAudits', INITIAL_STOCK_AUDITS)
  );

  const [codSettlements] = useState<CodSettlement[]>(() =>
    getStoredData('codSettlements', INITIAL_COD_SETTLEMENTS)
  );

  const [suppliers] = useState<Supplier[]>(() =>
    getStoredData('suppliers', INITIAL_SUPPLIERS)
  );

  const [warehouses] = useState<Warehouse[]>(() =>
    getStoredData('warehouses', INITIAL_WAREHOUSES)
  );

  const [expenses] = useState<ExpenseRecord[]>(() =>
    getStoredData('expenses', INITIAL_EXPENSES)
  );

  const [crmCustomers] = useState<CrmCustomer[]>(() =>
    getStoredData('crmCustomers', INITIAL_CRM_CUSTOMERS)
  );

  const [promoCodes] = useState<PromoCode[]>(() =>
    getStoredData('promoCodes', INITIAL_PROMO_CODES)
  );

  const [wholesale] = useState<WholesaleBuyer[]>(() =>
    getStoredData('wholesale', INITIAL_WHOLESALE)
  );

  const [pixels] = useState<TrackingPixel[]>(() =>
    getStoredData('pixels', INITIAL_PIXELS)
  );

  const [staff] = useState<StaffMember[]>(() =>
    getStoredData('staff', INITIAL_STAFF)
  );

  const [auditLogs] = useState<AuditLogEntry[]>(() =>
    getStoredData('auditLogs', INITIAL_AUDIT_LOGS)
  );

  const [webhooks] = useState<ApiWebhook[]>(() =>
    getStoredData('webhooks', INITIAL_WEBHOOKS)
  );

  // Sync incoming orders from storefront
  useEffect(() => {
    if (storeOrders && storeOrders.length > 0) {
      setOrders((prev) => {
        const existingIds = new Set(prev.map((o) => o.id));
        const mappedStoreOrders: Order[] = storeOrders
          .map((so: any) => {
            if (typeof so.id === 'number' && 'customer' in so) {
              return so as Order;
            }
            return storeOrderToAdminOrder(so);
          })
          .filter((mo) => !existingIds.has(mo.id));

        if (mappedStoreOrders.length > 0) {
          const combined = [...mappedStoreOrders, ...prev];
          setStoredData('orders', combined);
          return combined;
        }
        return prev;
      });
    }
  }, [storeOrders]);

  // Sync incoming products from storefront
  useEffect(() => {
    if (storeProducts && storeProducts.length > 0) {
      setProducts((prev) => {
        const existingSkus = new Set(prev.map((p) => p.sku));
        const mappedProducts: Product[] = storeProducts
          .map((sp: any) => {
            if (typeof sp.id === 'number' && 'sku' in sp) return sp as Product;
            return storeProductToAdminProduct(sp);
          })
          .filter((mp) => !existingSkus.has(mp.sku));

        if (mappedProducts.length > 0) {
          const combined = [...mappedProducts, ...prev];
          setStoredData('products', combined);
          return combined;
        }
        return prev;
      });
    }
  }, [storeProducts]);

  // Toast helper
  const addToast = (type: 'success' | 'error' | 'info', text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleToggleLang = () => {
    const next: Language = lang === 'bn' ? 'en' : 'bn';
    setLang(next);
    localStorage.setItem('alvina_lang', next);
    addToast('info', next === 'bn' ? 'ভাষা: বাংলা' : 'Language: English');
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    setStoredData('orders', updated);
    if (onSyncStoreOrders) onSyncStoreOrders(updated);
    addToast('success', `অর্ডার #${orderId} এর স্ট্যাটাস '${newStatus}' করা হয়েছে`);
  };

  const handleDeleteOrder = (orderId: number) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    setStoredData('orders', updated);
    if (onSyncStoreOrders) onSyncStoreOrders(updated);
    addToast('info', `অর্ডার #${orderId} সফলভাবে মুছে ফেলা হয়েছে`);
  };

  const handleAssignCourier = (orderId: number, courierName: string, trackingCode: string) => {
    const updated = orders.map((o) =>
      o.id === orderId
        ? { ...o, courier: courierName, trackingCode, status: 'In Courier' as OrderStatus }
        : o
    );
    setOrders(updated);
    setStoredData('orders', updated);
    if (onSyncStoreOrders) onSyncStoreOrders(updated);
    addToast('success', `অর্ডার #${orderId} ${courierName} এ পাঠানো হয়েছে (ট্র্যাকিং: ${trackingCode})`);
  };

  const handleSaveManualOrder = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    setStoredData('orders', updated);
    if (onSyncStoreOrders) onSyncStoreOrders(updated);
    addToast('success', `নতুন অর্ডার #${newOrder.id} সফলভাবে তৈরি হয়েছে!`);
  };

  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    setStoredData('products', updated);
    if (onSyncStoreProducts) onSyncStoreProducts(updated);
    addToast('success', `"${newProduct.name}" সফলভাবে ক্যাটালগে যুক্ত হয়েছে!`);
  };

  const handleUpdateProductStock = (productId: number, newStock: number) => {
    const updated = products.map((p) =>
      p.id === productId ? { ...p, stock: newStock } : p
    );
    setProducts(updated);
    setStoredData('products', updated);
    if (onSyncStoreProducts) onSyncStoreProducts(updated);
  };

  const handleDeleteProduct = (productId: number) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    setStoredData('products', updated);
    if (onSyncStoreProducts) onSyncStoreProducts(updated);
    addToast('info', 'প্রোডাক্ট ডিলিট করা হয়েছে');
  };

  const handleUpdateConfig = (newConfig: SystemConfig) => {
    setConfig(newConfig);
    setStoredData('config', newConfig);
    addToast('success', 'কনফিগারেশন সফলভাবে আপডেট হয়েছে!');
  };

  // Login check
  if (!isLoggedIn) {
    return (
      <LoginView
        config={config}
        lang={lang}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          addToast('success', 'স্বাগতম! সফলভাবে লগইন সম্পন্ন হয়েছে');
        }}
        onOpenStorefront={onOpenStorefront}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#100e16] text-[#f7f2fb] flex font-['Hind_Siliguri','Plus_Jakarta_Sans',sans-serif]">
      {/* Toast notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      {/* Sidebar navigation */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        lang={lang}
        onLogout={() => {
          sessionStorage.removeItem('alvina_logged_in');
          setIsLoggedIn(false);
        }}
        onOpenStorefront={onOpenStorefront}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <TopBar
          currentPage={currentPage}
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenStorefront={onOpenStorefront}
          onOpenCourierExport={() => setIsCourierExportOpen(true)}
          onOpenCodeExport={() => setIsCodeExportOpen(true)}
          onNavigate={(page) => setCurrentPage(page)}
          unreadOrdersCount={orders.filter((o) => o.status === 'Pending').length}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && (
            <DashboardView
              orders={orders}
              products={products}
              config={config}
              lang={lang}
              onNavigate={(page) => setCurrentPage(page)}
              onOpenInvoice={(order) => setInvoiceOrder(order)}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {currentPage === 'orders' && (
            <OrdersView
              orders={orders}
              config={config}
              couriers={couriers}
              lang={lang}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onDeleteOrder={handleDeleteOrder}
              onOpenInvoice={(order) => setInvoiceOrder(order)}
              onAssignCourier={handleAssignCourier}
            />
          )}

          {currentPage === 'manualOrder' && (
            <ManualOrderView
              products={products}
              config={config}
              lang={lang}
              onSaveOrder={handleSaveManualOrder}
              onNavigateToOrders={() => setCurrentPage('orders')}
            />
          )}

          {currentPage === 'pos' && (
            <PosBillingView
              products={products}
              lang={lang}
              onSaveOrder={handleSaveManualOrder}
              onOpenInvoice={(order) => setInvoiceOrder(order)}
            />
          )}

          {currentPage === 'products' && (
            <ProductsView
              products={products}
              lang={lang}
              onAddProduct={handleAddProduct}
              onUpdateProductStock={handleUpdateProductStock}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {currentPage === 'couriers' && (
            <CouriersView couriers={couriers} lang={lang} />
          )}

          {currentPage === 'delivery' && (
            <DeliverySettingsView
              config={config}
              lang={lang}
              onUpdateConfig={handleUpdateConfig}
            />
          )}

          {currentPage === 'exchange' && (
            <ExchangeView exchanges={exchanges} lang={lang} />
          )}

          {currentPage === 'returns' && (
            <ReturnsRefundsView returns={returns} lang={lang} />
          )}

          {currentPage === 'preorders' && (
            <PreOrdersView preorders={preorders} lang={lang} />
          )}

          {currentPage === 'variants' && (
            <VariantsBundlesView variants={variants} bundles={bundles} lang={lang} />
          )}

          {currentPage === 'stockAudit' && (
            <StockAuditView audits={stockAudits} lang={lang} />
          )}

          {currentPage === 'imageManager' && (
            <ImageManagerView products={products} lang={lang} />
          )}

          {currentPage === 'codSettlement' && (
            <CodSettlementView settlements={codSettlements} lang={lang} />
          )}

          {currentPage === 'suppliers' && (
            <SuppliersWarehousesView
              suppliers={suppliers}
              warehouses={warehouses}
              lang={lang}
            />
          )}

          {currentPage === 'reports' && (
            <ReportsAccountingView
              orders={orders}
              expenses={expenses}
              lang={lang}
            />
          )}

          {currentPage === 'crm' && (
            <CrmMarketingView
              customers={crmCustomers}
              coupons={promoCodes}
              lang={lang}
            />
          )}

          {currentPage === 'merchants' && (
            <MerchantsView merchants={merchants} lang={lang} />
          )}

          {currentPage === 'websites' && (
            <WebsitesView
              websites={websites}
              lang={lang}
              onOpenStorefront={onOpenStorefront}
            />
          )}

          {currentPage === 'landings' && (
            <LandingsView landings={landings} lang={lang} />
          )}

          {currentPage === 'staff' && (
            <StaffView staff={staff} lang={lang} />
          )}

          {currentPage === 'pixels' && (
            <StorefrontChannelsView
              pixels={pixels}
              wholesale={wholesale}
              lang={lang}
            />
          )}

          {currentPage === 'auditLogs' && (
            <SecuritySystemView
              logs={auditLogs}
              webhooks={webhooks}
              lang={lang}
              onOpenCodeExport={() => setIsCodeExportOpen(true)}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsView
              config={config}
              lang={lang}
              onUpdateConfig={handleUpdateConfig}
              onOpenCodeExport={() => setIsCodeExportOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        order={invoiceOrder}
        config={config}
        onClose={() => setInvoiceOrder(null)}
      />

      {/* Courier Bulk Export Modal */}
      {isCourierExportOpen && (
        <CourierExportModal
          orders={orders}
          onClose={() => setIsCourierExportOpen(false)}
          onCopySuccess={() => addToast('success', 'কুরিয়ার ডাটা কপি সম্পন্ন')}
        />
      )}

      {/* Code / Database Export Modal */}
      {isCodeExportOpen && (
        <CodeExportModal
          onClose={() => setIsCodeExportOpen(false)}
        />
      )}
    </div>
  );
};
