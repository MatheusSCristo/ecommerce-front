import Link from "next/link";

const Login = () => {
  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="bg-white border-gray-400 rounded-xl 2xl:w-[400px] 2xl:h-[500px] p-5 flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl">Bem vindo!</h1>
          <h2 className="text-2xl">Entre com sua conta</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-5 flex-col p-10">
            <input
              className="border-b-2 border-gray-400 w-full p-2 "
              placeholder="Email"
            />
            <input
              className="border-b-2 border-gray-400 w-full p-2 "
              placeholder="Senha"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <button className="px-20 py-2 bg-strongOrange text-white w-fit rounded-lg">
              Entrar
            </button>
            <span className="text-gray-500">Não tem uma conta? <Link href={"/auth/register"} className="text-strongOrange">Crie uma agora!</Link></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
