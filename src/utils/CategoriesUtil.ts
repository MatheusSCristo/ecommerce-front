export const categories = [
  { category: "shoes", categoria: "calçados" },
  { category: "technology", categoria: "tecnologia" },
  { category: "electronics", categoria: "eletrônicos" },
  { category: "smartphones", categoria: "smartphones" },
  { category: "accessories", categoria: "acessórios" },
  { category: "computers", categoria: "computadores" },
  { category: "notebooks", categoria: "notebooks" },
  { category: "photography", categoria: "fotografia" },
  { category: "cameras", categoria: "câmeras" },
  { category: "gaming", categoria: "jogos" },
  { category: "peripherals", categoria: "periféricos" },
  { category: "smartwatches", categoria: "smartwatches" },
  { category: "security", categoria: "segurança" },
  { category: "printers", categoria: "impressoras" },
  { category: "tablets", categoria: "tablets" },
  { category: "monitors", categoria: "monitores" },
  { category: "audio", categoria: "áudio" },
  { category: "clothes", categoria: "roupas" },
  { category: "house", categoria: "casa" },
];

export const translateCategory = (category: string ) => {
  const newCategory = categories.find((item) => item.category == category);
  return newCategory?.categoria;
};
