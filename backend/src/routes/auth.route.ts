import express from 'express'
import {
  Logincontroller,
  Registercontroller
} from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/login', Logincontroller)
authRouter.post('/signup', Registercontroller)

export default authRouter
