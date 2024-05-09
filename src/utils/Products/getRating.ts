import { Product } from "@/types";

export const getRating = (product:Product) => {
    if(product.ratings.length===0) return 0;
    const rating = product.ratings.reduce((acc, rating) => {
      return acc + rating.rating;
    }, 0);
    return rating / product.ratings.length ;
  };