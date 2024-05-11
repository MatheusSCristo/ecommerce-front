import {
  CategoryType,
  SearchParamsBarContext,
} from "@/context/SearchParamsBarContext";
import { categories } from "@/utils/CategoriesUtil";
import { useContext, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const Categories = () => {
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
      {showCategories && categories.map((category, index) => (
        <span
          className={`text-gray-500 capitalize rounded-md p-1 cursor-pointer ${
            category.category == categorySelected.category ? "bg-gray-300" : ""
          }`}
          key={category.category}
          onClick={() => handleAddCategory(category)}
        >
          {category.categoria}
        </span>
      ))}
    </div>
  );
};

export default Categories;
