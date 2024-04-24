import { CartProduct } from "@/types";
import Image from "next/image";

const CheckoutProduct = ({ product }: { product: CartProduct }) => {
  return (
    <div className="flex justify-between border-b-2 border-gray-400 pb-2">
      <div className="flex gap-2">
        <div className="w-[80px] h-[80px] md:w-[80px] md:h-[80px] 2xl:w-[100px] 2xl:h-[100px] relative rounded-xl">
          <Image
            src={
              product.imageUrl ? product.imageUrl : `/images/notFoundImage.png`
            }
            fill
            className="object-fit rounded-lg"
            alt="Imagem do produto "
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <h2>{product.name}</h2>
            <h3 className="text-gray-500">Marca: {product.brand}</h3>
            <h3 className="text-gray-500">Modelo: {product.model}</h3>
            <h3 className="text-gray-500">Quantidade: {product.quantity}</h3>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold">
          R${((product.priceInCents * product.quantity) / 100).toFixed(2)}
        </h1>
      </div>
    </div>
  );
};

export default CheckoutProduct;
