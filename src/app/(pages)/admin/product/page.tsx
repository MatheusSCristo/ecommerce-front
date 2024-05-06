"use client";
import { storage } from "@/firebase/firebaseConfig";
import productSchema from "@/schemas/productSchema";
import { categories } from "@/utils/CategoriesUtil";
import createProducts from "@/utils/Products/createProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ProductImages from "./Category/Images";

type categoryType = (typeof categories)[0];

const AdminPage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<categoryType[]>(
    []
  );
  const [error, setError] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    for (let i = 0; i < file.length; i++) {
      setImages((prevState) => [...prevState, file[i]]);
    }
  };

  const handleSubmitImage = async (name: string) => {
    return new Promise((resolve: any, reject: any) => {
      const imagesUrl: string[] = [];
      if (!images) return;
      const promises = images.map((element, index) => {
        const imageReference = ref(
          storage,
          `/images/${name.replace(/\s/g, "")}/${index}.png`
        );
        const uploadTask = uploadBytesResumable(imageReference, element);
        return new Promise<void>((innerResolve, innerReject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => innerReject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  imagesUrl.push(downloadURL);
                  innerResolve();
                })
                .catch((error) => innerReject(error));
            }
          );
        });
      });
      Promise.all(promises)
        .then(() => resolve(imagesUrl))
        .catch((error) => reject(error));
    });
  };


  const handleSubmitData = async (data: FieldValues) => {
    const imagesUrl= await handleSubmitImage(data.name);
    const categories = categoriesSelected.map((category) => category.category);
    const body = {
      ...data,
      priceInCents: (data.priceInCents * 100).toString(),
      imagesUrl,
      categories,
      rating: 1,
    };
    try {
      createProducts(body);
    } catch (e) {
      setError(true);
    }
  };


  const handleSelectCategory = (category: categoryType) => {
    if (categoriesSelected.includes(category)) {
      setCategoriesSelected((prevState) =>
        prevState.filter((cat) => cat !== category)
      );
      return;
    }
    setCategoriesSelected((prevState) => [...prevState, category]);
  };

  useEffect(() => {
    setValue(
      "categories",
      categoriesSelected.map((category) => category.category)
    );
  }, [categoriesSelected]);

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
      <h1 className="text-3xl font-bold self-center 2xl:self-start">
        Admin Page
      </h1>
      <h2 className="text-xl self-center">Cadastrar produto</h2>
      <div className="bg-white border-gray-300 border rounded-lg w-full  2xl:w-fit self-center p-10">
        <form
          className="flex flex-col gap-2 "
          onSubmit={handleSubmit(handleSubmitData)}
        >
          <div className="flex flex-col 2xl:w-fit">
            <div className="flex flex-col 2xl:flex-row gap-5">
              <div className="flex flex-col">
                <div className="grid grid-cols-3 w-[500px] gap-2 ">
                  {images.length > 0 &&
                    images.map((image, index) => (
                     <ProductImages image={image} index={index} setImages={setImages} images={images}/>
                    ))}
                </div>
                <input type="file" onChange={handleImage} multiple />
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
            <div className="flex gap-5">
              <div>
                <div className="flex flex-col">
                  <label htmlFor="sizes">Tamanhos</label>
                  <input
                    {...register("sizes")}
                    className="px-2 py-1 border-gray-400 border rounded-md"
                    type="text"
                    id="sizes"
                  />
                  {errors.sizes && (
                    <span className="text-red-500">
                      {errors.sizes.message?.toString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="color">Cor</label>
                  <input
                    {...register("colors")}
                    className="px-2 py-1 border-gray-400 border rounded-md"
                    type="text"
                    id="color"
                  />
                </div>
                {errors.colors && (
                  <span className="text-red-500">
                    {errors.colors.message?.toString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                {categories.map((category, index) => (
                  <label htmlFor="categories" className="capitalize flex gap-2">
                    <input
                      type="checkbox"
                      id={`categories ${index}`}
                      onChange={() => handleSelectCategory(category)}
                    ></input>
                    {category.categoria}
                  </label>
                ))}
                {errors.categories?.message && (
                  <span className="text-red-500">
                    {errors.categories.message.toString()}
                  </span>
                )}
              </div>
            </div>
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
