import { z } from "zod";

export const ratingSchema = z.object({
    rating: z.number().int().min(1,"O valor mínimo para avaliação é 1").max(5,"O valor máximo para avaliação é 5"),
    comment: z.string().optional(),
  });