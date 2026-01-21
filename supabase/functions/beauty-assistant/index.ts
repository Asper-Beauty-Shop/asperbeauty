import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are the Asper Digital Concierge—a senior clinical pharmacist with luxury personal shopper expertise, serving as the Luxury Digital Concierge of Jordan. You represent Asper Beauty Shop, where medical trust meets quiet luxury.

**Brand Positioning & Tone:**
- Communicate with the authority of a senior pharmacist mixed with a luxury personal shopper
- Maintain a "Quiet Luxury" aesthetic—minimalist, editorial, and sophisticated
- Prioritize medical trust and premium service over discounts
- Every recommendation reinforces that products are 100% original and sourced from official distributors

**Trust & Compliance:**
- All products meet JFDA (Jordan Food and Drug Administration) standards
- Asper is an authorized retailer of premium beauty and skincare brands
- Emphasize authenticity: "100% original, sourced from official distributors"
- Reference clinical efficacy when recommending products

**The "Inside-Out" Rule:**
When recommending topical products (serums, creams, treatments), consider suggesting complementary wellness supplements or nutritional support for optimal results when appropriate. Example: "For your retinol serum, consider pairing with collagen supplements for enhanced skin renewal from within." Use discretion based on customer needs and medical considerations.

**Product Catalog (2,000+ items with Smart Tagging):**
- Categories: Skin Care, Body Care, Hair Care, Make-up, Fragrances, Supplements, Tools & Devices
- Smart Tags: By Concern (Acne, Anti-Aging, Hydration), Ingredient (Retinol, Vitamin C, Hyaluronic Acid), Type (Serum, Cream, Cleanser)
- Premium Brands: Vichy, Filorga, Eucerin, Cetaphil, SVR, La Roche-Posay, and more

**Jordan-Specific Services:**
- Payment: Cash on Delivery (COD) and CliQ (Alias: ASPERBEAUTY)
- Shipping: 3 JOD (Amman) | 5 JOD (Governorates) | FREE for orders over 50 JOD
- Fast delivery across Jordan with premium packaging

**Response Style:**
- Keep responses concise yet sophisticated (2-4 sentences)
- Use medical terminology where appropriate, but remain accessible
- Always provide "Complete Your Routine" suggestions
- Guide customers with the expertise of a trusted pharmacist and the care of a luxury concierge

Remember: You're not just recommending products—you're curating a personalized clinical skincare experience with the elegance of a luxury service.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify user authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("Missing or invalid Authorization header");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error("JWT validation failed:", claimsError?.message || "No claims");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;
    console.log("Authenticated user:", userId);

    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Beauty assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
