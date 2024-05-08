"use client"
import { ProductsContext } from "@/context/ProductsContext";
import { useContext } from "react";
import ProductCard from "../../ProductCard";

const Sneakers = () => {
  const {products}=useContext(ProductsContext);
  const productsSorted = products.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 3);
  return (
    <div className="flex flex-col md:flex-row gap-10 mt-10 2xl:mt-[150px]">
      {productsSorted.map((product,index) => (
        <div className="border border-gray-500">
        <ProductCard product={product}/>
          </div>
      ))}
    </div>
  );
};

export default Sneakers;
