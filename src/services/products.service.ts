import Promisable from "./promisable.service";
import http from "./http.service";
import { Product } from "@/lib/db";
export const ProductsService = {
  getProducts: async () => {
    return await Promisable.asPromise(http.get("/api/products"));
  },
  createProduct: async (product: Product) => {
    return await Promisable.asPromise(http.post("/api/products", product));
  },
};
