import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  ENVIRONMENT: z.string(),
  DB_URL: z.string(),
  PORT: z.string().transform(Number),
  JWT_KEY: z.string()
})

type EnvType = z.infer<typeof envSchema>

const getEnvHandler = (): EnvType => {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables: ${parsed.error.message}`
    )
  }
  return parsed.data
}

const getEnv = getEnvHandler()

export default getEnv
