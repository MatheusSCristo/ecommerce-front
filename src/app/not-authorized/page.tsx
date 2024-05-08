import Link from "next/link"

const NotAuthorized = () => {
  return (
    <section className='flex items-center justify-center h-screen flex-col gap-2 px-3'>
        <h1 className="font-bold">Sem autorização</h1>
        <h2>O usuário não possui autorização para acessar a pagina.</h2>
        <Link href={"/"} className="bg-black text-white px-2 py-1 rounded-sm">Retorne à loja</Link>
    </section>
  )
}

export default NotAuthorized