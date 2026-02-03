import http from "./http.service";
import Promisable from "./promisable.service";
export const OrderService = {
  getOrders: async () => {
    return await Promisable.asPromise(http.get("/api/orders"));
  },
  createOrder: async (order: any) => {
    return await Promisable.asPromise(http.post("/api/orders", order));
  },
};
