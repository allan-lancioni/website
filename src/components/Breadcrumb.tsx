'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

type Path = {
  href: string
  label: string
}

const Breadcrumb = ({ paths }: { paths: Path[] }) => {
  const router = useRouter()
  const pathname = usePathname()



  if (pathname === '/' || pathname === '/home') {
    return null // Don't render breadcrumbs on the homepage
  }

  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center text-xs md:text-sm text-gray-500 "
    >
      {paths.map((path, index) => (
        <div key={index} className="flex items-center ">
          {index > 0 && <span className="mx-2">/</span>} {/* Separator */}
          <Link href={path.href} className="hover:text-gray-700 hover:underline whitespace-nowrap overflow-hidden overflow-ellipsis max-w-60 md:max-w-fit">
            {path.label}
          </Link>
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb
