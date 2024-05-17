import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import Post from '../src/models/post.model.js'
import User from '../src/models/user.model.js'
import 'dotenv/config'

async function seedData (): Promise<void> {
  const DB_HOST = process.env.DB_HOST
  const DB_PORT = process.env.DB_PORT
  const DB_USER = process.env.DB_USER
  const DB_PASSWORD = process.env.DB_PASSWORD
  const DB_DATABASE = process.env.DB_DATABASE
  if ((DB_HOST == null) || (DB_PORT == null) || (DB_USER == null) || (DB_PASSWORD == null) || (DB_DATABASE == null)) {
    throw new Error('Missing environment variables')
  }
  const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`

  await mongoose.connect(url)

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password()
  })

  await user.save()

  for (let i = 0; i < 100; i++) {
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: user._id
    })

    await post.save()
  }

  await mongoose.connection.close()
}

seedData().catch(console.error)
