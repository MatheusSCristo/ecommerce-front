import Image from "next/image";

type propsType={
    image: File;
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    index: number;
}

const ProductImages = ({image,images,setImages,index}:propsType) => {
  const handleChangePrimaryImage = (index: number) => {
    const newImages = [...images];
    const oldPrimaryImage = newImages[0];
    newImages[0] = newImages[index];
    newImages[index] = oldPrimaryImage;
    setImages(newImages);
  };
  return (
    <div
      className={`${
        index == 0
          ? "col-span-3 xl:w-[450px] xl:h-[450px] w-[100px] h-[50px] xl:h-[400px] border border-black "
          : "w-[50px] h-[50px] xl:w-[150px] xl:h-[150px]"
      } rounded-sm relative bg-[#DDDDDD]`}
    >
      <Image
        src={URL.createObjectURL(image)}
        alt="Imagem do produto"
        fill
        className="object-contain hover:scale-[1.2]"
        onClick={() => handleChangePrimaryImage(index)}
      />
    </div>
  );
};

export default ProductImages;
