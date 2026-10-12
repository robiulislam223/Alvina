import React, { useState } from 'react';
import {
  Product,
  Language,
} from '../types';
import {
  Package,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Tag,
  DollarSign,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ProductsViewProps {
  products: Product[];
  lang: Language;
  onAddProduct: (product: Product) => void;
  onUpdateProductStock: (productId: number, stock: number) => void;
  onDeleteProduct: (productId: number) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  lang,
  onAddProduct,
  onUpdateProductStock,
  onDeleteProduct,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'three-piece' | 'kurti' | 'two-piece' | 'party-wear'>('three-piece');
  const [price, setPrice] = useState(2500);
  const [regularPrice, setRegularPrice] = useState(3200);
  const [stock, setStock] = useState(15);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80');
  const [type, setType] = useState<'Stitched' | 'Unstitched'>('Unstitched');
  const [fabric, setFabric] = useState('100% Pure Lawn Cotton');

  const categories = [
    { id: 'all', label: lang === 'bn' ? 'সকল পোশাক' : 'All Products' },
    { id: 'three-piece', label: lang === 'bn' ? 'থ্রি-পিস (Three Piece)' : 'Three Piece' },
    { id: 'kurti', label: lang === 'bn' ? 'কুর্তি (Kurti)' : 'Kurti' },
    { id: 'two-piece', label: lang === 'bn' ? 'টু-পিস (Two Piece)' : 'Two Piece' },
    { id: 'party-wear', label: lang === 'bn' ? 'পার্টি ওয়্যার' : 'Party Wear' },
  ];

  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
    }
    return true;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProd: Product = {
      id: Date.now(),
      name: name.trim(),
      category,
      subCategory: 'Pakistani Luxury Lawn',
      fabric,
      price: Number(price),
      regularPrice: Number(regularPrice),
      stock: Number(stock),
      image: image.trim(),
      sku: `ALV-${Math.floor(100 + Math.random() * 900)}`,
      type,
      sizes: type === 'Stitched' ? ['38', '40', '42'] : ['Free Size'],
      status: Number(stock) > 5 ? 'In Stock' : Number(stock) > 0 ? 'Low Stock' : 'Out of Stock',
      description: 'Exclusive Three-Piece Collection',
    };

    onAddProduct(newProd);
    setIsAddModalOpen(false);
    setName('');
    setPrice(2500);
    setRegularPrice(3200);
    setStock(15);
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="bg-[#181422] border border-[#2d2538] rounded-3xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8e829d] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'bn' ? 'পোশাকের নাম বা কোড দিয়ে খুঁজুন...' : 'Search by product name or code...'}
              className="w-full bg-[#120f1a] border border-[#342b40] focus:border-[#bd70df] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#685c74] focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#bd70df] hover:bg-[#cd83ee] text-white font-bold text-xs shadow-md shadow-[#bd70df]/20 flex items-center gap-2 cursor-pointer transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'bn' ? '+ নতুন প্রোডাক্ট আপলোড' : '+ Add New Product'}</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#bd70df] text-white font-semibold shadow-sm'
                  : 'bg-[#231c2e] text-[#a69ab1] hover:text-white hover:bg-[#2e243c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-[#181422] border border-[#2d2538] hover:border-[#bd70df]/40 rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all group"
          >
            {/* Image Preview */}
            <div className="relative aspect-[3/4] bg-[#120f1a] overflow-hidden">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                  {prod.sku || `ALV-${prod.id}`}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#bd70df]/80 backdrop-blur-md text-white text-[10px] font-bold">
                  {prod.category}
                </span>
              </div>

              {/* Stock status tag */}
              <div className="absolute bottom-2.5 right-2.5">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md ${
                    prod.stock > 5
                      ? 'bg-emerald-500/80 text-white'
                      : prod.stock > 0
                      ? 'bg-amber-500/80 text-white'
                      : 'bg-rose-500/80 text-white'
                  }`}
                >
                  স্টক: {prod.stock}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#bd70df] transition-colors">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-[#8e829d] mt-0.5">
                  {prod.fabric || '100% Pure Cotton'} • {prod.type || 'Unstitched'}
                </p>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-black text-amber-300">৳ {prod.price}</span>
                  {prod.regularPrice && prod.regularPrice > prod.price && (
                    <span className="text-xs text-[#8e829d] line-through ml-2">
                      ৳ {prod.regularPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick stock adjustment */}
              <div className="pt-2 border-t border-[#2d2538] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#a69ab1]">স্টক পরিবর্তন:</span>
                  <button
                    onClick={() => onUpdateProductStock(Number(prod.id), Math.max(0, prod.stock - 1))}
                    className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-white">{prod.stock}</span>
                  <button
                    onClick={() => onUpdateProductStock(Number(prod.id), prod.stock + 1)}
                    className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm(`আপনি কি "${prod.name}" ডিলিট করতে চান?`)) {
                      onDeleteProduct(Number(prod.id));
                    }
                  }}
                  className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                  title="ডিলিট করুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#181422] border border-[#342b40] rounded-3xl p-6 shadow-2xl my-8">
            <h3 className="text-base font-bold text-white mb-1">নতুন পোশাক / ক্যাটালগ আপলোড</h3>
            <p className="text-xs text-[#a69ab1] mb-5">
              এখানে অ্যাড করলে গ্রাহক সরাসরি স্টোরফ্রন্টে এই পণ্য দেখতে পাবে এবং অর্ডার করতে পারবে।
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#cbbdd7] mb-1">পোশাকের নাম *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: পাকিস্তানি লাক্সারি লন থ্রি-পিস"
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#cbbdd7] mb-1">ক্যাটাগরি</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                  >
                    <option value="three-piece">থ্রি-পিস (Three Piece)</option>
                    <option value="kurti">ডিজাইনার কুর্তি (Kurti)</option>
                    <option value="two-piece">টু-পিস (Two Piece)</option>
                    <option value="party-wear">পার্টি ওয়্যার স্যুট</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#cbbdd7] mb-1">স্টিচ টাইপ</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                  >
                    <option value="Unstitched">আনস্টিচড (Unstitched)</option>
                    <option value="Stitched">স্টিচড / সেলাই করা (Stitched)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#cbbdd7] mb-1">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                  />
                </div>

                <div>
                  <label className="block text-[#cbbdd7] mb-1">মূল দাম / কাট প্রাইস (৳)</label>
                  <input
                    type="number"
                    min="1"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(Number(e.target.value))}
                    className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                  />
                </div>

                <div>
                  <label className="block text-[#cbbdd7] mb-1">স্টক পরিমাণ *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#bd70df]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#cbbdd7] mb-1">কাপড়ের বিবরণ (Fabric)</label>
                <input
                  type="text"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  placeholder="যেমন: Pure Lawn Cotton with Organza Dupatta"
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
                />
              </div>

              <div>
                <label className="block text-[#cbbdd7] mb-1">ছবির URL (Image URL)</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#120f1a] border border-[#342b40] rounded-xl px-3 py-2 text-white placeholder-[#685c74] focus:outline-none focus:border-[#bd70df]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#a69ab1] font-semibold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#bd70df] text-white font-bold hover:bg-[#ce85ef] transition-colors cursor-pointer"
                >
                  প্রোডাক্ট পাবলিশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
