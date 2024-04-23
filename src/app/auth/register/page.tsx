"use client";
import { UserContext } from "@/context/UserContext";
import { createSession } from "@/utils/User/createSession";
import createUser from "@/utils/User/createUser";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import { MdError } from "react-icons/md";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";

type Steps = {
  [key: number]: React.ComponentType<any>;
};
const steps: Steps = {
  1: FirstBox,
  2: SecondBox,
  3: ThirdBox,
};

type dataType = {
  name: string;
  lastName: string;
  birthDate: Date;
  cpf: string;
};

const capitalizeWord = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

const stepsDots = [1, 2];
const register = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<dataType>({} as dataType);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const CurrentStepComp = steps[step];
  const {setUser}=useContext(UserContext);

  const handleData = (submit: any) => {
    setData((prevState) => ({ ...prevState, ...submit }));
  };

  const handleRegisterSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    const body = {
      name: capitalizeWord(data.name),
      lastName: capitalizeWord(data.lastName),
      email,
      password,
      birthDate: data.birthDate.toString(),
      cpf: data.cpf,
    };
    const response = await createUser(body);
    if (!response.ok) {
      setIsLoading(false);
      setError(true);
      return
    }
    const user=await response.json()
    createSession(user.accessToken)
    setUser(user);
    setIsLoading(false)
  };

  return (
    <section className="flex items-center justify-center h-full ">
      {!isLoading && !error && (
        <div className="p-5 bg-white border-gray-300 border rounded-lg flex flex-col gap-2">
          <CurrentStepComp
            setStep={setStep}
            handleData={handleData}
            handleRegisterSubmit={handleRegisterSubmit}
          />
          <div className="flex justify-center gap-2">
            {stepsDots.map((item) => (
              <div
                key={item}
                className={`w-[10px] h-[10px] border rounded-full border-black ${
                  item <= step - 1 ? "bg-lime-400" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      {error && !isLoading && (
        <div className="p-5 bg-white border-gray-300 border rounded-lg flex flex-col gap-2 items-center">
          <h1 className="text-3xl">OPS...</h1>
          <h2>Aconteceu algum problema, tente novamente mais tarde.</h2>
          <MdError size={40} className="text-red-500" />
          <Link
            href={"/"}
            className="px-12 py-3 bg-strongOrange text-white rounded-lg"
          >
            Ir para loja
          </Link>
        </div>
      )}
    </section>
  );
};

export default register;
