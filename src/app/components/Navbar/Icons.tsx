import Image from "next/image";
import React, { useState } from "react";
import { IoCart, IoHeart, IoPersonSharp } from "react-icons/io5";
import CartProduct from "./CartProduct";

const Icons = () => {
  const [accountDesktopIsOpen, setAccountDesktopIsOpen] = useState(false);
  const [cartMenuIsOpen, setCartMenuIsOpen] = useState(true);

  const products = [
    { nome: "Produto 1", priceInCents: 5000 },
    { nome: "Produto 2", priceInCents: 3000 },
    { nome: "Produto 3", priceInCents: 7500 },
    { nome: "Produto 4", priceInCents: 12000 },
  ];

  return (
    <div className="md:flex gap-10 hidden">
      <IoHeart size={25} className="hover:scale-[1.2]" />
      <div
        className="relative"
        onMouseEnter={() => setCartMenuIsOpen(true)}
        onMouseLeave={() => setCartMenuIsOpen(false)}
      >
        <IoCart size={25} className="hover:scale-[1.2]" />
        {cartMenuIsOpen && (
          <div className="absolute h-[600px] w-[350px] rounded-xl bg-white border border-gray-400 right-0 p-5 flex flex-col gap-5">
            <h1 className="text-xl">Carrinho de compras</h1>
            <div className="w-full justify-between flex px-3">
              <h2>Itens</h2>
              <h2>Subtotal</h2>
            </div>
            {products.map((product) => (
              <CartProduct product={product}/>
            ))}
          </div>
        )}
      </div>
      <div
        className="relative "
        onMouseEnter={() => setAccountDesktopIsOpen(true)}
        onMouseLeave={() => setAccountDesktopIsOpen(false)}
      >
        <IoPersonSharp size={25} className="hover:scale-[1.2]" />
        {accountDesktopIsOpen && (
          <div className="hidden md:flex absolute mt-2  flex-col w-[130px] p-2 bg-strongOrange text-white gap-2 right-1/2 rounded">
            <span className="border-white hover:border p-1 rounded">
              Minha conta
            </span>
            <span className="border-white hover:border p-1 rounded">
              Meus pedidos
            </span>
            <span className="border-white hover:border p-1 rounded">Sair</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Icons;
