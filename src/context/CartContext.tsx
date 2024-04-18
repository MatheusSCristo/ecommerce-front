import { CartProduct } from "@/types";
import React, { createContext, useState } from "react";

type ContextType = {
  products: CartProduct[];
  setProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
};

const CartContext = createContext<ContextType>({} as ContextType);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };

