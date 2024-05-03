import { sneakers } from "@/app/components/SecondBox/products";
import { Product } from "@/types";
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
      // const newProducts = await GetAll();
      const newProducts=sneakers;
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

