import { cookies } from "next/headers";

export default async () => {
    const accessToken=cookies().get("accessToken")
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admin/${accessToken?.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data= await response.json();
    return data;
  
  };
  