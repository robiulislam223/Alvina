import {
  SystemConfig,
  Merchant,
  Website,
  LandingPage,
  Product,
  Order,
  CourierService,
  ExchangeRecord,
  StaffMember,
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
} from '../types';

export const INITIAL_CONFIG: SystemConfig = {
  user: 'admin',
  password: '123',
  storeName: 'ALVINA Fashion BD',
  storeAddress: 'House 18, Road 4, Sector 11, Uttara, Dhaka-1230',
  whatsapp: '01999-973506',
  deliveryDhaka: 80,
  deliverySuburbs: 100,
  deliveryOutside: 150,
  freeDeliveryMin: 2500,
};

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 1,
    name: 'Alvina Main Flagship Store',
    storeName: 'ALVINA Uttara Showroom',
    phone: '01999-973506',
    email: 'info@alvinabd.com',
    address: 'House 18, Road 4, Sector 11, Uttara, Dhaka',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Alvina Gulshan Outlet',
    storeName: 'ALVINA Police Plaza Concord',
    phone: '01811-223344',
    email: 'gulshan@alvinabd.com',
    address: 'Shop 312, Level 3, Police Plaza, Gulshan-1, Dhaka',
    status: 'Active',
  },
];

export const INITIAL_WEBSITES: Website[] = [
  {
    id: 1,
    name: 'Alvina Main Storefront',
    domain: 'alvinabd.com',
    merchantName: 'Alvina Main Flagship Store',
    theme: 'Luxury Rose Gold & Ebony',
    status: 'Live',
  },
];

export const INITIAL_LANDINGS: LandingPage[] = [
  {
    id: 1,
    name: 'Aghaz Lawn Eid Special Funnel',
    slug: 'aghaz-lawn-2026',
    targetProduct: 'Aghaz Luxury Embroidered Lawn Three-Piece',
    conversionRate: '4.8%',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Zaha Designer Kurti Mega Sale',
    slug: 'zaha-kurti-sale',
    targetProduct: 'Zaha Floral Cut-Work Designer Long Kurti',
    conversionRate: '5.2%',
    status: 'Active',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 301,
    name: 'Aghaz Luxury Embroidered Lawn Three-Piece',
    banglaName: 'আঘাজ লাক্সারি এমব্রয়ডারি লন থ্রি-পিস',
    sku: 'ALV-301',
    category: 'Three Piece',
    subCategory: 'Pakistani Luxury Lawn',
    fabric: '100% Pure Luxury Lawn & Chiffon Dupatta',
    price: 2850,
    regularPrice: 3500,
    stock: 14,
    type: 'Unstitched',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    sizes: ['Unstitched (Free Size)', '38 (Stitched)', '40 (Stitched)', '42 (Stitched)', '44 (Stitched)'],
    status: 'In Stock',
    description: 'আকর্ষণীয় কাশ্মীরি ভারী নেক এমব্রয়ডারি সহ প্রিমিয়াম কোয়ালিটি লন কামিজ। সাথে ডিজিটাল প্রিন্টেড পিওর শিফন ওড়না।',
  },
  {
    id: 101,
    name: 'Zaha Floral Cut-Work Designer Long Kurti',
    banglaName: 'জাহা ফ্লোরাল কাট-ওয়ার্ক ডিজাইনার লং কুর্তি',
    sku: 'ALV-K101',
    category: 'Designer Kurti',
    subCategory: 'Designer Long Kurti',
    fabric: 'High Density Premium Slub Cotton',
    price: 1450,
    regularPrice: 1850,
    stock: 22,
    type: 'Stitched',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    sizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    status: 'In Stock',
    description: 'আধুনিক কলার নেকলাইন এবং কাট-ওয়ার্ক স্লিভ ডিজাইন। দৈনন্দিন অফিস বা ক্যাজুয়াল ব্যবহারের জন্য আরামদায়ক।',
  },
  {
    id: 302,
    name: 'Noor Emerald Festive Chiffon Three-Piece',
    banglaName: 'নূর এমারেল্ড গর্জিয়াস শিফন পার্টি থ্রি-পিস',
    sku: 'ALV-302',
    category: 'Party Wear',
    subCategory: 'Festive Salwar Suit',
    fabric: 'Luxury Pure Georgette & Organza Border',
    price: 3650,
    regularPrice: 4500,
    stock: 8,
    type: 'Stitched',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
    sizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    status: 'In Stock',
    description: 'গাঢ় পান্না সবুজ রঙে জারদৌসি এবং সূক্ষ্ম সিকোয়েন্সের কাজ। বিয়েবাড়ি বা রিসেপশনের জন্য আদর্শ।',
  },
  {
    id: 201,
    name: 'Gul-E-Lala Monochrome Linen Two-Piece Co-ord Set',
    banglaName: 'গুল-এ-লালা মনোক্রম লিনেন টু-পিস কো-অর্ড সেট',
    sku: 'ALV-2P01',
    category: 'Two-Piece',
    subCategory: 'Modern Co-ords',
    fabric: 'Premium Soft Textured Linen',
    price: 1950,
    regularPrice: 2450,
    stock: 16,
    type: 'Stitched',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
    sizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)'],
    status: 'In Stock',
    description: 'ট্রেন্ডি ব্যাগী স্লিভস এবং এসিমেট্রিক কাট সম্বলিত প্রিমিয়াম লিনেন টু-পিস সেট। সাথে ম্যাচিং ওয়াইড লেগ ট্রাউজার।',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 74218,
    date: new Date(Date.now() - 3600000 * 4).toISOString(),
    customer: 'নুসরাত জাহান',
    phone: '01711223344',
    address: 'বাসা ১২, রোড ৫, ব্লক ডি, মিরপুর-১১, ঢাকা',
    area: 'dhaka',
    deliveryMethod: 'ক্যাশ অন ডেলিভারি (হোম ডেলিভারি)',
    paymentMethod: 'COD',
    subtotal: 2850,
    charge: 80,
    discount: 0,
    total: 2930,
    advance: 0,
    due: 2930,
    status: 'Confirmed',
    items: [
      {
        id: '1',
        name: 'Aghaz Luxury Embroidered Lawn Three-Piece',
        qty: 1,
        price: 2850,
        size: '40 (L)',
      },
    ],
    courierService: 'Steadfast Courier',
    shippingNote: 'বিকেলে ডেলিভারি করার অনুরোধ',
    dressSize: '40 (L)',
    source: 'Website Online Order',
  },
  {
    id: 74219,
    date: new Date(Date.now() - 3600000 * 12).toISOString(),
    customer: 'ফারহানা চৌধুরী',
    phone: '01819556677',
    address: 'বাড়ি ৭, লেইন ২, ও আর নিজাম রোড, পাঁচলাইশ, চট্টগ্রাম',
    area: 'outside',
    deliveryMethod: 'হোম ডেলিভারি (কুরিয়ার)',
    paymentMethod: 'COD',
    subtotal: 1450,
    charge: 150,
    discount: 0,
    total: 1600,
    advance: 0,
    due: 1600,
    status: 'In Courier',
    items: [
      {
        id: '2',
        name: 'Zaha Floral Cut-Work Designer Long Kurti',
        qty: 1,
        price: 1450,
        size: '38 (M)',
      },
    ],
    courierService: 'Pathao Courier',
    shippingNote: 'পার্সেল চেক করে টাকা দিবেন',
    dressSize: '38 (M)',
    source: 'Website Online Order',
  },
];

export const INITIAL_COURIERS: CourierService[] = [
  { id: 1, name: 'Steadfast Courier', contact: '09678-045045', status: 'Active' },
  { id: 2, name: 'Pathao Courier', contact: '09610-003030', status: 'Active' },
  { id: 3, name: 'RedX Logistics', contact: '09610-007339', status: 'Active' },
  { id: 4, name: 'Paperfly Delivery', contact: '09666-774433', status: 'Active' },
];

export const INITIAL_EXCHANGES: ExchangeRecord[] = [
  {
    id: 1,
    orderId: 74210,
    date: '2026-10-10',
    customer: 'তানজিলা ইসলাম',
    phone: '01712998811',
    oldSize: '38',
    newSize: '40',
    productName: 'Zaha Floral Cut-Work Designer Long Kurti',
    reason: 'চেস্ট ফিটিং একটু টাইট হচ্ছে',
    status: 'Completed',
  },
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 1,
    name: 'রাবিউল ইসলাম',
    email: 'admin@alvinabd.com',
    role: 'Super Admin',
    phone: '01999-973506',
    status: 'Active',
  },
  {
    id: 2,
    name: 'ফারজানা আক্তার',
    email: 'dispatcher@alvinabd.com',
    role: 'Order Dispatcher',
    phone: '01711-002233',
    status: 'Active',
  },
];

export const INITIAL_POS_TRANSACTIONS: PosTransaction[] = [
  {
    id: 1001,
    date: '2026-10-12 11:30',
    receiptNo: 'POS-ALV-1001',
    customerName: 'ওয়াক-ইন কাস্টমার',
    customerPhone: '01712345678',
    items: [
      { id: '1', name: 'Zaha Floral Cut-Work Designer Long Kurti', qty: 1, price: 1450, size: '38' },
    ],
    subtotal: 1450,
    discount: 50,
    total: 1400,
    paidAmount: 1400,
    paymentType: 'bKash',
    cashierName: 'উত্তরা শোরুম',
  },
];

export const INITIAL_PREORDERS: PreOrder[] = [
  {
    id: 1,
    orderDate: '2026-10-11',
    expectedDate: '2026-10-25',
    customer: 'সাদিয়া আফরোজ',
    phone: '01718889900',
    productName: 'Gul Ahmed Luxury Velvet Winter 3-Piece',
    size: '42',
    advancePaid: 1000,
    totalPrice: 4500,
    status: 'Booked',
  },
];

export const INITIAL_RETURNS: ReturnRefund[] = [
  {
    id: 1,
    orderId: 74195,
    customer: 'রুমানা খান',
    phone: '01912445566',
    reason: 'ভুল কালার ডেলিভারি হয়েছে',
    refundAmount: 2850,
    status: 'Approved',
    date: '2026-10-11',
  },
];

export const INITIAL_VARIANTS: ProductVariant[] = [
  { id: 1, productId: 301, productName: 'Aghaz Lawn 3-Piece', color: 'Pastel Peach', size: '38', stock: 5, price: 2850, sku: 'ALV-301-P38' },
  { id: 2, productId: 301, productName: 'Aghaz Lawn 3-Piece', color: 'Pastel Peach', size: '40', stock: 4, price: 2850, sku: 'ALV-301-P40' },
  { id: 3, productId: 301, productName: 'Aghaz Lawn 3-Piece', color: 'Pastel Peach', size: '42', stock: 3, price: 2850, sku: 'ALV-301-P42' },
];

export const INITIAL_BUNDLES: ProductBundle[] = [
  { id: 1, name: 'Eid Festive Twin Combo (3-Piece + Kurti)', items: ['Aghaz Lawn 3-Piece', 'Zaha Long Kurti'], bundlePrice: 3990, originalPrice: 4300, stock: 10 },
];

export const INITIAL_STOCK_AUDITS: StockAuditRecord[] = [
  { id: 1, date: '2026-10-10', auditorName: 'ফারজানা আক্তার', productId: 301, productName: 'Aghaz Lawn 3-Piece', systemStock: 14, countedStock: 14, difference: 0, note: 'স্টক নিখুঁত ও ব্যালেন্সড' },
];

export const INITIAL_PRICE_HISTORY: PriceChangeRecord[] = [
  { id: 1, date: '2026-10-01', productId: 301, productName: 'Aghaz Lawn 3-Piece', oldPrice: 2950, newPrice: 2850, changedBy: 'Admin', reason: 'Eid Promotional Offer Discount' },
];

export const INITIAL_COD_SETTLEMENTS: CodSettlement[] = [
  { id: 1, courierName: 'Steadfast Courier', consignmentCount: 15, totalCodDue: 42500, totalReceived: 42500, pendingCod: 0, settlementDate: '2026-10-11', referenceId: 'ST-DISB-8912', status: 'Full Settled' },
  { id: 2, courierName: 'Pathao Courier', consignmentCount: 8, totalCodDue: 21800, totalReceived: 15000, pendingCod: 6800, settlementDate: '2026-10-12', referenceId: 'PT-DISB-4401', status: 'Partial' },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  { id: 1, companyName: 'Nishat & Al-Karam Importers', contactPerson: 'মোহাম্মদ তারেক', phone: '01711-332211', materialType: 'Pakistani Unstitched Lawn & Chiffon', address: 'ইসলামপুর মার্কেট, ঢাকা', balanceDue: 45000 },
];

export const INITIAL_PURCHASES: PurchaseOrder[] = [
  { id: 1, invoiceNo: 'PO-2026-101', supplierName: 'Nishat & Al-Karam Importers', date: '2026-10-08', items: 'Lawn 3-Piece 50 sets', totalAmount: 95000, paidAmount: 50000, status: 'Received' },
];

export const INITIAL_WAREHOUSES: Warehouse[] = [
  { id: 1, name: 'উত্তরা সেন্ট্রাল হাব ও গুদাম', location: 'সেক্টর ১১, উত্তরা, ঢাকা', manager: 'রাবিউল ইসলাম', phone: '01999-973506', totalCapacity: '৩,০০০ পিস ড্রেস' },
];

export const INITIAL_EXPENSES: ExpenseRecord[] = [
  { id: 1, date: '2026-10-10', category: 'Meta Ads', description: 'Facebook Eid Campaign Boost', amount: 3500, paidBy: 'Admin Card' },
  { id: 2, date: '2026-10-11', category: 'Packaging', description: 'Premium Alvina Poly & Shopping Bags', amount: 4200, paidBy: 'Cash' },
];

export const INITIAL_RECONCILIATION: ReconciliationRecord[] = [
  { id: 1, date: '2026-10-11', channel: 'bKash Merchant', expectedAmount: 8500, actualDeposit: 8500, discrepancy: 0, status: 'Balanced' },
];

export const INITIAL_CRM_CUSTOMERS: CrmCustomer[] = [
  { id: 1, name: 'নুসরাত জাহান', phone: '01711223344', address: 'মিরপুর-১১, ঢাকা', totalSpent: 8500, ordersCount: 3, deliveredCount: 3, cancelledCount: 0, fraudRiskScore: 'Safe', isBlacklisted: false, tags: ['VIP', 'Repeat Buyer'] },
  { id: 2, name: 'রানা আহমেদ', phone: '01911998877', address: 'যাত্রাবাড়ী, ঢাকা', totalSpent: 0, ordersCount: 2, deliveredCount: 0, cancelledCount: 2, fraudRiskScore: 'High Risk', isBlacklisted: true, tags: ['Fake Buyer', 'Fake Order'] },
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  { id: 1, code: 'ALVINA10', discountType: 'percentage', discountValue: 10, minOrderValue: 1500, maxUsageLimit: 500, usedCount: 42, expiryDate: '2026-12-31', status: 'Active' },
  { id: 2, code: 'EID2026', discountType: 'fixed', discountValue: 200, minOrderValue: 2500, maxUsageLimit: 200, usedCount: 18, expiryDate: '2026-11-30', status: 'Active' },
];

export const INITIAL_FLASH_SALES: FlashSale[] = [
  { id: 1, title: 'স্প্রিং ও প্রি-ঈদ ফ্ল্যাশ মেগা সেল', discount: 25, startTime: '2026-10-12', endTime: '2026-10-15', isActive: true },
];

export const INITIAL_GIFT_CARDS: GiftCard[] = [
  { id: 1, code: 'GIFT-ALV-500', balance: 500, customerName: 'ফারজানা হক', expiryDate: '2026-12-31', status: 'Active' },
];

export const INITIAL_LOYALTY: LoyaltyAccount[] = [
  { id: 1, customerName: 'নুসরাত জাহান', phone: '01711223344', points: 350, tier: 'Gold' },
];

export const INITIAL_AFFILIATES: AffiliatePartner[] = [
  { id: 1, name: 'ঢাকা ফ্যাশন ব্লগার তানহা', phone: '01719223344', referralCode: 'TANHA10', commissionRate: 5, totalSales: 48000, earningsDue: 2400 },
];

export const INITIAL_CAMPAIGNS: MarketingCampaign[] = [
  { id: 1, name: 'Eid Three-Piece Teaser Broadcast', channel: 'WhatsApp', sentCount: 450, date: '2026-10-11', message: 'আসসালামু আলাইকুম! আলভিনার নতুন পাকিস্তানি লন কালেকশন চলে এসেছে...' },
];

export const INITIAL_TICKETS: SupportTicket[] = [
  { id: 1, ticketNo: 'TICK-101', customer: 'নুসরাত জাহান', phone: '01711223344', issue: 'ওড়নার ফেব্রিক জানতে চেয়েছেন', priority: 'Low', status: 'Resolved' },
];

export const INITIAL_WHOLESALE: WholesaleBuyer[] = [
  { id: 1, businessName: 'রুপালী বুটিক হাউস (বগুড়া)', ownerName: 'আব্দুল কাদের', phone: '01711-889900', city: 'বগুড়া', creditLimit: 100000, status: 'Approved' },
];

export const INITIAL_PIXELS: TrackingPixel[] = [
  { id: 1, platform: 'Meta Pixel', pixelId: '9841284918231', isActive: true },
];

export const INITIAL_APPROVALS: ApprovalRequest[] = [
  { id: 1, type: 'Discount Exception', requestedBy: 'Staff Farzana', amount: 300, reason: 'রেগুলার কাস্টমার ডিসকাউন্ট রিকোয়েস্ট', status: 'Approved', actionedBy: 'Admin' },
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 1, timestamp: '2026-10-12 10:14', action: 'Order Status Changed', actor: 'Admin', target: 'Order #74218', details: 'Status updated from Pending to Confirmed' },
];

export const INITIAL_WEBHOOKS: ApiWebhook[] = [
  { id: 1, name: 'Steadfast Order Status Push', url: 'https://alvinabd.com/api/webhooks/steadfast', event: 'delivery_status_update', status: 'Active' },
];

export const INITIAL_DOCUMENTS: DocumentFile[] = [
  { id: 1, title: 'Trade License (Dhaka North City Corp)', type: 'Trade License', size: '2.4 MB', uploadDate: '2026-01-15' },
  { id: 2, title: 'Steadfast Merchant COD Agreement 2026', type: 'Courier Contract', size: '1.8 MB', uploadDate: '2026-02-01' },
];
