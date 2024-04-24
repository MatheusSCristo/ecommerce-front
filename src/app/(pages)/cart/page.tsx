"use client";
import { CartContext } from "@/context/CartContext";
import { CartProduct } from "@/types";
import Link from "next/link";
import { useContext, useState } from "react";
import Product from "./Product";


const getCartTotalPrice = (products: CartProduct[]) => {
  return (
    products.reduce(
      (total, product) => total + product.priceInCents * product.quantity,
      0
    ) / 100
  ).toFixed(2);
};


const Cart = () => {
  const [shippingFee, setShippingFee] = useState(0);
  const [cep, setCep] = useState("");
  const { products } = useContext(CartContext);
  return (
    <section className="md:px-24 2xl:px-32 md:py-10 px-2 py-5 flex gap-2 flex-col flex-1 ">
      <h1 className="text-2xl">Meu carrinho({products.length})</h1>
      <div className="flex gap-4 md:flex-row flex-col">
        <div className="bg-white border border-gray-400 md:w-3/4 p-5 rounded-lg flex flex-col gap-2">
          {products.map((product) => (
            <Product product={product} />
          ))}
          {products.length < 1 && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <h2 className="font-bold text-2xl ">Você ainda não possui nenhum item no seu carrinho!</h2>
                <Link href={"/"} className="text-center border-gray-400 border rounded-lg px-2 py-1 bg-strongOrange text-white hover:scale-105 hover:bg-hoverOrange duration-300">Continue a navegar pelos produtos</Link>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="bg-white border border-gray-400 p-3 rounded-lg flex flex-col gap-2">
            <span>Calcular frete:</span>
            <input
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="CEP"
              className="border-gray-400 border rounded-lg px-2 focus:outline-none"
            />
            <div className="flex justify-between">
              <span>
                Valor: <span className="font-bold">{shippingFee > 0 ?`R$ ${shippingFee.toFixed(2)}` : "Grátis"}</span>
              </span>
              <button
                className="self-end text-sm border-gray-400 border rounded-lg px-2 bg-strongOrange text-white hover:scale-105 duration-300"
              >
                Calcular
              </button>
            </div>
          </div>
          <div className="bg-white border border-gray-400  p-3 rounded-lg">
            <div className="flex justify-between">
              <h1 className="text-gray-500">Subtotal:</h1>
              <h2>R${getCartTotalPrice(products)}</h2>
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-500">Frete:</h1>
              <h2>
                R${" "}
                <span
                  className={`${
                    shippingFee > 0 ? "text-black" : "text-lime-500"
                  }`}
                >
                  {shippingFee > 0 ? shippingFee.toFixed(2) : "Grátis"}
                </span>
              </h2>
            </div>
            <div className="flex justify-between">
              <h1>Total:</h1>
              <h2>
                {" "}
                R$
                {parseFloat(
                  getCartTotalPrice(products) + shippingFee.toFixed(2)
                )}
              </h2>
            </div>
          </div>
          <Link href={products.length?"/cart/checkout":""} className={`uppercase rounded-lg w-3/4 self-center px-5 py-2 bg-strongOrange text-white ${products.length===0 && "opacity-50 cursor-default"}`}>
                  Checkout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
