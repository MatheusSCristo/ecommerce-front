import { citiesOptionType } from "@/types";
import { getAllCities } from "easy-location-br";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

type propsType = {
  errors: FieldErrors<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cep: string;
    city: string;
    street: string;
    neighborhood: string;
  }>;
  city: string;
  register: UseFormRegister<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cep: string;
    city: string;
    street: string;
    neighborhood: string;
  }>;
  setValue: UseFormSetValue<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cep: string;
    city: string;
    street: string;
    neighborhood: string;
  }>;
  addressIsDisabled: boolean;
};

const CitiesComp = ({
  errors,
  city,
  register,
  setValue,
  addressIsDisabled,
}: propsType) => {
  const [citiesOption, setCitiesOption] = useState<citiesOptionType[]>([]);
  const [cityShow, setCityShow] = useState(city);
  const allCities: citiesOptionType[] = getAllCities();
  const getCitiesOption = (cityText: string) => {
    if (cityText.length < 3) {
      setCitiesOption([]);
      return;
    }
    const newCitiesOptions = allCities.filter((item) =>
      item.name.toLowerCase().startsWith(cityText.toLowerCase())
    );
    setCitiesOption(newCitiesOptions);
  };
  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityShow(e.target.value);
    getCitiesOption(e.target.value);
  };

  const handleDropdownClick = (city: citiesOptionType) => {
    setCityShow(`${city.name} - ${city.stateId}`);
    setValue("city", `${city.name} - ${city.stateId}`);
    setCitiesOption([]);
  };

  useEffect(() => {
    setCityShow(city);
  }, [city]);

  return (
    <div className="flex flex-col relative">
      <label htmlFor="city">
        Cidade/Estado<span className="ml-1 text-red-500">*</span>
      </label>
      <input
        disabled={addressIsDisabled}
        className={`border border-gray-400 rounded-md px-2 xl:w-[400px] py-2 disabled:opacity-50 ${
          citiesOption.length > 0 && "border-b-gray-200 rounded-b-none"
        }`}
        value={cityShow}
        {...register("city", {
          onChange: (e) => handleCityChange(e),
        })}
      />
      {citiesOption.length > 0 && citiesOption.length < 10 && (
        <ul className="border-gray-400 border-t-0 border rounded-b-md ">
          {citiesOption.map((city) => (
            <li
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDropdownClick(city)}
            >
              {city.name} - {city.stateId}
            </li>
          ))}
        </ul>
      )}
      {errors.city?.message && (
        <span className="text-red-500">{errors.city.message}</span>
      )}
    </div>
  );
};

export default CitiesComp;
