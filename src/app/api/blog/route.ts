import { Prisma, PrismaClient } from '@prisma/client'
import {
  httpJSONResponse,
  httpError,
} from '@/lib/utils/httpResponse'
import { blogPostSchema } from '@/schema/BlogPost'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const parsedData = blogPostSchema.parse(await req.json()) as Prisma.BlogPostCreateInput
    console.log({parsedData})
    const blogPost = await prisma.blogPost.create({ data: parsedData })
    return httpJSONResponse(blogPost, 201)
  } catch (error) {
    return httpError(error)
  }
}

export async function GET(req: Request) {
  try {
    const posts = await prisma.blogPost.findMany()
    return httpJSONResponse(posts)
  } catch (error) {
    return httpError(error)
  }
}
