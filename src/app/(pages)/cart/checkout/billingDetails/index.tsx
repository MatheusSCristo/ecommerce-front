import { cepResponseType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllCities } from "easy-location-br";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CitiesComp from "./CitiesComp";

const refineCity = (value: string) => {
  const cities: { name: string; stateId: string }[] = getAllCities();
  return cities.some((item) => item.name === value.trim());
};

const refineEmail = (value: string) => {
  const providers = [
    "gmail.com",
    "outlook.com",
    "yahoo.com",
    "icloud.com",
    "hotmail.com",
  ];
  return providers.some((provider) => provider === value.split("@")[1]);
};

const billingSchema = z.object({
  name: z.string().min(1, "É necessário informar o nome do comprador"),
  lastName: z.string().min(1, "É necessário informar o sobrenome do comprador"),
  email: z
    .string()
    .min(1, "É necessário informar o email para contato")
    .email("Email inválido")
    .refine((value) => refineEmail(value), "Email inválido"),
  phone: z.string().length(15, "Telefone inválido"),
  cep: z.string().min(9, "CEP inválido").max(9, "CEP inválido"),
  city: z
    .string()
    .min(1, "É necessário informar uma cidade")
    .refine((value) => refineCity(value), "Cidade inválida"),
  street: z.string().min(1, "É necessário informar uma rua/avenida"),
  neighborhood: z.string().min(1, "É necessário informar um bairro"),
});

export type billingSchemaType = z.infer<typeof billingSchema>;
type propsType = {
  setBillingData: Dispatch<
    SetStateAction<
      | {
          name: string;
          lastName: string;
          email: string;
          phone: string;
          cep: string;
          city: string;
          street: string;
          neighborhood: string;
        }
      | undefined
    >
  >;
  setBillingDataError: Dispatch<SetStateAction<boolean>>;
};

const BillingDetails = ({ setBillingData, setBillingDataError }: propsType) => {
  const [city, setCity] = useState<string>("");
  const [addressIsDisabled, setAddressIsDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<billingSchemaType>({ resolver: zodResolver(billingSchema) });

  const cepMask = () => {
    let currentCep = getValues("cep");
    if (!currentCep) return "";
    currentCep = currentCep.replace(/\D/g, "");
    currentCep = currentCep.replace(/(\d{5})(\d)/, "$1-$2");
    setValue("cep", currentCep);
  };

  const numberMask = () => {
    let currentNumber = getValues("phone");
    if (!currentNumber) return "";
    currentNumber = currentNumber.replace(/\D/g, "");
    currentNumber = currentNumber.replace(/(\d{0})(\d)/, "$1($2");
    currentNumber = currentNumber.replace(/(\d{2})(\d)/, "$1) $2");
    currentNumber = currentNumber.replace(/(\d{5})(\d)/, "$1-$2");
    setValue("phone", currentNumber);
  };

  const getDataFromCep = async (e: ChangeEvent<HTMLInputElement>) => {
    cepMask();
    const cep = e.target.value;
    if (cep.length !== 9) {
      setAddressIsDisabled(false);
      return;
    }
    const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const response = await data.json();
    if (response.erro) {
      setError("cep", { type: "custom", message: "CEP inválido" });
      return;
    }
    const locationsData: cepResponseType = response;
    setAddressIsDisabled(true);
    setError("cep", {});
    setValue("city", locationsData.localidade);
    setCity(`${locationsData.localidade} - ${locationsData.uf}`);
    setValue("neighborhood", locationsData.bairro);
    setValue("street", locationsData.logradouro);
  };

  const handleSendData = (data: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    cep: string;
    city: string;
    street: string;
    neighborhood: string;
  }) => {
    setBillingDataError(false);
    setBillingData(data);
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleSendData)}
    >
      <h1 className=" text-xl">Detalhes da Cobrança</h1>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Nome"
            className="border border-black rounded-sm px-2 xl:w-[250px] py-2 disabled:opacity-50"
            {...register("name")}
          />
          {errors.name?.message && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Sobrenome"
            className="border border-black rounded-sm px-2 xl:w-[250px] py-2 disabled:opacity-50"
            {...register("lastName")}
          />
          {errors.lastName?.message && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>
        <div className="flex flex-col col-span-2">
          <input
            type="text"
            placeholder="Email"
            className="border border-black rounded-sm px-2  py-2 disabled:opacity-50"
            {...register("email")}
          />
          {errors.email?.message && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="border border-black rounded-sm px-2 xl:w-[250px] py-2 disabled:opacity-50"
            placeholder="(XX) X XXXX-XXXX"
            maxLength={15}
            {...register("phone", {
              onChange: () => numberMask(),
            })}
          />
          {errors.phone?.message && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="CEP"
            className="border border-black rounded-sm px-2 xl:w-[250px] py-2 disabled:opacity-50"
            maxLength={9}
            {...register("cep", {
              onChange: (e) => getDataFromCep(e),
            })}
          />

          {errors.cep?.message && (
            <span className="text-red-500">{errors.cep.message}</span>
          )}
        </div>
        <CitiesComp
          errors={errors}
          addressIsDisabled={addressIsDisabled}
          city={city}
          register={register}
          setValue={setValue}
        />

        <div className="flex flex-col col-span-2">
          <input
            type="text"
            placeholder="Rua"
            className="border border-black rounded-sm px-2  py-2 disabled:opacity-50"
            disabled={addressIsDisabled}
            {...register("street")}
          />
          {errors.street?.message && (
            <span className="text-red-500">{errors.street.message}</span>
          )}
        </div>
        <div className="flex flex-col col-span-2">
          <input
            type="text"
            placeholder="Bairro"
            className="border border-black rounded-sm px-2  py-2 disabled:opacity-50"
            disabled={addressIsDisabled}
            {...register("neighborhood")}
          />
          {errors.neighborhood?.message && (
            <span className="text-red-500">{errors.neighborhood.message}</span>
          )}
        </div>
      </div>
      <button className="bg-black w-1/4 py-2 text-white self-center rounded-sm">
        Salvar
      </button>
    </form>
  );
};

export default BillingDetails;
