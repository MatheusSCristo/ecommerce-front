import { ratingSchema } from "@/schemas/ratingSchema";
import { z } from "zod";

export default async (
  body: z.infer<typeof ratingSchema>,
  productId: string,
  userId: string,
  orderProductId:string
) => {
    fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/products/${productId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, userId,orderProductId}),
    }
  );
  
};
