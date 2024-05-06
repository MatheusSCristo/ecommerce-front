export const categories = [
  { category: "casual", categoria: "casual" },
  { category: "sports", categoria: "Esportivo" },
  { category: "outdoor", categoria: "Outdoor" },
  { category: "fashion", categoria: "Estiloso" },
  { category: "kids", categoria: "Infantil" },
  
];

export const translateCategory = (category: string ) => {
  const newCategory = categories.find((item) => item.category == category);
  return newCategory?.categoria;
};
