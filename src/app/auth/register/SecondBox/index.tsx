import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { z } from "zod";

type propsType = {
  setStep: Dispatch<SetStateAction<number>>;
  name: string;
  handleData:(submit:any)=>void
  handleRegisterSubmit: (infos: {
    email: string;
    password: string;
}) => void
};

const registerSchema = z
  .object({
    email: z.string().email().min(1, "É necessário informar seu email."),
    password: z.string().min(1, "É necessário informar sua senha."),
    confirmPassword: z.string().min(1, "É necessário confirmar sua senha."),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password != confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não são iguais.",
        path: ["confirmPassword"],
      });
    }
  });

type registerType = z.infer<typeof registerSchema>;

const SecondBox = ({name,setStep,handleRegisterSubmit,handleData}: propsType) => {
  const name2 = "Matheus";

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

  const handleFormSubmit = (data: registerType) => {
    handleContinue();
    handleData(data)
    handleRegisterSubmit({ email: data.email, password: data.password });
  };

  const handleReturn = () => {
    setStep((prevState) => prevState - 1);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-[250px] xs:w-[300px] md:w-[400px]">
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center relative w-full">
          <FaArrowAltCircleLeft
            size={25}
            className="absolute left-2 cursor-pointer"
            onClick={handleReturn}
          />
          <h1 className="font-bold text-2xl">Legal {name2}!</h1>
        </div>
        <h2 className="text-dark text-md">Agora falta pouco. </h2>
      </div>
      <form
        className="flex flex-col gap-2 w-3/4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="Email">
            Email
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="password">
            Senha
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
            {...register("password")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="confirmPassword">
            Confirme sua senha
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
            {...register("confirmPassword")}
          />
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

export default SecondBox;
