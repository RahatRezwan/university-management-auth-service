import { Model } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export type IUser = {
  id: string
  role: string
  password: string
}

export type UserModel = Model<IUser, object>
