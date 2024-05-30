'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import useDebouncedScroll from '@/lib/hooks/useDebounceScroll'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hiddenHeader, setHiddenHeader] = useState(false)

  useDebouncedScroll(isScrollingDown => {
    if (isMenuOpen) return
    setHiddenHeader(isScrollingDown && window.scrollY > 100)
  }, 100)
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Portfólio', href: '/portfolio' },
    { name: 'Contato', href: '/contact' },
  ]

  return (
    <header
      style={{
        transform: hiddenHeader ? 'translateY(-100%)' : 'translateY(0)',
      }}
      className="sticky bg-gray-800 p-4 shadow-md top-0 left-0 right-0 z-50 transition-transform duration-300"
    >
      <nav className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="font-serif text-xl font-bold transition-colors duration-300 text-text hover:text-blue-400"
        >
          Allan Lancioni
        </Link>
        <div className="hidden md:flex space-x-6">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-item relative overflow-hidden text-text hover:text-blue-400 transition duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <button
            id="menu-btn"
            className="focus:outline-none"
            onClick={() => setIsMenuOpen(isOpen => !isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 menu-icon transition-all duration-300 ease-out ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isMenuOpen ? 500 : 0 }}
      >
        {navItems.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className="block py-2 px-4 text-text hover:bg-gray-700 transition duration-300"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  )
}

export default Header
