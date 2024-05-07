"use client";
import { UserContext } from "@/context/UserContext";
import { createSession } from "@/utils/User/createSession";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .min(1, "É necessário informar o email"),
  password: z.string().min(1, "É necessário informar sua senha"),
});
type loginType = z.infer<typeof loginSchema>;
const Login = () => {
  const [credentialsError, setCredentialsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (userInfo: { email: string; password: string }) => {
    setCredentialsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      setIsLoading(false);
      if (!response.ok) {
        setCredentialsError(true);
        return;
      }
      const data = await response.json();
      setUser(data);
      createSession(data.accessToken);
      router.push("/");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="2xl:w-[400px] 2xl:h-[500px] p-5 flex flex-col gap-5 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl">Bem vindo!</h1>
          <h2 className="text-2xl">Entre com sua conta</h2>
        </div>
        <form
          className="flex flex-col gap-1"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex gap-5 flex-col p-10">
            <div className="flex flex-col gap-1">
              <input
                className="border border-gray-600 w-full p-2 focus:outline-none"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email?.message && (
                <span className="text-red-400">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <input
                className="border border-gray-600 w-full p-2 focus:outline-none"
                placeholder="Senha"
                {...register("password")}
              />
              {errors.password?.message && (
                <span className="text-red-400">{errors.password.message}</span>
              )}
            </div>
            {credentialsError && (
              <span className="text-red-400">
                Erro na validação das credenciais,tente novamente.
              </span>
            )}
            {isLoading && (
              <div className="flex justify-center text-strongOrange">
                <CircularProgress color="inherit" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              className="px-20 py-2 bg-black text-white w-fit rounded-sm disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              Entrar
            </button>
            <span className="text-gray-500">
              Não tem uma conta?{" "}
              <Link href={"/auth/register"} className="text-blue hover:underline">
                Crie uma agora!
              </Link>
            </span>
          </div>
        </form>
        <Link href={"/"} className="hover:underline">
          Entrar sem conectar-se
        </Link>
      </div>
    </section>
  );
};

export default Login;
