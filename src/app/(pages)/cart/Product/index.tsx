import { CartContext } from "@/context/CartContext";
import { CartProduct } from "@/types";
import Image from "next/image";
import { useContext, useState } from "react";

const Product = ({ product }: { product: CartProduct }) => {
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
          </div>
          <button
            className="border-gray-400 border text-red-400 px-2 rounded-lg"
            onClick={() => handleQuantityChange(0)}
          >
            Remover do carrinho
          </button>
        </div>
      </div>
      <div>
        <h1 className="font-bold">
          R${((product.priceInCents * quantity) / 100).toFixed(2)}
        </h1>
        <div className="flex items-center gap-2">
          {
            <button
              className="rounded-lg bg-strongOrange text-white w-[20px] h-[20px] flex items-center justify-center border-gray-400 border "
              onClick={() => {
                if(quantity>1){
                handleQuantityChange(quantity - 1);
                setQuantity((prevState) => prevState - 1)};
              }}
            >
              -
            </button>
          }
          <h2>{quantity}</h2>
          <button
            className="rounded bg-white text-black w-[20px] h-[20px] flex items-center justify-center  border-gray-400 border "
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
  );
};

export default Product;
