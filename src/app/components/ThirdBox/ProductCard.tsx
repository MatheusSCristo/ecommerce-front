import { CartContext } from "@/context/Cart";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import {
  MdOutlineStarHalf,
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
} from "react-icons/md";

const getRatingStars = (rating: number) => {
  const array = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    array.push("full");
  }
  if (rating - Math.floor(rating) > 0) {
    array.push("half");
  }
  return array;
};

type ParamsType = {
  product: Product;
};

const ProductCard = ({ product }: ParamsType) => {
  const ratingStars = getRatingStars(product.rating);
  const array = new Array(5 - ratingStars.length).fill("");
  const { products, setProducts } = useContext(CartContext);

  const handleAddProductOnCard = (product: Product) => {
    const newProducts = [...products];
    const index = newProducts.findIndex((item) => item.id === product.id);
    if (index!==-1) {
      newProducts[index].quantity += 1;
    } else {
      newProducts.push({...product,quantity:1});
    }
    setProducts(newProducts);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-3 flex flex-col items-center gap-2">
      <div className="w-[100px] h-[100px] md:w-[200px] md:h-[150px] xl:w-[250px] xl:h-[200px] relative rounded-xl">
        <Image
          src={
            product.imageUrl ? product.imageUrl : `/images/notFoundImage.jpg`
          }
          fill
          className="object-fit rounded-lg"
          alt="Imagem do produto "
        />
      </div>
      <div className="flex flex-col gap-2 w-full text-sm md:text-md ">
        <div>
          <h2>{product.name}</h2>
          <h2>R${(product.priceInCents / 100).toFixed(2)}</h2>
        </div>
        <button className="px-3 py-1 w-fit bg-strongOrange rounded-lg text-white hover:bg-hoverOrange" onClick={()=>handleAddProductOnCard(product)}>
          Adicionar ao carrinho
        </button>
        <div className="flex gap-2 md:items-center flex-col md:flex-row">
          <div className="flex text-starYellow">
            {ratingStars.map((item, index) => {
              if (item === "full")
                return <MdOutlineStarPurple500 key={index} size={20} />;
              else return <MdOutlineStarHalf key={index} size={20} />;
            })}
            {array.map(() => {
              return (
                <MdOutlineStarOutline key={Math.random() + 10} size={20} />
              );
            })}
          </div>
          <Link href={""} className="text-gray-500 hover:text-dark">
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
