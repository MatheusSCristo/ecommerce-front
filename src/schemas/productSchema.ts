import { z } from "zod";

export default z.object({
    priceInCents: z
      .string()
      .min(1, "O campo deve ser preenchido")
      .refine((value) => !isNaN(Number(value)), "O preço deve ser um número"),
    brand: z.string().min(1, "O campo deve ser preenchido"),
    model: z.string().min(1, "O campo deve ser preenchido"),
    color: z.string().min(1, "O campo deve ser preenchido"),
    name: z.string().min(1, "O campo deve ser preenchido"),
    description: z.string().min(1, "O campo deve ser preenchido"),
    categories: z
      .array(z.string())
      .min(1, { message: "Selecione pelo menos uma categoria" }),
    rating:z.number().min(1).max(5).optional(),
    imageUrl:z.string().optional()
  });