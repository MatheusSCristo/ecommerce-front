"use client"
import { SearchParamsBarContext } from "@/context/SearchParamsBar";
import { Product } from "@/types";
import { useContext, useState } from "react";

type ParamsType={
  products:Product[]
}
const Menu = ({products}:ParamsType) => {
    const { brandsSelected, categorySelected, priceRangeSelected } = useContext(
        SearchParamsBarContext
      );
      const [sortBy, setSortBy] = useState<string>();
  return (
    <div className="w-full">
        <div className="w-full bg-white p-3 border border-gray-500 rounded-lg flex justify-between items-center">
          {categorySelected.category && (
            <h1>
              {products.length} items encontrados em{" "}
              <span className="font-bold capitalize">{categorySelected.categoria}</span>
            </h1>
          )}
          {!categorySelected.category && <h1>Mostrando {products.length} items</h1>}
          <select
            className="bg-gray-200 p-2 rounded-lg"
            defaultValue={"Classificar por"}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option disabled>Classificar por</option>
            <option>Do menor preço para o maior</option>
            <option>Do maior preço para o menor</option>
            <option>Melhor avaliado</option>
          </select>
        </div>
      </div>
  )
}

export default Menu