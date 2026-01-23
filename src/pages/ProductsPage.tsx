import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Star, Leaf, Truck, Shield, X, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { toast } from "sonner";

const categories = ["All", "Hair Care", "Skin Care", "Digestive", "Immunity", "Mental Wellness", "Pain Relief", "Kids Health", "Women's Health"];

const ProductsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    setLoading(true);

    setProducts([]);
    setLoading(false);
  };

  const loadCart = async () => {
    setCartLoading(true);
    setCartItems([]);
    setCartLoading(false);
  };

  const filteredProducts = selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = async (product: any) => {
    console.log(product);
    toast.success("Added to cart!");
    loadCart();
  };

  const handleUpdateQuantity = async (cartItemId: string, delta: number) => {
    const item = cartItems.find((i) => i.id === cartItemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    const error = "";

    if (error) {
      toast.error("Failed to update cart");
      console.error(error);
    } else {
      loadCart();
    }
  };

  const handleRemoveFromCart = async (cartItemId: string) => {
    const error = "";
    if (error) {
      toast.error("Failed to remove item");
      console.error(error);
    } else {
      toast.success("Item removed");
      loadCart();
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/cart");
  };

  const cartTotal = 123;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-gradient-to-br from-primaryLightColor to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-primaryColor font-medium text-sm mb-6 shadow-sm">
            <Leaf className="w-4 h-4" />
            100% Natural & Safe
          </span>
          <h1 className="heading text-3xl md:text-5xl mb-6">
            Homeopathic <span className="text-primaryColor">Products</span>
          </h1>
          <p className="text__para max-w-2xl mx-auto">Discover our range of authentic homeopathic remedies, carefully curated by Dr. Nikhat for your wellness journey.</p>
        </div>
      </section>

      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primaryLightColor flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primaryColor" />
              </div>
              <div>
                <p className="font-semibold text-headingColor">100% Natural</p>
                <p className="text-sm text-textColor">No side effects</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primaryLightColor flex items-center justify-center">
                <Truck className="w-6 h-6 text-primaryColor" />
              </div>
              <div>
                <p className="font-semibold text-headingColor">Free Delivery</p>
                <p className="text-sm text-textColor">On orders above ₹500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primaryLightColor flex items-center justify-center">
                <Shield className="w-6 h-6 text-primaryColor" />
              </div>
              <div>
                <p className="font-semibold text-headingColor">Quality Assured</p>
                <p className="text-sm text-textColor">Certified products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category ? "bg-primaryColor text-white shadow-lg" : "bg-gray-100 text-textColor hover:bg-primaryLightColor hover:text-primaryColor"
                }`}>
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <Link to={`/products/${product.id}`} className="block">
                  <div className="relative">
                    <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    {product.badge && <span className="absolute top-3 left-3 bg-secondaryColor text-white text-xs font-semibold px-3 py-1 rounded-full">{product.badge}</span>}
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white text-headingColor font-semibold px-4 py-2 rounded-full">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primaryColor bg-primaryLightColor px-2 py-1 rounded">{product.category}</span>
                    <h3 className="font-bold text-headingColor mt-3 mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-textColor mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-textColor">({product.reviews_count} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primaryColor">₹{product.price}</span>
                      {product.original_price && <span className="text-sm text-textColor line-through">₹{product.original_price}</span>}
                    </div>
                  </div>
                </Link>
                <div className="px-5 pb-5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // product.in_stock && handleAddToCart(product);
                    }}
                    disabled={!product.in_stock}
                    className={`w-full py-2 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      product.in_stock ? "bg-primaryColor text-white hover:bg-primaryDarkColor" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}>
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-textColor text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-24 right-6 bg-primaryColor text-white p-4 rounded-full shadow-xl hover:bg-primaryDarkColor transition-all duration-300 z-40">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-secondaryColor text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{cartCount}</span>
        </button>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-headingColor">Your Cart ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-textColor">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-xl">
                        <img src={item.product.image_url} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-headingColor">{item.product.name}</h4>
                          <p className="text-primaryColor font-bold">₹{item.product.price}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button onClick={() => handleUpdateQuantity(item.id, -1)} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-primaryLightColor">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-primaryLightColor">
                              <Plus className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleRemoveFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-600">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t bg-gray-50">
                  <div className="flex justify-between mb-4">
                    <span className="text-textColor">Subtotal</span>
                    <span className="font-bold text-headingColor">₹{cartTotal}</span>
                  </div>
                  {cartTotal < 500 && <p className="text-xs text-green-600 mb-4">Add ₹{500 - cartTotal} more for free shipping!</p>}
                  <button onClick={handleCheckout} className="w-full btn bg-primaryColor hover:bg-primaryDarkColor flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    View Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductsPage;
