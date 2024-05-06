import { CartProduct, Product } from "@/types";

export default (product: Product, products: CartProduct[],size:number,color:string) => {
  const newProducts = [...products];
  const index = newProducts.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    newProducts[index].quantity += 1;
  } else {
    newProducts.push({ ...product, quantity: 1,size,color });
  }
  return newProducts;
};
