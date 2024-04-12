import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  MdOutlineStarPurple500,
  MdOutlineStarOutline,
  MdOutlineStarHalf,
} from "react-icons/md";
import { products } from "./products";
import { UUID } from "sequelize";
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
  return (
    <section className=" p-3 flex flex-col gap-2 h-fit  ">
      <h1 className="text-2xl md:text-3xl font-bold">Itens especiais para você</h1>
      <div className="xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.imageUrl}/>
        ))}
      </div>
    </section>
  );
};

export default ThirdBox;
