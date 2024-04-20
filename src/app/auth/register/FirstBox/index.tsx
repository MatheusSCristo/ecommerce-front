import { Dispatch, SetStateAction } from "react";

type propsType = {
  setStep: Dispatch<SetStateAction<number>>;
};

const FirstBox = ({ setStep }: propsType) => {
  const handleContinue = () => {
    setStep((prevState) => prevState + 1);
  };

  return (
    <div className="flex flex-col items-center gap-5  ">
      <div className="flex items-center flex-col gap-2">
        <h1 className="text-2xl font-bold">Bem vindo!</h1>
        <h2 className="text-md text-dark">
          Para começarmos, precisamos de algumas informações suas.
        </h2>
      </div>
      <div className="flex flex-col w-3/4 gap-2 ">
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="lastName">
            Sobrenome
          </label>
          <input
            type="text"
            className="border-gray-300 border rounded-lg p-3"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="birthDate">
            Data de nascimento
          </label>
          <input
            type="date"
            className="border-gray-300 border rounded-lg p-3"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="cpf">
            CPF
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

export default FirstBox;
