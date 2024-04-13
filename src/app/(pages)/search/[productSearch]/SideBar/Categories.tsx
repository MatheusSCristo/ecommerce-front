import { SearchParamsBarContext } from "@/context/SearchParamsBar";
import { useContext, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const categories = [
    "Celular",
    "Notebooks",
    "Eletrônicos",
    "Moda",
    "Tecnologia",
    "Casa",
    "Beleza",
    "Livros",
  ];
const Categories = () => {
  const [showMoreIsActive, setShowMoreIsActive] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const {categorySelected,setCategorySelected}=useContext(SearchParamsBarContext);

  return (
    <div className="flex flex-col border-gray-300 border-t-2 py-2">
      <div className="flex justify-between items-center gap-16">
        <span className="font-bold">Categorias</span>

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
            <span className="text-gray-500" key={category} onClick={()=>setCategorySelected(category)}>
              {category}
            </span>
          );
        else if (showCategories && showMoreIsActive) {
          return (
            <span className="text-gray-500" key={category} onClick={()=>setCategorySelected(category)}>
              {category}
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
