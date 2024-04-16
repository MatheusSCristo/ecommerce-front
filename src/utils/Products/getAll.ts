export const GetAll = async () => {
  const data = await fetch("http://localhost:8080/api/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const res = await data.json();
  return res;
};
