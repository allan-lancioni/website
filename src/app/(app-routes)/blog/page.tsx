'use client'

import React, { useState, useEffect } from 'react'
import axios from '@/lib/utils/axiosConfig'
import Image from 'next/image'
import TextAreaMessage from '@/components/TextAreaMessage'
import { BlogPostListItem } from '@/schema/BlogPost'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostListItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios
      .get(`/api/blog/post?search=${encodeURIComponent(searchQuery)}`)
      .then(response => setBlogPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error))
  }, [searchQuery])

  return (
    <div>
      <div className="relative h-20">
        <TextAreaMessage onSearch={setSearchQuery} limit={150} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogPosts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="d-block bg-gray-800 shadow-lg rounded-lg overflow-hidden ease-in-out hover:shadow-xl relative cursor-pointer hover:scale-[1.01]"
          >
            <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs uppercase font-bold py-1 px-3 rounded-br-lg">
              {post.category}
            </div>
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              width={1000}
              height={240}
              className="h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-100 mb-2 font-sans">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm overflow-ellipsis overflow-hidden">
                {post.shortDescription}
              </p>
              <div className="text-gray-400 text-xs mt-2">
                <p>
                  {post.author} &#9679;{' '}
                  {format(new Date(post.createdAt), 'PPP', { locale: ptBR })}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tagList.map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-700 text-white rounded-full px-3 py-1 text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogList
