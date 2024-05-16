import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import Post from '../src/models/post.model.js'
import User from '../src/models/user.model.js'
import 'dotenv/config'

async function seedData (): Promise<void> {
  const dbUrl = process.env.DB_URL
  if (dbUrl === undefined) {
    throw new Error('DB_URL is not defined')
  }
  await mongoose.connect(dbUrl)

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
