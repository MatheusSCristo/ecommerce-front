import {
  CategoryType,
  SearchParamsBarContext,
} from "@/context/SearchParamsBarContext";
import { useContext, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export const categories = [
  { category: "shoes", categoria: "calçados" },
  { category: "technology", categoria: "tecnologia" },
  { category: "electronics", categoria: "eletrônicos" },
  { category: "smartphones", categoria: "smartphones" },
  { category: "accessories", categoria: "acessórios" },
  { category: "computers", categoria: "computadores" },
  { category: "notebooks", categoria: "notebooks" },
  { category: "photography", categoria: "fotografia" },
  { category: "cameras", categoria: "câmeras" },
  { category: "gaming", categoria: "jogos" },
  { category: "peripherals", categoria: "periféricos" },
  { category: "smartwatches", categoria: "smartwatches" },
  { category: "security", categoria: "segurança" },
  { category: "printers", categoria: "impressoras" },
  { category: "tablets", categoria: "tablets" },
  { category: "monitors", categoria: "monitores" },
  { category: "audio", categoria: "áudio" },
  { category: "clothes", categoria: "roupas" },
  { category: "house", categoria: "casa" },
];

const Categories = () => {
  const [showMoreIsActive, setShowMoreIsActive] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const { categorySelected, setCategorySelected } = useContext(
    SearchParamsBarContext
  );

  const handleAddCategory = (category: CategoryType) => {
    if (categorySelected.categoria == category.categoria) {
      setCategorySelected({} as CategoryType);
      return 0;
    }
    setCategorySelected({
      category: category.category,
      categoria: category.categoria,
    });
  };

  return (
    <div className="flex flex-col border-gray-300 border-t-2 py-2 ">
      <div className="flex justify-between items-center gap-16">
        <span className="font-bold p-1">Categorias</span>

        {showCategories && (
          <IoChevronUp
            size={20}
            className="text-gray-600"
            onClick={() => setShowCategories(false)}
          />
        )}
        {!showCategories && (
          <IoChevronDown
            size={20}
            className="text-gray-600"
            onClick={() => setShowCategories(true)}
          />
        )}
      </div>
      {categories.map((category, index) => {
        if (showCategories && index < 6 && !showMoreIsActive)
          return (
            <span
              className={`text-gray-500 capitalize rounded-md p-1 cursor-pointer ${
                category.category == categorySelected.category
                  ? "bg-gray-300"
                  : ""
              }`}
              key={category.category}
              onClick={() => handleAddCategory(category)}
            >
              {category.categoria}
            </span>
          );
        else if (showCategories && showMoreIsActive) {
          return (
            <span
              className={`text-gray-500 capitalize rounded-md p-1 cursor-pointer ${
                category.category == categorySelected.category
                  ? "bg-gray-400"
                  : ""
              }`}
              key={category.category}
              onClick={() => handleAddCategory(category)}
            >
              {category.categoria}
            </span>
          );
        }
      })}
      <span
        className="text-blue"
        onClick={() => setShowMoreIsActive((prevState) => !prevState)}
      >
        {showCategories && (showMoreIsActive ? "Ver menos" : "Ver mais")}
      </span>
    </div>
  );
};

export default Categories;
