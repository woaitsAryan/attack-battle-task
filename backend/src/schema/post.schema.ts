import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(8),
  content: z.string().min(8)
})

export { createPostSchema }
