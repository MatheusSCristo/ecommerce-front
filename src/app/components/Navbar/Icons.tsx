import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";
import deleteSession from "@/utils/User/deleteSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { IoCartOutline, IoExitOutline } from "react-icons/io5";
import Cart from "./Cart";

const Icons = () => {
  const [accountDesktopIsOpen, setAccountDesktopIsOpen] = useState(false);
  const [cartMenuIsOpen, setCartMenuIsOpen] = useState(false);
  const { products } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    deleteSession();
    if (user) {
      setTimeout(() => {
        setUser(null);
      }, 1000);
    }
  };

  return (
    <div className="md:flex gap-10 hidden">
      {!user && (
        <Link href={"/auth/login"} className="hover:scale-110 cursor-pointer">
          Entrar
        </Link>
      )}
      {user && (
        <>
          <div
            className="relative"
            onMouseEnter={() => setCartMenuIsOpen(true)}
            onMouseLeave={() => setCartMenuIsOpen(false)}
          >
            <div className="relative hover:scale-[1.1] flex flex-col items-center justify-center" title="Carrinho">
              {products.length > 0 && (
                <span className="absolute right-0 text-black  ">
                  {products.length}
                </span>
              )}
              <IoCartOutline size={25}  />
            </div>
            <span>Carrinho</span>
            {cartMenuIsOpen && <Cart />}
          </div>
          <div className="flex flex-col items-center" title="Pedidos">
            <HiOutlineArchiveBox
              size={25}
              className="hover:scale-[1.1] cursor-pointer"
              onClick={() => router.push("/orders")}
            />
            <span>Pedidos</span>
          </div>
          <div className="flex flex-col items-center" title="Sair">
            <IoExitOutline
              size={25}
              className="hover:scale-[1.1] cursor-pointer"
              onClick={handleLogout}
              />
              <span>Sair</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Icons;
