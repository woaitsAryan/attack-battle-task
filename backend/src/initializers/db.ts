import mongoose from 'mongoose'
import envGet from '../helpers/getEnv.js'

const URL: string = envGet.DB_URL

async function connectToDB (): Promise<void> {
  try {
    await mongoose.connect(URL)
    console.log('Connected to Database!')
  } catch (error) {
    console.error('Error connecting to the database:', error)
    process.exit(1)
  }
}

export default connectToDB
