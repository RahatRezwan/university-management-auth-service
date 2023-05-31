import { Request, Response } from 'express'
import { createUserToDB } from './users.service'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await createUserToDB(user)
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user',
    })
  }
}
