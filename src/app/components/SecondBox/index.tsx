import Link from "next/link";
import Sneakers from "./Sneakers";

const SecondBox = () => {
  return (
    <section className="flex flex-col items-center px-3 py-32 gap-8">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-5xl font-bold text-center">Lançamentos Imperdíveis</h1>
        <h2 className="text-gray-500 text-center">
          Tênis: As Novidades que Você Precisa Conhecer! Dê um passo à frente da
          moda com os lançamentos mais recentes de tênis na nossa loja! Descubra
          uma coleção exclusiva que combina estilo e conforto, perfeita para
          qualquer ocasião.
        </h2>
      </div>
      <Link href={"search/search?q="} className="border border-black px-10 py-1 hover:bg-gray-200">Ver todos</Link>
      <Sneakers/>
    </section>
  );
};

export default SecondBox;
