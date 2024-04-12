import Image from "next/image";
import React from "react";
import MobileCategoriesSlider from "./MobileCategoriesSlider";

const PrimaryBox = () => {
  const categories = [
    "Eletrônicos",
    "Moda",
    "Casa e Jardim",
    "Esportes e Fitness",
    "Beleza e Cuidados Pessoais",
    "Livros e Audiolivros",
    "Brinquedos e Jogos",
    "Automotivo",
    "Música e Instrumentos",
    "Saúde",
    "Ferramentas e Equipamentos",
    "Eletrônicos Domésticos",
  ];

  return (
    <section className="bg-white border border-gray-300 rounded-md md:p-3 flex flex-col md:flex-row gap-2 md:h-[450px] h-[250px]">
      <div className="md:hidden">
        {<MobileCategoriesSlider categories={categories} />}
      </div>
      <div className="md:flex flex-col hidden">
        {categories.map((category) => (
          <span className="p-1 hover:bg-gray-200 w-full rounded-md hover:scale-[1.01]" key={category}>
            {category}
          </span>
        ))}
        <span className="p-1 hover:bg-gray-200 w-full rounded-md hover:scale-[1.01]">Ver mais...</span>
      </div>
      <div className="flex-1 relative ">
        <Image
          src={"/images/primaryBanner.svg"}
          alt="Banner principal"
          fill
          className="object-cover"
        />
        <div className="absolute left-[2%] top-[15%] flex flex-col gap-4">
          <div className="gap-1 flex flex-col">
            <h1 className="text-xl md:text-3xl font-bold">
              Os Aparelhos eletrônicos
            </h1>
            <h1 className="text-xl md:text-3xl font-bold">Mais vendidos</h1>
          </div>
          <button className="bg-white px-5 py-2 rounded-lg w-fit font-bold">
            Veja aqui!
          </button>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default PrimaryBox;
