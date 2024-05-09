import Image from "next/image";

type propsType = {
  imagesUrl: string[];
  imageUrl: string;
  setImagesUrl: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
};

const ProductImages = ({
  imageUrl,
  imagesUrl,
  setImagesUrl,
  index,
}: propsType) => {
  const handleChangePrimaryImage = (index: number) => {
    const newImages = [...imagesUrl];
    const oldPrimaryImage = newImages[0];
    newImages[0] = newImages[index];
    newImages[index] = oldPrimaryImage;
    setImagesUrl(newImages);
  };
  return (
    <div
      className={`${
        index == 0
          ? "col-span-3 xl:w-[450px] xl:h-[450px] w-[200px] h-[200px] xl:h-[400px] border border-gray-500 "
          : "w-[100px] h-[100px] xl:w-[150px] xl:h-[150px] cursor-pointer hover:shadow-lg hover:border-gray-500 hover:border-2 hover:scale-105 transition duration-300 ease-in-out"
      } rounded-sm relative bg-[#DDDDDD] ml-2`}
    >
      <Image
        src={imageUrl}
        alt="Imagem do produto"
        fill
        className="object-contain"
        onClick={() => handleChangePrimaryImage(index)}
        priority
      />
    </div>
  );
};

export default ProductImages;
