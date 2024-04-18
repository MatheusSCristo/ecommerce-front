"use client";
import { SearchParamsBarContext } from "@/context/SearchParamsBarContext";
import { Product } from "@/types";
import { useContext } from "react";
import Select from "./Select";

type ParamsType = {
  products: Product[];
};
const Menu = ({ products }: ParamsType) => {
  const { brandsSelected, categorySelected, priceRangeSelected } = useContext(
    SearchParamsBarContext
  );
  return (
    <div className="w-full">
      <div className="w-full bg-white p-3 border border-gray-500 rounded-lg flex justify-between items-center relative">
        {categorySelected.category && (
          <h1>
            {products.length} items encontrados em{" "}
            <span className="font-bold capitalize">
              {categorySelected.categoria}
            </span>
          </h1>
        )}
        {!categorySelected.category && (
          <h1>Mostrando {products.length} items</h1>
        )}
        <Select/>
      </div>
    </div>
  );
};

export default Menu;
