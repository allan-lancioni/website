import React, { useMemo } from 'react'
import Hero from './Hero'
import DemoCard from '@/components/DemoCard'
import Link from 'next/link'

const Home: React.FC = () => {
  const projects = useMemo(
    () => [
      {
        title: 'Projeto 1',
        href: '/porfolio/projeto-1',
        description: 'Descrição breve do projeto 1.',
        img: 'https://via.placeholder.com/400x300',
      },
      {
        title: 'Projeto 2',
        href: '/porfolio/projeto-2',
        description: 'Descrição breve do projeto 2.',
        img: 'https://via.placeholder.com/400x300',
      },
      {
        title: 'Projeto 3',
        href: '/porfolio/projeto-3',
        description: 'Descrição breve do projeto 3.',
        img: 'https://via.placeholder.com/400x300',
      },
    ],
    []
  )

  const articles = useMemo(
    () => [
      {
        title: 'Artigo 1',
        href: '/blog/article-1',
        description: 'Descrição breve do artigo 1.',
        img: 'https://via.placeholder.com/400x300',
      },
      {
        title: 'Artigo 2',
        href: '/blog/article-2',
        description: 'Descrição breve do artigo 2.',
        img: 'https://via.placeholder.com/400x300',
      },
      {
        title: 'Artigo 3',
        href: '/blog/article-3',
        description: 'Descrição breve do artigo 3.',
        img: 'https://via.placeholder.com/400x300',
      },
    ],
    []
  )

  return (
    <>
      <Hero />
      <section className="my-16">
        <div className="flex items-baseline space-x-2">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">
            Projetos Recentes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <DemoCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-3xl font-bold text-gray-100 mb-6">
          Artigos Recentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <DemoCard key={article.title} {...article} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
