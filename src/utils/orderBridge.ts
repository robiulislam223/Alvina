import { Order as StoreOrder, CartItem, Product as StoreProduct } from '../types';
import { Order as AdminOrder, OrderItem as AdminOrderItem, OrderStatus, Product as AdminProduct } from '../admin/types';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

// Bulletproof normalization of Storefront products from any input (admin, raw json, localstorage)
export function normalizeStoreProduct(p: any): StoreProduct {
  if (!p) {
    return {
      id: 'alv-default-01',
      code: 'ALV-301',
      name: 'Aghaz Luxury Embroidered Lawn Three-Piece',
      banglaName: 'আঘাজ লাক্সারি এমব্রয়ডারি লন থ্রি-পিস',
      category: 'three-piece',
      subCategory: 'Pakistani Luxury Lawn',
      fabric: '100% Pure Lawn Cotton',
      type: 'Unstitched',
      price: 2850,
      originalPrice: 3500,
      discountPercentage: 19,
      rating: 5,
      reviewsCount: 14,
      isNewArrival: true,
      isBestSeller: true,
      isFlashSale: true,
      images: [FALLBACK_IMAGE],
      description: 'প্রিমিয়াম কোয়ালিটি লন কামিজ। সাথে ডিজিটাল প্রিন্টেড পিওর শিফন ওড়না।',
      details: {
        kameezOrKurti: 'Premium Pure Lawn Fabric',
        dupatta: 'Matching Pure Chiffon Dupatta',
        trouserOrSalwar: 'Comfortable Dyed Trouser',
        work: 'Heavy Neck Embroidery Work',
        careInstructions: 'Gentle wash in cold water / Dry clean',
      },
      availableSizes: ['Unstitched (Free Size)', '38 (M)', '40 (L)', '42 (XL)'],
      stock: 14,
    };
  }

  // Safe image array extraction
  let images: string[] = [];
  if (Array.isArray(p.images) && p.images.length > 0) {
    images = p.images.filter((img: any) => typeof img === 'string' && img.trim().length > 0);
  }
  if (images.length === 0 && typeof p.image === 'string' && p.image.trim().length > 0) {
    images = [p.image.trim()];
  }
  if (images.length === 0) {
    images = [FALLBACK_IMAGE];
  }

  // Safe sizes extraction
  let availableSizes: string[] = [];
  if (Array.isArray(p.availableSizes) && p.availableSizes.length > 0) {
    availableSizes = p.availableSizes;
  } else if (Array.isArray(p.sizes) && p.sizes.length > 0) {
    availableSizes = p.sizes;
  } else {
    availableSizes = ['Unstitched (Free Size)', '38 (M)', '40 (L)', '42 (XL)'];
  }

  // Safe category extraction
  let category: StoreProduct['category'] = 'three-piece';
  const rawCat = String(p.category || '').toLowerCase();
  if (rawCat.includes('kurti')) category = 'kurti';
  else if (rawCat.includes('two') || rawCat.includes('2')) category = 'two-piece';
  else if (rawCat.includes('party')) category = 'party-wear';
  else category = 'three-piece';

  const price = typeof p.price === 'number' ? p.price : (parseFloat(p.price) || 2500);
  const originalPrice = typeof p.originalPrice === 'number'
    ? p.originalPrice
    : typeof p.regularPrice === 'number'
    ? p.regularPrice
    : Math.round(price * 1.25);

  const discountPercentage = typeof p.discountPercentage === 'number'
    ? p.discountPercentage
    : (originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  const safeType: 'Stitched' | 'Unstitched' | 'Semi-Stitched' =
    p.type === 'Stitched' || p.type === 'Unstitched' || p.type === 'Semi-Stitched'
      ? p.type
      : 'Unstitched';

  return {
    id: String(p.id ?? ('alv-' + Math.random().toString(36).substring(2, 7))),
    name: String(p.name || 'Alvina Boutique Collection'),
    banglaName: p.banglaName || p.name,
    code: String(p.code || p.sku || `ALV-${p.id || '101'}`),
    category,
    subCategory: String(p.subCategory || 'Pakistani Luxury Lawn'),
    fabric: String(p.fabric || '100% Pure Lawn Cotton'),
    type: safeType,
    price,
    originalPrice,
    discountPercentage,
    rating: typeof p.rating === 'number' ? p.rating : 5,
    reviewsCount: typeof p.reviewsCount === 'number' ? p.reviewsCount : 18,
    isNewArrival: Boolean(p.isNewArrival),
    isBestSeller: Boolean(p.isBestSeller),
    isFlashSale: p.isFlashSale !== undefined ? Boolean(p.isFlashSale) : true,
    images,
    description: String(p.description || 'আলভিনা এক্সক্লুসিভ কালেকশন। ১০০% খাঁটি কাপড় ও নান্দনিক ফিনিশিং।'),
    details: p.details || {
      kameezOrKurti: 'Premium Pure Fabric',
      dupatta: 'Matching Chiffon / Lawn Dupatta',
      trouserOrSalwar: 'Dyed Trouser',
      work: 'Exclusive Kashmiri / Floral Embroidery',
      careInstructions: 'Gentle wash in cold water',
    },
    availableSizes,
    stock: typeof p.stock === 'number' ? p.stock : 12,
  };
}

// Converts Storefront Product to Admin Product format
export function storeProductToAdminProduct(sp: StoreProduct): AdminProduct {
  const numId = parseInt(String(sp.id).replace(/\D/g, '')) || Math.floor(100 + Math.random() * 900);
  const mainImage = (sp.images && sp.images[0]) || FALLBACK_IMAGE;

  let adminCategory = 'Three Piece';
  if (sp.category === 'kurti') adminCategory = 'Designer Kurti';
  else if (sp.category === 'two-piece') adminCategory = 'Two-Piece';
  else if (sp.category === 'party-wear') adminCategory = 'Party Wear';

  return {
    id: numId,
    name: sp.name,
    banglaName: sp.banglaName,
    sku: sp.code,
    category: adminCategory,
    subCategory: sp.subCategory,
    fabric: sp.fabric,
    price: sp.price,
    regularPrice: sp.originalPrice,
    stock: sp.stock,
    type: sp.type,
    image: mainImage,
    images: sp.images,
    sizes: sp.availableSizes,
    status: sp.stock > 5 ? 'In Stock' : sp.stock > 0 ? 'Low Stock' : 'Out of Stock',
    description: sp.description,
  };
}

// Converts Admin Product to Storefront Product format
export function adminProductToStoreProduct(ap: AdminProduct): StoreProduct {
  return normalizeStoreProduct(ap);
}

// Converts Storefront Order to Admin Order format
export function storeOrderToAdminOrder(so: StoreOrder): AdminOrder {
  const numId = parseInt(String(so.id).replace(/\D/g, '')) || Math.floor(100000 + Math.random() * 900000);

  const adminItems: AdminOrderItem[] = (so.items || []).map((it) => {
    const itemImg = (it.product?.images && it.product.images[0]) || (it.product as any)?.image || FALLBACK_IMAGE;
    return {
      id: String(it.product?.id || Math.random().toString(36).slice(2)),
      name: it.product?.name || 'Alvina Item',
      qty: it.quantity || 1,
      price: it.product?.price || 0,
      size: it.selectedSize || 'Free Size',
      color: 'Default',
      image: itemImg,
    };
  });

  let adminStatus: OrderStatus = 'Pending';
  if (so.status === 'Confirmed') adminStatus = 'Confirmed';
  else if (so.status === 'Packaging') adminStatus = 'Packaging';
  else if (so.status === 'Shipped') adminStatus = 'In Courier';
  else if (so.status === 'Delivered') adminStatus = 'Delivered';

  let adminArea: 'dhaka' | 'suburbs' | 'outside' = 'dhaka';
  if (so.district === 'dhaka-suburbs') adminArea = 'suburbs';
  else if (so.district === 'outside-dhaka') adminArea = 'outside';

  let adminPay: 'COD' | 'bKash' | 'Nagad' | 'Bank' = 'COD';
  if (so.paymentMethod === 'bkash') adminPay = 'bKash';
  else if (so.paymentMethod === 'nagad') adminPay = 'Nagad';

  return {
    id: numId,
    date: so.createdAt || new Date().toISOString(),
    customer: so.customerName || 'Customer',
    phone: so.phone || '',
    address: so.address || '',
    area: adminArea,
    deliveryMethod: 'Standard Courier',
    paymentMethod: adminPay,
    subtotal: so.subtotal || 0,
    charge: so.deliveryFee || 0,
    discount: so.discount || 0,
    total: so.total || 0,
    advance: 0,
    due: so.total || 0,
    status: adminStatus,
    items: adminItems,
    shippingNote: so.notes,
    source: 'Storefront',
  };
}

// Converts Admin Order to Storefront Order format
export function adminOrderToStoreOrder(ao: AdminOrder): StoreOrder {
  let storeStatus: 'Order Placed' | 'Confirmed' | 'Packaging' | 'Shipped' | 'Delivered' = 'Order Placed';
  if (ao.status === 'Confirmed') storeStatus = 'Confirmed';
  else if (ao.status === 'Packaging') storeStatus = 'Packaging';
  else if (ao.status === 'In Courier' || ao.status === 'Shipped') storeStatus = 'Shipped';
  else if (ao.status === 'Delivered') storeStatus = 'Delivered';

  let storeDistrict: 'inside-dhaka' | 'dhaka-suburbs' | 'outside-dhaka' = 'inside-dhaka';
  if (ao.area === 'suburbs') storeDistrict = 'dhaka-suburbs';
  else if (ao.area === 'outside') storeDistrict = 'outside-dhaka';

  let storePay: 'cod' | 'bkash' | 'nagad' = 'cod';
  if (ao.paymentMethod === 'bKash') storePay = 'bkash';
  else if (ao.paymentMethod === 'Nagad') storePay = 'nagad';

  const cartItems: CartItem[] = (ao.items || []).map((it) => {
    const itemImg = it.image || FALLBACK_IMAGE;
    const p: StoreProduct = {
      id: String(it.id),
      name: it.name || 'Alvina Dress',
      code: `ALV-${it.id}`,
      category: 'three-piece',
      subCategory: 'Pakistani Luxury Lawn',
      fabric: '100% Pure Lawn Cotton',
      type: 'Unstitched',
      price: it.price || 0,
      originalPrice: Math.round((it.price || 0) * 1.2),
      discountPercentage: 20,
      rating: 5,
      reviewsCount: 1,
      stock: 10,
      images: [itemImg],
      description: it.name || '',
      details: {
        kameezOrKurti: 'Premium Pure Lawn Fabric',
        dupatta: 'Matching Dupatta',
        trouserOrSalwar: 'Dyed Trouser',
        work: 'Embroidery Work',
        careInstructions: 'Gentle wash in cold water',
      },
      availableSizes: [it.size || 'Free Size'],
    };

    return {
      product: p,
      selectedSize: it.size || 'Free Size',
      selectedType: 'Unstitched',
      quantity: it.qty || 1,
    };
  });

  return {
    id: `ALV-${ao.id}`,
    orderNumber: `ALV-${ao.id}`,
    createdAt: ao.date || new Date().toISOString(),
    customerName: ao.customer || 'Customer',
    phone: ao.phone || '',
    address: ao.address || '',
    district: storeDistrict,
    deliveryFee: ao.charge || 0,
    items: cartItems,
    subtotal: ao.subtotal || 0,
    discount: ao.discount || 0,
    total: ao.total || 0,
    paymentMethod: storePay,
    status: storeStatus,
    notes: ao.shippingNote,
  };
}
