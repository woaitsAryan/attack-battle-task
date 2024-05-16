import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email().refine(email => /\S+@\S+\.\S+/.test(email), {
    message: "Email isn't valid"
  }),
  password: z.string().min(8).refine(password => /\d/.test(password), {
    message: 'Password must contain at least one number'
  }),
  name: z.string().nonempty({ message: "Name can't be empty" })
})

const loginSchema = z.object({
  email: z.string().email().refine(email => /\S+@\S+\.\S+/.test(email), {
    message: "Email isn't valid"
  }),
  password: z.string().min(8).refine(password => /\d/.test(password), {
    message: 'Password must contain at least one number'
  })
})

export { registerSchema, loginSchema }
