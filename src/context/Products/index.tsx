import { Product } from "@/lib/db";
import { ProductsService } from "@/services/Products/index.service";
import { createContext, useEffect, useState } from "react";

interface ProductsContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  loading: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await ProductsService.getProducts();
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error("Error fetching products:", response.data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return <ProductsContext.Provider value={{ products, setProducts, loading }}>{children}</ProductsContext.Provider>;
};

export default ProductsContext;
