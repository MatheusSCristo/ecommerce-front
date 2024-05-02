import { CartContext } from "@/context/CartContext";
import { Product } from "@/types";
import AddProductToCart from "@/utils/AddProductToCart";
import getRatingStars from "@/utils/getRatingStars";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import {
  MdOutlineStarHalf,
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
} from "react-icons/md";

type ParamsType = {
  product: Product;
};

const ProductCard = ({ product }: ParamsType) => {
  const ratingStars = getRatingStars(product.rating);
  const array = new Array(5 - ratingStars.length).fill("");
  const { products, setProducts } = useContext(CartContext);

  const handleAddProductOnCard = (product: Product) => {
    setProducts(AddProductToCart(product,products));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-3 flex flex-col items-center gap-2 h-[300px]">
      <Link href={`/product/${product.id}`} className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] 2xl:w-[200px] 2xl:h-[150px] relative rounded-xl">
        <Image
          src={
            product.imageUrl ? product.imageUrl : `/images/notFoundImage.png`
          }
          fill
          className="object-fit rounded-lg"
          alt="Imagem do produto "
        />
      </Link>
      <div className="flex flex-col gap-2 w-full text-sm md:text-md ">
        <div>
          <h2>{product.name}</h2>
          <h2>R${(product.priceInCents / 100).toFixed(2)}</h2>
        </div>
        <button className="px-3 py-1 w-fit bg-strongOrange rounded-lg text-white hover:bg-hoverOrange" onClick={()=>handleAddProductOnCard(product)}>
          Adicionar ao carrinho
        </button>
        <div className="flex gap-2 2xl:items-center flex-col 2xl:flex-row">
          <div className="flex text-starYellow  ">
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
          <Link href={`/product/${product.id}`} className="text-gray-500 hover:text-dark">
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
