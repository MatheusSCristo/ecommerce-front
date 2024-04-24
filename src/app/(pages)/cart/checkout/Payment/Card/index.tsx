import valid from "card-validator";
import Image from "next/image";
import { useState } from "react";

const months = [
  { month: "Janeiro (01)", code: 1 },
  { month: "Fevereiro (02)", code: 2 },
  { month: "Março (03)", code: 3 },
  { month: "Abril (04)", code: 4 },
  { month: "Maio (05)", code: 5 },
  { month: "Junho (06)", code: 6 },
  { month: "Julho (07)", code: 7 },
  { month: "Agosto (08)", code: 8 },
  { month: "Setembro (09)", code: 9 },
  { month: "Outubro (10)", code: 10 },
  { month: "Novembro (11)", code: 11 },
  { month: "Dezembro (12)", code: 12 },
];

const Card = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardImage, setCardImage] = useState<string | undefined>("");
  const getCardFlag = (number: string) => {
    if (number.length > 3){
        const flag=valid.number(number).card?.type
        setCardImage(flag==="visa" || flag==="mastercard" || flag==="elo" ?flag:undefined)
        return
    }
     setCardImage(undefined);
  };

  return (
    <form className="flex flex-col md:grid grid-cols-2 border border-gray-400 rounded-md p-5 gap-5">
      <div className="border border-gray-400 rounded-lg px-2 py-2 flex justify-between">
        <input
          placeholder="Número do Cartão"
          value={cardNumber}
          onChange={(e) => {
            setCardNumber(e.target.value);
            getCardFlag(e.target.value);
          }}
          className="focus:outline-none rounded-md w-full"
        />
        {cardImage && <div className="w-[50px] h-[30px] relative">
          <Image
            src={`/icons/payments/${cardImage}.svg`}
            alt="Bandeira do cartão"
            fill
            className="object-contain"
          />
        </div>}
      </div>
      <input
        placeholder="Nome do Titular"
        className="border border-gray-400 rounded-lg px-2 py-2"
      />
      <div className="flex items-center gap-2">
        <select
          className="border border-gray-400 rounded-lg px-2 py-2 w-3/4"
          defaultValue="MM"
        >
          <option disabled>MM</option>
          {months.map((item) => (
            <option key={item.month} value={item.code}>
              {item.month}
            </option>
          ))}
        </select>
        <span className="font-bold">/</span>
        <input
          maxLength={4}
          placeholder="YYYY"
          className="border border-gray-400 rounded-lg px-2 py-2 w-3/4"
        />
      </div>
      <input
        maxLength={4}
        placeholder="Código de Segurança (CVV) "
        className="border border-gray-400 rounded-lg px-2 py-2"
      />
      <span className="text-red-500">
        Nenhum dado é armazenado após a conclusão da compra.{" "}
      </span>
    </form>
  );
};

export default Card;
