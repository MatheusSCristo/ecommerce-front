import { CartProduct } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

type ContextType = {
  products: CartProduct[];
  setProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
};

const CartContext = createContext<ContextType>({} as ContextType);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const {user}=useContext(UserContext);

  const saveProductsOnLocal = () => {
    if(user)
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

