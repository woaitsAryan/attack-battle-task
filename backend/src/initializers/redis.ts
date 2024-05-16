import { Redis } from 'ioredis'
import getEnv from '../helpers/getEnv.js'

let redisClient: Redis | null = null

async function connectToRedis (): Promise<void> {
  if (redisClient == null) {
    redisClient = new Redis({
      host: getEnv.REDIS_HOST,
      port: getEnv.REDIS_PORT,
      password: getEnv.REDIS_PASSWORD
    })

    redisClient.on('error', (error) => {
      console.error(`Redis client not connected - ${error.message}`)
      process.exit(1)
    })

    redisClient.on('connect', () => {
      console.log('Redis client connected')
    })
  }
}

export { connectToRedis, redisClient }
