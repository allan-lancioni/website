import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient().$extends({
  name: 'BlogPost',
  result: {
    blogPost: {
      tagList: {
        needs: { tags: true },
        compute(post) {
          return post.tags.split(',').map(tag => tag.trim())
        },
      },
    },
  },
})

export default prisma