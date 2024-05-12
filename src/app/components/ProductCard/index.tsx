import { Product } from "@/types";
import { getRating } from "@/utils/Products/getRating";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type ParamsType = {
  product: Product;
};

const ProductCard = ({ product }: ParamsType) => {
  return (
    <div className="p-3 flex flex-col items-center gap-2 w-fit ">
      <div className="w-[150px] h-[150px]  2xl:w-[300px] 2xl:h-[300px] relative ">
        <Image
          src={
            product.imagesUrl[0] || `/images/notFoundImage.png`
          }
          fill
          className="object-contain rounded-sm"
          alt="Imagem do produto "
          sizes="(max-width: 1200px) 150px, 300px"
        />
      </div>
      <div className="flex flex-col gap-2 w-full text-sm md:text-md ">
        <div>
          <h2 className="text-md md:text-xl font-bold w-full text-wrap">{product.name}</h2>
          <h2 className="text-sm md:text-lg">R$ {(product.priceInCents / 100).toFixed(2)}</h2>
        </div>
        <Link href={`/product/${product.id}`} className="px-3 py-1 w-fit bg-black rounded-sm text-white hover:scale-105 duration-300 transition ease-in-out">
         Ver detalhes 
        </Link>
        <div className="flex gap-2 2xl:items-center flex-col 2xl:flex-row">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
            <Rating value={getRating(product)} readOnly precision={0.5}/>
            {!!getRating(product) && <h2>({getRating(product).toFixed(1)})</h2>}
            </div>
            <h2>{product.ratings.length === 1 ? `${product.ratings.length} avaliação`:`${product.ratings.length} avaliações`}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
