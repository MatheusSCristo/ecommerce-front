
const BillingDetails = () => {
  return (
    <div className="flex flex-col gap-5">
        <h1 className="font-bold text-2xl">Detalhes da Cobrança</h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="firstName">
              Nome<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 xl:w-[400px] py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">
              Sobrenome<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 xl:w-[400px] py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">
              Email<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 xl:w-[400px] py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">
              Celular<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 xl:w-[400px] py-2"
              placeholder="(XX) X XXXX-XXXX"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="CEP">
              CEP<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="select"
              className="border border-gray-400 rounded-md px-2 xl:w-[400px] py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state">
              Cidade<span className="ml-1 text-red-500">*</span>
            </label>
            <select className="border border-gray-400 rounded-md px-2 xl:w-[400px] py-2"></select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="street">
              Rua/Avenida<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 xl:w-[400px] py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="neighborhood">
              Bairro<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-md px-2 xl:w-[400px] py-2"
            />
          </div>
        </div>
        <button className="bg-strongOrange w-1/4 py-2 text-white self-center rounded-lg">
          Salvar
        </button>
      </div>
  )
}

export default BillingDetails