import http from "./http.service";
import Promisable from "./promisable.service";

export const CartService = {
  addToCart: async (productId: string, quantity: number) => {
    http.setJWT();
    http.setNoCache();
    return await Promisable.asPromise(
      http.post("/api/cart/add-to-cart", {
        productId,
        quantity,
      })
    );
  },
  getCart: async () => {
    http.setJWT();
    return await Promisable.asPromise(http.get(`/api/cart`));
  },
  removeFromCart: async (cartId: string, productId: string) => {
    http.setJWT();
    return await Promisable.asPromise(
      http.patch(`/api/cart/remove/${cartId}`, {
        productId,
      })
    );
  },
  clearCart: async (cartId: string) => {
    http.setJWT();
    return await Promisable.asPromise(http.delete(`/api/cart`));
  },
};
