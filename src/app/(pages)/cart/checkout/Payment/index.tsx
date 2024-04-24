import Image from "next/image";
import { useState } from "react";
import Card from "./Card";

const Payment = () => {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Pagamento</h1>
      <div className="border border-gray-600 flex justify-between px-5 py-2 rounded-md cursor-pointer xl:w-3/4 items-center relative " onClick={()=>setCardIsOpen((prevState)=>!prevState)}>
        <div className="flex flex-col">
          <h1 className="text-lg">Cartão de Crédito/Débito</h1>
          <h2 className="text-gray-500">Seguro e Rápido</h2>
        </div>
        <div className="flex xl:gap-2 flex-col xl:flex-row">
          <div className="w-[50px] h-[30px] xl:h-[50px] relative">
            <Image
              src={"/icons/payments/elo.svg"}
              alt="Ícone da bandeira Elo"
              fill
              className="object-contain"
            />
          </div>

          <div className="w-[50px] h-[30px] xl:h-[50px] relative">
            <Image
              src={"/icons/payments/mastercard.svg"}
              alt="Ícone da bandeira Mastercard"
              fill
              className="object-contain"
            />
          </div>

          <div className="w-[50px] h-[30px] xl:h-[50px] relative">
            <Image
              src={"/icons/payments/visa.svg"}
              alt="Ícone da bandeira Visa"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
      {cardIsOpen && <Card />}
      <div className="border border-gray-600 flex justify-between px-5 py-2 rounded-md cursor-pointer xl:w-3/4 items-center">
        <h1 className="text-lg ">GooglePay</h1>
        <div className="w-[50px] h-[50px] relative">
          <Image
            src={"/icons/payments/googlePay.svg"}
            alt="Ícone do GooglePay"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="border border-gray-600 flex justify-between px-5 py-2 rounded-md cursor-pointer xl:w-3/4 items-center">
        <h1 className="text-lg ">Paypal</h1>
        <div className="w-[50px] h-[50px] relative">
          <Image
            src={"/icons/payments/paypal.svg"}
            alt="Ícone do PayPal"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
