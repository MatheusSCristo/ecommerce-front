"use client";
import React from "react";
import { CartProvider } from "./CartContext";
import { ProductsProvider } from "./ProductsContext";
import { SearchParamsBarProvider } from "./SearchParamsBarContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchParamsBarProvider>
      <ProductsProvider>
        <CartProvider>{children}</CartProvider>
      </ProductsProvider>
    </SearchParamsBarProvider>
  );
};

export default Provider;
