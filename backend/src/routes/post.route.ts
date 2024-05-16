import express from 'express'
import { CreatePostController, GetPostsController } from '../controllers/post.controller.js'
import { protect } from '../middleware/protect.middleware.js'

const postRouter = express.Router()

postRouter.post('/', protect, CreatePostController)

const postsRouter = express.Router()

postsRouter.get('/', GetPostsController)

export { postRouter, postsRouter }
