import express from 'express'
import { CreatePostController, GetPostsController } from '../controllers/post.controller.js'
import { protect } from '../middleware/protect.middleware.js'

const postsRouter = express.Router()

postsRouter.post('/', protect, CreatePostController)
postsRouter.get('/', GetPostsController)

export { postsRouter }
