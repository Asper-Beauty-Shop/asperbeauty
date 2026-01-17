import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Category mapping based on product keywords
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

// Usage mapping based on product keywords
const USAGE_KEYWORDS = {
  "Daily Care": [
    "daily", "wash", "soap", "cleanser", "shampoo", "conditioner", "deodorant", "toothpaste", 
    "shower", "hygiene", "yomi", "yawmi"
  ],
  "Treatment": [
    "treatment", "repair", "serum", "acne", "anti-aging", "wrinkle", "medical", "solution", 
    "therapy", "cure", "medicinal", "heal"
  ],
  "Night Care": [
    "night", "overnight", "sleep", "mask", "pm", "bedtime"
  ],
  "Sun Protection": [
    "sunscreen", "spf", "sun", "block", "protection", "uv", "uva", "uvb"
  ],
  "Professional": [
    "pro", "professional", "salon", "clinic", "expert", "advanced"
  ],
  "Hydration": [
    "moisturizer", "lotion", "cream", "hydrate", "dry skin", "wet", "aqua", "water"
  ],
  "Enhancement": [
    "makeup", "mascara", "lipstick", "foundation", "blush", "eyeshadow", "liner", "color", 
    "glow", "shine", "tint"
  ]
};

// Categorize product based on name
function categorizeProduct(productName: string): string {
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

// Determine usage based on name and category
function determineUsage(productName: string, category: string): string {
  const nameLower = productName.toLowerCase();
  
  // Check specific usage keywords first
  for (const [usage, keywords] of Object.entries(USAGE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (nameLower.includes(keyword.toLowerCase())) {
        return usage;
      }
    }
  }
  
  // Fallback based on category
  if (category === "Make Up") return "Enhancement";
  if (category === "Medical Supplies") return "Treatment";
  if (category === "Fragrances") return "Enhancement";
  
  return "General Care";
}

// Extract brand from product name
function extractBrand(productName: string): string {
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
  
  // Try to extract first word as potential brand
  const firstWord = productName.split(/[\s-]/)[0];
  if (firstWord.length > 2 && /^[A-Z]/.test(firstWord)) {
    return firstWord;
  }
  
  return "Generic";
}

// Generate image prompt based on product name, category, and usage
function generateImagePrompt(productName: string, category: string, usage: string): string {
  const basePrompt = `High-end commercial product photography of ${productName}, luxurious style. `;
  
  const categoryStyles: Record<string, string> = {
    "Skin Care": "Elegant skincare product bottle/jar on minimalist marble surface with soft natural lighting, premium cosmetic packaging, clean white background with subtle shadows. Professional beauty product photography.",
    "Hair Care": "Professional hair care product bottle on sleek surface with subtle reflections, premium salon-quality packaging, clean studio lighting. Beauty product commercial photography.",
    "Body Care": "Luxurious body care product with elegant packaging, soft natural elements like cotton or leaves, warm ambient lighting. Premium personal care product photography.",
    "Make Up": "Glamorous makeup product with sophisticated packaging, dramatic lighting with rich colors, professional cosmetic photography style. Luxury beauty brand aesthetic.",
    "Fragrances": "Elegant perfume bottle with artistic lighting, glass reflections, sophisticated luxury fragrance photography. High-end perfumery aesthetic.",
    "Health & Supplements": "Clean vitamin/supplement bottle with professional pharmaceutical styling, white background, crisp clinical photography. Health product commercial style.",
    "Medical Supplies": "Clean medical product on white background, professional healthcare product photography, clinical and sterile appearance.",
    "Personal Care": "Fresh personal care product with clean styling, bright natural lighting, everyday hygiene product photography."
  };
  
  const usageStyles: Record<string, string> = {
    "Daily Care": "Fresh and clean atmosphere, morning light.",
    "Treatment": "Clinical and pure aesthetic, scientific precision.",
    "Night Care": "Deep, calming colors, evening ambiance, soft shadows.",
    "Sun Protection": "Bright, sunny atmosphere, outdoor feel.",
    "Professional": "Sleek, salon-like environment, premium finish.",
    "Hydration": "Water droplets, splashing water, refreshing feel.",
    "Enhancement": "Vibrant colors, artistic composition."
  };

  const style = categoryStyles[category] || categoryStyles["Personal Care"];
  const usageStyle = usageStyles[usage] || "Clean and professional look.";
  
  return `${basePrompt} ${style} ${usageStyle} High resolution, detailed texture, photorealistic, 8k.`;
}

interface ProductData {
  sku: string;
  name: string;
  costPrice: number;
  sellingPrice: number;
}

interface ProcessedProduct {
  sku: string;
  name: string;
  category: string;
  usage: string;
  brand: string;
  price: number;
  costPrice: number;
  imagePrompt: string;
  imageUrl?: string;
  status: "pending" | "processing" | "completed" | "failed";
  error?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ==================== AUTHENTICATION ====================
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing or invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase clients
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Client for auth verification (uses user's token)
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    
    // Verify the user's token
    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();

    if (userError || !user) {
      console.error("Token verification failed:", userError);
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = user.id;
    console.log("Authenticated user:", userId);

    // ==================== AUTHORIZATION (Admin Check) ====================
    // Use service role client to check user roles (bypasses RLS)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (roleError && roleError.code !== "PGRST116") {
      // PGRST116 means no rows found - that's expected for non-admin users
      console.error("Role check error:", roleError);
    }

    const isAdmin = roleData?.role === "admin";
    if (!isAdmin) {
      console.error("User is not an admin:", userId);
      return new Response(
        JSON.stringify({ error: "Forbidden: Admin access required for bulk operations" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Admin access verified for user:", userId);

    // ==================== PROCESS REQUEST ====================
    const requestData = await req.json();
    const { action } = requestData;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Service role client for storage and other operations
    const supabase = supabaseAdmin;

    // Shopify Admin API configuration
    const SHOPIFY_ACCESS_TOKEN = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    const SHOPIFY_STORE_DOMAIN = "lovable-project-milns.myshopify.com";
    const SHOPIFY_API_VERSION = "2025-01";

    if (action === "categorize") {
      // Categorize and prepare products from Excel data
      const { products } = requestData;
      const processedProducts: ProcessedProduct[] = products.map((product: ProductData) => {
        const category = categorizeProduct(product.name);
        const usage = determineUsage(product.name, category);
        const brand = extractBrand(product.name);
        const imagePrompt = generateImagePrompt(product.name, category, usage);
        
        return {
          sku: product.sku,
          name: product.name,
          category,
          usage,
          brand,
          price: product.sellingPrice,
          costPrice: product.costPrice,
          imagePrompt,
          status: "pending" as const,
        };
      });

      // Get category distribution for summary
      const categoryCount: Record<string, number> = {};
      const usageCount: Record<string, number> = {};
      const brandCount: Record<string, number> = {};
      
      processedProducts.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
        usageCount[p.usage] = (usageCount[p.usage] || 0) + 1;
        brandCount[p.brand] = (brandCount[p.brand] || 0) + 1;
      });

      return new Response(
        JSON.stringify({
          success: true,
          products: processedProducts,
          summary: {
            total: processedProducts.length,
            categories: categoryCount,
            usages: usageCount,
            brands: brandCount,
          },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "generate-image") {
      // Generate image for a single product using Lovable AI
      const { productName, category, imagePrompt } = requestData;
      
      console.log(`Generating image for: ${productName}`);
      
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: imagePrompt,
            },
          ],
          modalities: ["image", "text"],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Image generation failed:", response.status, errorText);
        
        if (response.status === 429) {
          return new Response(
            JSON.stringify({ error: "Rate limited. Please wait before generating more images.", retryAfter: 60 }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        throw new Error(`Image generation failed: ${response.status}`);
      }

      const data = await response.json();
      const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      if (!imageUrl) {
        throw new Error("No image returned from AI");
      }

      // Upload to Supabase Storage
      const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      const fileName = `products/${Date.now()}-${productName.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 50)}.png`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageBuffer, {
          contentType: "image/png",
          upsert: true,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        // Return base64 as fallback
        return new Response(
          JSON.stringify({ success: true, imageUrl, isBase64: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: publicUrl } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      return new Response(
        JSON.stringify({ success: true, imageUrl: publicUrl.publicUrl }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "create-shopify-product") {
      // Create a product in Shopify using Admin API
      const { product } = requestData;
      
      if (!SHOPIFY_ACCESS_TOKEN) {
        throw new Error("SHOPIFY_ACCESS_TOKEN is not configured.");
      }

      console.log(`Creating Shopify product: ${product.title}`);

      // Prepare the product data for Shopify Admin API
      const shopifyProduct = {
        product: {
          title: product.title,
          body_html: `<p>${product.body || ""}</p><p><strong>Usage:</strong> ${product.usage || "General"}</p>`,
          vendor: product.vendor || "Asper",
          product_type: product.product_type || "General",
          tags: product.tags ? `${product.tags}, ${product.usage || ""}` : `${product.usage || ""}`,
          status: "active",
          variants: [
            {
              price: product.price,
              sku: product.sku,
              inventory_management: "shopify",
              inventory_policy: "continue",
            },
          ],
          images: product.imageUrl ? [
            {
              src: product.imageUrl,
              alt: product.title,
            },
          ] : [],
        },
      };

      const shopifyResponse = await fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/products.json`,
        {
          method: "POST",
          headers: {
            "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shopifyProduct),
        }
      );

      if (!shopifyResponse.ok) {
        const errorData = await shopifyResponse.text();
        console.error("Shopify API error:", shopifyResponse.status, errorData);
        
        if (shopifyResponse.status === 429) {
          return new Response(
            JSON.stringify({ error: "Rate limited by Shopify. Please wait.", retryAfter: 60 }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        throw new Error(`Shopify API error: ${shopifyResponse.status} - ${errorData}`);
      }

      const shopifyData = await shopifyResponse.json();
      
      console.log(`Successfully created product: ${shopifyData.product?.id}`);

      return new Response(
        JSON.stringify({ 
          success: true, 
          productId: shopifyData.product?.id,
          handle: shopifyData.product?.handle,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "ai-categorize") {
      // Use AI for smarter categorization
      const { productNames } = requestData;
      
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are a product categorization expert for a beauty and pharmacy store. 
                Categories: Skin Care, Hair Care, Body Care, Make Up, Fragrances, Health & Supplements, Medical Supplies, Personal Care.
                Usages: Daily Care, Treatment, Night Care, Sun Protection, Professional, Hydration, Enhancement.
                Return a JSON array with {name, category, usage, brand} for each product.`,
            },
            {
              role: "user",
              content: `Categorize these products:\n${productNames.join("\n")}`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "categorize_products",
                description: "Categorize products into appropriate categories",
                parameters: {
                  type: "object",
                  properties: {
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          category: { 
                            type: "string",
                            enum: ["Skin Care", "Hair Care", "Body Care", "Make Up", "Fragrances", "Health & Supplements", "Medical Supplies", "Personal Care", "Uncategorized"]
                          },
                          usage: { type: "string" },
                          brand: { type: "string" },
                        },
                        required: ["name", "category", "usage", "brand"],
                      },
                    },
                  },
                  required: ["products"],
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "categorize_products" } },
        }),
      });

      if (!response.ok) {
        throw new Error(`AI categorization failed: ${response.status}`);
      }

      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      
      if (toolCall) {
        const result = JSON.parse(toolCall.function.arguments);
        return new Response(
          JSON.stringify({ success: true, products: result.products }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error("Failed to parse AI response");
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
