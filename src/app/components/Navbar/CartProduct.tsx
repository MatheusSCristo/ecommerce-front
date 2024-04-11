import Image from "next/image";
import React, { useState } from "react";

const CartProduct = ({
  product,
}: {
  product: { nome: string; priceInCents: number };
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex w-full px-3 justify-between">
      <div className="flex gap-2 ">
        <div className="p-2 border border-gray-300 rounded-xl">
          <Image
            src="/images/notFoundImage.jpg"
            alt=""
            width={100}
            height={100}
          />
        </div>
        <div>
          <h1>{product.nome}</h1>
          <div className="flex items-center gap-1">
            <button
              className="rounded-full bg-gray-200 w-[20px] h-[20px] flex items-center justify-center border-gray-400 border "
              onClick={() => setQuantity((prevState) => prevState - 1)}
            >
              -
            </button>
            <h2>{quantity}</h2>
            <button
              className="rounded-full bg-gray-200 w-[20px] h-[20px] flex items-center justify-center border-gray-400 border "
              onClick={() => setQuantity((prevState) => prevState + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <span>R${((product.priceInCents / 100) * quantity).toFixed(2)}</span>
    </div>
  );
};

export default CartProduct;
