"use client";
import React from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

const DescountCarousel = ({
  products,
}: {
  products: {
    img: string;
    descount: number;
  }[];
}) => {
  return (
    <Swiper
      className="px-2 pt-1"
      spaceBetween={10}
      slidesPerView={2}
      loop={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
    >
      {products.map((product) => (
        <SwiperSlide
          className="border-l-2 border-gray-400 p-2 flex flex-col items-center justify-evenly"
          key={product.img}
        >
          <div className="w-[100px] h-[100px] relative">
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DescountCarousel;
