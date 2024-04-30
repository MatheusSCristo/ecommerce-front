"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const searchParams = useSearchParams();

  const verifyEmail = async () => {
    const email = searchParams.get("userEmail");
    if(email)
    await fetch(`http://localhost:8080/api/email/?userEmail=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
