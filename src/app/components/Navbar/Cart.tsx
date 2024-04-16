import { CartContext } from "@/context/Cart";
import { CartProduct as CartProductType } from "@/types";
import Link from "next/link";
import { useContext } from "react";
import CartProduct from "./CartProduct";

const getCartTotalPrice = (products: CartProductType[]) => {
  return (
    products.reduce(
      (total, product) => total + product.priceInCents * product.quantity,
      0
    ) / 100
  );
};

const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <div className="absolute h-fit w-[350px] rounded-xl bg-white border border-gray-400 right-0 p-5 flex flex-col gap-5">
      <h1 className="text-xl">Carrinho de compras</h1>
      <div className="w-full justify-between flex px-3">
        <h2>Itens</h2>
        <h2>Subtotal</h2>
      </div>
      {products.map((product, index) => {
        if (index < 3) return <CartProduct product={product} />;
      })}
      {products.length > 3 && (
        <div className="px-3">
          <Link
            href="/"
            className="py-1 px-2 bg-strongOrange text-white w-fit rounded-lg"
          >
            Ver todos
          </Link>
        </div>
      )}
      <div className="px-3 justify-between w-full flex ">
        <button className="p-2 rounded-lg border border-gray-400">
          Finalizar compra
        </button>
        <span>Total: R$ {getCartTotalPrice(products)}</span>
      </div>
    </div>
  );
};

export default Cart;
