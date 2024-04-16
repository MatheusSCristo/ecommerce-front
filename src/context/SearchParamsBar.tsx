import React, { createContext, useState } from "react";

export type PriceRangeType = { min: number; max: number };
export type CategoryType={category:string,categoria:string}

type ContextType = {
  brandsSelected: string[];
  setBrandsSelected: React.Dispatch<React.SetStateAction<string[]>>;
  categorySelected: CategoryType;
  setCategorySelected: React.Dispatch<React.SetStateAction<CategoryType>>;
  priceRangeSelected: PriceRangeType;
  setPriceRangeSelected: React.Dispatch<React.SetStateAction<PriceRangeType>>;
  ratingsSelected: Number[];
  setRatingsSelected: React.Dispatch<React.SetStateAction<Number[]>>;
};

const SearchParamsBarContext = createContext<ContextType>({} as ContextType);

function SearchParamsBarProvider({ children }: { children: React.ReactNode }) {
  const [brandsSelected, setBrandsSelected] = useState<string[]>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryType>({} as CategoryType);
  const [priceRangeSelected, setPriceRangeSelected] = useState<PriceRangeType>(
    {} as PriceRangeType
  );
  const [ratingsSelected, setRatingsSelected] = useState<Number[]>([]);

  return (
    <SearchParamsBarContext.Provider
      value={{
        brandsSelected,
        setBrandsSelected,
        categorySelected,
        setCategorySelected,
        priceRangeSelected,
        setPriceRangeSelected,
        ratingsSelected,
        setRatingsSelected,
      }}
    >
      {children}
    </SearchParamsBarContext.Provider>
  );
}

export { SearchParamsBarContext, SearchParamsBarProvider };

