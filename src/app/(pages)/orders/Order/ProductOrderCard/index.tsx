import { OrderProductResponse, OrderResponse, Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import RatingComp from "./RatingComp";

type propsType = {
  product: Product;
  orderProduct: OrderProductResponse;
  order: OrderResponse;
  rated:boolean;
  onRatingChange: (ratedStatus: boolean) => void;
};

const ProductOrderCard = ({ product, orderProduct, order,rated, onRatingChange }: propsType) => {
  
  const [allowedRating, setAllowedRating] = useState(
    order.orderStatus === "delivered" ? true : false
  );
  
    useEffect(()=>{
      onRatingChange(!!orderProduct.rating)
    },[orderProduct])


  return (
    <div className="flex flex-col md:flex-row justify-between w-full items-center gap-5">
      <div className="flex gap-3">
        <div className="w-[100px] h-[100px] 2xl:w-[150px] 2xl:h-[150px] relative ">
          <Image
            src={orderProduct.imagesUrl[0] || "/images/notFoundImage.png"}
            alt="Imagem do produto"
            fill
            className="object-cover"
            sizes="100px"
          />
        </div>
        <div className="flex flex-col flex-1">
          <h2 className="text-md 2xl:text-2xl text font-bold">
            {product?.name}
          </h2>
          <p className="text-gray-500 text-sm">{product.description}</p>
          <h2 className="text-lg">
            R${" "}
            {(
              (orderProduct.subtotalInCents / 100) *
              parseInt(orderProduct.quantity)
            ).toFixed(2)}
          </h2>
          <h2 className="text-lg">Quantidade: {orderProduct.quantity}</h2>
          {!rated && allowedRating && (
            <RatingComp
              productId={product.id}
              onRatingChange={(ratedStatus:boolean) => onRatingChange(ratedStatus)}
              orderProduct={orderProduct}
            />
          )}
          {rated && allowedRating && (
            <h2 className="text-lg text-strongOrange">Produto já avaliado.</h2>
          )}
        </div>
      </div>
      <Link
        href={`/product/${product.id}`}
        className="py-1 md:py-2 px-3 rounded-sm h-fit bg-black text-white text-nowrap hover:scale-105 transition-transform cursor-pointer"
      >
        Comprar novamente
      </Link>
    </div>
  );
};

export default ProductOrderCard;
