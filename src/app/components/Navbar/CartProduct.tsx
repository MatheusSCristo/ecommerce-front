import { CartContext } from "@/context/CartContext";
import { CartProduct as CartProductType } from "@/types";
import Image from "next/image";
import { useContext, useState } from "react";

type Props = {
  product: CartProductType;
};

const CartProduct = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const { products, setProducts } = useContext(CartContext);

  const handleQuantityChange = (quantity: number) => {
    let newProducts = [...products];
    if (quantity >= 1) {
      const index = newProducts.findIndex((item) => item.id == product.id);
      newProducts[index].quantity = quantity;
    } else {
      newProducts = newProducts.filter((item) => item.id !== product.id);
    }
    setProducts(newProducts);
  };

  return (
    <div className="flex w-full px-3 justify-between" key={product.id}>
      <div className="flex gap-2 ">
        <div className="p-1   w-[60px] h-[60px] md:w-[100px] md:h-[100px]  relative">
          <Image
            src={product.imagesUrl[0] || "/images/notFoundImage.png"}
            alt=""
            fill
            className="object-contain rounded-sm"
            priority
            sizes="(max-width: 768px) 60px, 100px"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm md:text-md text-wrap w-[150px] ">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 border-black border w-fit px-2">
            <button
              className="text-gray-500"
              onClick={() => {
                handleQuantityChange(quantity - 1);
                setQuantity((prevState) => prevState - 1);
              }}
            >
              -
            </button>
            <h2>{quantity}</h2>
            <button
              className="text-gray-500"
              onClick={() => {
                handleQuantityChange(quantity + 1);
                setQuantity((prevState) => prevState + 1);
              }}
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
