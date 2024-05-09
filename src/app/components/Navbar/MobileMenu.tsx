import { UserContext } from "@/context/UserContext";
import deleteSession from "@/utils/User/deleteSession";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaBoxArchive } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

const MobileMenu = ({
  setMenuMobileIsOpen,
}: {
  setMenuMobileIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const {setUser}=useContext(UserContext);

  const handleLogout = () => {
    deleteSession();
    localStorage.removeItem("user");
    if (user) {
      setTimeout(() => {
        setUser(null);
        router.push("/");
      }, 1000);
    }
  };

  return (
    <div className="absolute w-full z-10 bg-[#ededed7f] h-screen top-0">
      <div className="w-3/4 bg-white h-full relative">
        <span
          className="absolute top-2 right-2 text-lg text-black hover:scale-[1.2] duration-300 transition ease-in-out"
          onClick={() => setMenuMobileIsOpen(false)}
        >
          X
        </span>
        <div className="flex flex-col gap-1 bg-gray-200 p-4">
          <Image src="/icons/avatar.svg" width={40} height={40} alt="s" />
          {!user && (
            <div className="flex gap-2">
              <Link href="/auth/login">Entrar</Link>
              <span>|</span>
              <Link href="/auth/register">Registrar</Link>
            </div>
          )}
          {user && (
            <div>
              <span
                onClick={handleLogout}
                className="transform active:underline transition-transform "
              >
                Desconectar
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col p-4 gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl transform active:scale-[1.1] active:bg-gray-300  transition-transform"
          >
            <IoHome className="text-gray-600" />
            <span onClick={() => setMenuMobileIsOpen(false)}>Início</span>
          </Link>
          <Link
            href={"/orders"}
            className="flex items-center gap-2 text-xl transform active:scale-[1.1] active:bg-gray-300  transition-transform"
            onClick={()=>setMenuMobileIsOpen(false)}
          >
            <FaBoxArchive className="text-gray-600" />
            <span>Meus pedidos</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
