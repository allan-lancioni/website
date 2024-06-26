// components/Hero.tsx

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center h-[calc(100vh-8rem)] p-12 text-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-md"
    >
      <div className="decorative-lines absolute w-full h-full pointer-events-none z-0"></div>
      <div className="relative z-10">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
          Impulsione sua Produtividade com Nossas Soluções de IA
        </h1>
        <p className="font-sans text-lg md:text-xl text-gray-300 mb-8">
          Inovação, tecnologia de ponta e sofisticação para transformar seu
          negócio.
        </p>
        <a
          href="#"
          className="inline-flex items-center font-sans text-lg md:text-xl font-semibold bg-primary px-6 py-3 rounded-full transition-colors duration-300 text-white hover:text-white hover:bg-secondary"
        >
          Entre em Contato
        </a>
      </div>
    </section>
  )
}

export default Hero
