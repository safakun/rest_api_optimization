import express from 'express'
const router = express.Router()
const userRouter = require('./userRouter')

router.use('/users', userRouter)

export default router