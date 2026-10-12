export type ProductCategory = 'all' | 'three-piece' | 'kurti' | 'two-piece' | 'party-wear';

export interface Product {
  id: string;
  name: string;
  banglaName?: string;
  code: string;
  category: 'three-piece' | 'kurti' | 'two-piece' | 'party-wear';
  subCategory: string; // e.g. "Pakistani Lawn", "Embroidered Cotton", "Designer Long Kurti", "Organza Party Wear"
  fabric: string; // e.g. "100% Pure Lawn Cotton", "Organza & Chiffon", "Slub Cotton"
  type: 'Stitched' | 'Unstitched' | 'Semi-Stitched';
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  images: string[];
  description: string;
  details: {
    kameezOrKurti: string;
    dupatta?: string;
    trouserOrSalwar?: string;
    work: string;
    careInstructions: string;
  };
  availableSizes: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedType: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  district: 'inside-dhaka' | 'dhaka-suburbs' | 'outside-dhaka';
  deliveryFee: number;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  status: 'Order Placed' | 'Confirmed' | 'Packaging' | 'Shipped' | 'Delivered';
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
  image?: string;
}
