"use client";
import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";
import { CartProduct } from "@/types";
import sendVerifiyEmail from "@/utils/Email/sendVerifiyEmail";
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
  const [userEmailIsUnverified, setUserEmailIsUnverified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [cep, setCep] = useState("");
  const { user } = useContext(UserContext);
  const { products } = useContext(CartContext);
  return (
    <section className="md:px-24 2xl:px-32 md:py-10 px-2 py-5 flex gap-2 flex-col flex-1 relative    ">
      <h1 className="text-2xl font-bold">Meu Carrinho({products.length})</h1>
      <span className="text-lg font-bold flex gap-2">
        Precisa de algo mais?
        <Link href={"/"} className="hover:underline">
          Continue a navegar
        </Link>
      </span>
      <div className="flex gap-4 md:flex-row flex-col">
        <div className=" flex-[2]  p-5 rounded-lg flex flex-col gap-2">
          {products.map((product) => (
            <Product product={product} key={product.id + product.size} />
          ))}
          {products.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <h2 className="font-bold text-2xl ">
                Você ainda não possui nenhum item no seu carrinho!
              </h2>
              <Link
                href={"/"}
                className="text-center border-gray-400 border rounded-sm px-2 py-1 bg-black text-white hover:scale-105  duration-300"
              >
                Continue a navegar pelos produtos
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="bg-white  p-3 rounded-lg flex flex-col gap-2">
            <span>Calcular frete:</span>
            <input
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Insira seu CEP"
              className="border-black border px-2 focus:outline-none"
            />
            <div className="flex justify-between">
              <button className="text-sm border-black border rounded-sm px-2 text-black hover:scale-105 duration-300">
                Calcular
              </button>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg flex flex-col gap-3 ">
            <div className="border-b-[1px] pb-2 border-black">
              <div className="flex justify-between">
                <h1 className="">Subtotal:</h1>
                <h2>R${getCartTotalPrice(products)}</h2>
              </div>
              <div className="flex justify-between">
                <h1 className="">Frete:</h1>
                <h2>
                  R${" "}
                  <span
                    className={`${
                      shippingFee > 0 ? "text-black" : "text-lime-500"
                    }`}
                  >
                    {shippingFee.toFixed(2)}
                  </span>
                </h2>
              </div>
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
          <Link
            href={
              products.length && user?.verifiedEmail ? "/cart/checkout" : ""
            }
            className={`uppercase rounded-sm w-3/4 self-center px-5 py-2 bg-black text-center text-white ${
              products.length === 0 && "opacity-50 cursor-default"
            }`}
            style={{
              pointerEvents: products.length === 0 ? "none" : "auto",
            }}
            onClick={() => {
              if (!user?.verifiedEmail && user) setUserEmailIsUnverified(true);
            }}
          >
            Checkout
          </Link>
        </div>
      </div>
      {userEmailIsUnverified && (
        <div className="absolute bg-white border border-gray-400 rounded-lg flex flex-col top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-4 items-center">
          <span
            className="fixed self-end hover:scale-105 cursor-pointer"
            onClick={() => {
              setEmailSent(false);
              setUserEmailIsUnverified(false);
            }}
          >
            X
          </span>
          <span className="text-3xl font-bold">OPS...</span>
          <h1 className="text-xl">
            Parece que seu email ainda não foi confirmado!
          </h1>
          <h2>Para finalizar sua compra, verifique o email cadastrado.</h2>
          <h3
            className="text-blue hover:underline cursor-pointer"
            onClick={() => {
              if (user) {
                sendVerifiyEmail({
                  userEmail: user.email,
                  userName: user.name,
                });
                setEmailSent(true);
              }
            }}
          >
            Reenviar email de verificação
          </h3>
          {emailSent && (
            <span className="text-sm ">Email de verificação enviado.</span>
          )}
        </div>
      )}
    </section>
  );
};

export default Cart;
