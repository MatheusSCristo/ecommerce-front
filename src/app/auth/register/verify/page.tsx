"use client";
import { UserContext } from "@/context/UserContext";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect } from "react";

const VerifyComponent=()=>{
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

  return(
    <section className="flex items-center justify-center h-screen">
      <div className="bg-white border-gray-500 border rounded-mdk  flex flex-col items-center justify-center gap-5 px-5 md:w-2/5 2xl:w-1/5 py-12">
        <h1 className="font-bold text-2xl">Email confirmado</h1>
        <Link
          href={"/"}
          className="px-3 py-2 text-white bg-black rounded-sm "
        >
          Ir para loja
        </Link>
      </div>
    </section>
  )
}


const Verify = () => {

  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center text-gray-500"><CircularProgress color="inherit"/></div>}>
      <VerifyComponent/>
    </Suspense>
  );
};

export default Verify;
