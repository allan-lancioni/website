'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
      setLastScrollY(window.scrollY)

      if (isScrolled && window.scrollY > lastScrollY) {
        document.getElementById('header')?.classList.add('hidden-header')
      } else {
        document.getElementById('header')?.classList.remove('hidden-header')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navItems = useMemo(
    () => [
      { name: 'Home', href: '/' },
      { name: 'Sobre', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Portfólio', href: '/portfolio' },
      { name: 'Contato', href: '/contact' },
    ],
    []
  )

  return (
    <header
      id="header"
      className="bg-gray-800 text-white p-4 shadow-md top-0 left-0 right-0 z-50 transition-transform duration-300"
    >
      <nav className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="font-serif text-white text-xl font-bold transition-colors duration-300 hover:text-blue-400"
        >
          Allan Lancioni
        </Link>
        <div className="hidden md:flex space-x-6">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-item relative overflow-hidden text-white hover:text-blue-400 transition duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <button id="menu-btn" className={`text-white focus:outline-none transition-all duration-300 ease-out ${isMenuOpen && 'rotate-90'}`} onClick={() => setIsMenuOpen(isOpen => !isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 menu-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
        <div className="md:hidden font-semibold overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: isMenuOpen ? 500 : 0 }}>
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 px-4 text-white hover:bg-gray-700 transition duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
    </header>
  )
}

export default Header
