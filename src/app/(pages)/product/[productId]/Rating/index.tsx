import { Product } from "@/types";
import { Rating as Stars } from "@mui/material";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

type propsType={
  product:Product;
  setShowRating:React.Dispatch<React.SetStateAction<boolean>>;
  showRating:boolean;
}


const Rating = ({ product,setShowRating,showRating }:propsType) => {

  return (
    <div className="flex flex-col gap-2 w-full ">
      <div className={`flex flex-col ${!showRating && 'border-b-2'} border-gray-500 py-2`}>
      <div className="flex justify-between">
      <h1 className="font-bold text-2xl text-">Avaliações</h1>
      {showRating && <FaChevronUp onClick={()=>setShowRating(false)} className="cursor-pointer"/>}
      {!showRating && <FaChevronDown onClick={()=>setShowRating(true)} className="cursor-pointer"/>}
      </div>
        <Stars value={5} readOnly sx={{color:"black"}}  />
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        {showRating &&
        <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0}}
        exit={{ y:-100 }}
        transition={{ ease: "easeOut", duration: 0.2 }}>
        <div className="flex flex-col gap-2 w-[300px] transformation-transition duration-500 ease-in-out  ">
          <h2>{product.ratings.length} avaliações</h2>
            {[5,4,3,2,1].map((number)=>(
                <div className="flex gap-2 items-center " key={number}>
                    <span className="text-nowrap">{number} estrelas</span>
                    <div className="w-full h-[2px] bg-gray-500"/>
                    <h2>({product.ratings.filter((rating)=>rating.rating===number).length})</h2>
                </div>
            ))}
        </div>
        <div className="flex flex-col">
          {product.ratings.map((rating) => (
            <div className=" p-3 flex flex-col gap-2" key={rating.comment}>
                <Stars value={rating.rating} readOnly sx={{color:"black"}} />
              <div>
                <h2 className="font-bold text-lg">Comentário:</h2>
                <p>{rating.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>}
      </div>
    </div>
  );
};

export default Rating;
