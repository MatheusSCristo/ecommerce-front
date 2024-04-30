"use client";
import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";
import { CartProduct as CartProductType, orderDto } from "@/types";
import createOrder from "@/utils/Order/createOrder";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
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
  const { products, setProducts } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [checkoutError, setCheckoutError] = useState(false);
  const [checkoutIsLoading, setCheckoutIsLoading] = useState(false);
  const [billingData, setBillingData] = useState<billingSchemaType>();
  const [billingDataError, setBillingDataError] = useState(false);
  const shippingFee = 1000;
  const router = useRouter();

  const handleCheckout = async () => {
    setCheckoutError(false);
    if (!billingData) {
      setBillingDataError(true);
      return;
    }
    const clientId = user?.id;
    const accesstoken = user?.accessToken;
    const checkoutProducts = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    if (!clientId || checkoutProducts.length == 0 || !accesstoken) {
      return;
    }
    setCheckoutIsLoading(true);
    const body: orderDto = {
      products: checkoutProducts,
      clientId,
      billingDetailsDto: billingData,
      shippingFeeInCents: shippingFee,
    };
    try {
      const data = await createOrder(body, accesstoken);
      if (!data) {
        setCheckoutError(true);
      }
      setProducts([]);
      router.push("/");
    } finally {
      setCheckoutIsLoading(false);
    }
  };
  return (
    <section className="bg-white border border-gray-400 flex flex-col gap-10 xl:flex-row mx-5 2xl:mx-32 my-10 p-10 2xl:gap-32 rounded-md">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <BillingDetails
            setBillingData={setBillingData}
            setBillingDataError={setBillingDataError}
          />
          {billingDataError && (
            <span className="text-red-500 text-center">
              É necessário informar os dados de cobrança.
            </span>
          )}
        </div>

        <Payment />
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Seu pedido</h1>
          <div className="bg-white border border-gray-400  p-5 rounded-lg flex flex-col gap-3">
            {products.map((product) => (
              <CheckoutProduct product={product} key={product.id} />
            ))}
            {products.length==0 && <h1 className="text-lg text-center font-bold">Seu carrinho está vazio.</h1>}
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
                R$ {(shippingFee / 100).toFixed(2)}
              </h3>
            </div>
            <div className="flex justify-between border-b-2 border-gray-500">
              <h2 className="text-2xl font-bold">Total</h2>
              <h3 className="text-xl font-semibold">
                R${" "}
                {(
                  parseFloat(getTotalPrice(products)) +
                  shippingFee / 100
                ).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="bg-strongOrange text-white py-2 w-3/4 self-center rounded-lg disabled:opacity-50"
            onClick={handleCheckout}
            disabled={checkoutIsLoading || !user?.verifiedEmail || products.length==0}
          >
            Finalizar Compra
          </button>
          {checkoutIsLoading && (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          )}
          {checkoutError && (
            <span className="text-red-500 text-center">
              Aconteceu um erro ao finalizar o pedido, tente novamente mais
              tarde.
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Checkout;
