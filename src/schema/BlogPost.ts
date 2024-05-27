import { z } from 'zod'

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  coverImageUrl: z.string().optional(),
  shortDescription: z.string().optional(),
  tags: z.string().optional(),
  status: z
    .enum(['draft', 'published', 'archived'], { message: 'Invalid status' })
    .default('draft'),
  readTime: z.number().min(1, 'Read time must be at least 1 minute'),
  seoKeywords: z.string().optional(),
  category: z.string().optional(),
})

export type BlogPostInput = z.infer<typeof blogPostSchema>
