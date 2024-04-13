import React, { createContext, useState } from "react";

type PriceRangeType = { min: Number; max: Number };

type ContextType = {
  brandsSelected: String[];
  setBrandsSelected: React.Dispatch<React.SetStateAction<String[]>>;
  categorySelected: String;
  setCategorySelected: React.Dispatch<React.SetStateAction<String>>;
  priceRangeSelected: PriceRangeType;
  setPriceRangeSelected: React.Dispatch<React.SetStateAction<PriceRangeType>>;
  ratingsSelected: Number[];
  setRatingsSelected: React.Dispatch<React.SetStateAction<Number[]>>;
};

const SearchParamsBarContext = createContext<ContextType>({} as ContextType);

function SearchParamsBarProvider({ children }: { children: React.ReactNode }) {
  const [brandsSelected, setBrandsSelected] = useState<String[]>([]);
  const [categorySelected, setCategorySelected] = useState<String>("");
  const [priceRangeSelected, setPriceRangeSelected] = useState<PriceRangeType>({} as PriceRangeType);
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

