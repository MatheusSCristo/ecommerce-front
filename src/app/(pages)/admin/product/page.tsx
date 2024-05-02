"use client";
import { storage } from "@/firebase/firebaseConfig";
import productSchema from "@/schemas/productSchema";
import { categories } from "@/utils/CategoriesUtil";
import createProducts from "@/utils/Products/createProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Category from "./Category";

type categoryType = (typeof categories)[0];

const AdminPage = () => {
  const [imageUrl, setImageUrl] = useState<File | null>();
  const [categoriesSelected, setCategoriesSelected] = useState<categoryType[]>(
    []
  );
  const [error, setError] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageUrl(file);
  };

  const handleSubmitImage = (name: string) => {
    return new Promise((resolve, reject) => {
      if (!imageUrl) return;
      const imageReference = ref(
        storage,
        `/images/${name.replace(/\s/g, "")}.png`
      );
      const uploadTask = uploadBytesResumable(imageReference, imageUrl);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => reject(error));
        }
      );
    });
  };

  const handleSubmitData = async (data: FieldValues) => {
    const imageUrl = await handleSubmitImage(data.name);
    const categories = categoriesSelected.map((category) => category.category);
    const body = {
      ...data,
      priceInCents: (data.priceInCents * 100).toString(),
      imageUrl,
      categories,
      rating: 1,
    };
    try {
      createProducts(productSchema.parse(body));
    } catch (e) {
      setError(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  return (
    <section className="px-5 2xl:px-32 2xl:py-16 flex flex-col">
      <h1 className="text-3xl font-bold self-center 2xl:self-start">Admin Page</h1>
      <h2 className="text-xl self-center">Cadastrar produto</h2>
      <div className="bg-white border-gray-300 border rounded-lg w-full  2xl:w-fit self-center p-10">
        <form
          className="flex flex-col gap-2 "
          onSubmit={handleSubmit(handleSubmitData)}
        >
          <div className="flex flex-col 2xl:w-fit">
            <div className="flex flex-col 2xl:flex-row gap-5">
              <div className="flex flex-col gap-2">
                <div className="w-[100px] h-[100px] xl:w-[200px] xl:h-[200px] relative m-5">
                  <Image
                    src={
                      imageUrl
                        ? URL.createObjectURL(imageUrl)
                        : "/images/notFoundImage.png"
                    }
                    alt="Imagem do produto"
                    fill
                    className="object-cover"
                  />
                </div>
                <input type="file" onChange={handleImage} />
              </div>
              <div className="flex flex-col gap-1  ">
                <div className="flex flex-col ">
                  <label htmlFor="priceInCents">Preço</label>
                  <input
                    {...register("priceInCents")}
                    placeholder="R$"
                    className="px-2 py-1 border-gray-400 border rounded-md "
                    type="text"
                    id="price"
                  />
                  {errors.priceInCents && (
                    <span className="text-red-500">
                      {errors.priceInCents.message?.toString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="brand">Marca</label>
                  <input
                    {...register("brand")}
                    className="px-2 py-1 border-gray-400 border rounded-md"
                    type="text"
                    id="brand"
                  />
                  {errors.brand && (
                    <span className="text-red-500">
                      {errors.brand.message?.toString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="model">Modelo</label>
                  <input
                    {...register("model")}
                    className="px-2 py-1 border-gray-400 border rounded-md"
                    type="text"
                    id="model"
                  />
                </div>
                {errors.model && (
                  <span className="text-red-500">
                    {errors.model.message?.toString()}
                  </span>
                )}

                <div className="flex flex-col">
                  <label htmlFor="color">Cor</label>
                  <input
                    {...register("color")}
                    className="px-2 py-1 border-gray-400 border rounded-md"
                    type="text"
                    id="color"
                  />
                </div>
                {errors.color && (
                  <span className="text-red-500">
                    {errors.color.message?.toString()}
                  </span>
                )}
              </div>
            </div>
            <div className="col-start-1 row-start-2 flex flex-col">
              <label htmlFor="name">Nome</label>
              <input
                {...register("name")}
                className="px-2 py-1 border-gray-400 border rounded-md"
                type="text"
                id="name"
              />
              {errors.name && (
                <span className="text-red-500">
                  {errors.name.message?.toString()}
                </span>
              )}
            </div>
            <div className="col-start-1 row-start-3 flex flex-col">
              <label htmlFor="description">Descrição</label>
              <textarea
                {...register("description")}
                className="px-2 py-1 border-gray-400 border rounded-md"
                id="description"
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message?.toString()}
                </span>
              )}
            </div>
            <Category
              categoriesSelected={categoriesSelected}
              setCategoriesSelected={setCategoriesSelected}
              register={register}
              errors={errors}
              setValue={setValue}
            />
          </div>
          <button
            type="submit"
            className="bg-strongOrange px-3 py-2 text-white rounded-md hover:bg-hoverOrange w-fit self-center "
          >
            Cadastrar
          </button>
          
        </form>
        {error && <span className="text-red-500">Erro ao criar produto</span>}
      </div>
    </section>
  );
};

export default AdminPage;
