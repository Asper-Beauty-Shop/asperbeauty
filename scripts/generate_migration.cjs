const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// Category mapping based on product keywords (from bulk-product-upload/index.ts)
const CATEGORY_KEYWORDS = {
  "Skin Care": [
    "cream", "lotion", "serum", "moisturizer", "cleanser", "toner", "mask", "scrub",
    "sunscreen", "spf", "anti-aging", "wrinkle", "acne", "facial", "face", "skin",
    "كريم", "مرطب", "واقي", "بشرة", "وجه"
  ],
  "Hair Care": [
    "shampoo", "conditioner", "hair", "oil", "treatment", "mask", "spray",
    "شعر", "شامبو", "بلسم", "زيت"
  ],
  "Body Care": [
    "body lotion", "body wash", "soap", "hand cream", "foot", "deodorant",
    "جسم", "صابون", "يد"
  ],
  "Make Up": [
    "mascara", "lipstick", "foundation", "blush", "eyeshadow", "liner", "makeup",
    "nail", "polish", "cosmetic",
    "مكياج", "أحمر", "ماسكارا"
  ],
  "Fragrances": [
    "perfume", "cologne", "fragrance", "eau de", "spray", "scent",
    "عطر", "كولونيا"
  ],
  "Health & Supplements": [
    "vitamin", "supplement", "capsule", "tablet", "mineral", "omega", "probiotic",
    "فيتامين", "كبسولة", "مكمل"
  ],
  "Medical Supplies": [
    "cannula", "syringe", "glove", "bandage", "gauze", "medical", "surgical",
    "oximeter", "crutch",
    "طبي", "عكاز"
  ],
  "Personal Care": [
    "toothbrush", "toothpaste", "brush", "comb", "razor", "cotton",
    "فرشاة", "مشط"
  ]
};

function categorizeProduct(productName) {
  const nameLower = productName.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (nameLower.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  return "Uncategorized";
}

function extractBrand(productName) {
  const knownBrands = [
    "Palmer's", "Palmers", "Eucerin", "Vichy", "Bioderma", "Cetaphil",
    "Jergens", "Old Spice", "Speed Stick", "Sundown", "Jamieson",
    "Arm & Hammer", "Secret", "Teen Spirit", "SVR", "Bourjois",
    "Mavala", "Isadora", "Essence", "Bioten", "Olaplex"
  ];
  
  const nameLower = productName.toLowerCase();
  
  for (const brand of knownBrands) {
    if (nameLower.includes(brand.toLowerCase())) {
      return brand.replace("'s", "'s").replace("Palmers", "Palmer's");
    }
  }
  
  const firstWord = productName.split(/[\s-]/)[0];
  if (firstWord.length > 2 && /^[A-Z]/.test(firstWord)) {
    return firstWord;
  }
  
  return "Generic";
}

const COLUMN_MAPPINGS = {
  sku: ["الرمز", "رمز", "SKU", "Code", "Barcode", "الباركود"],
  name: ["اسم المادة", "اسم المنتج", "Product Name", "Name", "المنتج", "الاسم"],
  costPrice: ["الكلفة", "سعر الشراء", "Cost", "Cost Price", "التكلفة"],
  sellingPrice: ["سعر البيع", "السعر", "Price", "Selling Price", "Sale Price"],
};

async function main() {
  const workbook = new ExcelJS.Workbook();
  const filePath = 'كشف المواد  (المواد 16% المتوفرة) عدد 1526 اول كشف.xlsx';
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  console.log(`Reading ${filePath}...`);
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];
  
  if (!worksheet) {
    console.error("No worksheet found");
    process.exit(1);
  }

  const headerRow = worksheet.getRow(1);
  const headers = [];
  headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    headers[colNumber - 1] = String(cell.value || "").trim();
  });

  console.log("Headers:", headers);

  const skuColIdx = headers.findIndex(h => COLUMN_MAPPINGS.sku.some(m => 
    h.toLowerCase().trim() === m.toLowerCase().trim() || h.includes(m) || m.includes(h)
  ));
  const nameColIdx = headers.findIndex(h => COLUMN_MAPPINGS.name.some(m => 
    h.toLowerCase().trim() === m.toLowerCase().trim() || h.includes(m) || m.includes(h)
  ));
  const priceColIdx = headers.findIndex(h => COLUMN_MAPPINGS.sellingPrice.some(m => 
    h.toLowerCase().trim() === m.toLowerCase().trim() || h.includes(m) || m.includes(h)
  ));

  console.log("Column Indices:", { skuColIdx, nameColIdx, priceColIdx });

  if (nameColIdx === -1 || priceColIdx === -1) {
    console.error("Missing required columns");
    process.exit(1);
  }

  const sqlStatements = [];
  sqlStatements.push('-- Seed products from Excel file');
  
  // Batch inserts to avoid huge single statement if preferred, but for 1500 rows, separate INSERTs are safer for errors
  // Or one big INSERT with multiple VALUES. Postgres limit is high, but let's do chunks of 50.
  
  let currentChunk = [];
  const chunkSize = 50;
  
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    
    const getCellValue = (colIdx) => {
      if (colIdx === -1) return "";
      const cell = row.getCell(colIdx + 1);
      return String(cell.value || "").trim();
    };

    const name = getCellValue(nameColIdx);
    if (!name) return;
    
    const sku = getCellValue(skuColIdx) || `SKU-${rowNumber}`;
    const priceStr = getCellValue(priceColIdx).replace(/[^0-9.]/g, "");
    const price = parseFloat(priceStr) || 0;
    
    const category = categorizeProduct(name);
    const brand = extractBrand(name);
    
    // Escape single quotes
    const escape = (str) => str.replace(/'/g, "''");
    
    currentChunk.push(`('${escape(name)}', ${price}, '${escape(category)}', '${escape(brand)}', '${escape(sku)}')`);
    
    if (currentChunk.length >= chunkSize) {
      sqlStatements.push(`INSERT INTO public.products (title, price, category, brand, sku) VALUES \n${currentChunk.join(',\n')} \nON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, title = EXCLUDED.title, category = EXCLUDED.category, brand = EXCLUDED.brand;`);
      currentChunk = [];
    }
  });

  if (currentChunk.length > 0) {
    sqlStatements.push(`INSERT INTO public.products (title, price, category, brand, sku) VALUES \n${currentChunk.join(',\n')} \nON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, title = EXCLUDED.title, category = EXCLUDED.category, brand = EXCLUDED.brand;`);
  }

  const outputPath = 'supabase/migrations/20260123000001_seed_products.sql';
  fs.writeFileSync(outputPath, sqlStatements.join('\n\n'));
  console.log(`Generated migration file at ${outputPath}`);
}

main().catch(console.error);
