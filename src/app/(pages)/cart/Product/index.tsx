import { CartContext } from "@/context/CartContext";
import { CartProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
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
      newProducts = newProducts.filter((item) => item.id !== product.id || ( item.id === product.id && item.size !== product.size))
    }
    setProducts(newProducts);
  };


  return (
    <div className="flex justify-between border-b-2 border-[#909090] pb-5">
      <div className="flex gap-2">
        <Link href={`/product/${product.id}`} className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] 2xl:w-[150px] 2xl:h-[150px] relative bg-[#C4C4C4] rounded-md">
          <Image
            src={product.imagesUrl[0] || `/images/sneakerImage.png`}
            fill
            className="object-contain"
            alt="Imagem do produto "
            sizes="(max-width: 768px) 80px, (max-width: 1200px) 120px, 150px"
            priority
          />
        </Link>
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="font-bold text-xl">{product.name}</h2>
            <h3 className="text-gray-600">Tamanho:{product.size}</h3>
            <h3 className="text-gray-600">Marca: {product.brand}</h3>
          </div>
          <h3 className="font-bold text-xl">
            R${((product.priceInCents * quantity) / 100).toFixed(2)}
          </h3>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-2 border-black border w-fit px-2">
          {
            <button
              className="text-gray-500 hover:text-black"
              onClick={() => {
                if (quantity > 1) {
                  handleQuantityChange(quantity - 1);
                  setQuantity((prevState) => prevState - 1);
                }
              }}
            >
              -
            </button>
          }
          <h2>{quantity}</h2>
          <button
            className="text-gray-500  hover:text-black"
            onClick={() => {
              handleQuantityChange(quantity + 1);
              setQuantity((prevState) => prevState + 1);
            }}
          >
            +
          </button>
        </div>
        <button className="underline" onClick={() => handleQuantityChange(0)}>
          Remover
        </button>
      </div>
    </div>
  );
};

export default Product;
