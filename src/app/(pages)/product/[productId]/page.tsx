"use client";
import { CartContext } from "@/context/CartContext";
import { ProductsContext } from "@/context/ProductsContext";
import { UserContext } from "@/context/UserContext";
import AddProductToCart from "@/utils/AddProductToCart";
import { getRating } from "@/utils/Products/getRating";
import { CircularProgress, Rating as Stars } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Recommended from "../Recommended";
import ProductImages from "./ProductImages";
import Rating from "./Rating";

type propsType = {
  params: { productId: string };
};

const Product = ({ params: { productId } }: propsType) => {
  const { products } = useContext(ProductsContext);
  const { products: cartProducts, setProducts: setCartProducts } =
    useContext(CartContext);
  const product = products.find((item) => item.id == productId);
  const [error, setError] = useState(false);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showRating, setShowRating] = useState(false);
  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleAddProductOnCard = () => {
    if (!user) router.push("/auth/login");
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

  const handleProductError = () => {
    setTimeout(() => {
      if (!product) setError(true);
    }, 5000);
  };

  useEffect(() => {
    handleProductError();
  }, [product]);

  const colors: colorType = {
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    teal: "bg-teal-500",
    cyan: "bg-cyan-500",
    brown: "bg-brown-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    black: "bg-black",
    white: "bg-white",
    gray: "bg-gray-400",
  };

  type colorType = {
    [key: string]: string;
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
                      key={url}
                    />
                  ))}
              </div>
              <div className="pb-5 w-full flex flex-col gap-2">
                <div>
                  <h1 className="font-bold text-4xl">{product.name}</h1>
                  <h2>R$ {(product.priceInCents / 100).toFixed(2)}</h2>
                </div>
                <p className="max-w-[800px]">{product.description}</p>
                <div className="flex gap-2">
                  <Stars
                    value={getRating(product)}
                    readOnly
                    sx={{ color: "black" }}
                  />
                  <h2
                    className="hover:underline cursor-pointer text-gray-600 hover:text-black"
                    onClick={() => setShowRating((prevState) => !prevState)}
                  >
                    Ver avaliações
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-[#676767]">Cores</h2>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        className={`${
                          colors[color.toLowerCase()]
                        }  rounded-full w-[50px] h-[50px]  border-black ${
                          selectedColor === color
                            ? "opacity-100 border"
                            : "opacity-50"
                        }  `}
                        key={color}
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
                        key={size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className="bg-black hover:scale-105 transition duration-500 ease-in-out px-10 py-3 rounded-sm text-white w-fit mt-10 "
                  onClick={() => handleAddProductOnCard()}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>

            <Rating
              product={product}
              setShowRating={setShowRating}
              showRating={showRating}
            />
          </section>
          <Recommended product={product} />
        </>
      )}
      {!product && !error && (
        <div className="w-full h-screen flex items-center justify-center text-gray-400">
          <CircularProgress color="inherit" />
        </div>
      )}
      {error && !product && (
        <div className="w-full h-screen flex flex-col gap-2 items-center justify-center ">
          <h1 className="text-2xl">Erro ao procurar produto...</h1>
          <Link href={"/"} className="bg-black px-2 py-1 text-white">
            Voltar para página inicial
          </Link>
        </div>
      )}
    </>
  );
};

export default Product;
