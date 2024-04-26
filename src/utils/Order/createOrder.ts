"use server"
import { orderDto } from "./../../types/index";

export default async (body: orderDto, accessToken: string) => {
  const response = await fetch(
    "https://mywebcommerce-07802a3ea935.herokuapp.com/api/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) return false 
  else return true;
};
