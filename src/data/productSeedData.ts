/**
 * Asper Beauty Shop - Product Seed Data
 * Integration with locable.ai and Shopify
 * Based on the product catalog from كشف المواد (1,526 products)
 */

export interface ProductSeedData {
  sku: string;
  title: string;
  titleAr?: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isOnSale: boolean;
  description?: string;
  descriptionAr?: string;
  volumeMl?: string;
  skinConcerns?: string[];
  tags?: string[];
  imageKeywords?: string;
}

// Major brands from the product catalog
export const PRODUCT_BRANDS = [
  // Premium Skincare
  { id: 'palmers', name: "Palmer's", nameAr: 'بالمرز', country: 'USA', category: 'Body Care' },
  { id: 'eucerin', name: 'Eucerin', nameAr: 'يوسيرين', country: 'Germany', category: 'Skin Care' },
  { id: 'vichy', name: 'Vichy', nameAr: 'فيشي', country: 'France', category: 'Skin Care' },
  { id: 'bioderma', name: 'Bioderma', nameAr: 'بيوديرما', country: 'France', category: 'Skin Care' },
  { id: 'cetaphil', name: 'Cetaphil', nameAr: 'سيتافيل', country: 'USA', category: 'Skin Care' },
  { id: 'cerave', name: 'CeraVe', nameAr: 'سيرافي', country: 'USA', category: 'Skin Care' },
  { id: 'la-roche-posay', name: 'La Roche-Posay', nameAr: 'لاروش بوزيه', country: 'France', category: 'Skin Care' },
  { id: 'avene', name: 'Avène', nameAr: 'أفين', country: 'France', category: 'Skin Care' },
  { id: 'svr', name: 'SVR', nameAr: 'إس في آر', country: 'France', category: 'Skin Care' },
  { id: 'uriage', name: 'Uriage', nameAr: 'يورياج', country: 'France', category: 'Skin Care' },
  
  // Hair Care
  { id: 'olaplex', name: 'Olaplex', nameAr: 'أولابليكس', country: 'USA', category: 'Hair Care' },
  { id: 'kerastase', name: 'Kérastase', nameAr: 'كيراستاس', country: 'France', category: 'Hair Care' },
  
  // Body & Personal Care
  { id: 'jergens', name: 'Jergens', nameAr: 'جيرجنز', country: 'USA', category: 'Body Care' },
  { id: 'old-spice', name: 'Old Spice', nameAr: 'أولد سبايس', country: 'USA', category: 'Personal Care' },
  { id: 'speed-stick', name: 'Speed Stick', nameAr: 'سبيد ستيك', country: 'USA', category: 'Personal Care' },
  { id: 'secret', name: 'Secret', nameAr: 'سيكريت', country: 'USA', category: 'Personal Care' },
  { id: 'arm-hammer', name: 'Arm & Hammer', nameAr: 'آرم آند هامر', country: 'USA', category: 'Personal Care' },
  
  // Health & Supplements
  { id: 'sundown', name: 'Sundown', nameAr: 'سن داون', country: 'USA', category: 'Health & Supplements' },
  { id: 'jamieson', name: 'Jamieson', nameAr: 'جاميسون', country: 'Canada', category: 'Health & Supplements' },
  { id: 'nature-made', name: 'Nature Made', nameAr: 'نيتشر ميد', country: 'USA', category: 'Health & Supplements' },
  { id: 'now-foods', name: 'NOW Foods', nameAr: 'ناو فودز', country: 'USA', category: 'Health & Supplements' },
  
  // Makeup
  { id: 'bourjois', name: 'Bourjois', nameAr: 'بورجوا', country: 'France', category: 'Makeup' },
  { id: 'mavala', name: 'Mavala', nameAr: 'مافالا', country: 'Switzerland', category: 'Makeup' },
  { id: 'isadora', name: 'Isadora', nameAr: 'إيزادورا', country: 'Sweden', category: 'Makeup' },
  { id: 'essence', name: 'Essence', nameAr: 'إيسنس', country: 'Germany', category: 'Makeup' },
  { id: 'catrice', name: 'Catrice', nameAr: 'كاتريس', country: 'Germany', category: 'Makeup' },
  
  // Baby & Kids
  { id: 'mustela', name: 'Mustela', nameAr: 'موستيلا', country: 'France', category: 'Baby Care' },
  { id: 'chicco', name: 'Chicco', nameAr: 'شيكو', country: 'Italy', category: 'Baby Care' },
  
  // Medical & Pharmaceutical
  { id: 'artelac', name: 'Artelac', nameAr: 'أرتيلاك', country: 'Germany', category: 'Medical' },
  { id: 'systane', name: 'Systane', nameAr: 'سيستان', country: 'USA', category: 'Medical' },
];

// Sample products based on the Excel data structure
export const SEED_PRODUCTS: ProductSeedData[] = [
  // Palmer's Products
  {
    sku: "737383722396",
    title: "Palmer's Olive Oil Conditioner 400ml",
    titleAr: "بالمرز بلسم زيت الزيتون 400 مل",
    brand: "Palmer's",
    category: "Hair Care",
    subcategory: "Conditioner",
    price: 9.750,
    description: "Enriched with Extra Virgin Olive Oil & Vitamin E for healthy, shiny hair",
    descriptionAr: "غني بزيت الزيتون البكر وفيتامين E للشعر الصحي واللامع",
    volumeMl: "400ml",
    tags: ["olive oil", "conditioner", "shine", "healthy hair"],
    isOnSale: false,
    imageKeywords: "hair conditioner olive oil bottle"
  },
  {
    sku: "737383722622",
    title: "Palmer's Olive Oil Body Lotion Pump 400ml",
    titleAr: "بالمرز لوشن الجسم بزيت الزيتون 400 مل",
    brand: "Palmer's",
    category: "Body Care",
    subcategory: "Body Lotion",
    price: 10.000,
    description: "Rich moisturizing body lotion with pure olive oil for soft, hydrated skin",
    descriptionAr: "لوشن مرطب غني بزيت الزيتون النقي لبشرة ناعمة ورطبة",
    volumeMl: "400ml",
    tags: ["body lotion", "olive oil", "moisturizing"],
    isOnSale: false,
    imageKeywords: "body lotion pump bottle olive"
  },
  {
    sku: "737383743893",
    title: "Palmer's Cocoa Butter Formula Body Lotion 400ml",
    titleAr: "بالمرز لوشن الجسم بزبدة الكاكاو 400 مل",
    brand: "Palmer's",
    category: "Body Care",
    subcategory: "Body Lotion",
    price: 14.950,
    originalPrice: 17.000,
    discountPercent: 12,
    isOnSale: true,
    description: "The #1 cocoa butter formula for 24-hour moisture and skin elasticity",
    descriptionAr: "تركيبة زبدة الكاكاو رقم 1 للترطيب 24 ساعة ومرونة البشرة",
    volumeMl: "400ml",
    skinConcerns: ["dry-skin", "hydration"],
    tags: ["cocoa butter", "moisturizing", "body lotion", "best seller"],
    imageKeywords: "cocoa butter body lotion palmers"
  },
  {
    sku: "737383772223",
    title: "Palmer's Skin Success Fade Cream (Oily Skin) 75g",
    titleAr: "بالمرز كريم تفتيح البشرة (للبشرة الدهنية) 75 غ",
    brand: "Palmer's",
    category: "Skin Care",
    subcategory: "Face Cream",
    price: 15.950,
    description: "Helps fade dark spots and even skin tone for oily skin types",
    descriptionAr: "يساعد على تفتيح البقع الداكنة وتوحيد لون البشرة للبشرة الدهنية",
    volumeMl: "75g",
    skinConcerns: ["dark-spots", "oily-skin"],
    tags: ["fade cream", "dark spots", "oily skin", "brightening"],
    isOnSale: false,
    imageKeywords: "face cream brightening jar"
  },
  {
    sku: "737383787772",
    title: "Palmer's Skin Success Deep Cleansing 250ml",
    titleAr: "بالمرز غسول التنظيف العميق 250 مل",
    brand: "Palmer's",
    category: "Skin Care",
    subcategory: "Cleanser",
    price: 9.500,
    description: "Deep cleansing facial wash that removes impurities and excess oil",
    descriptionAr: "غسول وجه تنظيف عميق يزيل الشوائب والزيوت الزائدة",
    volumeMl: "250ml",
    skinConcerns: ["cleansing", "oily-skin"],
    tags: ["cleanser", "face wash", "deep cleansing"],
    isOnSale: false,
    imageKeywords: "facial cleanser bottle"
  },
  
  // Supplements
  {
    sku: "737768773629",
    title: "Sundown Papaya Enzyme 100 Chewable Tablets",
    titleAr: "سن داون إنزيم البابايا 100 قرص قابل للمضغ",
    brand: "Sundown",
    category: "Health & Supplements",
    subcategory: "Digestive Support",
    price: 12.900,
    originalPrice: 15.000,
    discountPercent: 14,
    isOnSale: true,
    description: "Natural papaya enzyme for digestive support and comfort",
    descriptionAr: "إنزيم البابايا الطبيعي لدعم الهضم والراحة",
    tags: ["supplements", "papaya", "digestive", "chewable"],
    imageKeywords: "vitamin supplement bottle tablets"
  },
  {
    sku: "764642727334",
    title: "Jamieson Vitamin C 500mg Chewable 100+20 Tablets",
    titleAr: "جاميسون فيتامين سي 500 ملغ 100+20 قرص",
    brand: "Jamieson",
    category: "Health & Supplements",
    subcategory: "Vitamins",
    price: 13.900,
    description: "High potency Vitamin C for immune support and antioxidant protection",
    descriptionAr: "فيتامين سي عالي الفعالية لدعم المناعة والحماية من الأكسدة",
    tags: ["vitamin c", "immune support", "chewable", "supplements"],
    isOnSale: false,
    imageKeywords: "vitamin c supplement bottle"
  },
  
  // Personal Care
  {
    sku: "722277947238",
    title: "Speed Stick Ocean Surf Deodorant 51g",
    titleAr: "سبيد ستيك مزيل العرق أوشن سيرف 51 غ",
    brand: "Speed Stick",
    category: "Personal Care",
    subcategory: "Deodorant",
    price: 2.750,
    description: "24-hour protection with fresh ocean scent",
    descriptionAr: "حماية 24 ساعة برائحة المحيط المنعشة",
    volumeMl: "51g",
    tags: ["deodorant", "men", "fresh scent"],
    isOnSale: false,
    imageKeywords: "deodorant stick men"
  },
  
  // Medical/Eye Care
  {
    sku: "7447477",
    title: "Artelac Advanced Eye Drops 30x0.5ml",
    titleAr: "أرتيلاك قطرة عين متطورة 30×0.5 مل",
    brand: "Artelac",
    category: "Medical",
    subcategory: "Eye Care",
    price: 8.630,
    description: "Advanced lubricating eye drops for dry eye relief",
    descriptionAr: "قطرات عين مرطبة متطورة لتخفيف جفاف العين",
    volumeMl: "30x0.5ml",
    tags: ["eye drops", "dry eyes", "lubricating"],
    isOnSale: false,
    imageKeywords: "eye drops medical packaging"
  },
  
  // Eucerin Products
  {
    sku: "4005800634369",
    title: "Eucerin DermoPure Oil Control Mattifying Fluid 50ml",
    titleAr: "يوسيرين ديرموبيور فلويد مطفي للتحكم بالزيوت 50 مل",
    brand: "Eucerin",
    category: "Skin Care",
    subcategory: "Face Moisturizer",
    price: 28.500,
    originalPrice: 32.000,
    discountPercent: 11,
    isOnSale: true,
    description: "Lightweight mattifying fluid that controls excess oil and reduces shine",
    descriptionAr: "فلويد خفيف مطفي يتحكم بالزيوت الزائدة ويقلل اللمعان",
    volumeMl: "50ml",
    skinConcerns: ["oily-skin", "acne"],
    tags: ["mattifying", "oil control", "oily skin", "face moisturizer"],
    imageKeywords: "eucerin mattifying fluid bottle"
  },
  {
    sku: "4005800025952",
    title: "Eucerin Aquaphor Healing Ointment 45g",
    titleAr: "يوسيرين أكوافور مرهم الشفاء 45 غ",
    brand: "Eucerin",
    category: "Skin Care",
    subcategory: "Treatment",
    price: 12.500,
    description: "Multi-purpose healing ointment for dry, cracked, and irritated skin",
    descriptionAr: "مرهم شفاء متعدد الاستخدامات للبشرة الجافة والمتشققة والمتهيجة",
    volumeMl: "45g",
    skinConcerns: ["dry-skin", "sensitivity"],
    tags: ["healing", "ointment", "dry skin", "cracked skin"],
    isOnSale: false,
    imageKeywords: "eucerin aquaphor tube"
  },
  
  // Vichy Products
  {
    sku: "3337871324377",
    title: "Vichy Mineral 89 Hyaluronic Acid Serum 50ml",
    titleAr: "فيشي مينرال 89 سيروم حمض الهيالورونيك 50 مل",
    brand: "Vichy",
    category: "Skin Care",
    subcategory: "Serum",
    price: 45.000,
    originalPrice: 52.000,
    discountPercent: 13,
    isOnSale: true,
    description: "Fortifying and plumping daily booster with 89% Vichy Mineralizing Water",
    descriptionAr: "بوستر يومي مقوي ومنفخ بـ 89% مياه فيشي المعدنية",
    volumeMl: "50ml",
    skinConcerns: ["hydration", "anti-aging"],
    tags: ["hyaluronic acid", "serum", "hydrating", "best seller"],
    imageKeywords: "vichy mineral 89 serum bottle"
  },
  {
    sku: "3337871330187",
    title: "Vichy Liftactiv Supreme Anti-Wrinkle Cream 50ml",
    titleAr: "فيشي ليفتاكتيف سوبريم كريم مضاد للتجاعيد 50 مل",
    brand: "Vichy",
    category: "Skin Care",
    subcategory: "Face Cream",
    price: 55.000,
    description: "Anti-aging day cream that lifts and firms for more youthful-looking skin",
    descriptionAr: "كريم نهاري مضاد للشيخوخة يرفع ويشد للحصول على بشرة أكثر شباباً",
    volumeMl: "50ml",
    skinConcerns: ["anti-aging", "wrinkles"],
    tags: ["anti-wrinkle", "lifting", "firming", "day cream"],
    isOnSale: false,
    imageKeywords: "vichy anti aging cream jar"
  },
  
  // Bioderma Products
  {
    sku: "3401395376454",
    title: "Bioderma Sensibio H2O Micellar Water 500ml",
    titleAr: "بيوديرما سنسيبيو ماء ميسيلار 500 مل",
    brand: "Bioderma",
    category: "Skin Care",
    subcategory: "Cleanser",
    price: 25.000,
    originalPrice: 28.000,
    discountPercent: 11,
    isOnSale: true,
    description: "The original micellar water - gently cleanses and removes makeup",
    descriptionAr: "ماء الميسيلار الأصلي - ينظف بلطف ويزيل المكياج",
    volumeMl: "500ml",
    skinConcerns: ["sensitivity", "cleansing"],
    tags: ["micellar water", "makeup remover", "sensitive skin", "best seller"],
    imageKeywords: "bioderma sensibio micellar water bottle"
  },
  {
    sku: "3401360298002",
    title: "Bioderma Atoderm Intensive Baume 500ml",
    titleAr: "بيوديرما أتوديرم بلسم مكثف 500 مل",
    brand: "Bioderma",
    category: "Body Care",
    subcategory: "Body Lotion",
    price: 32.000,
    description: "Ultra-nourishing balm for very dry, irritated, and atopic skin",
    descriptionAr: "بلسم مغذي للغاية للبشرة الجافة جداً والمتهيجة والأتوبية",
    volumeMl: "500ml",
    skinConcerns: ["dry-skin", "sensitivity"],
    tags: ["body balm", "dry skin", "atopic", "intensive"],
    isOnSale: false,
    imageKeywords: "bioderma atoderm body balm"
  },
  
  // La Roche-Posay Products
  {
    sku: "3337875545784",
    title: "La Roche-Posay Effaclar Duo+ 40ml",
    titleAr: "لاروش بوزيه إيفاكلار ديو+ 40 مل",
    brand: "La Roche-Posay",
    category: "Skin Care",
    subcategory: "Treatment",
    price: 35.000,
    description: "Global action acne treatment that targets imperfections and marks",
    descriptionAr: "علاج حب الشباب الشامل الذي يستهدف الشوائب والعلامات",
    volumeMl: "40ml",
    skinConcerns: ["acne", "oily-skin"],
    tags: ["acne treatment", "oily skin", "best seller"],
    isOnSale: false,
    imageKeywords: "la roche posay effaclar tube"
  },
  {
    sku: "3337875709835",
    title: "La Roche-Posay Anthelios UVMune 400 SPF50+ 50ml",
    titleAr: "لاروش بوزيه أنثيليوس يو في ميون 400 SPF50+ 50 مل",
    brand: "La Roche-Posay",
    category: "Skin Care",
    subcategory: "Sunscreen",
    price: 38.000,
    originalPrice: 42.000,
    discountPercent: 10,
    isOnSale: true,
    description: "Ultra-protection sunscreen with UVMune 400 technology",
    descriptionAr: "واقي شمس فائق الحماية بتقنية يو في ميون 400",
    volumeMl: "50ml",
    skinConcerns: ["sun-protection"],
    tags: ["sunscreen", "SPF50", "UV protection", "best seller"],
    imageKeywords: "sunscreen tube spf50"
  },
  
  // Olaplex Products
  {
    sku: "896364002428",
    title: "Olaplex No.3 Hair Perfector 100ml",
    titleAr: "أولابليكس رقم 3 معالج الشعر 100 مل",
    brand: "Olaplex",
    category: "Hair Care",
    subcategory: "Treatment",
    price: 42.000,
    description: "At-home treatment that reduces breakage and strengthens hair",
    descriptionAr: "علاج منزلي يقلل التكسر ويقوي الشعر",
    volumeMl: "100ml",
    tags: ["hair treatment", "repair", "strengthening", "best seller"],
    isOnSale: false,
    imageKeywords: "olaplex hair treatment bottle"
  },
  {
    sku: "896364002466",
    title: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    titleAr: "أولابليكس رقم 4 شامبو صيانة الروابط 250 مل",
    brand: "Olaplex",
    category: "Hair Care",
    subcategory: "Shampoo",
    price: 38.000,
    description: "Repairs and protects hair from everyday stresses while cleansing",
    descriptionAr: "يصلح ويحمي الشعر من الضغوط اليومية أثناء التنظيف",
    volumeMl: "250ml",
    tags: ["shampoo", "bond repair", "damaged hair"],
    isOnSale: false,
    imageKeywords: "olaplex shampoo bottle"
  },
  
  // Makeup Products
  {
    sku: "3614227748568",
    title: "Bourjois Rouge Velvet The Lipstick 2.4g",
    titleAr: "بورجوا روج فيلفت أحمر الشفاه 2.4 غ",
    brand: "Bourjois",
    category: "Makeup",
    subcategory: "Lipstick",
    price: 12.500,
    originalPrice: 15.000,
    discountPercent: 17,
    isOnSale: true,
    description: "24-hour hold matte lipstick with velvety smooth finish",
    descriptionAr: "أحمر شفاه مات يدوم 24 ساعة بلمسة مخملية ناعمة",
    volumeMl: "2.4g",
    tags: ["lipstick", "matte", "long-lasting"],
    imageKeywords: "matte lipstick tube"
  },
  {
    sku: "7618900893205",
    title: "Mavala Mini Nail Color 5ml",
    titleAr: "مافالا طلاء أظافر صغير 5 مل",
    brand: "Mavala",
    category: "Makeup",
    subcategory: "Nail Polish",
    price: 4.500,
    description: "Swiss-made nail polish with vibrant, long-lasting colors",
    descriptionAr: "طلاء أظافر سويسري بألوان نابضة بالحياة تدوم طويلاً",
    volumeMl: "5ml",
    tags: ["nail polish", "mini size", "vibrant colors"],
    isOnSale: false,
    imageKeywords: "nail polish bottle"
  },
  
  // CeraVe Products
  {
    sku: "3337875597180",
    title: "CeraVe Moisturizing Cream 454g",
    titleAr: "سيرافي كريم مرطب 454 غ",
    brand: "CeraVe",
    category: "Skin Care",
    subcategory: "Face Moisturizer",
    price: 22.000,
    description: "Rich, non-greasy cream with ceramides for 24-hour hydration",
    descriptionAr: "كريم غني غير دهني بالسيراميدات للترطيب 24 ساعة",
    volumeMl: "454g",
    skinConcerns: ["dry-skin", "hydration"],
    tags: ["moisturizer", "ceramides", "dry skin", "best seller"],
    isOnSale: false,
    imageKeywords: "cerave moisturizing cream jar"
  },
  {
    sku: "3337875597197",
    title: "CeraVe Hydrating Facial Cleanser 236ml",
    titleAr: "سيرافي غسول الوجه المرطب 236 مل",
    brand: "CeraVe",
    category: "Skin Care",
    subcategory: "Cleanser",
    price: 15.500,
    description: "Gentle cleanser that removes makeup without stripping the skin",
    descriptionAr: "غسول لطيف يزيل المكياج دون تجريد البشرة",
    volumeMl: "236ml",
    skinConcerns: ["cleansing", "dry-skin", "sensitivity"],
    tags: ["cleanser", "gentle", "hydrating", "sensitive skin"],
    isOnSale: false,
    imageKeywords: "cerave cleanser bottle"
  },
  
  // Baby Care
  {
    sku: "3504105028855",
    title: "Mustela Hydra Bebe Body Lotion 300ml",
    titleAr: "موستيلا لوشن الجسم للأطفال 300 مل",
    brand: "Mustela",
    category: "Baby Care",
    subcategory: "Baby Lotion",
    price: 18.000,
    description: "Daily moisturizing lotion for baby's delicate skin",
    descriptionAr: "لوشن مرطب يومي لبشرة الطفل الرقيقة",
    volumeMl: "300ml",
    tags: ["baby", "moisturizer", "gentle", "hypoallergenic"],
    isOnSale: false,
    imageKeywords: "baby lotion bottle"
  },
  
  // The Ordinary Products
  {
    sku: "769915190526",
    title: "The Ordinary Niacinamide 10% + Zinc 1% 30ml",
    titleAr: "ذا أورديناري نياسيناميد 10% + زنك 1% 30 مل",
    brand: "The Ordinary",
    category: "Skin Care",
    subcategory: "Serum",
    price: 12.000,
    originalPrice: 14.000,
    discountPercent: 14,
    isOnSale: true,
    description: "High-strength vitamin and mineral blemish formula",
    descriptionAr: "تركيبة فيتامين ومعادن عالية القوة للشوائب",
    volumeMl: "30ml",
    skinConcerns: ["acne", "oily-skin", "dark-spots"],
    tags: ["serum", "niacinamide", "zinc", "best seller"],
    imageKeywords: "the ordinary serum bottle"
  },
  {
    sku: "769915190533",
    title: "The Ordinary Hyaluronic Acid 2% + B5 30ml",
    titleAr: "ذا أورديناري حمض الهيالورونيك 2% + ب5 30 مل",
    brand: "The Ordinary",
    category: "Skin Care",
    subcategory: "Serum",
    price: 11.500,
    description: "Hydration support formula with ultra-pure, vegan hyaluronic acid",
    descriptionAr: "تركيبة دعم الترطيب بحمض الهيالورونيك النباتي فائق النقاء",
    volumeMl: "30ml",
    skinConcerns: ["hydration", "dry-skin"],
    tags: ["serum", "hyaluronic acid", "hydrating", "best seller"],
    isOnSale: false,
    imageKeywords: "hyaluronic acid serum bottle"
  },
];

// Category configuration for the store
export const STORE_CATEGORIES = [
  {
    id: 'skin-care',
    name: 'Skin Care',
    nameAr: 'العناية بالبشرة',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500',
    description: 'Premium skincare for radiant, healthy skin',
    descriptionAr: 'منتجات العناية بالبشرة الفاخرة لبشرة مشرقة وصحية',
    subcategories: ['Face Moisturizer', 'Serum', 'Cleanser', 'Sunscreen', 'Treatment', 'Face Cream', 'Toner', 'Mask']
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    nameAr: 'العناية بالشعر',
    icon: 'Scissors',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=500',
    description: 'Professional hair care solutions',
    descriptionAr: 'حلول العناية بالشعر الاحترافية',
    subcategories: ['Shampoo', 'Conditioner', 'Treatment', 'Hair Oil', 'Styling', 'Hair Color']
  },
  {
    id: 'body-care',
    name: 'Body Care',
    nameAr: 'العناية بالجسم',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=500',
    description: 'Luxurious body care for silky smooth skin',
    descriptionAr: 'العناية الفاخرة بالجسم لبشرة ناعمة كالحرير',
    subcategories: ['Body Lotion', 'Body Wash', 'Body Butter', 'Body Oil', 'Hand Care', 'Foot Care']
  },
  {
    id: 'makeup',
    name: 'Makeup',
    nameAr: 'المكياج',
    icon: 'Palette',
    image: 'https://images.unsplash.com/photo-1522338228045-9b68e7751395?auto=format&fit=crop&w=500',
    description: 'Express your beauty with premium makeup',
    descriptionAr: 'عبري عن جمالك بالمكياج الفاخر',
    subcategories: ['Lipstick', 'Foundation', 'Mascara', 'Eyeshadow', 'Blush', 'Nail Polish', 'Brushes']
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    nameAr: 'العطور',
    icon: 'Wind',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500',
    description: 'Signature scents for every occasion',
    descriptionAr: 'عطور مميزة لكل مناسبة',
    subcategories: ['Women Perfume', 'Men Perfume', 'Unisex', 'Body Mist', 'Gift Sets']
  },
  {
    id: 'health-supplements',
    name: 'Health & Supplements',
    nameAr: 'الصحة والمكملات',
    icon: 'Pill',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500',
    description: 'Vitamins and supplements for wellness',
    descriptionAr: 'الفيتامينات والمكملات للعافية',
    subcategories: ['Vitamins', 'Minerals', 'Digestive Support', 'Immune Support', 'Beauty Supplements']
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    nameAr: 'العناية الشخصية',
    icon: 'User',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=500',
    description: 'Essential personal care products',
    descriptionAr: 'منتجات العناية الشخصية الأساسية',
    subcategories: ['Deodorant', 'Oral Care', 'Shaving', 'Hair Removal']
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    nameAr: 'العناية بالأطفال',
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500',
    description: 'Gentle care for little ones',
    descriptionAr: 'عناية لطيفة للصغار',
    subcategories: ['Baby Lotion', 'Baby Wash', 'Diaper Care', 'Baby Oil']
  },
  {
    id: 'medical',
    name: 'Medical & Pharmacy',
    nameAr: 'طبي وصيدلاني',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500',
    description: 'Medical supplies and OTC products',
    descriptionAr: 'المستلزمات الطبية والمنتجات بدون وصفة',
    subcategories: ['Eye Care', 'First Aid', 'Pain Relief', 'Medical Devices']
  }
];

// Export a function to get products by category
export const getProductsByCategory = (category: string): ProductSeedData[] => {
  return SEED_PRODUCTS.filter(p => p.category === category);
};

// Export a function to get products by brand
export const getProductsByBrand = (brand: string): ProductSeedData[] => {
  return SEED_PRODUCTS.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
};

// Export a function to get on-sale products
export const getOnSaleProducts = (): ProductSeedData[] => {
  return SEED_PRODUCTS.filter(p => p.isOnSale);
};

// Export a function to get best seller products (based on tags)
export const getBestSellerProducts = (): ProductSeedData[] => {
  return SEED_PRODUCTS.filter(p => p.tags?.includes('best seller'));
};
