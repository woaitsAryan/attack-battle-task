import mongoose, { type Document, type Schema } from 'mongoose'

export interface PostType extends Document {
  _id: Schema.Types.ObjectId
  title: string
  content: string
  authorId: Schema.Types.ObjectId | Record<string, any>
  createdAt: Date
}

const postSchema = new mongoose.Schema<PostType>({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, required: true, default: Date.now }
})

const Post = mongoose.model<PostType>('Post', postSchema)

export default Post
