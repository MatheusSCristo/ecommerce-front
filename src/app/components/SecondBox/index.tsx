import React from "react";
import Countdown from "./Countdown";
import Image from "next/image";
import DescountCarousel from "./DescountCarousel";
import Link from "next/link";

const SecondBox = () => {
  const productsPromo = [
    {
      img: "product1",
      descount: 25,
    },
    {
      img: "product2",
      descount: 19,
    },
    {
      img: "product3",
      descount: 32,
    },
    {
      img: "product4",
      descount: 10,
    },
    {
      img: "product5",
      descount: 23,
    },
  ];
  return (
    <section className="bg-white border border-gray-300 rounded-md p-3 flex flex-col md:flex-row gap-2 md:h-[250px] h-fit  md:items-center ">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl text-center">Promoções imperdiveis</h1>
        <Countdown />
      </div>
      <div className="flex-1 md:flex hidden justify-evenly">
        {productsPromo.map((product) => (
          <Link
            href={"/"}
            className=" p-2 flex flex-col items-center justify-evenly"
            key={product.img}
          >
            <div className="w-[150px] h-[150px] relative">
              <Image
                src={`/images/${product.img}.svg`}
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span className="text-red-500 bg-red-200 p-2 rounded-xl">
              {product.descount}% OFF
            </span>
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <DescountCarousel products={productsPromo} />
      </div>
    </section>
  );
};

export default SecondBox;
