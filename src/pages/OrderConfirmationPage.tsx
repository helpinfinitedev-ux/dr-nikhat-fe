import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, Truck, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    if (!orderId) return;

    setLoading(true);

    setOrder({});
    setOrderItems([]);
    setLoading(false);
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

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-headingColor mb-4">Order Not Found</h2>
          <p className="text-textColor mb-8">We couldn't find this order.</p>
          <Link to="/products" className="btn bg-primaryColor hover:bg-primaryDarkColor">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-headingColor mb-2">Order Placed Successfully!</h1>
            <p className="text-textColor">Thank you for your order. We'll send you a confirmation on WhatsApp.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-textColor">Order Number</p>
                <p className="text-xl font-bold text-primaryColor">{order.order_number}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-textColor">Order Date</p>
                <p className="font-medium text-headingColor">
                  {new Date(order.created_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-headingColor mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primaryColor" />
                  Shipping Address
                </h3>
                <p className="text-textColor">
                  {order.customer_name}
                  <br />
                  {order.shipping_address.street}
                  <br />
                  {order.shipping_address.city}, {order.shipping_address.state}
                  <br />
                  {order.shipping_address.pincode}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-headingColor mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primaryColor" />
                  Contact Information
                </h3>
                <p className="text-textColor">
                  Phone: {order.customer_phone}
                  <br />
                  {order.customer_email && `Email: ${order.customer_email}`}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold text-headingColor mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primaryColor" />
                Order Items
              </h3>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-medium text-headingColor">{item.product_name}</p>
                      <p className="text-sm text-textColor">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-primaryColor">₹{item.total_price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t mt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-textColor">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-textColor">
                  <span>Shipping</span>
                  <span>{order.shipping_fee === 0 ? "FREE" : `₹${order.shipping_fee}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-headingColor pt-2 border-t">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Payment Method:</strong> {order.payment_method === "cod" ? "Cash on Delivery" : "Online Payment"}
              </p>
              <p className="text-sm text-blue-800 mt-2">
                <strong>Status:</strong> <span className="capitalize">{order.status}</span>
              </p>
            </div>
          </div>

          <div className="bg-primaryLightColor rounded-2xl p-6 text-center">
            <Truck className="w-12 h-12 text-primaryColor mx-auto mb-4" />
            <h3 className="text-xl font-bold text-headingColor mb-2">What's Next?</h3>
            <p className="text-textColor mb-6">We'll send you a confirmation message on WhatsApp shortly. Your order will be processed and shipped within 2-3 business days.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn bg-primaryColor hover:bg-primaryDarkColor">
                Continue Shopping
              </Link>
              <Link to={`/track-order/${order.order_number}`} className="btn bg-white text-primaryColor border-2 border-primaryColor hover:bg-primaryLightColor">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
