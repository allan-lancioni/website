import React from 'react'

const UnderConstruction: React.FC = () => {
  return (
    <div>
      <section className="flex flex-col items-center justify-center h-screen-minus-32 p-12 text-center h-[60vh] bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="relative z-10">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            Em Construção
          </h1>
          <hr className="mb-4" />
          <h2 className="font-serif text-2xl md:text-4xl mb-4">
            Estamos Trabalhando para Você
          </h2>
          <p className="font-sans text-lg md:text-xl text-gray-300 mb-8">
            Volte em breve para ver as novidades. Estamos preparando algo
            incrível para você.
          </p>
          <a
            href="/"
            className="font-sans font-semibold"
          >
            Voltar ao Início
          </a>
        </div>
      </section>
    </div>
  )
}

export default UnderConstruction
