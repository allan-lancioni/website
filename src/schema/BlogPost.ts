import { z } from 'zod'

export const blogPostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  coverImageUrl: z.string().optional(),
  shortDescription: z.string().optional(),
  tags: z.string().optional(),
  tagList: z.string().array().optional(),
  slug: z.string(),
  status: z
    .enum(['draft', 'published', 'archived'], { message: 'Invalid status' })
    .default('draft'),
  readTime: z.number().min(1, 'Read time must be at least 1 minute'),
  seoKeywords: z.string().optional(),
  category: z.string().optional(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()).optional(),
})

export const blogPostInputSchema = blogPostSchema.omit({
  id: true,
  tagList: true,
  createdAt: true,
  updatedAt: true,
})

export const blogPostListItemSchema = blogPostSchema.omit({
  id: true,
  content: true,
  status: true,
  seoKeywords: true,
  updatedAt: true,
})

export type BlogPost = z.infer<typeof blogPostSchema>
export type BlogPostInput = z.infer<typeof blogPostInputSchema>
export type BlogPostListItem = z.infer<typeof blogPostListItemSchema>
