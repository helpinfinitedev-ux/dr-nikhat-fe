import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Star, Leaf, Truck, Shield, X, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { toast } from "sonner";
import { ProductsService } from "@/services/products.service";
import { CartService } from "@/services/cart.service";
import RegisterForm from "@/pages/Register/components/RegisterForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserContext from "@/context/User/UserContext";
import ConfirmOrderModal from "@/components/confirm-order-modal";

export const categories = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Hair Care",
    value: "hair-care",
  },
  {
    label: "Skin Care",
    value: "skin-care",
  },
  {
    label: "Digestive",
    value: "digestive",
  },
];

const ProductsPage = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isConfirmOrderOpen, setIsConfirmOrderOpen] = useState(false);
  const { user, setTriggerUserFetch } = useContext(UserContext);
  const [registerModalProduct, setRegisterModalProduct] = useState<any>(null);
  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const [response, error] = await ProductsService.getProducts();
      const payload = Array.isArray(response.data) ? response.data : response.data?.data;
      const normalized = (payload || []).map((product: any) => ({
        ...product,
        id: product.id || product._id,
        imageUrl: product.imageUrls?.[0] || product.image_url || "",
        inStock: true,
      }));
      console.log(normalized);
      setProducts(normalized);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    setCartLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [response, error] = await CartService.getCart();
    if (error) {
      toast.error("Failed to load cart");
      console.error(error);
    } else {
      setCartItems(response.data?.data);
    }
    setCartLoading(false);
  };

  const filteredProducts = selectedCategory === "all" ? products : products.filter((p: any) => p.category === selectedCategory);

  const handleAddToCart = async (product: any) => {
    if (!localStorage.getItem("token")) {
      setIsRegisterOpen(true);
      setRegisterModalProduct(product);
    }
    const [response, error] = await CartService.addToCart(product.id, 1);
    if (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    } else {
      toast.success("Added to cart!");
      loadCart();
    }
    toast.success("Added to cart!");
    loadCart();
  };

  const handleUpdateQuantity = async (productId: string, delta: number) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity === 0) {
      return await handleRemoveFromCart(item.id, productId);
    }
    const [response, error] = await CartService.addToCart(productId, newQuantity);
    if (error) {
      toast.error("Failed to update cart");
      console.error(error);
    } else {
      toast.success("Cart updated");
      loadCart();
    }

    if (error) {
      toast.error("Failed to update cart");
      console.error(error);
    } else {
      loadCart();
    }
  };

  const handleRemoveFromCart = async (cartItemId: string, productId: string) => {
    const [response, error] = await CartService.removeFromCart(cartItemId, productId);
    if (error) {
      toast.error("Failed to remove item");
      console.error(error);
    }
    toast.success("Item removed");
    loadCart();
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsConfirmOrderOpen(true);
  };

  const handleOrderSuccess = () => {
    // Clear the cart after successful order
    setCartItems([]);
    // loadCart();
  };

  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log(cartItems);
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

  const getLabel = (category: string) => {
    return categories.find((c) => c.value === category)?.label;
  };

  const CartQuantityButton = ({ cartId, productId, quantity }: { cartId: string; productId: string; quantity: number }) => (
    <div className="flex items-center gap-3 mt-2 bg-gray-50 rounded-[32px] px-4 py-3">
      <button onClick={() => handleUpdateQuantity(productId, -1)} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-primaryLightColor">
        <Minus className="w-4 h-4" />
      </button>
      <span className="font-medium">{quantity}</span>
      <button onClick={() => handleUpdateQuantity(productId, 1)} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-primaryLightColor">
        <Plus className="w-4 h-4" />
      </button>
      <button onClick={() => handleRemoveFromCart(cartId, productId)} className="ml-auto text-red-500 hover:text-red-600">
        <X className="w-5 h-5" />
      </button>
    </div>
  );

  const isProductInCart = (productId) => {
    return cartItems?.some((item) => item?.productId === productId);
  };

  const getCartItems = (productId) => {
    const res = cartItems
      ?.map((item) => ({
        ...item,
        productId: item.productId,
        quantity: item.quantity,
      }))
      .filter((item) => item?.productId === productId);

    return {
      productId: res[0]?.productId,
      quantity: res[0]?.quantity,
      cartId: res[0]?.id,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader></DialogHeader>
          <RegisterForm
            embedded
            onSuccess={async () => {
              setIsRegisterOpen(false);
              if (registerModalProduct) {
                setTriggerUserFetch(true);
                await handleAddToCart(registerModalProduct);
              }
            }}></RegisterForm>
        </DialogContent>
      </Dialog>

      <ConfirmOrderModal isOpen={isConfirmOrderOpen} onClose={() => setIsConfirmOrderOpen(false)} user={user} cartItems={cartItems} cartTotal={cartTotal} onOrderSuccess={handleOrderSuccess} />

      <div className="flex flex-col gap-4">
        <section className="bg-gradient-to-br from-primaryLightColor to-white py-2">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-primary font-medium text-sm mb-6 shadow-sm">
              <Leaf className="w-4 h-4" />
              100% Natural & Safe
            </span>
            <h1 className="heading text-3xl md:text-5xl mb-6">
              Homeopathic <span className="text-primaryColor">Products</span>
            </h1>
            <p className="text__para max-w-2xl mx-auto">Discover our range of authentic homeopathic remedies, carefully curated by Dr. Nikhat for your wellness journey.</p>
          </div>
        </section>

        <section className="pb-12   border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
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
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.value ? "bg-primary text-white shadow-lg" : "bg-gray-100 text-textColor hover:bg-primaryLightColor hover:text-primaryColor"
                  }`}>
                  {category.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: any) => {
                const imageUrl = product.imageUrl || product.imageUrls?.[0] || "";
                const originalPrice = product.original_price ?? product.price;
                const showOriginal = Number(product.offer) > 0 && originalPrice;
                const displayPrice = product.discountedPrice ?? product.price;
                const hasRating = typeof product.rating === "number";
                const reviewsCount = product.reviews_count ?? 0;

                return (
                  <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <Link to={`/products/${product.id}`} className="block">
                      <div className="relative">
                        {imageUrl ? (
                          <img src={imageUrl} alt={product.name} className="w-full h-[336px] object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                        )}
                        {product.badge && <span className="absolute top-3 left-3 bg-gray-400 text-white text-xs font-semibold px-3 py-1 rounded-full">{product.badge}</span>}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-white text-headingColor font-semibold px-4 py-2 rounded-full">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <span className="text-xs font-medium text-primaryColor bg-primary rouded-md text-white px-2 py-1 rounded">{getLabel(product.category)}</span>
                        <h3 className="font-bold text-headingColor mt-3 mb-2 line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-textColor mb-3 line-clamp-2">{product.description || product?.name}</p>
                        {hasRating && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                            <span className="text-sm text-textColor">({reviewsCount} reviews)</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-primaryColor">₹{displayPrice}</span>
                          {showOriginal && <span className="text-sm text-textColor line-through">₹{originalPrice}</span>}
                        </div>
                      </div>
                    </Link>
                    <div className="px-5 pb-5">
                      {isProductInCart(product?.id) && <CartQuantityButton {...getCartItems(product?.id)} />}{" "}
                      {!isProductInCart(product.id) && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          className={`w-full py-2 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            product.inStock ? "bg-primary text-white hover:bg-primary" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}>
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-textColor text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {cartCount >= 0 && (
        <button
          draggable={true}
          onClick={() => setIsCartOpen(true)}
          className="fixed top-24 right-6 bg-primary text-white p-4 rounded-full shadow-xl hover:bg-primaryDarkColor transition-all duration-300 z-40">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-secondaryColor text-primary text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{cartCount}</span>
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
                        <img src={item.imageUrls[0]} alt={item.name} className="w-20 h-20 object-cover object-top rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-headingColor">{item.name}</h4>
                          <p className="text-primaryColor font-bold">₹{item.price}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, -1)}
                              className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-primaryLightColor">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-primaryLightColor">
                              <Plus className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleRemoveFromCart(item.id, item.productId)} className="ml-auto text-red-500 hover:text-red-600">
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
                  <button onClick={handleCheckout} className="w-full btn bg-primary hover:bg-primaryDark text-gray-50 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Confirm Order
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
