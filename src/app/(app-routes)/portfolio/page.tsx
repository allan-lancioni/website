import Footer from '@/components/Footer'
import UnderConstruction from '@/components/UnderConstruction'
import React from 'react'

const Home: React.FC = () => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
      <UnderConstruction />
      <Footer />
    </>
  )
}

export default Home
