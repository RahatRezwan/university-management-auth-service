import { RequestHandler } from 'express'
import { z } from 'zod'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    //req-validation
    //body -> object
    //data -> object

    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'Role is required',
        }),
        password: z.string().optional(),
      }),
    })

    await createUserZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserService.createUserToDB(user)
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}
