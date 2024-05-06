import { Product } from "@/types";
import { GetAll } from "@/utils/Products/getAll";
import React, { createContext, useEffect, useState } from "react";

type ContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductsContext = createContext<ContextType>({} as ContextType);

function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const handleProductsLocalStorage = async () => {
      const newProducts = await GetAll();
      setProducts(newProducts);
    };
    handleProductsLocalStorage();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };

