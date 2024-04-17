"use client";
import ProductCard, {
  getRatingStars,
} from "@/app/components/ThirdBox/ProductCard";
import { ProductsContext } from "@/context/Products";
import { Product as ProductType } from "@/types";
import Image from "next/image";
import { useContext } from "react";
import {
  MdOutlineStarHalf,
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
} from "react-icons/md";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { categories } from "../../search/[productSearch]/SideBar/Categories";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type propsType = {
  params: { productId: string };
};

const translateCategory = (category: string) => {
  const newCategory = categories.find((item) => item.category == category);
  return newCategory?.categoria;
};

const checkHasTheSameCategories = (
  productToCheck: ProductType,
  product: ProductType | undefined
) => {
  return productToCheck.categories.some((category) => {
    return product?.categories.some(
      (productCategory) => productCategory == category
    );
  });
};

const Product = ({ params: { productId } }: propsType) => {
  const { products } = useContext(ProductsContext);
  const product = products.find((item) => item.id == productId);
  const recommendedProducts = products.filter(
    (productToCheck) =>
      checkHasTheSameCategories(productToCheck, product) &&
      productToCheck.id !== productId
  );
  const ratingStars = product ? getRatingStars(product?.rating) : undefined;
  const array = ratingStars
    ? new Array(5 - ratingStars.length).fill("")
    : undefined;
  return (
    <>
      {product && (
        <section className="2xl:px-32 md:px-24 py-10 px-5">
          <div className="bg-white p-5 flex-1 rounded-lg flex flex-col gap-2">
            <div className="flex gap-5 flex-col md:flex-row items-center py-5">
              <div className="w-[200px] h-[200px] md:w-[300px] md:h-[250px] 2xl:w-[500px] 2xl:h-[300px] relative rounded-xl ">
                <Image
                  src={
                    product.imageUrl
                      ? product.imageUrl
                      : `/images/notFoundImage.jpg`
                  }
                  fill
                  className="object-fit rounded-lg border border-gray-500"
                  alt="Imagem do produto "
                />
              </div>
              <div className="py-5 w-full flex flex-col gap-2">
                <div>
                  <h1 className="font-bold">{product.name}</h1>
                  <div className="flex text-starYellow items-center gap-2 ">
                    <div className="flex">
                      {ratingStars?.map((item, index) => {
                        if (item === "full")
                          return (
                            <MdOutlineStarPurple500 key={index} size={15} />
                          );
                        else return <MdOutlineStarHalf key={index} size={15} />;
                      })}
                      {array?.map(() => {
                        return (
                          <MdOutlineStarOutline
                            key={Math.random() + 10}
                            size={15}
                          />
                        );
                      })}
                    </div>
                    <span>{product?.rating}</span>
                  </div>
                  <h2 className="border-b-2 border-gray-200 w-full">
                    Preço:{" "}
                    <span className="font-bold">
                      R$ {(product.priceInCents / 100).toFixed(2)}
                    </span>{" "}
                  </h2>
                </div>
                <div className=" border-b-2 border-gray-200 gap-1 flex flex-col">
                  <div className="flex gap-2 flex-col md:flex-row">
                    <h2 className="font-bold">Categorias:</h2>
                    <div className="flex gap-1">
                      {product.categories.map((category) => (
                        <div className="bg-gray-200 rounded-md px-2 capitalize">
                          {translateCategory(category)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-bold">Marca: </h2>
                    <h2>{product.brand}</h2>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-bold">Modelo: </h2>
                    <h2>{product.model}</h2>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-bold">Cores disponiveis: </h2>
                    <h2>{product.color}</h2>
                  </div>
                </div>
                <div>
                  <h2 className="font-bold">Descrição</h2>
                  <text>{product.description}</text>
                </div>
              </div>
            </div>
            <div>
              <button className="bg-strongOrange hover:bg-hoverOrange hover:scale-105 px-2 py-1 rounded-lg text-white">
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </section>
      )}
      <section className="flex flex-col 2xl:px-32 md:px-24 py-5 gap-2">
        <h1 className="text-2xl font-bold">Produtos parecidos para você</h1>
        <div>
          <Swiper
            className="px-2 pt-1 hidden xl:block"
            spaceBetween={10}
            slidesPerView={5}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            navigation
            modules={[Navigation, Pagination, Scrollbar, A11y]}
          >
            {recommendedProducts.map((recommendedProduct) => (
              <SwiperSlide>
                <ProductCard product={recommendedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            className="px-2 pt-1 hidden md:block"
            spaceBetween={10}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            pagination
            modules={[ Pagination, Scrollbar, A11y]}
          >
            {recommendedProducts.map((recommendedProduct) => (
              <SwiperSlide>
                <ProductCard product={recommendedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            className="px-2 pt-1 md:hidden"
            spaceBetween={10}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            pagination
            modules={[Pagination, Scrollbar, A11y]}
          >
            {recommendedProducts.map((recommendedProduct) => (
              <SwiperSlide>
                <ProductCard product={recommendedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Product;
