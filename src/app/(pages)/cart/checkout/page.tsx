"use client";
import { CartContext } from "@/context/CartContext";
import { CartProduct as CartProductType } from "@/types";
import { useContext, useState } from "react";
import BillingDetails, { billingSchemaType } from "./billingDetails";
import CheckoutProduct from "./CheckoutProduct";
import Payment from "./Payment";

const getTotalPrice = (products: CartProductType[]) => {
  return (
    products.reduce(
      (total, product) => total + product.priceInCents * product.quantity,
      0
    ) / 100
  ).toFixed(2);
};

const Checkout = () => {
  const { products } = useContext(CartContext);
  const [billingData,setBillingData]=useState<billingSchemaType>()
  const shippingFee=10;

  return (
    <section className="bg-white border border-gray-400 flex flex-col gap-10 xl:flex-row mx-5 2xl:mx-32 my-10 p-10 2xl:gap-32 rounded-md">
      <div className="flex flex-col gap-5">
        <BillingDetails setBillingData={setBillingData}/>
        <Payment />
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Seu pedido</h1>
          <div className="bg-white border border-gray-400  p-5 rounded-lg flex flex-col gap-3">
            {products.map((product) => (
              <CheckoutProduct product={product} key={product.id} />
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between ">
              <h2 className="text-xl text-gray-500">Subtotal</h2>
              <h3 className="text-xl text-gray-500">
                R$ {getTotalPrice(products)}
              </h3>
            </div>
            <div className="flex justify-between border-b-2 border-gray-200">
              <h2 className="text-xl text-gray-500">Frete</h2>
              <h3 className="text-xl text-gray-500">
               R$ {shippingFee.toFixed(2)}
              </h3>
            </div>
            <div className="flex justify-between border-b-2 border-gray-500">
              <h2 className="text-2xl font-bold">Total</h2>
              <h3 className="text-xl font-semibold">
                R$ {(parseFloat(getTotalPrice(products))+shippingFee).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
        <button className="bg-strongOrange text-white py-2 w-3/4 self-center rounded-lg">
          Finalizar Compra
        </button>
      </div>
    </section>
  );
};

export default Checkout;
