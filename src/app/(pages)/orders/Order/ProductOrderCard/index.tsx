import { OrderProductResponse, Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type propsType = {
  product: Product;
  orderProduct: OrderProductResponse;
};

const ProductOrderCard = ({ product, orderProduct }: propsType) => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full items-center">
      <div className="flex gap-3">
        <div className="w-[100px] h-[100px] 2xl:w-[150px] 2xl:h-[150px] relative ">
          <Image
            src={orderProduct.imagesUrl[0] || "/images/notFoundImage.png"}
            alt="Imagem do produto"
            fill
            className="object-cover"
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
        </div>
      </div>
      <Link
        href={`/product/${product.id}`}
        className="py-1 md:py-2 px-3 rounded-sm h-fit bg-black text-white text-nowrap"
      >
        Adicionar ao Carrinho
      </Link>
    </div>
  );
};

export default ProductOrderCard;
