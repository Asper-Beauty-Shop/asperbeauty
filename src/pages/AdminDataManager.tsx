import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Database, 
  Upload, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Package,
  Store,
  ShoppingBag,
  BarChart3
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PRODUCT_CATALOG, TOTAL_PRODUCTS, getAllBrands, getAllCategories } from "@/lib/productData";
import { seedProducts, clearProducts, getProductCounts, validateProducts } from "@/lib/seedDatabase";
import { syncSupabaseToShopify } from "@/lib/shopifySync";

export default function AdminDataManager() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dbStats, setDbStats] = useState<{
    total: number;
    categories: Record<string, number>;
  }>({ total: 0, categories: {} });
  
  const [seedingState, setSeedingState] = useState<{
    isSeeding: boolean;
    progress: number;
    status: string;
    results: { success: number; failed: number; errors: string[] } | null;
  }>({
    isSeeding: false,
    progress: 0,
    status: '',
    results: null,
  });

  const [syncState, setSyncState] = useState<{
    isSyncing: boolean;
    progress: number;
    total: number;
    status: string;
    results: { success: number; failed: number; errors: Array<{ id: string; title: string; error: string }> } | null;
  }>({
    isSyncing: false,
    progress: 0,
    total: 0,
    status: '',
    results: null,
  });

  // Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      setIsAdmin(roleData?.role === 'admin');
      setIsLoading(false);
    };

    checkAdmin();
    loadDbStats();
  }, []);

  // Load database stats
  const loadDbStats = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('category');

    if (!error && data) {
      const categories: Record<string, number> = {};
      for (const product of data) {
        categories[product.category] = (categories[product.category] || 0) + 1;
      }
      setDbStats({ total: data.length, categories });
    }
  };

  // Seed database
  const handleSeedDatabase = async () => {
    setSeedingState({
      isSeeding: true,
      progress: 0,
      status: 'Starting seed...',
      results: null,
    });

    try {
      setSeedingState(prev => ({ ...prev, status: 'Seeding products...', progress: 50 }));
      
      const results = await seedProducts();
      
      setSeedingState({
        isSeeding: false,
        progress: 100,
        status: 'Complete',
        results,
      });

      if (results.success > 0) {
        toast.success(`Successfully seeded ${results.success} products!`);
      }
      if (results.failed > 0) {
        toast.error(`Failed to seed ${results.failed} products`);
      }

      loadDbStats();
    } catch (error: any) {
      setSeedingState(prev => ({
        ...prev,
        isSeeding: false,
        status: 'Failed',
        results: { success: 0, failed: 0, errors: [error.message] },
      }));
      toast.error('Failed to seed database');
    }
  };

  // Clear database
  const handleClearDatabase = async () => {
    if (!window.confirm('Are you sure you want to delete ALL products? This cannot be undone.')) {
      return;
    }

    try {
      const result = await clearProducts();
      
      if (result.deleted) {
        toast.success('All products deleted');
        loadDbStats();
      } else {
        toast.error(`Failed to delete: ${result.error}`);
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Validate products
  const handleValidate = async () => {
    try {
      const results = await validateProducts();
      
      if (results.issues.length === 0) {
        toast.success(`All ${results.valid} products are valid!`);
      } else {
        toast.warning(`${results.valid} valid, ${results.issues.length} issues found`);
        console.log('Validation issues:', results.issues);
      }
    } catch (error: any) {
      toast.error(`Validation error: ${error.message}`);
    }
  };

  // Sync to Shopify
  const handleShopifySync = async () => {
    setSyncState({
      isSyncing: true,
      progress: 0,
      total: dbStats.total,
      status: 'Starting sync...',
      results: null,
    });

    try {
      const results = await syncSupabaseToShopify((current, total, status) => {
        setSyncState(prev => ({
          ...prev,
          progress: current,
          total,
          status,
        }));
      });

      setSyncState({
        isSyncing: false,
        progress: results.success + results.failed,
        total: results.success + results.failed,
        status: 'Complete',
        results,
      });

      if (results.success > 0) {
        toast.success(`Synced ${results.success} products to Shopify!`);
      }
      if (results.failed > 0) {
        toast.error(`Failed to sync ${results.failed} products`);
      }
    } catch (error: any) {
      setSyncState(prev => ({
        ...prev,
        isSyncing: false,
        status: 'Failed',
      }));
      toast.error(`Sync error: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-burgundy" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-serif text-charcoal mb-2">Access Denied</h1>
            <p className="text-taupe">You need admin privileges to access this page.</p>
            <Button asChild className="mt-6">
              <a href="/auth">Sign In</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-charcoal mb-4">Data Manager</h1>
            <p className="text-taupe">Manage product data, database seeding, and Shopify sync</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Database className="w-8 h-8 text-burgundy" />
                  <div>
                    <p className="text-2xl font-bold text-charcoal">{dbStats.total}</p>
                    <p className="text-xs text-taupe">In Database</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-gold" />
                  <div>
                    <p className="text-2xl font-bold text-charcoal">{TOTAL_PRODUCTS}</p>
                    <p className="text-xs text-taupe">In Catalog</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Store className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-charcoal">{getAllBrands().length}</p>
                    <p className="text-xs text-taupe">Brands</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-charcoal">{getAllCategories().length}</p>
                    <p className="text-xs text-taupe">Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="database" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="shopify">Shopify Sync</TabsTrigger>
              <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
            </TabsList>

            {/* Database Tab */}
            <TabsContent value="database">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Seed Database */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Seed Database
                    </CardTitle>
                    <CardDescription>
                      Populate database with {TOTAL_PRODUCTS} curated products
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {seedingState.isSeeding && (
                      <div className="space-y-2">
                        <Progress value={seedingState.progress} />
                        <p className="text-sm text-taupe">{seedingState.status}</p>
                      </div>
                    )}
                    
                    {seedingState.results && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">
                            {seedingState.results.success} products seeded
                          </span>
                        </div>
                        {seedingState.results.failed > 0 && (
                          <p className="text-sm text-red-600">
                            {seedingState.results.failed} failed
                          </p>
                        )}
                      </div>
                    )}

                    <Button 
                      onClick={handleSeedDatabase}
                      disabled={seedingState.isSeeding}
                      className="w-full"
                    >
                      {seedingState.isSeeding ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Seeding...</>
                      ) : (
                        <><Upload className="w-4 h-4 mr-2" />Seed Products</>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Database Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Database Actions
                    </CardTitle>
                    <CardDescription>
                      Manage and validate database content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Category breakdown */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-charcoal">Products by Category:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(dbStats.categories).map(([cat, count]) => (
                          <div key={cat} className="flex justify-between text-sm p-2 bg-taupe/5 rounded">
                            <span className="text-taupe truncate">{cat}</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleValidate} className="flex-1">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Validate
                      </Button>
                      <Button variant="outline" onClick={loadDbStats} className="flex-1">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>

                    <Button 
                      variant="destructive" 
                      onClick={handleClearDatabase}
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All Products
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Shopify Sync Tab */}
            <TabsContent value="shopify">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Shopify Product Sync
                  </CardTitle>
                  <CardDescription>
                    Sync all products from database to Shopify store
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {syncState.isSyncing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-taupe">{syncState.status}</span>
                        <span className="font-medium">{syncState.progress} / {syncState.total}</span>
                      </div>
                      <Progress value={(syncState.progress / syncState.total) * 100} />
                    </div>
                  )}

                  {syncState.results && (
                    <div className={`p-4 rounded-lg ${syncState.results.failed > 0 ? 'bg-amber-50' : 'bg-green-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className={`w-4 h-4 ${syncState.results.failed > 0 ? 'text-amber-600' : 'text-green-600'}`} />
                        <span className="font-medium">
                          {syncState.results.success} synced, {syncState.results.failed} failed
                        </span>
                      </div>
                      {syncState.results.errors.length > 0 && (
                        <ScrollArea className="h-32">
                          <div className="space-y-1">
                            {syncState.results.errors.slice(0, 10).map((err, i) => (
                              <p key={i} className="text-xs text-red-600">
                                {err.title}: {err.error}
                              </p>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </div>
                  )}

                  <Button 
                    onClick={handleShopifySync}
                    disabled={syncState.isSyncing || dbStats.total === 0}
                    className="w-full"
                    size="lg"
                  >
                    {syncState.isSyncing ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Syncing to Shopify...</>
                    ) : (
                      <><ShoppingBag className="w-4 h-4 mr-2" />Sync {dbStats.total} Products to Shopify</>
                    )}
                  </Button>

                  <p className="text-xs text-taupe text-center">
                    This will create products in your Shopify store. Rate limits apply.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Catalog Tab */}
            <TabsContent value="catalog">
              <Card>
                <CardHeader>
                  <CardTitle>Product Catalog Preview</CardTitle>
                  <CardDescription>
                    Preview the {TOTAL_PRODUCTS} products ready for import
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-2">
                      {PRODUCT_CATALOG.map((product) => (
                        <div 
                          key={product.sku}
                          className="flex items-center gap-4 p-3 bg-white rounded-lg border border-taupe/10"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-charcoal truncate">{product.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                              <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                              {product.isOnSale && (
                                <Badge className="text-xs bg-red-500">-{product.discountPercent}%</Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gold">{product.price.toFixed(2)} JOD</p>
                            {product.originalPrice && (
                              <p className="text-xs text-taupe line-through">{product.originalPrice.toFixed(2)} JOD</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
