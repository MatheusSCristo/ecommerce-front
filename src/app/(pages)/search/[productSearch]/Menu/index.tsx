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
      <div className="self-end p-3 flex justify-end  relative">
        <div className="flex flex-col items-center">
          <Select />
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
        </div>
      </div>
    </div>
  );
};

export default Menu;
