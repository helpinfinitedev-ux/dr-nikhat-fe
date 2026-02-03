import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { OrderService } from "@/services/order.service";
import { CartService } from "@/services/cart.service";

interface Address {
  city: string;
  pincode: string;
  streetAddress: string;
}

interface ConfirmOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    _id?: string;
    id?: string;
    phoneNumber?: string;
  } | null;
  cartItems: any[];
  cartTotal: number;
  onOrderSuccess: () => void;
}

const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = ({ isOpen, onClose, user, cartItems, cartTotal, onOrderSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState<Address>({
    city: "",
    pincode: "",
    streetAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.phoneNumber) {
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    if (!address.city.trim()) {
      toast.error("Please enter your city");
      return false;
    }
    if (!address.pincode || address.pincode.length < 5) {
      toast.error("Please enter a valid pincode");
      return false;
    }
    if (!address.streetAddress.trim()) {
      toast.error("Please enter your street address");
      return false;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        userId: user?._id || user?.id,
        status: "pending",
        paymentStatus: "pending",
        address: {
          city: address.city,
          pincode: address.pincode,
          streetAddress: address.streetAddress,
        },
        phoneNumber: Number(phoneNumber),
        amount: cartTotal,
        products: cartItems.map((item) => {
          return {
            productId: item?.productId,
            quantity: item?.quantity,
            name: item?.name,
            price: item?.price,
          };
        }),
      };

      const [response, error] = await OrderService.createOrder(orderData as any);
      await CartService.clearCart();
      if (error) {
        toast.error("Failed to create order");
        console.error(error);
      } else {
        toast.success("Order placed successfully!");
        onOrderSuccess();
        onClose();
        // Reset form
        setAddress({ city: "", pincode: "", streetAddress: "" });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-headingColor">Confirm Your Order</DialogTitle>
          <DialogDescription>Please verify your details to complete the order</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Phone Number */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              maxLength={10}
            />
          </div>

          {/* Address Section */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4" />
              Delivery Address
            </label>

            <input
              type="text"
              value={address.streetAddress}
              onChange={(e) => handleAddressChange("streetAddress", e.target.value)}
              placeholder="Street Address (House No., Building, Street)"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                placeholder="City"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <input
                type="text"
                value={address.pincode}
                onChange={(e) => handleAddressChange("pincode", e.target.value.replace(/\D/g, ""))}
                placeholder="Pincode"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                maxLength={6}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-headingColor mb-2">Order Summary</h4>
            <div className="space-y-1 text-sm text-textColor">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className={cartTotal >= 500 ? "text-green-600" : ""}>{cartTotal >= 500 ? "Free" : "₹50"}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-headingColor">
                <span>Total</span>
                <span>₹{cartTotal >= 500 ? cartTotal : cartTotal + 50}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primaryDark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Placing Order...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmOrderModal;
