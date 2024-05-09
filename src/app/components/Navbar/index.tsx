"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { IoCartOutline, IoMenu, IoSearch } from "react-icons/io5";

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
  const { products } = useContext(CartContext);

  const handleSearchClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === "") return;
    const splitedSearch = search.split(" ");
    const queryParams = new URLSearchParams(Array.from(searchParams.entries()));
    queryParams.set("q", splitedSearch.join("+"));
    const queryString = queryParams.toString();
    router.push(`/search/${`/search/?${queryString}`}`);
  };

  return (
    <header className="sticky top-0 flex flex-col gap-2 md:gap-0 md:flex-row md:items-center w-full justify-between md:px-32 py-4 border-b-gray-300 border-b-2 relative bg-white z-10">
      <div className="flex justify-between items-center px-5 gap-5 ">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center gap-2">
            <IoMenu
              size={30}
              className="md:hidden"
              onClick={() => setMenuMobileIsOpen(true)}
            />
            <Link href="/" className="font-bold text-2xl flex items-center">
              Sneakkers
            </Link>
          </div>
          <form
            className="flex w-full md:w-fit  md:px-0 focus:outline gap-2 "
            onSubmit={(e) => handleSearchClick(e)}
          >
            <button type="submit" className="text-gray-600">
              <IoSearch size={20} />
            </button>
            <input
              placeholder="Procurar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:outline-none"
            />
          </form>
        </div>
        <div className="flex gap-10 md:hidden relative">
          {cartMobileIsOpen && (
            <Cart setCartMobileIsOpen={setCartMobileIsOpen} />
          )}
          {!cartMobileIsOpen && (
            <div className="relative hover:scale-[1.05] duration-300 transition ease-in-out flex items-center">
              <IoCartOutline
                size={35}
                onClick={() => setCartMobileIsOpen(true)}
              />
              {products.length > 0 && (
                <span className="text-black">{products.length}</span>
              )}
            </div>
          )}
        </div>
      </div>
      <Icons />
      {accountMobileIsOpen && (
        <MobileMenu setMenuMobileIsOpen={setMenuMobileIsOpen} />
      )}
    </header>
  );
};

export default Navbar;
