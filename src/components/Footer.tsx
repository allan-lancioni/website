import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-8 mt-8">
    <div className="container mx-auto text-center">
      <div className="flex justify-center space-x-4 mb-4 text-xs md:text-base">
        <a href="mailto:allanlancioni@allanlancioni.com" className="hover:text-blue-400 transition duration-300 hidden md:block">allanlancioni@allanlancioni.com</a>
        <a href="mailto:allanlancioni@allanlancioni.com" className="hover:text-blue-400 transition duration-300 block md:hidden">Email</a>
        <span>|</span>
        <a href="tel:+5511930140991" className="hover:text-blue-400 transition duration-300 hidden md:block">(11) 93014-0991</a>
        <a href="tel:+5511930140991" className="hover:text-blue-400 transition duration-300 block md:hidden">Phone</a>
        <span>|</span>
        <a href="https://linkedin.com/in/allan-lancioni" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">LinkedIn</a>
        <span>|</span>
        <a href="https://github.com/allan-lancioni" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">GitHub</a>
      </div>
      <p className="text-xs md:text-sm">&copy; 2024 Allan Lancioni. Todos os direitos reservados.</p>
    </div>
  </footer>
  )
}

export default Footer
