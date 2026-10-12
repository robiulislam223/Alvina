export type PageId =
  | 'dashboard'
  | 'orders'
  | 'manualOrder'
  | 'pos'
  | 'preorders'
  | 'returns'
  | 'exchange'
  | 'products'
  | 'variants'
  | 'bundles'
  | 'stockAudit'
  | 'priceHistory'
  | 'imageManager'
  | 'couriers'
  | 'codSettlement'
  | 'suppliers'
  | 'warehouses'
  | 'delivery'
  | 'reports'
  | 'accounting'
  | 'expenses'
  | 'reconciliation'
  | 'crm'
  | 'coupons'
  | 'flashSales'
  | 'giftCards'
  | 'loyalty'
  | 'affiliates'
  | 'marketing'
  | 'tickets'
  | 'merchants'
  | 'websites'
  | 'landings'
  | 'wholesale'
  | 'pixels'
  | 'theme'
  | 'staff'
  | 'approvals'
  | 'auditLogs'
  | 'apiWebhooks'
  | 'healthMonitor'
  | 'documents'
  | 'privacy'
  | 'settings';

export type Language = 'bn' | 'en';

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Packaging'
  | 'In Courier'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  size?: string;
  color?: string;
  image?: string;
}

export interface Order {
  id: number;
  date: string;
  customer: string;
  phone: string;
  address: string;
  area: 'dhaka' | 'outside' | 'suburbs';
  deliveryMethod: string;
  paymentMethod: 'COD' | 'bKash' | 'Nagad' | 'Bank';
  subtotal: number;
  charge: number;
  discount: number;
  total: number;
  advance: number;
  due: number;
  status: OrderStatus;
  items: OrderItem[];
  courierService?: string;
  shippingNote?: string;
  dressSize?: string;
  source: string;
}

export interface Product {
  id: number;
  name: string;
  banglaName?: string;
  sku: string;
  category: string;
  subCategory?: string;
  fabric?: string;
  price: number;
  regularPrice: number;
  stock: number;
  type: 'Stitched' | 'Unstitched' | 'Semi-Stitched';
  image: string;
  images?: string[];
  sizes: string[];
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  description?: string;
}

export interface ProductVariant {
  id: number;
  productId: number;
  productName: string;
  color: string;
  size: string;
  stock: number;
  price: number;
  sku: string;
}

export interface ProductBundle {
  id: number;
  name: string;
  items: string[];
  bundlePrice: number;
  originalPrice: number;
  stock: number;
}

export interface StockAuditRecord {
  id: number;
  date: string;
  auditorName: string;
  productId: number;
  productName: string;
  systemStock: number;
  countedStock: number;
  difference: number;
  note: string;
}

export interface PriceChangeRecord {
  id: number;
  date: string;
  productId: number;
  productName: string;
  oldPrice: number;
  newPrice: number;
  changedBy: string;
  reason: string;
}

export interface PosTransaction {
  id: number;
  date: string;
  receiptNo: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  paidAmount: number;
  paymentType: 'Cash' | 'Card' | 'bKash' | 'Nagad';
  cashierName: string;
}

export interface PreOrder {
  id: number;
  orderDate: string;
  expectedDate: string;
  customer: string;
  phone: string;
  productName: string;
  size: string;
  advancePaid: number;
  totalPrice: number;
  status: 'Booked' | 'Arrived' | 'Dispatched';
}

export interface ReturnRefund {
  id: number;
  orderId: number;
  customer: string;
  phone: string;
  reason: string;
  refundAmount: number;
  status: 'Pending' | 'Approved' | 'Refunded' | 'Rejected';
  date: string;
}

export interface ExchangeRecord {
  id: number;
  orderId: number;
  date: string;
  customer: string;
  phone: string;
  oldSize: string;
  newSize: string;
  productName: string;
  reason: string;
  status: 'Pending' | 'Processing' | 'Completed';
}

export interface CourierService {
  id: number;
  name: string;
  contact: string;
  status: 'Active' | 'Inactive';
}

export interface CodSettlement {
  id: number;
  courierName: string;
  consignmentCount: number;
  totalCodDue: number;
  totalReceived: number;
  pendingCod: number;
  settlementDate: string;
  referenceId: string;
  status: 'Full Settled' | 'Partial' | 'Pending';
}

export interface Supplier {
  id: number;
  companyName: string;
  contactPerson: string;
  phone: string;
  materialType: string;
  address: string;
  balanceDue: number;
}

export interface PurchaseOrder {
  id: number;
  invoiceNo: string;
  supplierName: string;
  date: string;
  items: string;
  totalAmount: number;
  paidAmount: number;
  status: 'Received' | 'Pending';
}

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  manager: string;
  phone: string;
  totalCapacity: string;
}

export interface ExpenseRecord {
  id: number;
  date: string;
  category: 'Meta Ads' | 'Packaging' | 'Rent' | 'Staff Salary' | 'Delivery' | 'Utilities';
  description: string;
  amount: number;
  paidBy: string;
}

export interface ReconciliationRecord {
  id: number;
  date: string;
  channel: 'bKash Merchant' | 'Nagad' | 'Steadfast COD' | 'Pathao COD' | 'Bank';
  expectedAmount: number;
  actualDeposit: number;
  discrepancy: number;
  status: 'Balanced' | 'Discrepancy';
}

export interface CrmCustomer {
  id: number;
  name: string;
  phone: string;
  address: string;
  totalSpent: number;
  ordersCount: number;
  deliveredCount: number;
  cancelledCount: number;
  fraudRiskScore: 'Safe' | 'Moderate' | 'High Risk';
  isBlacklisted: boolean;
  tags: string[];
  notes?: string;
}

export interface PromoCode {
  id: number;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxUsageLimit: number;
  usedCount: number;
  expiryDate: string;
  status: 'Active' | 'Expired';
}

export interface FlashSale {
  id: number;
  title: string;
  discount: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface GiftCard {
  id: number;
  code: string;
  balance: number;
  customerName: string;
  expiryDate: string;
  status: 'Active' | 'Redeemed';
}

export interface LoyaltyAccount {
  id: number;
  customerName: string;
  phone: string;
  points: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
}

export interface AffiliatePartner {
  id: number;
  name: string;
  phone: string;
  referralCode: string;
  commissionRate: number;
  totalSales: number;
  earningsDue: number;
}

export interface MarketingCampaign {
  id: number;
  name: string;
  channel: 'SMS' | 'WhatsApp' | 'Email';
  sentCount: number;
  date: string;
  message: string;
}

export interface SupportTicket {
  id: number;
  ticketNo: string;
  customer: string;
  phone: string;
  issue: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
}

export interface Merchant {
  id: number;
  name: string;
  storeName: string;
  phone: string;
  email: string;
  address: string;
  status: 'Active' | 'Pending';
}

export interface Website {
  id: number;
  name: string;
  domain: string;
  merchantName: string;
  theme: string;
  status: 'Live' | 'Maintenance';
}

export interface LandingPage {
  id: number;
  name: string;
  slug: string;
  targetProduct: string;
  conversionRate: string;
  status: 'Active' | 'Draft';
}

export interface WholesaleBuyer {
  id: number;
  businessName: string;
  ownerName: string;
  phone: string;
  city: string;
  creditLimit: number;
  status: 'Approved' | 'Pending';
}

export interface TrackingPixel {
  id: number;
  platform: 'Meta Pixel' | 'TikTok Pixel' | 'Google Analytics 4';
  pixelId: string;
  isActive: boolean;
}

export interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Store Manager' | 'Order Dispatcher' | 'Accountant';
  phone: string;
  status: 'Active' | 'Suspended';
}

export interface ApprovalRequest {
  id: number;
  type: 'Discount Exception' | 'Refund Approval' | 'Big Expense' | 'Stock Write-Off';
  requestedBy: string;
  amount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  actionedBy?: string;
}

export interface AuditLogEntry {
  id: number;
  timestamp: string;
  action: string;
  actor: string;
  target: string;
  details: string;
}

export interface ApiWebhook {
  id: number;
  name: string;
  url: string;
  event: string;
  status: 'Active' | 'Paused';
}

export interface DocumentFile {
  id: number;
  title: string;
  type: 'Trade License' | 'Courier Contract' | 'Tax Certificate' | 'Invoice Template';
  size: string;
  uploadDate: string;
}

export interface SystemConfig {
  user: string;
  password: string;
  storeName: string;
  storeAddress: string;
  whatsapp: string;
  deliveryDhaka: number;
  deliverySuburbs: number;
  deliveryOutside: number;
  freeDeliveryMin: number;
}

export interface CourierFraudReport {
  phone: string;
  totalParcels: number;
  delivered: number;
  cancelled: number;
  deliveryRate: number;
  riskLevel: 'Safe' | 'Moderate' | 'High';
  recommendation: string;
  notes: string[];
  courierBreakdown: {
    steadfast: { delivered: number; cancelled: number };
    pathao: { delivered: number; cancelled: number };
    redx: { delivered: number; cancelled: number };
  };
}
