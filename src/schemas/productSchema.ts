import { z } from "zod";

const validateSizes=(value:string)=>{
  const sizes=value.split(",");
  return !sizes.some((size)=>{
   return isNaN(parseInt(size));
  })
}

export default z.object({
    priceInCents: z
      .string()
      .min(1, "O campo deve ser preenchido")
      .refine((value) => !isNaN(Number(value)), "O preço deve ser um número"),
    brand: z.string().min(1, "O campo deve ser preenchido"),
    model: z.string().min(1, "O campo deve ser preenchido"),
    colors: z.string().min(1, "O campo deve ser preenchido"),
    name: z.string().min(1, "O campo deve ser preenchido"),
    description: z.string().min(1, "O campo deve ser preenchido"),
    categories: z
      .array(z.string())
      .min(1, { message: "Selecione pelo menos uma categoria" }),
    rating:z.number().min(1).max(5).optional(),
    imageUrl:z.array(z.string()).optional(),
    sizes:z.string().min(2,"É necessário informar pelo menos um tamanho").refine(validateSizes,"Tamanhos inválidos")
  });