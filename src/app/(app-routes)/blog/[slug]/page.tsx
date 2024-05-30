'use server'

import ReactMarkdown from 'react-markdown'
import axios from '@/lib/utils/axiosConfig'
import rehypeRaw from 'rehype-raw'
import SocialMediaButton from '@/components/SocialMediaButton'
import Image from 'next/image'
import Breadcrumb from '@/components/Breadcrumb'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { BlogPost } from '@/schema/BlogPost'

export async function getPage({ params }) {
  const { slug } = params
  try {
    const { data } = await axios.get(`/blog/post/${slug}`)
    data.content = data.content.replace(/&lt;br\/&gt;|<br\/>/g, '\n')
    return { data }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to fetch the blog post' }
  }
}

export default async function BlogPostPage(args) {
  const { data, error } = await getPage(args)

  if (error) {
    return <div>Failed to load the blog post.</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return <ArticlePage article={data} />
}

const ArticlePage = ({ article }: { article: BlogPost }) => {
  const paths = [
    { href: '/blog', label: 'Blog' },
    { href: '', label: article.title },
  ]
  return (
    <section className="flex flex-col items-center">
      <title>{article.title}</title>
      <meta name="description" content={article.shortDescription} />
      {/* Additional SEO tags could be added here */}
      <article className="min-h-screen max-w-4xl space-y-4">
        <Breadcrumb paths={paths} />

        {/* Cover Image */}
        <div className="w-full h-64 overflow-hidden mb-8 max-w-4xl">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            className="w-full h-full object-cover rounded"
            width={896}
            height={400}
          />
        </div>
        <p className="flex justify-between items-baseline">
          <span>{article.author}</span>
          <span className="text-xs">{article.readTime} min · {format(new Date(article.createdAt), 'PPP', { locale: ptBR })}</span>
        </p>

        {/* Article Content */}
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          className="prose prose-sm lg:prose-lg 2xl:prose-2xl prose-invert sm:prose-invert lg:prose-invert x2l:prose-invert"
        >
          {article.content}
        </ReactMarkdown>

        {/* Tag List */}
        <div className="flex flex-wrap gap-2 mt-2">
          {article.tagList.map(tag => (
            <span
              key={tag}
              className="bg-gray-700 text-white rounded-full px-4 py-2 text-sm font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Comments and Related Articles could be implemented here */}
      </article>
      {/* Share Buttons */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex justify-center space-x-4 items-center">
        <SocialMediaButton platform="facebook" link={article.slug} />
        <SocialMediaButton platform="twitter" link={article.slug} />
        <SocialMediaButton platform="linkedin" link={article.slug} />
        <div>|</div>
        <SocialMediaButton platform="email" link={article.slug} />
        <SocialMediaButton platform="copy" link={article.slug} />
      </div>
    </section>
  )
}
