"use client";
import { Dispatch, SetStateAction } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const orderStatus = [
  "TODOS",
  "ENVIADOS",
  "ENTREGUES",
  "PROCESSANDO",
  "CANCELADOS",
];
type StatusKey =
  | "TODOS"
  | "ENVIADOS"
  | "ENTREGUES"
  | "PROCESSANDO"
  | "CANCELADOS";

type propsType = {
  statusSelected: string;
  setStatusSelected: Dispatch<SetStateAction<StatusKey>>;
};

const OptionBar = ({ statusSelected, setStatusSelected }: propsType) => {
  return (
    <>
      <div className="p-2 bg-white justify-center items-center rounded-md hidden md:flex ">
        {orderStatus.map((item) => (
          <span
            key={item}
            className={`px-5 py-3 cursor-pointer ${
              statusSelected === item
                ? "text-strongOrange border-b-[2px] border-strongOrange"
                : "text-gray-600"
            }`}
            onClick={() => setStatusSelected(item as StatusKey)}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="md:hidden flex justify-center rounded-md  ">
        <Swiper
         className="py-8 rounded-lg "
          slidesPerView={3}
          pagination
          modules={[Navigation, Pagination, Scrollbar, A11y]}
        >
            {orderStatus.map((status) => (
              <SwiperSlide
                className={`px-5 py-3 bg-white  ${
                  statusSelected === status
                    ? "text-strongOrange border-b-[2px] border-strongOrange"
                    : "text-gray-600"
                }`}
                key={status}
                onClick={() => setStatusSelected(status as StatusKey)}
              >
                <span className="text-sm">{status}</span>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default OptionBar;
