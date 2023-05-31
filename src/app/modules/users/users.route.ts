import express from 'express'
import { createUser } from './users.controller'
const router = express.Router()

router.post('/create-user', createUser)

export default router
