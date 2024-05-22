import React from 'react'
import Layout from '../../../components/Layout'

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <section className="text-center my-16">
          <h1 className="text-5xl font-bold text-gray-800">Consultoria em Tecnologia e Inteligência Artificial</h1>
          <p className="text-xl text-gray-600 mt-4">Ajudando empresas a inovar e crescer com soluções tecnológicas avançadas.</p>
          <a href="/contact" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-full">Entre em contato</a>
        </section>
        <section className="my-16">
          <h2 className="text-3xl font-bold text-gray-800">Projetos Recentes</h2>
          {/* Miniaturas de projetos vão aqui */}
        </section>
        <section className="my-16">
          <h2 className="text-3xl font-bold text-gray-800">Artigos Recentes</h2>
          {/* Links para artigos recentes vão aqui */}
        </section>
      </div>
    </Layout>
  )
}

export default Home
