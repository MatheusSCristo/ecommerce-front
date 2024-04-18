import { ProductsContext } from "@/context/ProductsContext";
import { SearchParamsBarContext } from "@/context/SearchParamsBarContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const Brands = () => {
  const [showBrands, setShowBrands] = useState(true);
  const [showMoreIsActive, setShowMoreIsActive] = useState(false);
  const {brandsSelected,setBrandsSelected}=useContext(SearchParamsBarContext);
  const {products}=useContext(ProductsContext)
  const [brands,setBrands]=useState<string[]>([])
  

  useEffect(()=>{
    setBrands(products.map((product)=>product.brand))
  },[products])

  const handleSelectBrand = (e: ChangeEvent<HTMLInputElement>) => {
    const brand = e.target.value;
    if (brandsSelected.includes(brand)) {
        const newBrandsSelected=brandsSelected
        setBrandsSelected(newBrandsSelected.filter((value)=>value!==brand))
    }
    else{
        setBrandsSelected((prevState)=>[...prevState,brand])
    }
  };

  return (
    <div className="flex flex-col border-gray-300 border-t-2 py-2">
      <div className="flex justify-between items-center gap-16">
        <span className="font-bold">Marcas</span>
        {showBrands && (
          <IoChevronUp
            size={20}
            className="text-gray-600"
            onClick={() => setShowBrands(false)}
          />
        )}
        {!showBrands && (
          <IoChevronDown
            size={20}
            className="text-gray-600"
            onClick={() => setShowBrands(true)}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 text-gray-500 ">
        {brands.map((brand, index) => {
          if (showBrands && index < 6 && !showMoreIsActive)
            return (
              <div key={brand} className="flex items-center">
                <input type="checkbox" onChange={handleSelectBrand} value={brand} />
                <span>{brand}</span>
              </div>
            );
          else if (showBrands && showMoreIsActive) {
            return (
              <div key={brand} className="flex items-center">
                <input type="checkbox" onChange={handleSelectBrand}  value={brand} />
                <span>{brand}</span>
              </div>
            );
          }
        })}
        <span
          className="text-blue"
          onClick={() => setShowMoreIsActive((prevState) => !prevState)}
        >
         {showBrands && (showMoreIsActive  ? "Ver menos" : "Ver mais")}
        </span>
      </div>
    </div>
  );
};

export default Brands;
