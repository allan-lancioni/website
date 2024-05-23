import React from 'react'

const Home: React.FC = () => {
  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Contact</h2>
        <div className="text-lg text-gray-300">
          <p className="mb-2">📞 Tel: +55 11 93014-0991</p>
          <p className="mb-2">
            📧 E-mail:{' '}
            <a
              href="mailto:allanlancioni@allanlancioni.com"
              className="text-blue-300"
            >
              allanlancioni@allanlancioni.com
            </a>
          </p>
          <p className="mb-2">
            🏫 E-mail USP:{' '}
            <a href="mailto:allan.lancioni@usp.br" className="text-blue-300">
              allan.lancioni@usp.br
            </a>
          </p>
          <p className="mb-2">
            💼 LinkedIn:{' '}
            <a
              href="https://linkedin.com/in/allan-lancioni"
              className="text-blue-300"
            >
              linkedin.com/in/allan-lancioni
            </a>
          </p>
          <p className="mb-2">
            🌐 GitHub:{' '}
            <a
              href="https://github.com/allan-lancioni"
              className="text-blue-300"
            >
              github.com/allan-lancioni
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Home
