import catchAsync from '../helpers/catchAsync.js'
import type { Response, Request } from 'express'
import { createPostSchema } from '../schema/post.schema.js'
import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import mongoose from 'mongoose'
import { clearCache, fetchPostsFromCache, setPostsToCache } from '../helpers/cache.js'

export const CreatePostController = catchAsync(
  async (req: Request, res: Response) => {
    const validatedPostBody = createPostSchema.safeParse(req.body)

    if (!validatedPostBody.success) {
      return res.status(400).json({
        token: '',
        message: 'Invalid input'
      })
    }

    const { title, content } = validatedPostBody.data

    const { sub } = req.body.decoded

    const existingUser = await User.findById(sub)
    if (existingUser == null) {
      return res.status(400).json({ message: 'User not found' })
    }

    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      authorId: existingUser._id
    })

    await post.save()

    void clearCache()

    return res.status(201).json({ message: 'Post created', post })
  })

export const GetPostsController = catchAsync(
  async (req: Request, res: Response) => {
    let query = {}
    if (req.query.author != null) {
      if (!mongoose.Types.ObjectId.isValid(req.query.author as string)) {
        return res.status(400).json({ message: 'Invalid input' })
      }
      query = { authorId: req.query.author }
    }

    const page = req.query.page == null ? 1 : parseInt(req.query.page as string)
    const limit = req.query.limit == null ? 10 : parseInt(req.query.limit as string)
    const skip = (page - 1) * limit

    const cachedPosts = await fetchPostsFromCache(`posts:${JSON.stringify(query)}:${page}:${limit}`)
    if (cachedPosts != null) {
      return res.status(200).json({ posts: cachedPosts })
    }

    const posts = await Post.find(query)
      .skip(skip)
      .limit(limit)
      .populate('authorId', 'name email')

    void setPostsToCache(`posts:${JSON.stringify(query)}:${page}:${limit}`, posts)

    return res.status(200).json({ posts })
  }
)
