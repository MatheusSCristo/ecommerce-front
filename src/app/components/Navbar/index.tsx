"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { IoCart, IoMenu } from "react-icons/io5";

import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Cart from "./Cart";
import Icons from "./Icons";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [accountMobileIsOpen, setMenuMobileIsOpen] = useState(false);
  const [cartMobileIsOpen, setCartMobileIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {products}=useContext(CartContext)

  const handleSearchClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const splitedSearch = search.split(" ");
    const queryParams = new URLSearchParams(Array.from(searchParams.entries()));
    queryParams.set("q", splitedSearch.join("+"));
    const queryString = queryParams.toString();
    router.push(`/search/${`/search/?${queryString}`}`);
  };

  return (
    <header className="sticky top-0 flex flex-col gap-2 md:gap-0 md:flex-row md:items-center w-full justify-evenly py-4 border-b-gray-300 border-b-2 relative bg-white z-10">
      <div className="flex justify-between items-center px-5">
        <div className="flex items-center gap-2">
          <IoMenu
            size={30}
            className="md:hidden"
            onClick={() => setMenuMobileIsOpen(true)}
          />
          <Link
            href="/"
            className="font-bold text-strongOrange text-2xl flex items-center"
          >
            <Image src="/icons/logo.svg" width={40} height={40} alt="" />
            Brand
          </Link>
        </div>
        <div className="flex gap-10 md:hidden relative">
          {cartMobileIsOpen && (
            <Cart setCartMobileIsOpen={setCartMobileIsOpen} />
          )}
          {!cartMobileIsOpen && (
            <div className="relative hover:scale-[1.05]" >
             {products.length>0 && <span className="absolute right-0 bottom-0 bg-[#fa1a1a] rounded-full w-[20px] h-[20px] text-sm flex items-center justify-center text-white">{products.length}</span>}
              <IoCart
                size={35}
                onClick={() => setCartMobileIsOpen(true)}
              />
            </div>
          )}
        </div>
      </div>
      <form
        className="flex w-full md:w-1/3 px-5 md:px-0"
        onSubmit={(e) => handleSearchClick(e)}
      >
        <input
          placeholder="Encontre o produto perfeito para você."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-strongOrange rounded-lg rounded-r-none border-r-0 w-full focus:outline-none"
        />
        <button
          type="submit"
          className="py-2 px-5 border bg-strongOrange border-strongOrange text-white rounded-lg rounded-l-none hover:bg-hoverOrange"
        >
          Procurar
        </button>
      </form>
      <Icons />
      {accountMobileIsOpen && (
        <MobileMenu setMenuMobileIsOpen={setMenuMobileIsOpen} />
      )}
    </header>
  );
};

export default Navbar;
