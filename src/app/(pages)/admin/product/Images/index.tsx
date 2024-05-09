import Image from "next/image";

type propsType={
    image: File;
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    index: number;
}

const Images = ({image,images,setImages,index}:propsType) => {
  const handleChangePrimaryImage = (index: number) => {
    const newImages = [...images];
    const oldPrimaryImage = newImages[0];
    newImages[0] = newImages[index];
    newImages[index] = oldPrimaryImage;
    setImages(newImages);
  };

  const handleRemoveImage=()=>{
    setImages(images.filter((image, i) => i !== index))
  }

  return (
    <div
      className={`${
        index == 0
          ? "col-span-3 xl:w-[450px] xl:h-[450px] w-[150px] h-[150px] xl:h-[400px] border border-black "
          : "w-[100px] h-[100px] xl:w-[150px] xl:h-[150px] mr-5"
      } rounded-sm relative bg-[#DDDDDD]`}
    >
      <Image
        src={URL.createObjectURL(image)}
        alt="Imagem do produto"
        fill
        className={`object-contain ${index !==0 && "hover:scale-[1.2] cursor-pointer transition duration-300 ease-in-out"}`}
        onClick={() => handleChangePrimaryImage(index)}
      />
      <span className="absolute text-xl right-2 top-2 cursor-pointer" onClick={handleRemoveImage}>X</span>
    </div>
  );
};

export default Images;
