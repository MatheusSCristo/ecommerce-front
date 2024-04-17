import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-300 flex justify-between items-center px-4 md:px-32 py-2">
      <Link
        href="/"
        className="font-bold text-strongOrange text-2xl flex items-center"
      >
        <Image src="/icons/logo.svg" width={40} height={40} alt="" />
        Brand
      </Link>
      <h2>©2024 Ecommerce</h2>
    </footer>
  );
};
