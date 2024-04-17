import { CartContext } from "@/context/Cart";
import { CartProduct as CartProductType } from "@/types";
import Image from "next/image";
import { useContext, useState } from "react";
import { IoTrashBin } from "react-icons/io5";

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
      newProducts=newProducts.filter((item) => item.id !== product.id);
    }
    setProducts(newProducts);
  };

  return (
    <div className="flex w-full px-3 justify-between" key={product.id}>
      <div className="flex gap-2 ">
        <div className="p-2 border border-gray-400 rounded-xl w-[60px] h-[60px] md:w-[100px] md:h-[100px] relative">
          <Image
            src={
              product.imageUrl ? product.imageUrl : "/images/notFoundImage.jpg"
            }
            alt=""
            fill
            className="object-cover p-1 rounded-xl"
          />
        </div>
        <div>
          <h1 className="text-sm md:text-md">{product.name}</h1>
          <div className="flex items-center gap-2">
            {quantity > 1 && (
              <button
                className="rounded-lg bg-strongOrange text-white w-[20px] h-[20px] flex items-center justify-center border-gray-400 border "
                onClick={() => {
                  handleQuantityChange(quantity - 1);
                  setQuantity((prevState) => prevState - 1);
                }}
              >
                -
              </button>
            )}
            {quantity == 1 && (
              <IoTrashBin size={20} className="text-gray-500 cursor-pointer" onClick={()=>handleQuantityChange(0)} />
            )}
            <h2>{quantity}</h2>
            <button
              className="rounded-lg bg-strongOrange text-white w-[20px] h-[20px] flex items-center justify-center border-gray-400 border "
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
