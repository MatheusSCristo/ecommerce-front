import { UserContext } from "@/context/UserContext";
import { ratingSchema } from "@/schemas/ratingSchema";
import createRating from "@/utils/Products/createRating";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type propsType={
  productId:string;
  setRated:React.Dispatch<React.SetStateAction<boolean>>;
}

const RatingComp = ({productId,setRated}:propsType) => {
  const [rating, setRating] = useState<number | null>(0);
  const {user}=useContext(UserContext);
  
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,  } = useForm<z.infer<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
  });

  const handleRating = (data: any) => {
    if(data && user){
    createRating(data,productId,user.id)
    setRating(0);
    setValue("comment","")
    setRated(true)
  }
  };

  useEffect(() => {
    if(rating)
    setValue("rating", rating);
  }, [rating]);

  return (
    <form
      className="flex flex-col gap-2 w-fit"
      onSubmit={handleSubmit(handleRating)}
    >
      <h2 className="text-lg">Avaliar o produto</h2>
      <Rating
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      {errors.rating && <span>{errors.rating.message?.toString()}</span>}
      <h2>Deixe um comentario:</h2>
      <textarea
        {...register("comment")}
        name="comment"
        className="border border-gray-300 2xl:w-[400px] rounded-sm focus:outline-none"
      ></textarea>
      <button
        type="submit"
        className="w-fit px-2 py-1 text-white bg-black self-end hover:scale-105 transition duration-500 ease-in-out "
      >
        Enviar
      </button>
    </form>
  );
};

export default RatingComp;
