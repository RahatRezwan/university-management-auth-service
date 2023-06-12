import cors from 'cors'
import express, { Application } from 'express'
const app: Application = express()

//import router
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'

/* Middleware */
app.use(cors())
/* parser */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Routes */
app.use('/api/v1/users', UserRoutes)

/* testing route */
/* app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Something went wron')
}) */

//global error handler
app.use(globalErrorHandler)

export default app
