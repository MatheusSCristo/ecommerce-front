import Image from "next/image";
import React from "react";
import { FaBoxArchive } from "react-icons/fa6";
import { IoHeart, IoHome } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";

const MobileMenu = ({
  setMenuMobileIsOpen,
}: {
  setMenuMobileIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {


  return (
    <div className="absolute w-full z-10 bg-[#ededed7f] h-screen top-0">
      <div className="w-3/4 bg-white h-full relative">
        <span
          className="absolute top-2 right-2 text-lg text-black hover:scale-[1.2]"
          onClick={() => setMenuMobileIsOpen(false)}
        >
          X
        </span>
        <div className="flex flex-col gap-1 bg-gray-200 p-4">
          <Image src="/icons/avatar.svg" width={40} height={40} alt="s" />
          <div className="flex gap-2">
            <span>Entrar</span>
            <span>|</span>
            <span>Registrar</span>
          </div>
        </div>
        <div className="flex flex-col p-4 gap-2">
          <div className="flex items-center gap-2 text-xl">
            <IoHome className="text-gray-600" />
            <span>Início</span>
          </div>
          <div className="flex items-center gap-2 text-xl">
            <TfiMenuAlt className="text-gray-600" />
            <span>Categorias</span>
          </div>
          <div className="flex items-center gap-2 text-xl">
            <IoHeart className="text-gray-600" />
            <span>Favoritos</span>
          </div>
          <div className="flex items-center gap-2 text-xl">
            <FaBoxArchive className="text-gray-600" />
            <span>Meus pedidos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
