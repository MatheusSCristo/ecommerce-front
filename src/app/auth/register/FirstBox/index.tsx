import { zodResolver } from "@hookform/resolvers/zod";
import { validate } from "gerador-validador-cpf";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type propsType = {
  setStep: Dispatch<SetStateAction<number>>;
  handleData:(submit: any) => void
  
};

const registerSchema = z.object({
  name: z.string().min(1, "É necessário informar seu nome."),
  lastName: z.string().min(1, "É necessário informar seu sobrenome."),
  birthDate: z
    .string()
    .refine(value =>new Date(value).getTime() <new Date(new Date().getFullYear() - 18,new Date().getMonth(),new Date().getDate()).getTime(),"É necessário ser maior de idade para se cadastrar."),
  cpf: z.string().refine((value) => validate(value),"CPF inválido."),
});

type registerType = z.infer<typeof registerSchema>;

const FirstBox = ({ setStep,handleData }: propsType) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<registerType>({
    resolver: zodResolver(registerSchema),
  });

  const handleContinue = () => {
    setStep((prevState) => prevState + 1);
  };
  const handleFormSubmit = (data:registerType) => {
    handleData(data)
    handleContinue();
  };

  return (
    <div className="flex flex-col items-center gap-5  ">
      <div className="flex items-center flex-col gap-2">
        <h1 className="text-2xl font-bold">Bem vindo!</h1>
        <h2 className="text-md text-dark">
          Para começarmos, precisamos de algumas informações suas.
        </h2>
      </div>
      <form
        className="flex flex-col w-3/4 gap-2"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
            {...register("name")}
          />
          {errors.name?.message && <span className="text-red-500">{errors.name?.message}</span>}

        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="lastName">
            Sobrenome
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
            {...register("lastName")}
          />
          {errors.lastName?.message && <span className="text-red-500">{errors.lastName?.message}</span>}

        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="birthDate">
            Data de nascimento
          </label>
          <input
            type="date"
            className="border-gray-300 border rounded-lg p-3"
            {...register("birthDate")}
          />
          {errors.birthDate?.message && <span className="text-red-500">{errors.birthDate?.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="cpf">
            CPF
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
            {...register("cpf")}
          />
          {errors.cpf?.message && <span className="text-red-500">{errors.cpf?.message}</span>}

        </div>
        <button
          type="submit"
          className="px-12 py-3 bg-strongOrange text-white rounded-lg"
        >
          Continuar
        </button>
      </form>
    </div>
  );
};

export default FirstBox;
