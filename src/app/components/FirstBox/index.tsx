"use client";

import Image from "next/image";
import Link from "next/link";

const PrimaryBox = () => {

  return (
    <section className=" flex flex-col  items-center gap-8 mt-5">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-bold text-3xl 2xl:text-5xl text-center ">Os tênis perfeitos para você!</h1>
        <h2 className="2xl:w-[450px] text-center text-gray-500">
          Encontrar os tênis perfeitos vai além do conforto; é a harmonia entre
          estilo, funcionalidade e personalidade.
        </h2>
      </div>
      <Link href={"search/search?q="}  className="border border-black px-10 py-1 hover:bg-gray-200">Ver todos</Link>
      <div className="2xl:w-[1500px] 2xl:h-[600px] md:w-[1000px] md:h-[600px] w-[350px] h-[300px] relative px-2">
        <Image
          priority
          src={"/images/bannerImage.jpeg"}
          alt="Tênis"
          fill
          className="object-fit"
        />
      </div>
    </section>
  );
};

export default PrimaryBox;
