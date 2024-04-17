import { useState } from "react";
import { IoCart, IoHeart, IoPersonSharp } from "react-icons/io5";
import Cart from "./Cart";

const Icons = () => {
  const [accountDesktopIsOpen, setAccountDesktopIsOpen] = useState(false);
  const [cartMenuIsOpen, setCartMenuIsOpen] = useState(false);

  return (
    <div className="md:flex gap-10 hidden">
      <IoHeart size={25} className="hover:scale-[1.2]" />
      <div
        className="relative"
        onMouseEnter={() => setCartMenuIsOpen(true)}
        onMouseLeave={() => setCartMenuIsOpen(false)}
      >
        <IoCart size={25} className="hover:scale-[1.2]" />
        {cartMenuIsOpen && <Cart/>}
      </div>
      <div
        className="relative "
        onMouseEnter={() => setAccountDesktopIsOpen(true)}
        onMouseLeave={() => setAccountDesktopIsOpen(false)}
      >
        <IoPersonSharp size={25} className="hover:scale-[1.2]" />
        {accountDesktopIsOpen && (
          <div className="hidden md:flex absolute mt-2  flex-col w-[130px] p-2 bg-strongOrange text-white gap-2 right-1/2 rounded">
            <span className="border-white hover:border p-1 rounded">
              Minha conta
            </span>
            <span className="border-white hover:border p-1 rounded">
              Meus pedidos
            </span>
            <span className="border-white hover:border p-1 rounded">Sair</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Icons;
