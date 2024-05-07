"use client";
import ProductCard from "@/app/components/ThirdBox/ProductCard";
import { ProductsContext } from "@/context/ProductsContext";
import {
  CategoryType,
  PriceRangeType,
  SearchParamsBarContext,
} from "@/context/SearchParamsBarContext";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import Menu from "./Menu";
import SideBar from "./SideBar";

const categoryFilter = (product: Product, category: CategoryType) => {
  if (!category.category) return true;
  return product.categories.includes(category.category);
};
const brandFilter = (product: Product, brands: string[]) => {
  if (brands.length == 0) return true;
  return brands.some((brand) => product.brand === brand);
};
const priceFilter = (product: Product, priceRange: PriceRangeType) => {
  if (!priceRange) return true;
  return (
    product.priceInCents / 100 > priceRange.min &&
    product.priceInCents / 100 < priceRange.max
  );
};

type PropsType = {
  params: { productSearch: string };
};

const page = ({ params: { productSearch } }: PropsType) => {
  const searchParams = useSearchParams();
  const [sideBarMobileIsOpen, setSideBarMobileIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products: allProducts } = useContext(ProductsContext);
  const { brandsSelected, categorySelected, priceRangeSelected } = useContext(
    SearchParamsBarContext
    );
    const query = searchParams.get("q");

  const productsHasSearchedWord = (product: Product, searched: string) => {
    const {name,description,brand,model }= product;
    const values=[name,description,brand,model];
    return values.some(value=>value.toLowerCase().includes(searched.toLowerCase()))
  };

  const filterProducts = (product: Product) => {
    return (
      categoryFilter(product, categorySelected) &&
      brandFilter(product, brandsSelected) &&
      priceFilter(product, priceRangeSelected)
    );
  };

  const getFiltered = () => {
    setFilteredProducts(products.filter((product) => filterProducts(product)));
  };

  const getSearchedProducts = () => {
    const searchedWords = query?.split("+");
    const searchedProducts = allProducts.filter((product) => {
      return searchedWords?.some((word) =>
        productsHasSearchedWord(product, word)
      );
    });
    setProducts(searchedProducts);
  };

  useEffect(() => {
    getFiltered();
  }, [brandsSelected, categorySelected, priceRangeSelected, products]);

  useEffect(() => {
    getSearchedProducts();
  }, [allProducts, query]);

  return (
    <section className="flex gap-2 md:gap-10 w-full px-2 xl:px-32 py-8 relative ">
      {sideBarMobileIsOpen && (
        <SideBar setSideBarMobileIsOpen={setSideBarMobileIsOpen} />
      )}
      <div className="hidden md:block">
        <SideBar  />
      </div>
      <div className="flex flex-col w-full gap-2 ">
        <div className="flex items-center gap-2">
          <span
            onClick={() => setSideBarMobileIsOpen(true)}
            className="md:hidden items-center flex h-[50px] "
          >
            <IoFilter size={20} />
          </span>
          <Menu products={filteredProducts} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 ">
          {filteredProducts.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
