import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import getEnv from './helpers/getEnv.js'
import connectToDB from './initializers/db.js'
import authRouter from './routes/auth.route.js'
import mongoSanitize from 'express-mongo-sanitize'
import { postRouter, postsRouter } from './routes/post.route.js'
import errorHandler from './middleware/error.middleware.js'

const app = express()
const PORT = getEnv.PORT

void connectToDB()

app.use(mongoSanitize())

app.use(cors())
app.use(express.json())
app.use(helmet())

if (getEnv.ENVIRONMENT === 'dev') app.use(morgan('dev'))

app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/posts', postsRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})

export default app
