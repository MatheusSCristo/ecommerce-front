import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#EFF2F6] flex justify-between items-center px-4 md:px-32 py-2">
      <Link
        href="/"
        className="font-bold text-2xl flex items-center"
      >
        Sneakkers
      </Link>
      <h2>©2024 Ecommerce</h2>
    </footer>
  );
};
