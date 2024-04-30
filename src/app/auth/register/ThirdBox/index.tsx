import sendVerifiyEmail from "@/utils/Email/sendVerifiyEmail";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type propsType = {
  userEmail: string;
  userName: string;
};

const ThirdBox = ({ userEmail, userName }: propsType) => {
  useEffect(() => {
    sendVerifiyEmail({ userName, userEmail });
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold text-2xl">
        Um email de confirmação foi enviado!
      </h1>
      <Image
        src="/icons/emailSent.svg"
        alt="Ícone de email enviado"
        width={100}
        height={100}
      />
      <h2 className="text-dark text-md">Você já pode navegar pela loja</h2>
      <Link
        href={"/"}
        className="px-12 py-3 bg-strongOrange text-white rounded-lg"
      >
        Ir para loja
      </Link>
    </div>
  );
};

export default ThirdBox;
