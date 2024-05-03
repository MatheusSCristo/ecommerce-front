import Image from "next/image";
import Link from "next/link";
import { sneakers } from "../products";

const Sneakers = () => {
  const sneakersToShow = sneakers
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .slice(0, 3);
  return (
    <div className="flex flex-col md:flex-row gap-10 mt-[150px]">
      {sneakersToShow.map((sneaker,index) => (
        <Link href={`/products/${sneaker.id}`} className={`bg-[#888888] ${index==1 && "md:-translate-y-[50px]"} flex flex-col gap-2 rounded-lg`} key={sneaker.id}>
          <div className="w-[200px] h-[250px] md:w-[200px] md:h-[300px] xl:w-[350px] xl:h-[450px] relative hover:scale-[1.3] duration-500">
            <Image
              src={sneaker.imageUrl || "/images/sneakerImage.png"}
              alt="sneaker"
              fill
              className="object-contain "
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sneakers;
