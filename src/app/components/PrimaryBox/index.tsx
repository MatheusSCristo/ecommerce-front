import React from "react";

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
  <div className="bg-white border border-dark-200 rounded-lg">
    <div>
        {categories.map((category)=>(
            <div>
                <span>{category}</span>
            </div>
        ))}
    </div>
  </div>
  );
};

export default PrimaryBox;
