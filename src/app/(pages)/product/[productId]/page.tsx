"use client";
import { CartContext } from "@/context/CartContext";
import { ProductsContext } from "@/context/ProductsContext";
import AddProductToCart from "@/utils/AddProductToCart";
import { translateCategory } from "@/utils/CategoriesUtil";
import getRatingStars from "@/utils/getRatingStars";
import { CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import {
  MdOutlineStarHalf,
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
} from "react-icons/md";
import ProductImages from "../../admin/product/Category/Images";
import Recommended from "../Recommended";

type propsType = {
  params: { productId: string };
};

const getBlankStars = (ratingStars: String[] | undefined) => {
  return ratingStars ? new Array(5 - ratingStars.length).fill("") : undefined;
};

const Product = ({ params: { productId } }: propsType) => {
  const [images, setImages] = useState<File[]>([]);
  const { products } = useContext(ProductsContext);
  const { products: cartProducts, setProducts: setCartProducts } =
    useContext(CartContext);
  const product = products.find((item) => item.id == productId);
  const ratingStars = product ? getRatingStars(product?.rating) : undefined;
  const array = getBlankStars(ratingStars);

  const handleAddProductOnCard = () => {
    if (product) setCartProducts(AddProductToCart(product, cartProducts));
  };

  console.log(product)
  const handleImages=()=>{
    
  }



  return (
    <>
      {product && (
        <>
          <section className="2xl:px-32 md:px-24 py-10 px-5">
            <div className="bg-white p-5 flex-1 rounded-lg flex flex-col gap-2">
              <div className="flex gap-5 flex-col md:flex-row items-center py-5">
                {images.length > 0 &&
                  images.map((image, index) => (
                    <ProductImages
                      image={image}
                      index={index}
                      setImages={setImages}
                      images={images}
                    />
                  ))}
              </div>
              <div className="py-5 w-full flex flex-col gap-2">
                <div>
                  <h1 className="font-bold">{product.name}</h1>
                  <div className="flex text-starYellow items-center gap-2 ">
                    <div className="flex">
                      {ratingStars?.map((item, index) => {
                        if (item === "full")
                          return (
                            <MdOutlineStarPurple500 key={index} size={15} />
                          );
                        else return <MdOutlineStarHalf key={index} size={15} />;
                      })}
                      {array?.map(() => {
                        return (
                          <MdOutlineStarOutline
                            key={Math.random() + 10}
                            size={15}
                          />
                        );
                      })}
                    </div>
                    <span>{product?.rating}</span>
                  </div>
                  <h2 className="border-b-2 border-gray-200 w-full">
                    Preço:{" "}
                    <span className="font-bold">
                      R$ {(product.priceInCents / 100).toFixed(2)}
                    </span>{" "}
                  </h2>
                </div>
                <div className=" border-b-2 border-gray-200 gap-1 flex flex-col">
                  <div className="flex gap-2 flex-col md:flex-row">
                    <h2 className="font-bold">Categorias:</h2>
                    <div className="flex gap-1">
                      {product.categories.map((category) => (
                        <div className="bg-gray-200 rounded-md px-2 capitalize">
                          {translateCategory(category)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-bold">Marca: </h2>
                    <h2>{product.brand}</h2>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-bold">Modelo: </h2>
                    <h2>{product.model}</h2>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-bold">Cores disponiveis: </h2>
                    <h2>{product.color}</h2>
                  </div>
                </div>
                <div>
                  <h2 className="font-bold">Descrição</h2>
                  <text>{product.description}</text>
                </div>
              </div>
            </div>
            <div>
              <button
                className="bg-strongOrange hover:bg-hoverOrange hover:scale-105 px-2 py-1 rounded-lg text-white"
                onClick={() => handleAddProductOnCard()}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </section>
          <Recommended product={product} />
        </>
      )}
      {!product && (
        <div className="w-full h-screen flex items-center justify-center text-gray-400">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default Product;
