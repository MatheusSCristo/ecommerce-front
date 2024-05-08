import ProductCard from "@/app/components/ProductCard";
import { ProductsContext } from "@/context/ProductsContext";
import { Product as ProductType } from "@/types";
import { useContext } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type propsType = {
  product: ProductType | undefined;
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

const Recommended = ({ product }: propsType) => {
  const { products } = useContext(ProductsContext);
  const recommendedProducts = products.filter(
    (productToCheck) =>
      checkHasTheSameCategories(productToCheck, product) &&
      productToCheck.id !== product?.id
  );

  return (
    <section className="flex flex-col 2xl:px-32 md:px-24 py-5 gap-2">
      <h1 className="text-2xl font-bold">Produtos parecidos para você</h1>
      <div>
        <Swiper
          className="px-2 pt-1 hidden 2xl:block"
          spaceBetween={10}
          slidesPerView={products.length >5? 5:products.length}
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
          className="px-2 pt-1 hidden md:block 2xl:hidden"
          spaceBetween={10}
          slidesPerView={products.length >3? 3:products.length}
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
        <Swiper
          className="px-2 pt-1 md:hidden"
          spaceBetween={10}
          slidesPerView={products.length >2? 2:products.length}
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
  );
};

export default Recommended;
