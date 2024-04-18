import { SearchParamsBarContext } from "@/context/SearchParamsBarContext";
import { useContext, useEffect, useState } from "react";

const Prices = () => {
  const { priceRangeSelected, setPriceRangeSelected } = useContext(
    SearchParamsBarContext
  );
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1500);
  const handleInputPriceRange = () => {
    setPriceRangeSelected(() => ({
      min:min?min:0,
      max:max?max:0,
    }));
  };

  useEffect(() => handleInputPriceRange(), [min, max]);

  return (
    <div className="flex flex-col gap-2 ">
      <span className="font-bold">Preços</span>
      <div className="gap-2 flex items-center">
        <div className="flex flex-col bg-white border-gray-500 border rounded-lg w-[100px] px-2">
          <label htmlFor="min" className="text-gray-500 text-sm">
            Mínimo
          </label>
          <div className="flex">
            <span>R$</span>
            <input
              type="number"
              name="min"
              className="w-full rounded-lg"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="h-[1px] w-[10px] bg-gray-500" />
        <div className="flex flex-col bg-white border-gray-500 border rounded-lg w-[100px] px-2">
          <label htmlFor="max" className="text-gray-500 text-sm">
            Máximo
          </label>
          <div className="flex">
            <span>R$</span>
            <input
              type="number"
              name="max"
              className="w-full rounded-lg"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;
