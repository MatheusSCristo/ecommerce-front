"use server"
import { orderDto } from "./../../types/index";

export default async (body: orderDto, accessToken: string) => {
  const response = await fetch(
    "http://localhost:8080/api/orders",
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
