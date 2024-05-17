import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts'
import jwt from 'jsonwebtoken'
import catchAsync from '../helpers/catchAsync.js'
import mongoose from 'mongoose'
import type { Response, Request } from 'express'
import getEnv from '../helpers/getEnv.js'
import User from '../models/user.model.js'
import { loginSchema, registerSchema } from '../schema/auth.schema.js'

export const Registercontroller = catchAsync(
  async (req: Request, res: Response) => {
    const validatedRegisterBody = registerSchema.safeParse(req.body)

    if (!validatedRegisterBody.success) {
      return res.status(400).json({
        token: '',
        message: 'Invalid input'
      })
    }

    const { name, email, password } = validatedRegisterBody.data

    const existingUser = await User.findOne({ email })
    if (existingUser != null) {
      return res
        .status(400)
        .json({ token: '', message: 'Email already exists' })
    }
    const salt = genSaltSync(10)
    const hashedpassword = hashSync(password, salt)
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      passwordHash: hashedpassword,
      name,
      email
    })
    await newUser.save()
    const token = jwt.sign({ sub: newUser._id }, getEnv.JWT_KEY, {
      expiresIn: '30d'
    })

    return res.json({
      token,
      message: 'Account successfully registered!',
      name: newUser.name
    })
  }
)

export const Logincontroller = catchAsync(
  async (req: Request, res: Response) => {
    const validatedBody = loginSchema.safeParse(req.body)

    if (!validatedBody.success) {
      return res.status(400).json({
        token: '',
        message: 'Invalid input'
      })
    }

    const { email, password } = validatedBody.data

    const user = await User.findOne({ email })
    if (user === null) {
      return res
        .status(400)
        .json({ token: '', message: 'Invalid email or password' })
    }
    const result = compareSync(password, user.passwordHash)
    if (!result) {
      return res
        .status(400)
        .json({ token: '', message: 'Invalid email or password' })
    }
    const token = jwt.sign({ sub: user._id }, getEnv.JWT_KEY, {
      expiresIn: '30d'
    })
    return res.json({ token, message: 'Successfully logged in!', name: user.name })
  }
)
