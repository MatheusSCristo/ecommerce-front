export const GetAll = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const res = await data.json();
  return res;
};
