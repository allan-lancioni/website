import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen-minus-32 p-12 text-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="relative z-10">
        <h1 className="font-serif text-4xl md:text-6xl mb-4">404</h1>
        <h2 className="font-serif text-2xl md:text-4xl mb-4">
          Página Não Encontrada
        </h2>
        <p className="font-sans text-lg md:text-xl text-gray-300 mb-8">
          Desculpe, a página que você está procurando não existe.
        </p>
        <Link
          href="/"
          className="font-sans font-semibold bg-blue-500 py-3 px-6 rounded-full transition duration-300 hover:bg-blue-700"
        >
          Voltar ao Início
        </Link>
      </div>
    </section>
  )
}
