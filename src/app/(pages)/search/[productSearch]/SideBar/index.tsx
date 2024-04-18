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
  const { setCategorySelected } = useContext(SearchParamsBarContext);
  const handleCloseSideBar = () => {
    if (setSideBarMobileIsOpen) setSideBarMobileIsOpen(false);
  };
  useEffect(() => {
    return setCategorySelected({} as CategoryType);
  }, []);

  return (
    <div className="my-1 md:my-0 flex flex-col md:static md:bg-transparent md:border-none absolute top-0 z-[9] bg-white border-gray-400 border rounded-lg px-2 h-screen ">
      <span className="self-end md:hidden" onClick={handleCloseSideBar}>
        X
      </span>
      <Categories />
      <Brands />
      <Prices />
    </div>
  );
};

export default SideBar;
