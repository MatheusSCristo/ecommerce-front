"use client"
import { ProductsContext } from "@/context/ProductsContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const Sneakers = () => {
  const {products}=useContext(ProductsContext);
  const productsSorted = products.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()).slice(0, 3);
  return (
    <div className="flex flex-col md:flex-row gap-10 mt-[150px]">
      {productsSorted.map((product,index) => (
        <Link href={`/product/${product.id}`} className={`bg-[#888888] ${index==1 && "md:-translate-y-[50px]"} flex flex-col gap-2 rounded-lg`} key={product.id}>
          <div className="w-[200px] h-[250px] md:w-[200px] md:h-[300px] xl:w-[350px] xl:h-[450px] relative hover:scale-[1.3] duration-500">
            <Image
              src={product.imagesUrl[0] || "/images/productImage.png"}
              alt="product"
              fill
              className="object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sneakers;
