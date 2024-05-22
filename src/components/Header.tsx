import React from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Allan Lancioni</Link>
        </div>
        <ul className="flex space-x-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">Sobre</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/portfolio">Portfólio</Link></li>
          <li><Link href="/contact">Contato</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
