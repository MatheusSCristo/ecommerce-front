"use client";

import {
  CategoryType,
  SearchParamsBarContext,
} from "@/context/SearchParamsBarContext";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import Brands from "./Brands";
import Categories from "./Categories";
import Prices from "./Prices";

type propsType = {
  setSideBarMobileIsOpen?: Dispatch<SetStateAction<boolean>>;
};

const SideBar = ({ setSideBarMobileIsOpen }: propsType) => {
  const { setCategorySelected,setBrandsSelected,setPriceRangeSelected } = useContext(SearchParamsBarContext);
  const handleCloseSideBar = () => {
    if (setSideBarMobileIsOpen) setSideBarMobileIsOpen(false);
  };

  const handleRemoveFilters=()=>{
    setCategorySelected({} as CategoryType);
    setBrandsSelected([]);
    setPriceRangeSelected({min:0,max:10000});
  }

  useEffect(() => {
    return setCategorySelected({} as CategoryType);
  }, []);

  return (
    <div className="my-1 md:my-0 flex flex-col gap-2 md:static md:bg-transparent md:border-none absolute top-0 z-[9] bg-white border-gray-400 border px-2 h-screen ">
      <span className="self-end md:hidden" onClick={handleCloseSideBar}>
        X
      </span>
      <div className="flex gap-3 items-center">
      <h1 className="font-bold text-2xl">Filtros</h1>
      <h2 className="text-gray-500 hover:underline cursor-pointer" onClick={handleRemoveFilters}>Remover filtros</h2>
      </div>
      <Categories />
      <Brands />
      <Prices />
    </div>
  );
};

export default SideBar;
