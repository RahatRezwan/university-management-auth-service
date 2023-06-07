import cors from 'cors'
import express, { Application } from 'express'
const app: Application = express()

//import router
import globalErrorHandler from './app/middleweres/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'

/* Middleware */
app.use(cors())
/* parser */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Routes */
app.use('/api/v1/users', UserRoutes)

/* testing route */
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Unhandled Promise Rejection'))
// })

//global error handler
app.use(globalErrorHandler)

//global error handler
/* app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({
      error: err,
    })
  } else {
    res.status(500).json({
      error: 'Something Went Wrong',
    })
  }
}) */

export default app
