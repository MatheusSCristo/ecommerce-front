import Image from "next/image";
import React, { useState } from "react";

const CartProduct = ({
  product,
}: {
  product: { nome: string; priceInCents: number };
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex w-full px-3 justify-between" key={product.nome}>
      <div className="flex gap-2 ">
        <div className="p-2 border border-gray-300 rounded-xl">
          <Image
            src="/images/notFoundImage.jpg"
            alt=""
            width={50}
            height={50}
          />
        </div>
        <div>
          <h1>{product.nome}</h1>
          <div className="flex items-center gap-1">
            <button
              className="rounded-lg bg-strongOrange text-white w-[20px] h-[20px] flex items-center justify-center border-gray-400 border "
              onClick={() => setQuantity((prevState) => prevState - 1)}
            >
              -
            </button>
            <h2>{quantity}</h2>
            <button
              className="rounded-lg bg-strongOrange text-white w-[20px] h-[20px] flex items-center justify-center border-gray-400 border "
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
