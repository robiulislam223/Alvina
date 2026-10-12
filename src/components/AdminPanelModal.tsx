import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Search, 
  Printer, 
  Filter, 
  AlertCircle,
  Eye,
  Trash2,
  PlusCircle,
  Edit,
  Tag,
  DollarSign,
  Settings,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { Order, Product, ProductCategory } from '../types';
import { STORE_INFO } from '../data/products';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  products,
  onAddProduct,
  onDeleteProduct,
  onUpdateStock
}) => {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'add-product' | 'analytics' | 'settings'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdBanglaName, setNewProdBanglaName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('three-piece');
  const [newProdSubCategory, setNewProdSubCategory] = useState('Pakistani Luxury Lawn');
  const [newProdFabric, setNewProdFabric] = useState('100% Pure Lawn Cotton');
  const [newProdType, setNewProdType] = useState<'Stitched' | 'Unstitched' | 'Semi-Stitched'>('Unstitched');
  const [newProdPrice, setNewProdPrice] = useState(2500);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState(3000);
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdImageUrl, setNewProdImageUrl] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80');
  const [newProdDescription, setNewProdDescription] = useState('প্রিমিয়াম কোয়ালিটি থ্রি-পিস, ১০০% আরামদায়ক সুতি কাপড় ও আকর্ষণীয় ওড়না।');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === 'alvina' || pin === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const discountPercentage = Math.round(((newProdOriginalPrice - newProdPrice) / newProdOriginalPrice) * 100);
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      code: `ALV-${Math.floor(100 + Math.random() * 900)}`,
      name: newProdName.trim(),
      banglaName: newProdBanglaName.trim() || newProdName.trim(),
      category: newProdCategory === 'all' ? 'three-piece' : newProdCategory,
      subCategory: newProdSubCategory,
      fabric: newProdFabric,
      type: newProdType,
      price: Number(newProdPrice),
      originalPrice: Number(newProdOriginalPrice),
      discountPercentage: discountPercentage > 0 ? discountPercentage : 0,
      rating: 5.0,
      reviewsCount: 1,
      isNewArrival: true,
      stock: Number(newProdStock),
      images: [newProdImageUrl],
      description: newProdDescription,
      details: {
        kameezOrKurti: `${newProdFabric} Fabric with detailed neckline work`,
        dupatta: 'Matching Pure Chiffon / Lawn Dupatta',
        trouserOrSalwar: 'Dyed Soft Cotton Trouser',
        work: 'Embroidery & Digital Print Art',
        careInstructions: 'Gentle wash in cold water'
      },
      availableSizes: newProdType === 'Stitched' ? ['38 (M)', '40 (L)', '42 (XL)'] : ['Unstitched (Free Size)']
    };

    onAddProduct(newProduct);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActiveTab('inventory');
    }, 1200);

    // Reset inputs
    setNewProdName('');
    setNewProdBanglaName('');
  };

  const filteredOrders = orders.filter((ord) => {
    if (statusFilter !== 'all' && ord.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.phone.includes(q) ||
        ord.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Order Placed' || o.status === 'Confirmed').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-6xl w-full shadow-2xl overflow-hidden border border-stone-200 my-4 flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-[#1a120c] text-white p-4 sm:p-5 flex items-center justify-between border-b border-amber-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider text-amber-100">
                  ALVINA সুপার অ্যাডমিন কন্ট্রোল প্যানেল
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  লাইভ সিস্টেম
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                অর্ডার ট্র্যাকিং, প্রোডাক্ট আপলোড, স্টক নিয়ন্ত্রণ ও সেলস অ্যানালিটিক্স
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          // Admin PIN Lock Screen
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mb-4 ring-8 ring-amber-50/50">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-serif-luxury">
              অ্যাডমিন পিন দিয়ে প্রবেশ করুন
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-6">
              সুরক্ষিত অ্যাডমিন প্যানেলে প্রবেশ করতে পিন কোড দিন (ডিফল্ট পিন: <code className="bg-stone-100 px-1.5 py-0.5 rounded font-bold text-amber-900">1234</code>)
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="পিন লিখুন (যেমন: 1234)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-bold py-3 px-4 bg-stone-50 border border-stone-300 rounded-2xl focus:outline-none focus:border-amber-800"
                />
                {pinError && (
                  <p className="text-xs text-red-600 font-bold mt-1.5 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>ভুল পিন! '1234' দিয়ে চেষ্টা করুন।</span>
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#2c1d11] hover:bg-amber-900 text-amber-200 font-bold text-sm rounded-2xl transition-all cursor-pointer shadow-md"
              >
                ড্যাশবোর্ডে প্রবেশ করুন
              </button>
            </form>
          </div>
        ) : (
          // Authenticated Admin Dashboard
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* KPI Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 text-[11px] font-semibold">
                  <span>মোট অর্ডার</span>
                  <ShoppingBag className="w-4 h-4 text-amber-700" />
                </div>
                <span className="text-2xl font-extrabold text-stone-900 mt-1 block">{orders.length} টি</span>
              </div>
              
              <div className="bg-amber-50/70 border border-amber-900/10 rounded-2xl p-4 shadow-2xs">
                <div className="flex items-center justify-between text-amber-800 text-[11px] font-semibold">
                  <span>মোট বিক্রির টাকা</span>
                  <DollarSign className="w-4 h-4 text-amber-700" />
                </div>
                <span className="text-2xl font-extrabold text-[#2c1d11] mt-1 block">৳ {totalRevenue.toLocaleString()}</span>
              </div>

              <div className="bg-blue-50/70 border border-blue-900/10 rounded-2xl p-4 shadow-2xs">
                <div className="flex items-center justify-between text-blue-800 text-[11px] font-semibold">
                  <span>পেন্ডিং ডেলিভারি</span>
                  <Clock className="w-4 h-4 text-blue-700" />
                </div>
                <span className="text-2xl font-extrabold text-blue-950 mt-1 block">{pendingOrdersCount} টি</span>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-900/10 rounded-2xl p-4 shadow-2xs">
                <div className="flex items-center justify-between text-emerald-800 text-[11px] font-semibold">
                  <span>ডেলিভারি সম্পন্ন</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="text-2xl font-extrabold text-emerald-950 mt-1 block">{deliveredCount} টি</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'orders' ? 'bg-[#2c1d11] text-amber-100 shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  কাস্টমারদের অর্ডার ({orders.length})
                </button>

                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'inventory' ? 'bg-[#2c1d11] text-amber-100 shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  প্রোডাক্ট ও স্টক ({products.length})
                </button>

                <button
                  onClick={() => setActiveTab('add-product')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                    activeTab === 'add-product' ? 'bg-amber-800 text-white shadow-sm' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>নতুন ড্রেস যোগ করুন</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                    activeTab === 'analytics' ? 'bg-[#2c1d11] text-amber-100 shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>সেলস রিপোর্ট</span>
                </button>
              </div>

              {/* Order Search & Filter */}
              {activeTab === 'orders' && (
                <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="নাম, ফোন বা অর্ডার আইডি..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-amber-800"
                    />
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-2.5 py-1.5 text-stone-700 focus:outline-none"
                  >
                    <option value="all">সব স্ট্যাটাস</option>
                    <option value="Order Placed">নতুন অর্ডার (Placed)</option>
                    <option value="Confirmed">কনফার্মড (Confirmed)</option>
                    <option value="Packaging">প্যাকেজিং (Packaging)</option>
                    <option value="Shipped">কুরিয়ারে (Shipped)</option>
                    <option value="Delivered">ডেলিভারড (Delivered)</option>
                  </select>
                </div>
              )}
            </div>

            {/* View 1: Orders */}
            {activeTab === 'orders' && (
              filteredOrders.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-stone-50/80 hover:bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 transition-all shadow-2xs space-y-4"
                    >
                      {/* Top Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-amber-950 text-sm bg-amber-100/70 px-2.5 py-1 rounded-lg">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs text-stone-500 font-medium">{ord.createdAt}</span>
                          <span className="text-xs font-extrabold px-2 py-0.5 rounded uppercase tracking-wider bg-emerald-100 text-emerald-800">
                            {ord.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : ord.paymentMethod}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-xs text-stone-500 block">মোট প্রদেয়:</span>
                            <span className="text-base font-extrabold text-[#2c1d11]">৳ {ord.total.toLocaleString()}</span>
                          </div>

                          {/* Status Change Selector */}
                          <select
                            value={ord.status}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                            className={`text-xs font-bold rounded-xl px-3 py-1.5 border transition-colors cursor-pointer ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : ord.status === 'Shipped'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : ord.status === 'Confirmed'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : 'bg-stone-200 text-stone-800 border-stone-300'
                            }`}
                          >
                            <option value="Order Placed">অর্ডার প্লেসড</option>
                            <option value="Confirmed">কনফার্মড</option>
                            <option value="Packaging">প্যাকেজিং</option>
                            <option value="Shipped">কুরিয়ারে প্রেরিত</option>
                            <option value="Delivered">ডেলিভারড</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer Info & Items */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 text-xs text-stone-700 bg-white p-3.5 rounded-xl border border-stone-200">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-stone-900 text-sm">{ord.customerName}</span>
                            <span className="text-[11px] text-stone-500">{ord.district}</span>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <Phone className="w-3.5 h-3.5 text-stone-400" />
                            <span className="font-mono font-bold text-stone-900">{ord.phone}</span>
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
                            <span>{ord.address}</span>
                          </div>

                          {ord.notes && (
                            <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg mt-1">
                              <strong>নোট:</strong> {ord.notes}
                            </div>
                          )}

                          <div className="pt-2 flex items-center gap-2">
                            <a
                              href={`tel:${ord.phone}`}
                              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                            >
                              <Phone className="w-3 h-3 text-stone-700" />
                              <span>কল দিন</span>
                            </a>
                            <a
                              href={`https://wa.me/880${ord.phone.replace(/^0/, '')}?text=আসসালামু%20আলাইকুম%20${ord.customerName},%20আলভিনা%20থেকে%20আপনার%20অর্ডার%20${ord.orderNumber}%20সম্পর্কে...`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>

                        {/* Items list */}
                        <div className="space-y-2 bg-white p-3.5 rounded-xl border border-stone-200">
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                            অর্ডারকৃত পণ্যসমূহ:
                          </span>
                          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                            {ord.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 text-xs">
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-10 h-12 object-cover rounded-md border border-stone-200 flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-stone-900 truncate">{item.product.name}</p>
                                  <p className="text-[11px] text-amber-800">
                                    সাইজ: <strong>{item.selectedSize}</strong> • পরিমাণ: {item.quantity}টি
                                  </p>
                                </div>
                                <span className="font-extrabold text-stone-900">
                                  ৳ {(item.product.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom actions */}
                      <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200">
                        <button
                          onClick={() => setSelectedInvoice(ord)}
                          className="flex items-center gap-1 text-stone-700 hover:text-amber-900 font-bold cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-700" />
                          <span>ইনভয়েস স্লিপ দেখুন</span>
                        </button>

                        <button
                          onClick={() => onDeleteOrder(ord.id)}
                          className="flex items-center gap-1 text-stone-400 hover:text-red-600 font-medium transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>মুছে ফেলুন</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center space-y-3 bg-stone-50 rounded-2xl border border-stone-200">
                  <Package className="w-12 h-12 text-stone-300 mx-auto" />
                  <h4 className="text-base font-bold text-stone-700">কোনো অর্ডার পাওয়া যায়নি</h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    ওয়েবসাইটে কাস্টমাররা যখন অর্ডার কনফার্ম করবেন, সব অর্ডারের তালিকা সরাসরি এখানে স্বয়ংক্রিয়ভাবে জমা হবে।
                  </p>
                </div>
              )
            )}

            {/* View 2: Inventory & Stock Control */}
            {activeTab === 'inventory' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-900">
                    বর্তমান লাইভ প্রোডাক্টের তালিকা ({products.length} টি)
                  </h4>
                  <button
                    onClick={() => setActiveTab('add-product')}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-amber-900 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>নতুন ড্রেস যোগ করুন</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between shadow-2xs space-y-3">
                      <div className="flex items-start gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-16 h-20 object-cover rounded-xl border border-stone-200 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                            {p.subCategory}
                          </span>
                          <h4 className="text-xs font-bold text-stone-900 truncate mt-1">{p.name}</h4>
                          <p className="text-[11px] text-stone-500 font-bangla">{p.banglaName}</p>
                          <p className="text-xs font-extrabold text-stone-900 mt-1">৳ {p.price.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Stock controls */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-600">স্টক পরিমাণ:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateStock(p.id, Math.max(0, p.stock - 1))}
                            className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-bold text-stone-900 min-w-[20px] text-center">{p.stock}</span>
                          <button
                            onClick={() => onUpdateStock(p.id, p.stock + 1)}
                            className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                          title="প্রোডাক্ট মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 3: Add New Product Form */}
            {activeTab === 'add-product' && (
              <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 sm:p-7 max-w-2xl mx-auto space-y-5">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-lg font-bold text-stone-900 font-serif-luxury">
                    নতুন থ্রি-পিস বা কুর্তি আপলোড করুন
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    এই ফর্মটি পূরণ করলেই ড্রেসটি সরাসরি মূল ওয়েবসাইটে কাস্টমারদের জন্য লাইভ হয়ে যাবে।
                  </p>
                </div>

                {formSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>অভিনন্দন! নতুন ড্রেসটি সফলভাবে ওয়েবসাইটে যুক্ত হয়েছে!</span>
                  </div>
                )}

                <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">ড্রেসের নাম (English) *</label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: Zaha Floral Embroidered Lawn 3-Piece"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-800 mb-1">বাংলা নাম (ঐচ্ছিক)</label>
                      <input
                        type="text"
                        placeholder="যেমন: জাহা ফ্লোরাল লন থ্রি-পিস"
                        value={newProdBanglaName}
                        onChange={(e) => setNewProdBanglaName(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800 font-bangla"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">ক্যাটাগরি *</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as any)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800"
                      >
                        <option value="three-piece">Three Piece (থ্রি-পিস)</option>
                        <option value="kurti">Designer Kurti (কুর্তি)</option>
                        <option value="two-piece">Two Piece (টু-পিস কো-অর্ড)</option>
                        <option value="party-wear">Party Wear (পার্টি ওয়্যার)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-800 mb-1">টাইপ (Type) *</label>
                      <select
                        value={newProdType}
                        onChange={(e) => setNewProdType(e.target.value as any)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800"
                      >
                        <option value="Unstitched">Unstitched (আনস্টিচড)</option>
                        <option value="Stitched">Stitched (সেলাই করা)</option>
                        <option value="Semi-Stitched">Semi-Stitched</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-800 mb-1">স্টক সংখ্যা *</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">বিক্রয় মূল্য (টাকা ৳) *</label>
                      <input
                        type="number"
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 font-bold focus:outline-none focus:border-amber-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-800 mb-1">রেগুলার মূল্য (কাটা দাম ৳)</label>
                      <input
                        type="number"
                        required
                        value={newProdOriginalPrice}
                        onChange={(e) => setNewProdOriginalPrice(Number(e.target.value))}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">সাব-ক্যাটাগরি</label>
                      <input
                        type="text"
                        placeholder="যেমন: Pakistani Luxury Lawn"
                        value={newProdSubCategory}
                        onChange={(e) => setNewProdSubCategory(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-800 mb-1">ফেব্রিক উপাদান (Fabric)</label>
                      <input
                        type="text"
                        placeholder="যেমন: 100% Pure Lawn Cotton"
                        value={newProdFabric}
                        onChange={(e) => setNewProdFabric(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-800 mb-1">ছবির লিঙ্ক (Image URL) *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={newProdImageUrl}
                      onChange={(e) => setNewProdImageUrl(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-800 mb-1">বিবরণ (Description)</label>
                    <textarea
                      rows={2}
                      value={newProdDescription}
                      onChange={(e) => setNewProdDescription(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2c1d11] hover:bg-amber-900 text-amber-200 hover:text-white font-bold rounded-2xl transition-all cursor-pointer shadow-md text-sm flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4 text-amber-400" />
                    <span>ওয়েবসাইটে প্রোডাক্টটি লাইভ করুন</span>
                  </button>
                </form>
              </div>
            )}

            {/* View 4: Sales Analytics */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                    <span className="text-xs text-stone-500 font-semibold block">গড় অর্ডার মূল্য (AOV)</span>
                    <span className="text-2xl font-extrabold text-[#2c1d11] mt-1 block">৳ {avgOrderValue.toLocaleString()}</span>
                    <p className="text-[11px] text-emerald-700 font-medium mt-2 flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>প্রতি অর্ডারে গড় আয়</span>
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                    <span className="text-xs text-stone-500 font-semibold block">ডেলিভারি সাকসেস রেট</span>
                    <span className="text-2xl font-extrabold text-emerald-800 mt-1 block">
                      {orders.length > 0 ? `${Math.round((deliveredCount / orders.length) * 100)}%` : '১০০%'}
                    </span>
                    <p className="text-[11px] text-stone-500 mt-2">সফল ডেলিভারির অনুপাত</p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                    <span className="text-xs text-stone-500 font-semibold block">সর্বোচ্চ বিক্রিত আইটেম</span>
                    <span className="text-base font-bold text-stone-900 mt-1 block truncate">
                      {products[0]?.name || 'থ্রি-পিস কালেকশন'}
                    </span>
                    <p className="text-[11px] text-amber-800 font-medium mt-2">বেস্ট সেলিং লন স্যুট</p>
                  </div>
                </div>

                {/* Sales breakdown summary */}
                <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    ক্যাটাগরি ভিত্তিক চাহিদা বিশ্লেষণ:
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>থ্রি-পিস (Three Piece)</span>
                        <span className="text-amber-900">৬০% সেলস</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-700 rounded-full" style={{ width: '60%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>ডিজাইনার কুর্তি (Kurtis)</span>
                        <span className="text-amber-900">২৫% সেলস</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-600 rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>টু-পিস ও পার্টি ওয়্যার (Co-ords & Party)</span>
                        <span className="text-amber-900">১৫% সেলস</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Invoice Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="font-serif-luxury font-bold text-xl text-stone-900">ALVINA ডেলিভারি চালান</span>
                <button onClick={() => setSelectedInvoice(null)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs space-y-1.5 text-stone-700">
                <p><strong>ইনভয়েস নং:</strong> {selectedInvoice.orderNumber}</p>
                <p><strong>তারিখ:</strong> {selectedInvoice.createdAt}</p>
                <p><strong>গ্রাহকের নাম:</strong> {selectedInvoice.customerName}</p>
                <p><strong>মোবাইল:</strong> {selectedInvoice.phone}</p>
                <p><strong>ঠিকানা:</strong> {selectedInvoice.address}</p>
              </div>

              <div className="border-t border-b border-stone-200 py-3 space-y-2 text-xs">
                {selectedInvoice.items.map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{it.product.name} ({it.selectedSize}) x {it.quantity}</span>
                    <span className="font-bold">৳ {it.product.price * it.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between text-stone-500 pt-1">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>৳ {selectedInvoice.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-100">
                  <span>সর্বমোট বিল:</span>
                  <span>৳ {selectedInvoice.total}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-[#2c1d11] text-amber-100 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট করুন</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2.5 bg-stone-100 text-stone-700 rounded-xl font-bold text-xs"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
