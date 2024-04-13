"use client";

import Brands from "./Brands";
import Categories from "./Categories";
import Prices from "./Prices";
const SideBar = () => {
  
  return (
    <div className="flex flex-col ">
      <Categories/>
      <Brands/>
      <Prices/>
    </div>
  );
};

export default SideBar;
