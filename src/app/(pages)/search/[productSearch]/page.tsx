"use client";
import ProductCard from "@/app/components/ThirdBox/ProductCard";
import { ProductsContext } from "@/context/Products";
import {
  CategoryType,
  PriceRangeType,
  SearchParamsBarContext,
} from "@/context/SearchParamsBar";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
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
  const [products, setProducts] = useState<Product[]>([]);
  const { products: allProducts } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { brandsSelected, categorySelected, priceRangeSelected } = useContext(
    SearchParamsBarContext
  );
  const query = searchParams.get("q");
  const productsHasSearchedWord = (product: Product, searched: string) => {
    return Object.values(product).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searched.toLowerCase());
      }
      return false;
    });
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
  }, [brandsSelected, categorySelected, priceRangeSelected,products]);

  useEffect(() => {
    getSearchedProducts();
  }, [allProducts, query]);

  return (
    <section className="flex gap-10 w-full px-32 py-8">
      <SideBar />
      <div className="flex flex-col w-full gap-2">
        <Menu products={filteredProducts} />
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
