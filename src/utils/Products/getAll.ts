export const GetAll = async () => {
  const data = await fetch(`https://mywebcommerce-07802a3ea935.herokuapp.com/api/products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const res = await data.json();
  return res;
};
