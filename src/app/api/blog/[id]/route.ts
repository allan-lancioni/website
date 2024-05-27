// pages/api/posts/[id].ts
import { Prisma, PrismaClient } from '@prisma/client'
import {
  httpJSONResponse,
  httpErrorMissingArgs,
  httpError,
} from '@/lib/utils/httpResponse'
import { NextRequest } from 'next/server'
import { blogPostSchema } from '@/schema/BlogPost'

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }) {
  const id: number = parseInt(params.id)
  if (!id || isNaN(id)) {
    return httpErrorMissingArgs('id is required')
  }
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    })
    if (!post) {
      return httpJSONResponse(
        {
          message: 'Post not found',
        },
        404
      )
    }
    return httpJSONResponse(post)
  } catch (error) {
    return httpError(error)
  }
}

export async function PUT(req: NextRequest, { params }) {
  const id: number = parseInt(params.id)
  if (!id || isNaN(id)) {
    return httpErrorMissingArgs('id is required')
  }
  const parsedData = blogPostSchema.parse(await req.json()) as Prisma.BlogPostCreateInput
  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: parsedData,
    })
    return httpJSONResponse(post)
  } catch (error) {
    console.error(error)
    return httpError(error)
  }
}

export async function DELETE(req: NextRequest, { params }) {
  const id: number = parseInt(params.id)
  if (!id || isNaN(id)) {
    return httpErrorMissingArgs('id is required')
  }
  try {
    await prisma.blogPost.delete({
      where: { id },
    })
    return httpJSONResponse({
      message: 'Post deleted successfully',
    })
  } catch (error) {
    return httpError(error)
  }
}
