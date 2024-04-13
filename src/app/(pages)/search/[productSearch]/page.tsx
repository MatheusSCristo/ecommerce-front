"use client";
import { SearchParamsBarContext } from "@/context/SearchParamsBar";
import { useContext, useState } from "react";
import SideBar from "./SideBar";

type PropsType = {
  params: { productSearch: string };
};

const page = ({ params: { productSearch } }: PropsType) => {
  const { brandsSelected, categorySelected, priceRangeSelected } = useContext(
    SearchParamsBarContext
  );
  const [sortBy, setSortBy] = useState<string>();


  return (
    <section className="flex gap-10 w-full px-32 py-8">
      <SideBar />
      <div className="w-full">
        <div className="w-full bg-white p-3 border border-gray-500 rounded-lg flex justify-between items-center">
          {categorySelected && (
            <h1>
              123 items encontrados em{" "}
              <span className="font-bold">{categorySelected}</span>
            </h1>
          )}
          {!categorySelected && <h1>Mostrando 12,302 items</h1>}
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
    </section>
  );
};

export default page;
