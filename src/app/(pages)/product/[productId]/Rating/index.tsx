import { Product } from "@/types";
import { Rating as Stars } from "@mui/material";

const Rating = ({ product }: { product: Product }) => {

  return (
    <div className="flex flex-col gap-2 w-full ">
      <h1 className="font-bold text-2xl text-">Avaliações</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col gap-2 w-[300px]   ">
          <Stars value={5} readOnly sx={{color:"black"}}  />
          <h2>{product.ratings.length} avaliações</h2>
            {[5,4,3,2,1].map((number)=>(
                <div className="flex gap-2 items-center ">
                    <span className="text-nowrap">{number} estrelas</span>
                    <div className="w-full h-[2px] bg-gray-500"/>
                    <h2>({product.ratings.filter((rating)=>rating.rating===number).length})</h2>
                </div>
            ))}

        </div>
        <div className="flex flex-col">
          {product.ratings.map((rating) => (
            <div className=" p-3 flex flex-col gap-2">
                <Stars value={rating.rating} readOnly sx={{color:"black"}} />
              <div>
                <h2 className="font-bold text-lg">Comentário:</h2>
                <p>{rating.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;
