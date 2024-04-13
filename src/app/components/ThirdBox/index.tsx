"use client"
import { ProductsContext } from "@/context/Products";
import { useContext } from "react";
import ProductCard from "./ProductCard";

const getRatingStars = (rating: number) => {
  const array = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    array.push("full");
  }
  if (rating - Math.floor(rating) > 0) {
    array.push("half");
  }
  return array;
};

const ThirdBox = () => {
  const { products } = useContext(ProductsContext);

  return (
    <section className=" p-3 flex flex-col gap-2 h-fit  ">
      <h1 className="text-2xl md:text-3xl font-bold">Itens especiais para você</h1>
      <div className="xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </div>
    </section>
  );
};

export default ThirdBox;
