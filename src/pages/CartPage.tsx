import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, ArrowLeft, ShoppingCart, Loader2, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getCart, updateCartQuantity, removeFromCart, calculateCartTotal, clearCart } from "@/lib/cartUtils";
import { toast } from "sonner";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    const { data, error } = await getCart();
    if (error) {
      console.error("Error loading cart:", error);
      toast.error("Failed to load cart");
    } else {
      setCartItems(data || []);
    }
    setLoading(false);
  };

  const handleUpdateQuantity = async (cartItemId: string, delta: number) => {
    const item = cartItems.find((i) => i.id === cartItemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }

    setUpdating(true);
    const { error } = await updateCartQuantity(cartItemId, newQuantity);

    if (error) {
      toast.error("Failed to update quantity");
      console.error(error);
    } else {
      await loadCart();
    }
    setUpdating(false);
  };

  const handleRemoveFromCart = async (cartItemId: string) => {
    setUpdating(true);
    const { error } = await removeFromCart(cartItemId);
    if (error) {
      toast.error("Failed to remove item");
      console.error(error);
    } else {
      toast.success("Item removed from cart");
      await loadCart();
    }
    setUpdating(false);
  };

  const handleClearCart = async () => {
    if (confirm("Are you sure you want to clear your entire cart?")) {
      setUpdating(true);
      const { error } = await clearCart();
      if (error) {
        toast.error("Failed to clear cart");
      } else {
        toast.success("Cart cleared");
        setCartItems([]);
      }
      setUpdating(false);
    }
  };

  const cartTotal = calculateCartTotal(cartItems);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = cartTotal >= 500 ? 0 : 50;
  const totalWithShipping = cartTotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primaryColor" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-primaryLightColor py-4">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primaryColor hover:text-primaryDarkColor font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shopping
          </button>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-headingColor mb-12">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-headingColor mb-2">Your cart is empty</h2>
              <p className="text-textColor mb-8">Start shopping to add items to your cart</p>
              <button
                onClick={() => navigate("/products")}
                className="btn bg-primaryColor hover:bg-primaryDarkColor"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b bg-gray-50">
                    <h2 className="font-bold text-headingColor">
                      Items ({cartCount})
                    </h2>
                    {cartItems.length > 0 && (
                      <button
                        onClick={handleClearCart}
                        disabled={updating}
                        className="text-red-500 hover:text-red-600 flex items-center gap-2 text-sm font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex gap-6">
                          {/* Product Image */}
                          <div
                            onClick={() => navigate(`/products/${item.product_id}`)}
                            className="cursor-pointer"
                          >
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-24 h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <button
                              onClick={() => navigate(`/products/${item.product_id}`)}
                              className="text-lg font-bold text-headingColor hover:text-primaryColor transition-colors text-left mb-2"
                            >
                              {item.product.name}
                            </button>
                            <p className="text-textColor text-sm mb-4 line-clamp-2">
                              {item.product.description}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border rounded-full">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, -1)}
                                  disabled={updating}
                                  className="w-10 h-10 flex items-center justify-center hover:bg-primaryLightColor transition-colors disabled:opacity-50"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, 1)}
                                  disabled={updating}
                                  className="w-10 h-10 flex items-center justify-center hover:bg-primaryLightColor transition-colors disabled:opacity-50"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                disabled={updating}
                                className="text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-primaryColor font-bold text-lg mb-2">
                              ₹{item.product.price * item.quantity}
                            </p>
                            <p className="text-textColor text-sm">
                              ₹{item.product.price} each
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                  <h3 className="font-bold text-headingColor text-lg mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6 pb-6 border-b">
                    <div className="flex justify-between text-textColor">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-textColor">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                        {shipping === 0 ? "Free" : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-green-600">
                        Add ₹{500 - cartTotal} more for free shipping!
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between mb-8">
                    <span className="font-bold text-headingColor">Total</span>
                    <span className="font-bold text-primaryColor text-lg">
                      ₹{totalWithShipping}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    disabled={updating}
                    className="w-full btn bg-primaryColor hover:bg-primaryDarkColor mb-3 disabled:opacity-50"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => navigate("/products")}
                    className="w-full btn bg-gray-100 text-textColor hover:bg-gray-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CartPage;
