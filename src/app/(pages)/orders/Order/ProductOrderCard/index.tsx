import { CartContext } from "@/context/CartContext";
import { OrderProductResponse, Product } from "@/types";
import AddProductToCart from "@/utils/AddProductToCart";
import Image from "next/image";
import { useContext } from "react";

type propsType = {
  product: Product;
  orderProduct: OrderProductResponse;
};

const ProductOrderCard = ({ product, orderProduct }: propsType) => {
  const { products: cartProducts, setProducts } = useContext(CartContext);
  const handleAddToCart = (product: Product) => {
    const newCartProducts = AddProductToCart(product, cartProducts);
    setProducts(newCartProducts);
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between w-full items-center">
      <div className="flex gap-2">
        <div className="w-[100px] h-[100px] 2xl:w-[150px] 2xl:h-[150px] relative ">
          <Image
            src={orderProduct.imageUrl || "/images/notFoundImage.png"}
            alt="Imagem do produto"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col flex-1">
          <h2 className="text-md 2xl:text-lg">{product?.name}</h2>
          <p className="text-gray-500 text-sm">{product.description}</p>
          <h2>
            R${" "}
            {(
              orderProduct.subtotalInCents /100*   parseInt(orderProduct.quantity)
            ).toFixed(2)}
          </h2>
          <h2>Quantidade: {orderProduct.quantity}</h2>
        </div>
      </div>
      <button
        className="py-1 md:py-2 px-3 rounded-md h-fit bg-strongOrange text-white text-nowrap"
        onClick={() => handleAddToCart(product)}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductOrderCard;
