import { categories } from "@/utils/CategoriesUtil";
import React, { useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

type categoryType = (typeof categories)[0];

type propsType = {
  categoriesSelected: categoryType[];
  setCategoriesSelected: React.Dispatch<React.SetStateAction<categoryType[]>>;
  register:UseFormRegister<FieldValues>
  errors:FieldErrors<FieldValues>
  setValue:UseFormSetValue<FieldValues>
};



const Category = ({ categoriesSelected, setCategoriesSelected,register,errors,setValue }: propsType) => {
  const [categoriesShowed, setCategoriesShowed] = useState<categoryType[]>([]);

  useEffect(()=>{
    setValue("categories",categoriesSelected.map(c=>c.category))
  },[categoriesSelected])


  const handleRemoveCategory = (category: categoryType) => {
    setCategoriesSelected(categoriesSelected.filter((c) => c !== category));
  };

  const handleCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriesShowed([]);
    if (e.target.value == "") return;
    categories.some(
      (category) =>
        category.categoria
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase()) &&
        setCategoriesShowed((prevState) => [...prevState, category])
    );
  };

  const handleCategorySelect = (category: categoryType) => {
    if (categoriesSelected.includes(category)) return;
    setCategoriesSelected((prevState) => [...prevState, category]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col ">
        <label htmlFor="model">Categorias</label>
        <input
        
          onChange={handleCategoryInput}
          className={`${
            categoriesShowed.length > 0
              ? "border-b-gray-300 rounded-b-none rounded-t-md "
              : "rounded-md"
          } px-2 py-1 border border-gray-400 focus:outline-none`}
          type="text"
          id="model"
        />
        {categoriesShowed && (
          <ul className="bg-white border-gray-200 border-t-0 border rounded-b-md  ">
            {categoriesShowed.map((category) => (
              <li
                onClick={() => handleCategorySelect(category)}
                className="px-2 py-1 capitalize border-b-gray-100 border cursor-pointer hover:bg-gray-100"
              >
                {category.categoria}
              </li>
            ))}
          </ul>
        )}
      </div>
      {errors.categories && (
                <span className="text-red-500">
                  {errors.categories.message?.toString()}
                </span>
              )}
      {categoriesSelected.length > 0 && (
        <>
          <span className="text-red-500">
            Clique na categoria para remove-la.
          </span>
          <div className="flex gap-2">
            {categoriesSelected.map((category) => (
              <div className="bg-gray-400 p-2 rounded-md text-white capitalize w-fit hover:bg-red-400">
                <span onClick={() => handleRemoveCategory(category)}>
                  {category.categoria}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
