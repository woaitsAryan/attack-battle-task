import express from 'express'

const healthRouter = express.Router()

healthRouter.get('/', (_req, res) => {
  res.status(200).send('All good!')
})

export default healthRouter
