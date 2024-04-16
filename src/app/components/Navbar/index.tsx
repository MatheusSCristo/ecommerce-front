"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoCart, IoMenu } from "react-icons/io5";

import Icons from "./Icons";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [accountMobileIsOpen, setMenuMobileIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchClick = (e:FormEvent<HTMLFormElement>) => {
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
        <div className="flex gap-10 md:hidden">
          <IoCart size={25} className="hover:scale-[1.2]" />
        </div>
      </div>
      <form className="flex w-full md:w-1/3 px-5 md:px-0" onSubmit={(e)=>handleSearchClick(e)}>
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
