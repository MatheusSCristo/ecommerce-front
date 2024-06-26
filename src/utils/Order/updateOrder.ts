"use server"

import { cookies } from "next/headers";

type bodyType = {
  orderStatus: string;
};

export default async (body: bodyType, orderId: string) => {
  const accessToken=cookies().get("accessToken")
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
    body: JSON.stringify(body),
  });
  if(!response.ok) return false;
  const data= await response.json();
  return data;
};
