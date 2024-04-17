"use client";

import { Dispatch, SetStateAction } from "react";
import Brands from "./Brands";
import Categories from "./Categories";
import Prices from "./Prices";

type propsType = {
  setSideBarMobileIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SideBar = ({ setSideBarMobileIsOpen }: propsType) => {
  return (
    <div className="my-1 md:my-0 flex flex-col md:static md:bg-transparent md:border-none absolute top-0 z-[9] bg-white border-gray-400 border rounded-lg px-2 h-full ">
      <span className="self-end md:hidden" onClick={()=>setSideBarMobileIsOpen(false)}>X</span>
      <Categories />
      <Brands />
      <Prices />
    </div>
  );
};

export default SideBar;
