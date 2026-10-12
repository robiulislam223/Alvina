import { Product, Review } from '../types';

export const STORE_INFO = {
  name: 'Alvina',
  banglaName: 'আলভিনা',
  tagline: "Exclusive Three-Piece & Designer Kurti Collection",
  subTagline: "সবচেয়ে প্রিমিয়াম থ্রি-পিস ও কুর্তি কালেকশন | সারা বাংলাদেশে ক্যাশ অন ডেলিভারি",
  phone: '01999-973506',
  whatsapp: '+8801999973506',
  email: 'info@alvinabd.com',
  address: 'House 18, Road 4, Sector 11, Uttara, Dhaka-1230, Bangladesh',
  showroom: 'Level 3, Shop 312, Police Plaza Concord, Gulshan-1, Dhaka',
  freeDeliveryThreshold: 2500,
  deliveryRates: {
    'inside-dhaka': { fee: 80, label: 'Inside Dhaka (ঢাকার ভিতরে)', duration: '24-48 Hours' },
    'dhaka-suburbs': { fee: 100, label: 'Dhaka Suburbs (সাভার, কেরানীগঞ্জ, গাজীপুর)', duration: '48 Hours' },
    'outside-dhaka': { fee: 150, label: 'Outside Dhaka (ঢাকার বাইরে সারা বাংলাদেশ)', duration: '2-3 Days' },
  }
};

export const CATEGORIES_DATA = [
  {
    id: 'three-piece',
    title: 'Three Piece (থ্রি-পিস)',
    subtitle: 'Pakistani Lawn, Embroidered & Digital Prints',
    count: 24,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    tag: 'Best Selling'
  },
  {
    id: 'kurti',
    title: 'Designer Kurti (কুর্তি)',
    subtitle: 'Long, Short & A-Line Trendy Kurtis',
    count: 18,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80',
    tag: 'Trendy'
  },
  {
    id: 'two-piece',
    title: 'Two-Piece & Co-ords (টু-পিস)',
    subtitle: 'Top & Trouser Matching Stylish Sets',
    count: 14,
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=700&q=80',
    tag: 'Hot Pick'
  },
  {
    id: 'party-wear',
    title: 'Party Wear Suits (পার্টি ওয়্যার)',
    subtitle: 'Luxury Organza, Sequence & Georgette Sets',
    count: 12,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=700&q=80',
    tag: 'Exclusive'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'alv-3p-01',
    code: 'ALV-301',
    name: 'Aghaz Luxury Embroidered Lawn Three-Piece',
    banglaName: 'আঘাজ লাক্সারি এমব্রয়ডারি লন থ্রি-পিস',
    category: 'three-piece',
    subCategory: 'Pakistani Luxury Lawn',
    fabric: '100% Pure Luxury Lawn & Chiffon Dupatta',
    type: 'Unstitched',
    price: 2850,
    originalPrice: 3500,
    discountPercentage: 19,
    rating: 4.9,
    reviewsCount: 42,
    isNewArrival: true,
    isBestSeller: true,
    isFlashSale: true,
    stock: 7,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'আকর্ষণীয় কাশ্মীরি ভারী নেক এমব্রয়ডারি সহ প্রিমিয়াম কোয়ালিটি লন কামিজ। সাথে ডিজিটাল প্রিন্টেড সফট পিওর শিফন ওড়না এবং ম্যাচিং সফট কটন সালোয়ার। যেকোনো অনুষ্ঠান বা ক্যাজুয়াল আউটিংয়ের জন্য অত্যন্ত আরামদায়ক।',
    details: {
      kameezOrKurti: 'Pure Cotton Lawn (Full Neck & Front Heavy Embroidery, 3.25 Yards)',
      dupatta: 'Premium Digital Printed Pure Bamber Chiffon Dupatta (2.5 Yards)',
      trouserOrSalwar: 'Dyed Soft Cotton Trouser with Lace Patch (2.5 Yards)',
      work: 'Heavy Resham Thread & Sequence Embroidery Work',
      careInstructions: 'Dry clean recommended or gentle hand wash with mild detergent.'
    },
    availableSizes: ['Unstitched (Free Size)', '38 (Stitched)', '40 (Stitched)', '42 (Stitched)', '44 (Stitched)']
  },
  {
    id: 'alv-kurt-01',
    code: 'ALV-K101',
    name: 'Zaha Floral Cut-Work Designer Long Kurti',
    banglaName: 'জাহা ফ্লোরাল কাট-ওয়ার্ক ডিজাইনার লং কুর্তি',
    category: 'kurti',
    subCategory: 'Designer Long Kurti',
    fabric: 'High Density Premium Slub Cotton',
    type: 'Stitched',
    price: 1450,
    originalPrice: 1850,
    discountPercentage: 22,
    rating: 4.8,
    reviewsCount: 38,
    isNewArrival: true,
    isBestSeller: true,
    isFlashSale: false,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'আধুনিক রুচিশীল নারীদের জন্য দৃষ্টিনন্দন কলার নেকলাইন এবং কাট-ওয়ার্ক স্লিভ ডিজাইন। দৈনন্দিন অফিস, ভার্সিটি ও আউটিংয়ে সর্বোচ্চ স্বস্তি এনে দেবে ১০০% সুতি স্ল্যাব ফেব্রিকে তৈরি এই কুর্তি।',
    details: {
      kameezOrKurti: 'Length: 44-46 Inches, Round Hemline with Border Lace',
      work: 'Floral Motif Thread Embroidery on Neckline & Sleeves',
      careInstructions: 'Normal Machine Wash in Cold Water. Do not bleach.'
    },
    availableSizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)', '44 (XXL)']
  },
  {
    id: 'alv-3p-02',
    code: 'ALV-302',
    name: 'Noor Emerald Festive Chiffon Three-Piece',
    banglaName: 'নূর এমারেল্ড গর্জিয়াস শিফন পার্টি থ্রি-পিস',
    category: 'party-wear',
    subCategory: 'Festive Salwar Suit',
    fabric: 'Luxury Pure Georgette & Organza Border',
    type: 'Stitched',
    price: 3650,
    originalPrice: 4500,
    discountPercentage: 19,
    rating: 5.0,
    reviewsCount: 29,
    isNewArrival: true,
    isBestSeller: false,
    isFlashSale: true,
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'গাঢ় পান্না সবুজ রঙে জারদৌসি এবং সূক্ষ্ম সিকোয়েন্সের কাজ। বিয়েবাড়ি কিংবা যেকোনো রাতের জমকালো অনুষ্ঠানে আপনার রূপকে ফুটিয়ে তুলবে অপরূপ মোহনীয়তায়।',
    details: {
      kameezOrKurti: 'Stitched Heavy Embroidered Georgette with Inner Lining Attached',
      dupatta: 'Scalloped Border Organza Heavy Sequence Dupatta (2.5 Yards)',
      trouserOrSalwar: 'Stitched Cigarette Pant with Organza Patch Work',
      work: 'Gold Zari, Mirror Work & Tilla Embroidery',
      careInstructions: 'Dry Clean Only.'
    },
    availableSizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL)']
  },
  {
    id: 'alv-2p-01',
    code: 'ALV-2P01',
    name: 'Gul-E-Lala Monochrome Linen Two-Piece Co-ord Set',
    banglaName: 'গুল-এ-লালা মনোক্রম লিনেন টু-পিস কো-অর্ড সেট',
    category: 'two-piece',
    subCategory: 'Modern Co-ords',
    fabric: 'Premium Soft Textured Linen',
    type: 'Stitched',
    price: 1950,
    originalPrice: 2450,
    discountPercentage: 20,
    rating: 4.7,
    reviewsCount: 19,
    isNewArrival: false,
    isBestSeller: true,
    isFlashSale: false,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'ট্রেন্ডি ব্যাগী স্লিভস এবং এসিমেট্রিক কাট সম্বলিত প্রিমিয়াম লিনেন টু-পিস সেট। সাথে চমৎকার ম্যাচিং ওয়াইড লেগ ট্রাউজার। ক্যাজুয়াল কিন্তু এলিগ্যান্ট লুকের জন্য অসাধারণ পছন্দ।',
    details: {
      kameezOrKurti: 'Length: 38 Inches, Boxy Relaxed Silhouette with Wooden Buttons',
      trouserOrSalwar: 'Elasticated Waist Culotte/Straight Trouser with Side Pockets',
      work: 'Minimalist Pintucks and Contrast Stitch Detailing',
      careInstructions: 'Hand wash with cold water. Iron on medium heat.'
    },
    availableSizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)']
  },
  {
    id: 'alv-3p-03',
    code: 'ALV-303',
    name: 'Rangoon Blossom Digital Printed Lawn 3-Piece',
    banglaName: 'রঙ্গুন ব্লসম ডিজিটাল প্রিন্ট লন থ্রি-পিস',
    category: 'three-piece',
    subCategory: 'Summer Daily Lawn',
    fabric: 'Swiss Voile Cotton & Lawn Dupatta',
    type: 'Unstitched',
    price: 2150,
    originalPrice: 2700,
    discountPercentage: 20,
    rating: 4.9,
    reviewsCount: 54,
    isNewArrival: true,
    isBestSeller: true,
    isFlashSale: false,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'গ্রীষ্মের তাপদাহে পরম প্রশান্তি দিতে ১০০% সুতি পিওর সুইস ভয়েলে তৈরি ডিজিটাল প্রিন্ট থ্রি-পিস। ওড়নাটি সম্পূর্ণ ৫ হাত সুতি লন এবং কালার গ্যারান্টি ১০০%।',
    details: {
      kameezOrKurti: 'Digital Printed Pure Voile Cotton (3.0 Yards)',
      dupatta: 'Full 5-Haat Soft Lawn Dupatta with Border Print',
      trouserOrSalwar: 'Solid Dyed Matching Soft Cotton (2.5 Yards)',
      work: 'Digital High Definition Floral Art Print',
      careInstructions: 'Normal Hand Wash. 100% Color Fastness Guarantee.'
    },
    availableSizes: ['Unstitched (Free Size)']
  },
  {
    id: 'alv-kurt-02',
    code: 'ALV-K102',
    name: 'Meena Block-Print Traditional Flared Kurti',
    banglaName: 'মীনা ব্লক-প্রিন্ট ট্র্যাডিশনাল ফ্লেয়ার্ড কুর্তি',
    category: 'kurti',
    subCategory: 'A-Line Flared Kurti',
    fabric: 'Handloom Khadi Cotton',
    type: 'Stitched',
    price: 1350,
    originalPrice: 1750,
    discountPercentage: 23,
    rating: 4.6,
    reviewsCount: 22,
    isNewArrival: false,
    isBestSeller: true,
    isFlashSale: false,
    stock: 9,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'হাতে করা অথেন্টিক উডেন ব্লক প্রিন্ট এবং গলায় সুন্দর পম-পম টাসেল। এই কুর্তিটি আপনাকে একাধারে দেশীয় ঐতিহ্য ও আধুনিক আভিজাত্যের স্পর্শ এনে দেবে।',
    details: {
      kameezOrKurti: 'Length: 42 Inches, A-Line Gown Cut with Front Slit and Tassels',
      work: 'Artisan Woodblock Print & Gotta Patti Border',
      careInstructions: 'Wash inside-out in cold water.'
    },
    availableSizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)']
  },
  {
    id: 'alv-3p-04',
    code: 'ALV-304',
    name: 'Khaadi Velvet Sequence Luxury Three-Piece',
    banglaName: 'খাদি ভেলভেট সিকোয়েন্স লাক্সারি থ্রি-পিস',
    category: 'party-wear',
    subCategory: 'Luxury Velvet Party Wear',
    fabric: 'Micro Velvet 9000 & Embroidered Net Dupatta',
    type: 'Semi-Stitched',
    price: 4250,
    originalPrice: 5200,
    discountPercentage: 18,
    rating: 4.9,
    reviewsCount: 31,
    isNewArrival: true,
    isBestSeller: false,
    isFlashSale: true,
    stock: 4,
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'শীত ও বসন্তের জমকালো পার্টি বা রিসেপশনের জন্য মাইক্রো ভেলভেটে তৈরি রয়্যাল ব্লু থ্রি-পিস। বুকে ও জামার দামানে সূক্ষ্ম গোল্ডেন জরি ও সিকোয়েন্স কারুকাজ।',
    details: {
      kameezOrKurti: 'Pure Micro Velvet 9000 with Heavy Daman Embroidery',
      dupatta: 'Four-Side Velvet Border Embroidered Soft Net Dupatta',
      trouserOrSalwar: 'Raw Silk Dyed Trouser with Embroidery Patches',
      work: 'Zari, Kundan & Matte Gold Sequence Work',
      careInstructions: 'Strictly Dry Clean Only.'
    },
    availableSizes: ['Semi-Stitched (Customizable up to 48 Chest)']
  },
  {
    id: 'alv-2p-02',
    code: 'ALV-2P02',
    name: 'Pastel Sorbet Cotton Two-Piece Kurti & Trouser',
    banglaName: 'প্যাসটেল শরবত কটন টু-পিস কুর্তি ও ট্রাউজার',
    category: 'two-piece',
    subCategory: 'Summer Daily Co-ord',
    fabric: '100% Breathable Combed Cotton',
    type: 'Stitched',
    price: 1850,
    originalPrice: 2200,
    discountPercentage: 16,
    rating: 4.8,
    reviewsCount: 26,
    isNewArrival: false,
    isBestSeller: false,
    isFlashSale: false,
    stock: 11,
    images: [
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'মিষ্টি ল্যাভেন্ডার রঙে সিম্পল ও গর্জিয়াস এমব্রয়ডারি নেকলাইন। সাথে থাকছে আরামদায়ক সাইড-পকেট প্যান্ট। গরমে ঘরের বাইরে নিয়মিত ব্যবহারের জন্য আদর্শ।',
    details: {
      kameezOrKurti: 'Length: 40 Inches with Minimal Collar & Cuff Detailing',
      trouserOrSalwar: 'Ankle Length Straight Fit Trouser with Pocket',
      work: 'Cotton Thread Floral Stitching',
      careInstructions: 'Easy machine wash. Fast dry in shade.'
    },
    availableSizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)']
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-01',
    author: 'নুসরাত জাহান',
    location: 'মিরপুর-১০, ঢাকা',
    rating: 5,
    date: '২ দিন আগে',
    comment: 'আলভিনা থেকে আঘাজ থ্রি-পিসটি নিয়েছিলাম। মাশাআল্লাহ কাপড় এবং ওড়নার কোয়ালিটি ছবির চেয়েও অনেক বেশি সুন্দর! মাত্র ২৪ ঘণ্টার ভেতর হোম ডেলিভারি পেয়েছি।',
    productName: 'Aghaz Luxury Embroidered Lawn Three-Piece',
    verified: true
  },
  {
    id: 'rev-02',
    author: 'ফারহানা চৌধুরী',
    location: 'পাঁচলাইশ, চট্টগ্রাম',
    rating: 5,
    date: '৪ দিন আগে',
    comment: 'কুর্তির কাটিং এবং ফিটিং একদম পারফেক্ট। কাপড় খুবই সফট আর গরমে পরে খুব আরাম। সাইজ চার্ট দেখে অর্ডার করেছিলাম, ঠিকঠাক পেয়েছি। ধন্যবাদ Alvina টিমকে!',
    productName: 'Zaha Floral Cut-Work Designer Long Kurti',
    verified: true
  },
  {
    id: 'rev-03',
    author: 'তাসমিয়া রহমান রিদা',
    location: 'উপশহর, সিলেট',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    comment: 'সবচেয়ে ভালো লেগেছে ক্যাশ অন ডেলিভারিতে পার্সেল চেক করে টাকা দেওয়ার সুযোগ। কাপড়ের কালার গ্যারান্টি ১০০% খাঁটি। খুব দ্রুতই আবার অর্ডার করবো ইনশাআল্লাহ।',
    productName: 'Noor Emerald Festive Chiffon Three-Piece',
    verified: true
  },
  {
    id: 'rev-04',
    author: 'সাদিয়া আফরোজ',
    location: 'ধানমন্ডি, ঢাকা',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    comment: 'অর্ডার করার পর ফোন দিয়ে কনফার্ম করেছিল কাস্টমার কেয়ার। প্যাকেজিং ও কুরিয়ার সার্ভিস অনেক প্রফেশনাল ছিল। রিকমেন্ডেড!',
    productName: 'Rangoon Blossom Digital Printed Lawn 3-Piece',
    verified: true
  }
];

export const FAQS_DATA = [
  {
    q: 'ক্যাশ অন ডেলিভারিতে অর্ডার করার নিয়ম কী?',
    a: 'আমাদের ওয়েবসাইটে যেকোনো পছন্দের থ্রি-পিস বা কুর্তির নিচে "অর্ডার করুন" বাটনে ক্লিক করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা দিলেই সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম হয়ে যাবে। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।'
  },
  {
    q: 'ডেলিভারি চার্জ কত এবং কতদিনে পার্সেল পাবো?',
    a: 'ঢাকার ভিতরে ডেলিভারি চার্জ মাত্র ৮০ টাকা (২৪ থেকে ৪৮ ঘণ্টার ভেতর ডেলিভারি)। ঢাকা সাব-আর্বান ১০০ টাকা। আর ঢাকার বাইরে সারা বাংলাদেশে ১৫০ টাকা (২ থেকে ৩ দিনের ভেতর স্টিডফাস্ট বা সুন্দরবন কুরিয়ারে হোম ডেলিভারি)।'
  },
  {
    q: 'সাইজ না মিললে বা কোনো সমস্যা থাকলে পরিবর্তন (Exchange) করা যাবে?',
    a: 'হ্যাঁ, পণ্য হাতে পাওয়ার পর ৭ দিনের মধ্যে খুব সহজেই সাইজ বা পণ্য এক্সচেঞ্জ করতে পারবেন। আমাদের হটলাইন 01999-973506 অথবা হোয়াটসঅ্যাপে জানালেই আমাদের প্রতিনিধি সাহায্য করবেন।'
  },
  {
    q: 'কাপড়ের কালার উঠবে বা রং যাবে কি?',
    a: 'আলভিনার প্রতিটি থ্রি-পিস ও কুর্তি ১০০% কালার ফাস্টনেস টেস্ট করা। নির্দেশিকা অনুযায়ী প্রথম ওয়াশে শ্যাম্পু দিয়ে ধুলে রং একদম নিখুঁত ও দীর্ঘস্থায়ী থাকবে।'
  }
];
