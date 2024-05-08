"use client";
import { ProductsContext } from "@/context/ProductsContext";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import ProductCard from "./ProductCard";

const ThirdBox = () => {
  const { products } = useContext(ProductsContext);

  return (
    <section className=" p-3 flex flex-col gap-2 h-fit  ">
      <h1 className="text-2xl md:text-3xl font-bold">
        Itens especiais para você
      </h1>
      <div className="xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3 grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        {products.length == 0 && (
          <div className="w-screen items-center justify-center flex my-10 text-black">
            <CircularProgress color="inherit"/>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThirdBox;
