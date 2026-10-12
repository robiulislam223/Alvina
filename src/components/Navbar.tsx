import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  PhoneCall, 
  MapPin, 
  Tag, 
  Sparkles, 
  Ruler, 
  Truck,
  Lock
} from 'lucide-react';
import { STORE_INFO, PRODUCTS_DATA } from '../data/products';
import { Product, ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrderTracking: () => void;
  onOpenSizeGuide: () => void;
  onOpenAdmin: () => void;
  onSelectProduct: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  activeCategory,
  onSelectCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenOrderTracking,
  onOpenSizeGuide,
  onOpenAdmin,
  onSelectProduct,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim() === ''
    ? []
    : PRODUCTS_DATA.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.banglaName && p.banglaName.includes(searchQuery))
      ).slice(0, 5);

  const handleNavClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    // Smooth scroll to products section
    const elem = document.getElementById('products-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-800 hover:text-amber-800 hover:bg-amber-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo: ALVINA */}
          <div className="flex-shrink-0 flex flex-col items-center sm:items-start cursor-pointer" onClick={() => handleNavClick('all')}>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-[0.2em] text-[#2c1d11] uppercase hover:text-amber-800 transition-colors">
                ALVINA
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600 mb-1"></span>
            </div>
            <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-medium">
              Boutique & Lifestyle
            </span>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative" ref={searchRef}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="থ্রি-পিস, লন, কুর্তি খুঁজুন..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700 transition-all placeholder:text-stone-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>

            {/* Instant Search Dropdown */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-stone-150 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                  <span>ফলাফল ({searchResults.length})</span>
                  <span>অনুসন্ধান: "{searchQuery}"</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                    {searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onSelectProduct(prod);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="p-3 flex items-center gap-3 hover:bg-amber-50/60 cursor-pointer transition-colors"
                      >
                        <img
                          src={
                            (Array.isArray(prod?.images) && prod.images[0]) ||
                            (prod as any)?.image ||
                            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
                          }
                          alt={prod.name || 'Product'}
                          className="w-12 h-14 object-cover rounded-md border border-stone-200 flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-stone-800 truncate">{prod.name}</p>
                          <p className="text-[11px] text-amber-800 font-medium">{prod.subCategory} • {prod.type}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-stone-900">৳ {prod.price.toLocaleString()}</span>
                            <span className="text-[10px] text-stone-400 line-through">৳ {prod.originalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-stone-500">
                    কোনো থ্রি-পিস বা কুর্তি পাওয়া যায়নি। অন্য নাম দিয়ে চেষ্টা করুন।
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Order Tracking button */}
            <button
              onClick={onOpenOrderTracking}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-amber-900 hover:bg-stone-100 rounded-full border border-stone-200 transition-colors"
              title="অর্ডার ট্র্যাক করুন"
            >
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              <span>ট্র্যাক অর্ডার</span>
            </button>

            {/* Size Guide button */}
            <button
              onClick={onOpenSizeGuide}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-amber-900 hover:bg-stone-100 rounded-full border border-stone-200 transition-colors"
              title="সাইজ গাইড দেখুন"
            >
              <Ruler className="w-3.5 h-3.5 text-amber-700" />
              <span>সাইজ চার্ট</span>
            </button>

            {/* Admin Panel button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-amber-900 hover:bg-stone-100 rounded-full border border-stone-200 transition-colors"
              title="অ্যাডমিন প্যানেল (অর্ডার দেখুন)"
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">অ্যাডমিন</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-stone-700 hover:text-red-600 hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 bg-[#2c1d11] hover:bg-[#432d1b] text-white px-3.5 sm:px-4 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-stone-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-[10px] text-amber-200/80 leading-none">কার্ট</span>
                <span className="block text-xs font-bold text-white leading-tight">৳ {cartTotal.toLocaleString()}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation Menu */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-stone-100 text-sm font-semibold tracking-wide text-stone-700">
          <button
            onClick={() => handleNavClick('all')}
            className={`pb-1 transition-all ${
              activeCategory === 'all'
                ? 'text-amber-800 border-b-2 border-amber-800 font-bold'
                : 'hover:text-amber-800'
            }`}
          >
            সব কালেকশন
          </button>
          <button
            onClick={() => handleNavClick('three-piece')}
            className={`flex items-center gap-1.5 pb-1 transition-all ${
              activeCategory === 'three-piece'
                ? 'text-amber-800 border-b-2 border-amber-800 font-bold'
                : 'hover:text-amber-800'
            }`}
          >
            <span>থ্রি-পিস (Three Piece)</span>
            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-full font-bold">লনে সেরা</span>
          </button>
          <button
            onClick={() => handleNavClick('kurti')}
            className={`flex items-center gap-1.5 pb-1 transition-all ${
              activeCategory === 'kurti'
                ? 'text-amber-800 border-b-2 border-amber-800 font-bold'
                : 'hover:text-amber-800'
            }`}
          >
            <span>ডিজাইনার কুর্তি (Kurtis)</span>
          </button>
          <button
            onClick={() => handleNavClick('two-piece')}
            className={`pb-1 transition-all ${
              activeCategory === 'two-piece'
                ? 'text-amber-800 border-b-2 border-amber-800 font-bold'
                : 'hover:text-amber-800'
            }`}
          >
            টু-পিস কো-অর্ড (Two-Piece)
          </button>
          <button
            onClick={() => handleNavClick('party-wear')}
            className={`flex items-center gap-1 pb-1 transition-all ${
              activeCategory === 'party-wear'
                ? 'text-amber-800 border-b-2 border-amber-800 font-bold'
                : 'hover:text-amber-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>পার্টি ওয়্যার স্যুট (Party Wear)</span>
          </button>
          <a
            href="#flash-sale"
            className="flex items-center gap-1 text-red-600 hover:text-red-700 pb-1 font-bold animate-pulse"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>স্পেশাল অফার</span>
          </a>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <h3 className="font-serif-luxury text-2xl font-bold tracking-wider text-[#2c1d11]">ALVINA</h3>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest">Women's Boutique</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-stone-500 hover:bg-stone-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search input */}
              <div className="mt-4 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="থ্রি-পিস বা কুর্তি সার্চ করুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-100 border border-stone-200 text-stone-800 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-amber-700"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-1 mt-4">
                <button
                  onClick={() => handleNavClick('all')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    activeCategory === 'all' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  সব কালেকশন (All)
                </button>
                <button
                  onClick={() => handleNavClick('three-piece')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                    activeCategory === 'three-piece' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>থ্রি-পিস (Three Piece)</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">লনে সেরা</span>
                </button>
                <button
                  onClick={() => handleNavClick('kurti')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    activeCategory === 'kurti' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  ডিজাইনার কুর্তি (Kurtis)
                </button>
                <button
                  onClick={() => handleNavClick('two-piece')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    activeCategory === 'two-piece' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  টু-পিস কো-অর্ড (Two-Piece)
                </button>
                <button
                  onClick={() => handleNavClick('party-wear')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    activeCategory === 'party-wear' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  পার্টি ওয়্যার স্যুট (Party Wear)
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSizeGuide();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-100 flex items-center gap-2"
                >
                  <Ruler className="w-4 h-4 text-amber-700" />
                  <span>সাইজ গাইড চার্ট</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrderTracking();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-100 flex items-center gap-2"
                >
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>অর্ডার ট্র্যাকিং</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-800" />
                  <span>অ্যাডমিন ড্যাশবোর্ড (অর্ডার দেখুন)</span>
                </button>
              </div>
            </div>

            {/* Mobile Contact & Hotline */}
            <div className="pt-6 border-t border-stone-200 space-y-3">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex items-center gap-2.5 text-stone-800 text-sm font-semibold p-2 bg-stone-50 rounded-lg"
              >
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <span>কল করুন: {STORE_INFO.phone}</span>
              </a>
              <div className="flex items-start gap-2 text-stone-500 text-xs px-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
                <span>{STORE_INFO.showroom}</span>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
