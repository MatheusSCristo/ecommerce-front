import { CartProduct } from "@/types";
import React, { createContext, useEffect, useState } from "react";

type ContextType = {
  products: CartProduct[];
  setProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
};

const CartContext = createContext<ContextType>({} as ContextType);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const saveProductsOnLocal = () => {
    if (products.length > 0)
      localStorage.setItem("cartProducts", JSON.stringify(products));
  };

  useEffect(() => {
    saveProductsOnLocal();
  }, [products]);

  useEffect(() => {
    const local = localStorage.getItem("cartProducts");
    if (local) {
      setProducts(JSON.parse(local));
    }
  }, []);

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };

