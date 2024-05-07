"use server";

import { cookies } from "next/headers";

export default async (userId: string) => {
  const accessToken = cookies().get("accessToken");
  if (!accessToken) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/orders/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken?.value,
      },
    }
  );
  if (!response.ok) return false;
  const data = await response.json();
  return data;
};
