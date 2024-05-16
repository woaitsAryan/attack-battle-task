import { redisClient } from '../initializers/redis.js'
import { type PostType } from '../models/post.model.js'

async function setPostsToCache (key: string, posts: PostType[]): Promise<void> {
  if (redisClient == null || redisClient.status !== 'ready' || posts.length === 0) {
    return
  }
  await redisClient.set(key, JSON.stringify(posts))
}

async function fetchPostsFromCache (key: string): Promise<PostType[] | null> {
  if (redisClient == null || redisClient.status !== 'ready') {
    return null
  }
  const result = await redisClient.get(key)
  if (result == null) {
    return null
  }
  return JSON.parse(result) as PostType[]
}

async function clearCache (): Promise<void> {
  if (redisClient == null || redisClient.status !== 'ready') {
    return
  }
  await redisClient.flushdb()
}

export { setPostsToCache, fetchPostsFromCache, clearCache }
