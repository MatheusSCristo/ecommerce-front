import { Dispatch, SetStateAction } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

type propsType = {
  setStep: Dispatch<SetStateAction<number>>;
  name: string;
};

const SecondBox = ({ name, setStep }: propsType) => {
  const name2 = "Matheus";

  const handleContinue = () => {
    setStep((prevState) => prevState + 1);
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
      <div className="flex flex-col gap-2 w-3/4">
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="Email">
            Email
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="password">
            Senha
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="confirmPassword">
            Confirme sua senha
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
          />
        </div>
      </div>
      <button
        className="px-12 py-3 bg-strongOrange text-white rounded-lg"
        onClick={handleContinue}
      >
        Continuar
      </button>
    </div>
  );
};

export default SecondBox;
