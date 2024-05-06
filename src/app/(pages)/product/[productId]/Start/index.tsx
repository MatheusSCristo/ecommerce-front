import { Product } from "@/types";
import getRatingStars from "@/utils/getRatingStars";
import {
    MdOutlineStarHalf,
    MdOutlineStarOutline,
    MdOutlineStarPurple500,
} from "react-icons/md";

const getBlankStars = (ratingStars: String[] | undefined) => {
  return ratingStars ? new Array(5 - ratingStars.length).fill("") : undefined;
};

type propsType = {
  children: React.ReactNode;
  product?: Product;
};

const Stars = ({ children, product }: propsType) => {
  const ratingStars = product ? getRatingStars(product?.rating) : undefined;
  const array = getBlankStars(ratingStars);
  if(product === undefined) return null;
  return (
    <div className="flex text-starYellow items-center gap-2 ">
      <div className="flex">
        {ratingStars?.map((item, index) => {
          if (item === "full")
            return <MdOutlineStarPurple500 key={index} size={20} />;
          else return <MdOutlineStarHalf key={index} size={20} />;
        })}
        {array?.map((item,index) => {
          return <MdOutlineStarOutline key={product?.rating + index } size={20} />;
        })}
      </div>
      {children}
    </div>
  );
};

export default Stars;
