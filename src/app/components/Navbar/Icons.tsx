import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";
import deleteSession from "@/utils/User/deleteSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { IoCart, IoPersonSharp } from "react-icons/io5";
import Cart from "./Cart";

const Icons = () => {
  const [accountDesktopIsOpen, setAccountDesktopIsOpen] = useState(false);
  const [cartMenuIsOpen, setCartMenuIsOpen] = useState(false);
  const { products } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    deleteSession();
    router.push("/auth/login");
    if (user) {
      setTimeout(() => {
        setUser(null);
      }, 1000);
    }
  };

  return (
    <div className="md:flex gap-10 hidden">
      <div
        className="relative py-2"
        onMouseEnter={() => setCartMenuIsOpen(true)}
        onMouseLeave={() => setCartMenuIsOpen(false)}
      >
        <div className="relative hover:scale-[1.05]">
          {products.length > 0 && (
            <span className="absolute right-0 bottom-0 bg-[#fa1a1a] rounded-full w-[15px] h-[15px] text-sm flex items-center justify-center text-white">
              {products.length}
            </span>
          )}
          <IoCart size={30} />
        </div>
        {cartMenuIsOpen && <Cart />}
      </div>
      <div
        className="relative py-2"
        onMouseEnter={() => setAccountDesktopIsOpen(true)}
        onMouseLeave={() => setAccountDesktopIsOpen(false)}
      >
        <IoPersonSharp size={30} className="hover:scale-[1.2]" />
        {accountDesktopIsOpen && user && (
          <div className="hidden md:flex absolute mt-2  flex-col w-[130px] p-2 bg-strongOrange text-white gap-2 right-1/2 rounded">
            <span className="border-white hover:border p-1 rounded">
              Minha conta
            </span>
            <Link href={"/orders"} className="border-white hover:border p-1 rounded">
              Meus pedidos
            </Link>
            <span
              className="border-white hover:border p-1 rounded"
              onClick={handleLogout}
            >
              Sair
            </span>
          </div>
        )}
        {accountDesktopIsOpen && !user && (
          <div className="hidden md:flex absolute mt-2  flex-col w-[130px] p-2 bg-strongOrange text-white gap-2 right-1/2 rounded">
            <Link
              href={"/auth/login"}
              className="border-white hover:border p-1 rounded"
            >
              Entrar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Icons;
