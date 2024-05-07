"use client";
import { CartContext } from "@/context/CartContext";
import { ProductsContext } from "@/context/ProductsContext";
import AddProductToCart from "@/utils/AddProductToCart";
import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Recommended from "../Recommended";
import ProductImages from "./ProductImages";
import Stars from "./Start";

type propsType = {
  params: { productId: string };
};

const Product = ({ params: { productId } }: propsType) => {
  const { products } = useContext(ProductsContext);
  const { products: cartProducts, setProducts: setCartProducts } =
    useContext(CartContext);
  const product = products.find((item) => item.id == productId);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const handleAddProductOnCard = () => {
    if (product && selectedSize && selectedColor)
      setCartProducts(
        AddProductToCart(product, cartProducts, selectedSize, selectedColor)
      );
  };

  useEffect(() => {
    setSelectedSize(product?.sizes[0] || null);
    setSelectedColor(product?.colors[0] || "");
  }, [product]);

  useEffect(() => {
    setImagesUrl(product?.imagesUrl || []);
  }, [product]);

  const handleSelectSize = (size: number) => {
    setSelectedSize(size);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };


  return (
    <>
      {product && (
        <>
          <section className=" md:px-24 py-10 px-5 flex flex-col items-center flex-1">
            <div className="p-2 flex-1 rounded-lg flex flex-col xl:flex-row gap-24 items-center md:items-start">
              <div className="grid grid-cols-3 2xl:w-[800px] gap-5">
                {imagesUrl?.length > 0 &&
                  imagesUrl?.map((url, index) => (
                    <ProductImages
                      imageUrl={url}
                      imagesUrl={imagesUrl}
                      index={index}
                      setImagesUrl={setImagesUrl}
                      
                    />
                  ))}
              </div>
              <div className="pb-5 w-full flex flex-col gap-2">
                <div>
                  <h1 className="font-bold text-4xl">{product.name}</h1>
                  <h2>R$ {(product.priceInCents / 100).toFixed(2)}</h2>
                </div>
                <p className="max-w-[400px]">
                  Revamp your style with the latest designer trends in men’s
                  clothing or achieve a perfectly curated wardrobe thanks to our
                  line-up of timeless pieces.{" "}
                </p>
                <Stars product={product}>
                  <h2>({product.rating.toFixed(1)})</h2>
                </Stars>
                <div className="flex flex-col gap-2">
                  <h2 className="text-[#676767]">Cores</h2>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        className={`bg-${color.toLowerCase()}  rounded-full w-[50px] h-[50px]  border-black ${
                          selectedColor === color ? "opacity-100 border" : "opacity-50"
                        }  `}
                        onClick={() => handleSelectColor(color)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-[#676767]">Tamanho</h2>
                  <div className="flex gap-2 ">
                    {product.sizes.map((size) => (
                      <button
                        className={`w-[40px] h-[40px] border border-gray-600 font-bold ${
                          selectedSize === size && "bg-gray-600 text-white "
                        }`}
                        onClick={() => handleSelectSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className="bg-black hover:scale-105 px-10 py-3 rounded-sm text-white w-fit mt-10 "
                  onClick={() => handleAddProductOnCard()}
                >
                  Adicionar ao carrinho
                </button>
              </div>
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
