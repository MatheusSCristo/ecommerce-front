"use client";
import React from "react";
import { CartProvider } from "./CartContext";
import { ProductsProvider } from "./ProductsContext";
import { SearchParamsBarProvider } from "./SearchParamsBarContext";
import { UserProvider } from "./UserContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchParamsBarProvider>
      <ProductsProvider>
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </ProductsProvider>
    </SearchParamsBarProvider>
  );
};

export default Provider;
