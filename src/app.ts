import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

//import router
import usersRouter from './app/modules/users/users.route'

/* Middleware */
app.use(cors())
/* parser */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Routes */
app.use('/api/v1/users', usersRouter)

/* testing route */
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
