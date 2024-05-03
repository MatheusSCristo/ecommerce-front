"use client";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const { setUser } = useContext(UserContext);

  const verifyEmail = async () => {
    const email = searchParams.get("userEmail");
    if (email) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/email/?userEmail=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) return;
      const user=localStorage.getItem("user")
      if (user) setUser({ ...JSON.parse(user), verifiedEmail: true });
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="bg-white border-gray-500 border rounded-lg  flex flex-col items-center justify-center gap-5 px-5 md:w-2/5 2xl:w-1/5 py-12">
        <h1 className="font-bold text-2xl">Email confirmado</h1>
        <Link
          href={"/"}
          className="px-3 py-2 text-white bg-strongOrange rounded-md "
        >
          Ir para loja
        </Link>
      </div>
    </section>
  );
};

export default page;
