import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface DemoCardProps {
  title: string
  description: string
  img: string
  href: string
}

const DemoCard: React.FC<DemoCardProps> = ({
  title,
  description,
  img,
  href,
}) => {
  return (
    <div className="demo-card">
      <Link href={href}>
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <Image src={img} alt={title} width={400} height={300} className="w-full" />
          <div className="p-4">
            <h3 className="text-2xl font-bold text-gray-100">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default DemoCard
