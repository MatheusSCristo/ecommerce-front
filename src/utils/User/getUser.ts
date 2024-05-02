export default async (body: { email: string; password: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data= await response.json();
  return data;

};
