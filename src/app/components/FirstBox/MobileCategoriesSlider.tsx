"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type propsType = {
  categories: {
    category: string;
    categoria: string;
  }[];
  handleSearchClick: (category: string) => void;
};

const MobileCategoriesSlider = ({
  categories,
  handleSearchClick,
}: propsType) => {
  return (
    <>
      <Swiper
        className="px-2 pt-1"
        spaceBetween={10}
        slidesPerView={3}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
      >
        {categories.map((category) => (
          <SwiperSlide
            className="w-fit py-2 px-4 border-gray-500 border rounded-lg capitalize"
            key={category.category}
            onClick={()=>handleSearchClick(category.categoria)}
          >
            {category.categoria}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MobileCategoriesSlider;
