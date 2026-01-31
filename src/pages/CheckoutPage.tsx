import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Mail, Phone, MapPin, CreditCard, Loader2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
  paymentMethod: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
    paymentMethod: "cod",
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    // const { data, error } = await getCart();
    const error = "";
    if (error) {
      toast.error("Failed to load cart");
      console.error(error);
    } else {
      setCartItems([]);
    }
    setLoading(false);
  };

  const subtotal = 100;
  const shippingFee = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setSubmitting(true);

    try {
      const orderNumber = `ORD-${Date.now()}`;

      const orderItems = cartItems.map((item) => ({
        order_id: "id",
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image_url,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity,
      }));
      const message =
        `🎉 New Order Received!\n\n` +
        `📦 Order #: ${orderNumber}\n` +
        `👤 Customer: ${formData.name}\n` +
        `📱 Phone: ${formData.phone}\n` +
        `📧 Email: ${formData.email}\n\n` +
        `📍 Delivery Address:\n${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n\n` +
        `🛒 Items:\n${cartItems.map((item) => `  • ${item.product.name} x${item.quantity} - ₹${item.product.price * item.quantity}`).join("\n")}\n\n` +
        `💰 Total: ₹${total}\n` +
        `💳 Payment: ${formData.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}\n\n` +
        `${formData.notes ? `📝 Notes: ${formData.notes}` : ""}`;

      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank");

      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${"id"}`);
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-bold text-headingColor mb-4">Your cart is empty</h2>
          <p className="text-textColor mb-8">Add some products to get started!</p>
          <button onClick={() => navigate("/products")} className="btn bg-primaryColor hover:bg-primaryDarkColor">
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-textColor hover:text-primaryColor mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>

          <h1 className="text-3xl font-bold text-headingColor mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-headingColor mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-primaryColor" />
                    Contact Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-headingColor mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-headingColor mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-headingColor mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all"
                        placeholder="Enter your email (optional)"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-headingColor mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primaryColor" />
                    Shipping Address
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-headingColor mb-2">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all"
                        placeholder="House no., Building name, Street"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-headingColor mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all"
                          placeholder="City"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-headingColor mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all"
                          placeholder="State"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-headingColor mb-2">Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all"
                          placeholder="Pincode"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-headingColor mb-2">Order Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all resize-none"
                        placeholder="Special instructions or delivery notes"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-headingColor mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primaryColor" />
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primaryColor transition-colors">
                      <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleInputChange} className="w-5 h-5 text-primaryColor" />
                      <div>
                        <p className="font-medium text-headingColor">Cash on Delivery</p>
                        <p className="text-sm text-textColor">Pay when you receive your order</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primaryColor transition-colors opacity-50">
                      <input type="radio" name="paymentMethod" value="online" disabled className="w-5 h-5 text-primaryColor" />
                      <div>
                        <p className="font-medium text-headingColor">Online Payment</p>
                        <p className="text-sm text-textColor">Coming soon</p>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                <h2 className="text-xl font-bold text-headingColor mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-headingColor text-sm">{item.product.name}</p>
                        <p className="text-sm text-textColor">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-primaryColor">₹{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-textColor">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-textColor">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                  </div>
                  {subtotal < 500 && <p className="text-xs text-green-600">Add ₹{500 - subtotal} more for free shipping!</p>}
                  <div className="flex justify-between text-lg font-bold text-headingColor pt-3 border-t">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button onClick={handleSubmit} disabled={submitting} className="w-full btn bg-primaryColor hover:bg-primaryDarkColor mt-6 flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Place Order</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
