import { Prisma } from '@prisma/client'
import {
  httpJSONResponse,
  httpErrorMissingArgs,
  httpError,
} from '@/lib/utils/httpResponse'
import { NextRequest } from 'next/server'
import { blogPostSchema } from '@/schema/BlogPost'
import prisma from '@/config/PrismaExtensions'

export async function GET(req: NextRequest, { params }) {
  if (!params.slug) return httpErrorMissingArgs('slug is required')

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
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
  if (process.env.NODE_ENV !== 'development')
    return httpError('Not allowed', 405)
  if (!params.slug) return httpErrorMissingArgs('slug is required')
  try {
    const parsedData = blogPostSchema
      .partial()
      .parse(await req.json()) as Partial<Prisma.BlogPostCreateInput>
    const post = await prisma.blogPost.update({
      where: { slug: params.slug },
      data: parsedData,
    })
    return httpJSONResponse({
      ...post,
      tags: undefined,
      tagList: post.tags.split(',').map(tag => tag.trim()),
    })
  } catch (error) {
    console.error(error)
    return httpError(error)
  }
}

export async function DELETE(req: NextRequest, { params }) {
  if (process.env.NODE_ENV !== 'development')
    return httpError('Not allowed', 405)
  if (!params.slug) {
    return httpErrorMissingArgs('slug is required')
  }
  try {
    await prisma.blogPost.delete({
      where: { slug: params.slug },
    })
    return httpJSONResponse({
      message: 'Post deleted successfully',
    })
  } catch (error) {
    return httpError(error)
  }
}
