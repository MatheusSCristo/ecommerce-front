import { Product } from "@/types";
import getRatingStars from "@/utils/getRatingStars";
import Image from "next/image";
import Link from "next/link";
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

  
  return (
    <div className="p-3 flex flex-col items-center gap-2 w-fit ">
      <div className="w-[150px] h-[150px] md:w-[150px] md:h-[150px] 2xl:w-[300px] 2xl:h-[300px] relative ">
        <Image
          src={
            product.imagesUrl[0] || `/images/notFoundImage.png`
          }
          fill
          className="object-contain rounded-sm"
          alt="Imagem do produto "
        />
      </div>
      <div className="flex flex-col gap-2 w-full text-sm md:text-md ">
        <div>
          <h2 className="text-md md:text-xl font-bold text-nowrap">{product.name}</h2>
          <h2 className="text-sm md:text-lg">R$ {(product.priceInCents / 100).toFixed(2)}</h2>
        </div>
        <Link href={`/product/${product.id}`} className="px-3 py-1 w-fit bg-black rounded-sm text-white ">
         Ver detalhes 
        </Link>
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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
