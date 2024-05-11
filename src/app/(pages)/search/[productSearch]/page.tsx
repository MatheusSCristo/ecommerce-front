"use client";
import ProductCard from "@/app/components/ProductCard";
import { ProductsContext } from "@/context/ProductsContext";
import {
  CategoryType,
  PriceRangeType,
  SearchParamsBarContext,
} from "@/context/SearchParamsBarContext";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import Menu from "./Menu";
import SideBar from "./SideBar";
import { CircularProgress } from "@mui/material";

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

const Page = ({ params: { productSearch } }: PropsType) => {
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


  const sortByPriceASC = () => {
    setFilteredProducts((prev) =>[...prev.sort((a, b) => a.priceInCents - b.priceInCents)]
    );  
  }

  const sortByPriceDESC = () => {
    setFilteredProducts((prev) =>[...prev.sort((a, b) => b.priceInCents - a.priceInCents)]
    );
  }
  
  const sortByMostRated=()=>{
    const getRating=(product:Product)=>{
      const ratings=product.ratings.map((rating)=>rating.rating)
      const sum=ratings.reduce((a,b)=>a+b,0)
      return sum/ratings.length
    }
    setFilteredProducts(prev=>[...prev.sort((a,b)=>getRating(b)-getRating(a))])
    
  }

  const handleSortBy = (sortBy: string) => {
    switch (sortBy) { 
      case "priceASC":
        sortByPriceASC();
        break;
      case "priceDSC":
        sortByPriceDESC();
      break;
      case "avaliation":
        sortByMostRated();
        break;
      default:
        break;
    }
  }


  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center text-gray-500"><CircularProgress color="inherit"/></div>}>
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
          <Menu products={filteredProducts} handleSortBy={handleSortBy}  />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 ">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id}/>
          ))}
        </div>
      </div>
    </section>
    </Suspense>
  );
};

export default Page;
