import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

// 1. Create an interface representing a document in MongoDB.
export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty; //future homework
  // admin?: Types.ObjectId | IAdmin; // future homework
};

export type UserModel = Model<IUser, Record<string, unknown>>;
