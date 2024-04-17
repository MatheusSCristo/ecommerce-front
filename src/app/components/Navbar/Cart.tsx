import { CartContext } from "@/context/Cart";
import { CartProduct as CartProductType } from "@/types";
import Link from "next/link";
import { useContext } from "react";
import CartProduct from "./CartProduct";

const getCartTotalPrice = (products: CartProductType[]) => {
  return (
    (products.reduce(
      (total, product) => total + product.priceInCents * product.quantity,
      0
    ) / 100).toFixed(2)
  );
};

type propsType = {
  setCartMobileIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({ setCartMobileIsOpen }: propsType) => {
  const { products } = useContext(CartContext);

  const handleCloseCartMobile = () => {
    if (setCartMobileIsOpen) {
      setCartMobileIsOpen(false);
    }
  };

  return (
    <div className="fixed p-2 mr-2 md:absolute  h-fit w-4/5 md:w-[350px] rounded-xl bg-white border border-gray-400 right-0 md:p-5 flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-xl">Carrinho de compras</h1>
        <span className="md:hidden p-2" onClick={handleCloseCartMobile}>
          X
        </span>
      </div>
      <div className="w-full justify-between flex px-3">
        <h2>Itens</h2>
        <h2>Subtotal</h2>
      </div>
      {products.map((product, index) => {
        if (index < 3)
          return <CartProduct product={product} key={product.id} />;
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
      {products.length == 0 && (
        <span className="px-3">Seu carrinho ainda está vazio.</span>
      )}
      <div className="px-3 justify-between w-full flex  ">
        <Link href={"/cart"} className="px-2 md:p-2 text-sm md:text-md rounded-lg border border-gray-400">
          Finalizar compra
        </Link>
        <div className="flex-col md:flex-row flex md:gap-2">
          <span>Total:</span>
          <span>R$ {getCartTotalPrice(products)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
