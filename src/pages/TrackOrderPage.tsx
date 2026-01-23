import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Package, Truck, CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const statusSteps = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "processing", label: "Processing", icon: Clock },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const TrackOrderPage = () => {
  const { orderNumber: urlOrderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(urlOrderNumber || "");
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (urlOrderNumber) {
      handleSearch(urlOrderNumber);
    }
  }, [urlOrderNumber]);

  const handleSearch = async (searchOrderNumber?: string) => {
    const orderNum = searchOrderNumber || orderNumber;
    if (!orderNum) return;

    setLoading(true);
    setSearched(true);

    setOrder({});
    setOrderItems([]);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  const currentStatusIndex = order ? getStatusIndex(order.status) : -1;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-headingColor mb-8 text-center">Track Your Order</h1>

          <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter your order number (e.g., ORD-20260108-1234)"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-primaryColor focus:ring-2 focus:ring-primaryLightColor outline-none transition-all"
              />
              <button type="submit" disabled={loading} className="btn bg-primaryColor hover:bg-primaryDarkColor flex items-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                Track
              </button>
            </form>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {!loading && searched && !order && (
            <div className="bg-white rounded-2xl p-12 shadow-md text-center">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-bold text-headingColor mb-2">Order Not Found</h2>
              <p className="text-textColor">We couldn't find an order with this number. Please check and try again.</p>
            </div>
          )}

          {!loading && order && (
            <>
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

                {order.status === "cancelled" ? (
                  <div className="bg-red-50 rounded-lg p-6 text-center">
                    <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                    <h3 className="text-xl font-bold text-headingColor mb-2">Order Cancelled</h3>
                    <p className="text-textColor">This order has been cancelled.</p>
                  </div>
                ) : (
                  <div className="mb-8">
                    <h3 className="font-semibold text-headingColor mb-6">Order Status</h3>
                    <div className="relative">
                      <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200">
                        <div className="h-full bg-primaryColor transition-all duration-500" style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }} />
                      </div>

                      <div className="relative flex justify-between">
                        {statusSteps.map((step, index) => {
                          const StepIcon = step.icon;
                          const isCompleted = index <= currentStatusIndex;
                          const isCurrent = index === currentStatusIndex;

                          return (
                            <div key={step.key} className="flex flex-col items-center">
                              <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                                  isCompleted ? "bg-primaryColor text-white" : "bg-gray-200 text-gray-400"
                                } ${isCurrent ? "ring-4 ring-primaryLightColor scale-110" : ""}`}>
                                <StepIcon className="w-8 h-8" />
                              </div>
                              <p className={`text-sm mt-2 text-center ${isCompleted ? "text-headingColor font-medium" : "text-textColor"}`}>{step.label}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <div>
                    <h3 className="font-semibold text-headingColor mb-3">Shipping Address</h3>
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
                    <h3 className="font-semibold text-headingColor mb-3">Contact Information</h3>
                    <p className="text-textColor">
                      Phone: {order.customer_phone}
                      <br />
                      {order.customer_email && `Email: ${order.customer_email}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold text-headingColor mb-4">Order Items</h3>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center pb-4 border-b last:border-0">
                      <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-headingColor">{item.product_name}</p>
                        <p className="text-sm text-textColor">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-primaryColor">₹{item.total_price}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t mt-4 space-y-2">
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrackOrderPage;
