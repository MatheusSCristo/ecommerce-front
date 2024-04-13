"use client";
import React from "react";
import { CartProvider } from "./Cart";
import { ProductsProvider } from "./Products";
import { SearchParamsBarProvider } from "./SearchParamsBar";

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
