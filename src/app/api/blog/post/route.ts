import { Prisma } from '@prisma/client'
import { httpJSONResponse, httpError } from '@/lib/utils/httpResponse'
import {
  BlogPost,
  BlogPostListItem,
  blogPostInputSchema,
} from '@/schema/BlogPost'
import prisma from '@/config/PrismaExtensions'

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development')
    return httpError('Not allowed', 405)
  try {
    const parsedBody = blogPostInputSchema
      .omit({ slug: true })
      .parse(await req.json())
    const slug = await generateUniqueSlug(parsedBody.title)

    const parsedData = blogPostInputSchema.parse({
      ...parsedBody,
      slug,
    }) as Prisma.BlogPostCreateInput

    const blogPost: BlogPost = (await prisma.blogPost.create({
      data: parsedData,
    })) as BlogPost
    return httpJSONResponse<BlogPost>(blogPost, 201)
  } catch (error) {
    return httpError(error)
  }
}

export async function GET(req: Request) {
  try {
    const posts = (await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      select: {
        title: true,
        author: true,
        createdAt: true,
        slug: true,
        shortDescription: true,
        coverImageUrl: true,
        category: true,
        tags: true,
        tagList: true,
        readTime: true,
      },
    })) as BlogPostListItem[]
    return httpJSONResponse(posts)
  } catch (error) {
    return httpError(error)
  }
}

function createSlug(title) {
  return title.toLowerCase().replace(/[\s\W-]+/g, '-')
}

async function generateUniqueSlug(title, id = null) {
  let slug = createSlug(title)
  let counter = 0
  let originalSlug = slug

  while (true) {
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true },
    })

    // Check if the found post is not the current post being updated
    if (!existingPost || existingPost.id === id) break

    slug = `${originalSlug}-${++counter}`
  }

  return slug
}
