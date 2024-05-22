import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Allan Lancioni. Todos os direitos reservados.</p>
        <div className="mt-4">
          <a href="https://linkedin.com/in/allan-lancioni" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          {' | '}
          <a href="https://github.com/allan-lancioni" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
