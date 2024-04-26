export default async (body: { email: string; password: string }) => {
  const response = await fetch(`https://mywebcommerce-07802a3ea935.herokuapp.com/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data= await response.json();
  return data;

};
